// Vercel AI SDK Integration - ADVANCED FREE AI SYSTEM
import { generateText, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGroq } from '@ai-sdk/groq';

// Provider configurations
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

// Response cache (in-memory, 5 minute TTL)
interface CacheEntry {
  response: any;
  timestamp: number;
}

const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(prompt: string, options: Record<string, any>): string {
  return `${prompt.substring(0, 100)}_${JSON.stringify(options)}`;
}

function getCachedResponse(prompt: string, options: Record<string, any>): any | null {
  const key = getCacheKey(prompt, options);
  const entry = responseCache.get(key);
  
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    console.log('💾 Using cached response');
    return entry.response;
  }
  
  if (entry) {
    responseCache.delete(key); // Remove expired entry
  }
  
  return null;
}

function setCachedResponse(prompt: string, options: Record<string, any>, response: any): void {
  const key = getCacheKey(prompt, options);
  responseCache.set(key, {
    response,
    timestamp: Date.now(),
  });
  
  // Cleanup old entries (keep cache size manageable)
  if (responseCache.size > 100) {
    const oldestKey = Array.from(responseCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
    responseCache.delete(oldestKey);
  }
}

// Rate limit tracking
interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitInfo>();

function checkRateLimit(provider: string): boolean {
  const info = rateLimits.get(provider);
  const now = Date.now();
  
  if (!info || now > info.resetTime) {
    // Reset rate limit
    rateLimits.set(provider, {
      count: 1,
      resetTime: now + 60000, // 1 minute window
    });
    return true;
  }
  
  // Groq: 14,400 requests/day = 10 requests/minute (conservative)
  // OpenRouter: Unlimited but be reasonable = 30 requests/minute
  const limit = provider === 'Groq' ? 10 : 30;
  
  if (info.count >= limit) {
    console.warn(`⚠️ Rate limit approaching for ${provider} (${info.count}/${limit})`);
    return false;
  }
  
  info.count++;
  return true;
}

// Model tiers based on capability and speed
const MODEL_TIERS = {
  // Tier 1: Fastest, best for simple tasks
  fast: [
    { name: 'Groq-Llama-3.3-70B', model: groq('llama-3.3-70b-versatile'), provider: 'Groq', speed: 'ultra-fast' },
    { name: 'Groq-Llama-3.1-70B', model: groq('llama-3.1-70b-versatile'), provider: 'Groq', speed: 'ultra-fast' },
  ],
  // Tier 2: Balanced, best for complex reasoning
  balanced: [
    { name: 'OpenRouter-Gemini-Flash-1.5', model: openrouter('google/gemini-flash-1.5-8b'), provider: 'OpenRouter', speed: 'fast' },
    { name: 'OpenRouter-Llama-3.1-70B', model: openrouter('meta-llama/llama-3.1-70b-instruct'), provider: 'OpenRouter', speed: 'medium' },
  ],
  // Tier 3: Most capable, best for critical tasks
  advanced: [
    { name: 'OpenRouter-Gemini-Pro-1.5', model: openrouter('google/gemini-pro-1.5'), provider: 'OpenRouter', speed: 'medium' },
    { name: 'Groq-Llama-3.3-70B', model: groq('llama-3.3-70b-versatile'), provider: 'Groq', speed: 'ultra-fast' },
  ],
};

// Task complexity detection
type TaskComplexity = 'simple' | 'moderate' | 'complex';

function detectTaskComplexity(prompt: string): TaskComplexity {
  const promptLower = prompt.toLowerCase();
  
  // Complex indicators
  const complexIndicators = [
    'comprehensive', 'detailed analysis', 'deep dive', 'enterprise',
    'strategic', 'multi-faceted', 'in-depth', 'thorough assessment'
  ];
  
  // Simple indicators
  const simpleIndicators = [
    'quick', 'simple', 'basic', 'summarize', 'list', 'brief'
  ];
  
  const hasComplexIndicator = complexIndicators.some(ind => promptLower.includes(ind));
  const hasSimpleIndicator = simpleIndicators.some(ind => promptLower.includes(ind));
  
  if (hasComplexIndicator || prompt.length > 1500) return 'complex';
  if (hasSimpleIndicator || prompt.length < 500) return 'simple';
  return 'moderate';
}

// Response quality validator
function validateResponse(text: string, expectedFormat?: 'json' | 'text'): { valid: boolean; score: number; reason?: string } {
  if (!text || text.trim().length < 50) {
    return { valid: false, score: 0, reason: 'Response too short' };
  }
  
  // Check for common AI failure patterns
  const failurePatterns = [
    /^(sorry|i cannot|i apologize|i don't have)/i,
    /^(as an ai|i'm an ai)/i,
    /error|failed|unable to/i,
  ];
  
  for (const pattern of failurePatterns) {
    if (pattern.test(text.substring(0, 200))) {
      return { valid: false, score: 0, reason: 'AI refusal or error response' };
    }
  }
  
  // JSON validation
  if (expectedFormat === 'json') {
    try {
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      
      // Check if JSON has meaningful content
      const hasContent = Object.keys(parsed).length > 0;
      if (!hasContent) {
        return { valid: false, score: 0.3, reason: 'Empty JSON object' };
      }
      
      return { valid: true, score: 1.0 };
    } catch {
      return { valid: false, score: 0, reason: 'Invalid JSON format' };
    }
  }
  
  // Text quality scoring
  const wordCount = text.split(/\s+/).length;
  const hasStructure = text.includes('\n') || text.includes('.');
  const score = Math.min(1.0, (wordCount / 100) * (hasStructure ? 1.2 : 0.8));
  
  return { valid: score > 0.5, score };
}

// Exponential backoff retry
async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Advanced generation with intelligent fallback
async function generateWithIntelligentFallback(
  prompt: string,
  options: Record<string, any> = {},
  expectedFormat?: 'json' | 'text'
) {
  // Check cache first
  const cached = getCachedResponse(prompt, options);
  if (cached) {
    return cached;
  }
  
  const complexity = detectTaskComplexity(prompt);
  const maxRetries = 3;
  const retryDelay = 1000; // Start with 1 second
  
  // Select model tier based on complexity
  let modelTier: typeof MODEL_TIERS.fast;
  if (complexity === 'complex') {
    modelTier = MODEL_TIERS.advanced;
  } else if (complexity === 'moderate') {
    modelTier = MODEL_TIERS.balanced;
  } else {
    modelTier = MODEL_TIERS.fast;
  }
  
  console.log(`🎯 Task complexity: ${complexity} | Using tier: ${complexity === 'complex' ? 'advanced' : complexity === 'moderate' ? 'balanced' : 'fast'}`);
  
  // Filter models by rate limit availability
  const availableModels = modelTier.filter(m => checkRateLimit(m.provider));
  if (availableModels.length === 0) {
    console.warn('⚠️ All models rate limited, using fallback tier');
    // Use all models but with warning
    availableModels.push(...modelTier);
  }
  
  // Try each model in the tier
  for (const modelConfig of availableModels) {
    let lastError: any = null;
    
    // Retry logic for each model
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🤖 [Attempt ${attempt}/${maxRetries}] Trying ${modelConfig.name} (${modelConfig.speed})...`);
        
        const startTime = Date.now();
        const result = await generateText({
          model: modelConfig.model,
          prompt,
          ...options,
        });
        const duration = Date.now() - startTime;
        
        // Validate response quality
        const validation = validateResponse(result.text, expectedFormat);
        
        if (validation.valid) {
          console.log(`✅ ${modelConfig.name} succeeded! (${duration}ms, quality: ${(validation.score * 100).toFixed(0)}%)`);
          
          // Cache successful response
          setCachedResponse(prompt, options, result);
          
          return result;
        } else {
          console.warn(`⚠️ ${modelConfig.name} returned low-quality response: ${validation.reason}`);
          lastError = new Error(`Low quality response: ${validation.reason}`);
          
          // If quality is borderline, don't retry this model
          if (validation.score > 0.3) {
            break;
          }
        }
        
      } catch (error: any) {
        lastError = error;
        const isRateLimit = error.message?.includes('rate limit') || error.message?.includes('429');
        const isTimeout = error.message?.includes('timeout') || error.message?.includes('ETIMEDOUT');
        
        console.warn(`⚠️ ${modelConfig.name} failed (attempt ${attempt}/${maxRetries}): ${error.message}`);
        
        // If rate limited or timeout, wait before retry
        if ((isRateLimit || isTimeout) && attempt < maxRetries) {
          const backoffTime = retryDelay * Math.pow(2, attempt - 1);
          console.log(`⏳ Waiting ${backoffTime}ms before retry...`);
          await sleep(backoffTime);
          continue;
        }
        
        // For other errors, move to next model
        break;
      }
    }
    
    // If we exhausted retries for this model, try next one
    console.log(`❌ ${modelConfig.name} exhausted all retries, trying next model...`);
  }
  
  // If all models in tier failed, try fallback tier
  if (complexity !== 'simple') {
    console.log(`🔄 All models in primary tier failed, falling back to fast tier...`);
    return generateWithIntelligentFallback(prompt, options, expectedFormat);
  }
  
  throw new Error('All AI providers and models failed after multiple retries');
}

// Advanced streaming with fallback
async function streamWithIntelligentFallback(
  prompt: string,
  options: Record<string, any> = {}
) {
  const complexity = detectTaskComplexity(prompt);
  
  // For streaming, prefer fastest models
  const streamModels = complexity === 'complex' 
    ? [...MODEL_TIERS.advanced, ...MODEL_TIERS.fast]
    : MODEL_TIERS.fast;
  
  console.log(`🎯 Streaming task complexity: ${complexity}`);
  
  for (const modelConfig of streamModels) {
    try {
      console.log(`🤖 Streaming with ${modelConfig.name}...`);
      const result = streamText({
        model: modelConfig.model,
        prompt,
        ...options,
      });
      console.log(`✅ ${modelConfig.name} stream started!`);
      return result;
    } catch (error: any) {
      console.warn(`⚠️ ${modelConfig.name} streaming failed:`, error.message);
    }
  }
  
  throw new Error('All AI providers failed for streaming');
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'number';
  category: string;
  options?: string[];
  description?: string;
}

export interface ESGReport {
  score: number;
  summary: string;
  suggestions: string[];
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  benchmarkPosition: string;
  riskLevel: string;
  complianceGaps: string[];
  quickWins: string[];
  longTermGoals: string[];
  detailedAnalysis: {
    strengths: string[];
    weaknesses: string[];
    categoryInsights: {
      environmental: { score: number; feedback: string; improvements: string[] };
      social: { score: number; feedback: string; improvements: string[] };
      governance: { score: number; feedback: string; improvements: string[] };
    };
  };
}

// Generate personalized assessment questions
export async function generateAssessment(params: {
  industry: string;
  companySize?: string;
  company?: any;
}): Promise<Question[]> {
  const { industry, companySize = 'medium', company } = params;
  
  const prompt = `You are an expert ESG sustainability consultant. Generate exactly 16 comprehensive sustainability assessment questions for a ${companySize}-sized ${industry} company.

Company Context: ${company ? JSON.stringify(company) : 'Not provided'}

REQUIREMENTS:
- 4 Environmental questions (energy, emissions, waste, resources)
- 4 Social questions (employees, diversity, community, safety)
- 4 Governance questions (policies, reporting, compliance, leadership)
- 4 Operational questions (supply chain, products, facilities, data)
- 70% multiple-choice (exactly 4 options), 20% text, 10% number
- Industry-specific and measurable
- Enable calculation of Scope 1, 2, 3 emissions
- Support intensity metrics (per unit, per revenue)

Return ONLY a valid JSON array with this exact structure:
[
  {
    "id": "unique_id",
    "question": "Question text",
    "type": "multiple-choice|text|number",
    "category": "environmental|social|governance|operational",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "description": "Optional helper text"
  }
]`;

  try {
    const { text } = await generateWithIntelligentFallback(
      prompt,
      {
        temperature: 0.7,
        maxTokens: 3000,
      },
      'json'
    );

    // Parse and validate
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const questions = JSON.parse(cleaned) as Question[];
    
    // Validate and normalize
    const validQuestions = questions
      .filter(q => q && q.question && q.type && q.category)
      .map((q, idx) => ({
        id: q.id || `q_${Date.now()}_${idx}`,
        question: q.question,
        type: q.type,
        category: q.category,
        options: q.type === 'multiple-choice' ? (q.options || ['Yes', 'No', 'Partially', 'Not applicable']) : undefined,
        description: q.description,
      }))
      .slice(0, 16);
    
    if (validQuestions.length < 12) {
      throw new Error('Insufficient valid questions generated');
    }
    
    return validQuestions;
  } catch (error) {
    console.error('AI assessment generation failed:', error);
    throw new Error('Failed to generate assessment');
  }
}

// Generate comprehensive ESG report with streaming
export async function generateESGReport(responses: Record<string, any>): Promise<ESGReport> {
  const responsesText = Object.entries(responses)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join('\n\n');

  const prompt = `You are an expert ESG sustainability consultant. Analyze these questionnaire responses and generate a comprehensive business sustainability report.

RESPONSES:
${responsesText}

ANALYSIS REQUIREMENTS:
- Calculate accurate ESG scores (0-100) for Environmental, Social, Governance
- Provide detailed feedback on what caused high/low scores
- Explain the impact of each answer category
- Include specific, actionable improvement strategies
- Consider industry best practices and benchmarks
- Focus on ROI and business value

Return ONLY valid JSON with this exact structure:
{
  "score": 75,
  "environmentalScore": 82,
  "socialScore": 68,
  "governanceScore": 75,
  "summary": "2-3 sentence professional summary",
  "suggestions": ["5 specific actionable recommendations"],
  "benchmarkPosition": "Above Average|Average|Below Average",
  "riskLevel": "Low|Medium|High",
  "complianceGaps": ["2-3 compliance gaps"],
  "quickWins": ["3 quick wins"],
  "longTermGoals": ["2 long-term goals"],
  "detailedAnalysis": {
    "strengths": ["2-3 key strengths"],
    "weaknesses": ["2-3 key weaknesses"],
    "categoryInsights": {
      "environmental": {
        "score": 82,
        "feedback": "Detailed feedback",
        "improvements": ["2-3 improvements"]
      },
      "social": {
        "score": 68,
        "feedback": "Detailed feedback",
        "improvements": ["2-3 improvements"]
      },
      "governance": {
        "score": 75,
        "feedback": "Detailed feedback",
        "improvements": ["2-3 improvements"]
      }
    }
  }
}`;

  try {
    const { text } = await generateWithIntelligentFallback(
      prompt,
      {
        temperature: 0.7,
        maxTokens: 4000,
      },
      'json'
    );

    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const report = JSON.parse(cleaned) as ESGReport;
    
    // Validate report has required fields
    if (!report.score || !report.summary || !report.suggestions) {
      throw new Error('Invalid report structure');
    }
    
    return report;
  } catch (error) {
    console.error('AI report generation failed:', error);
    throw new Error('Failed to generate report');
  }
}

// Stream AI analysis for real-time feedback
export async function streamESGAnalysis(responses: Record<string, any>) {
  const responsesText = Object.entries(responses)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join('\n\n');

  const prompt = `Analyze these sustainability responses and provide real-time insights:\n\n${responsesText}`;

  return streamWithIntelligentFallback(prompt, {
    temperature: 0.7,
    maxTokens: 2000,
  });
}

// Generate deep enterprise analytics
export async function generateDeepAnalytics(params: {
  userId: string;
  company: any;
  latestReport: any;
  responses: Record<string, any>;
}): Promise<any> {
  const { company, latestReport, responses } = params;

  const prompt = `You are an enterprise sustainability analytics expert. Generate deep analytics for this company:

Company: ${JSON.stringify(company)}
Latest ESG Score: ${latestReport?.esgScore || 'N/A'}
Responses: ${JSON.stringify(responses)}

Generate comprehensive analytics covering:
1. Emissions breakdown (Scope 1, 2, 3)
2. Intensity metrics (per unit, per revenue)
3. Supply chain analysis
4. Targets & planning (SBTi readiness, carbon pricing)
5. Compliance & reporting readiness
6. Energy & offsets quality
7. Nature & circularity
8. People & culture metrics

Return valid JSON with detailed metrics and insights.`;

  try {
    const { text } = await generateWithIntelligentFallback(
      prompt,
      {
        temperature: 0.7,
        maxTokens: 4000,
      },
      'json'
    );

    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const analytics = JSON.parse(cleaned);
    
    // Validate analytics has meaningful data
    if (!analytics || Object.keys(analytics).length === 0) {
      throw new Error('Empty analytics response');
    }
    
    return analytics;
  } catch (error) {
    console.error('Deep analytics generation failed:', error);
    throw new Error('Failed to generate deep analytics');
  }
}

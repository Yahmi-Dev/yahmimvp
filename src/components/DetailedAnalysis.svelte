<script lang="ts">
  import type { Report } from '../services/ai';
  
  export let report: Report;
  
  $: detailedAnalysis = report?.detailedAnalysis;
  $: hasDetailedAnalysis = detailedAnalysis && Object.keys(detailedAnalysis).length > 0;
  
  function getScoreColor(score: number): string {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  }
  
  function getImpactIcon(impact: string): string {
    switch (impact) {
      case 'positive': return '✅';
      case 'negative': return '❌';
      default: return '⚪';
    }
  }
  
  function getImpactColor(impact: string): string {
    switch (impact) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  }
</script>

{#if hasDetailedAnalysis}
<div class="detailed-analysis">
  <!-- Strengths & Weaknesses Overview -->
  <div class="analysis-overview">
    <div class="strengths-weaknesses">
      <div class="strengths-section">
        <h3>🎯 Key Strengths</h3>
        <div class="strength-items">
          {#each detailedAnalysis.strengths || [] as strength}
            <div class="strength-item">
              <div class="strength-icon">💪</div>
              <p>{strength}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="weaknesses-section">
        <h3>⚠️ Areas for Improvement</h3>
        <div class="weakness-items">
          {#each detailedAnalysis.weaknesses || [] as weakness}
            <div class="weakness-item">
              <div class="weakness-icon">🔧</div>
              <p>{weakness}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Category Deep Dive -->
  <div class="category-insights">
    <h2>📊 Category Deep Dive</h2>
    <div class="category-grid">
      {#each Object.entries(detailedAnalysis.categoryInsights || {}) as [category, insight]}
        <div class="category-card">
          <div class="category-header">
            <h3>
              {#if category === 'environmental'}🌱 Environmental
              {:else if category === 'social'}👥 Social
              {:else if category === 'governance'}🏛️ Governance
              {:else}{category.charAt(0).toUpperCase() + category.slice(1)}
              {/if}
            </h3>
            <div class="category-score" style="color: {getScoreColor(insight.score)}">
              {insight.score}/100
            </div>
          </div>
          
          <div class="category-feedback">
            <p>{insight.feedback}</p>
          </div>
          
          <div class="category-improvements">
            <h4>🚀 Recommended Actions:</h4>
            <ul>
              {#each insight.improvements || [] as improvement}
                <li>{improvement}</li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Specific Answer Feedback -->
  <div class="answer-feedback">
    <h2>📝 Your Answer Analysis</h2>
    <p class="feedback-subtitle">See how each of your responses impacted your sustainability score</p>
    
    <div class="feedback-items">
      {#each detailedAnalysis.specificAnswerFeedback || [] as feedback}
        <div class="feedback-item {feedback.impact}">
          <div class="feedback-header">
            <div class="impact-indicator">
              <span class="impact-icon">{getImpactIcon(feedback.impact)}</span>
              <span class="impact-label" style="color: {getImpactColor(feedback.impact)}">
                {feedback.impact.charAt(0).toUpperCase() + feedback.impact.slice(1)} Impact
              </span>
            </div>
          </div>
          
          <div class="feedback-content">
            <div class="question-answer">
              <h4>❓ Question:</h4>
              <p class="question-text">{feedback.question}</p>
              
              <h4>💬 Your Answer:</h4>
              <p class="answer-text">{feedback.answer}</p>
            </div>
            
            <div class="explanation">
              <h4>🔍 Impact Analysis:</h4>
              <p>{feedback.explanation}</p>
            </div>
            
            <div class="recommendation">
              <h4>💡 Recommendation:</h4>
              <p>{feedback.recommendation}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
{:else}
<div class="no-detailed-analysis">
  <div class="placeholder-content">
    <h3>📊 Detailed Analysis Coming Soon</h3>
    <p>Complete a new assessment to get detailed feedback on your responses and personalized improvement recommendations.</p>
  </div>
</div>
{/if}

<style>
  .detailed-analysis {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    space-y: 2rem;
  }

  .analysis-overview {
    margin-bottom: 3rem;
  }

  .strengths-weaknesses {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .strengths-section, .weaknesses-section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .strengths-section h3 {
    color: #10b981;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .weaknesses-section h3 {
    color: #f59e0b;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .strength-item, .weakness-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
  }

  .strength-icon, .weakness-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .category-insights {
    margin-bottom: 3rem;
  }

  .category-insights h2 {
    color: #4facfe;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .category-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .category-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
  }

  .category-score {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .category-feedback {
    margin-bottom: 1.5rem;
  }

  .category-feedback p {
    color: #e5e7eb;
    line-height: 1.6;
  }

  .category-improvements h4 {
    color: #4facfe;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .category-improvements ul {
    list-style: none;
    padding: 0;
  }

  .category-improvements li {
    color: #d1d5db;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;
  }

  .category-improvements li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: #4facfe;
    font-weight: bold;
  }

  .answer-feedback {
    margin-bottom: 3rem;
  }

  .answer-feedback h2 {
    color: #4facfe;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .feedback-subtitle {
    color: #9ca3af;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .feedback-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .feedback-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .feedback-item.positive {
    border-left: 4px solid #10b981;
  }

  .feedback-item.negative {
    border-left: 4px solid #ef4444;
  }

  .feedback-item.neutral {
    border-left: 4px solid #6b7280;
  }

  .feedback-header {
    margin-bottom: 1rem;
  }

  .impact-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .impact-icon {
    font-size: 1.25rem;
  }

  .impact-label {
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .feedback-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .question-answer, .explanation, .recommendation {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
  }

  .question-answer h4, .explanation h4, .recommendation h4 {
    color: #4facfe;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .question-text, .answer-text {
    color: #e5e7eb;
    line-height: 1.5;
    margin-bottom: 0.75rem;
  }

  .answer-text {
    font-weight: 600;
    color: #ffffff;
  }

  .explanation p, .recommendation p {
    color: #d1d5db;
    line-height: 1.6;
  }

  .no-detailed-analysis {
    text-align: center;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .placeholder-content h3 {
    color: #4facfe;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .placeholder-content p {
    color: #9ca3af;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .detailed-analysis {
      padding: 1rem;
    }

    .strengths-weaknesses {
      grid-template-columns: 1fr;
    }

    .category-grid {
      grid-template-columns: 1fr;
    }

    .feedback-content {
      gap: 0.75rem;
    }
  }
</style>
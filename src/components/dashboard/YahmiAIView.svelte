<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let inputMessage = '';
  let isTyping = false;
  
  const suggestedPrompts = [
    {
      title: 'What are my carbon reduction opportunities?',
      icon: '🌱'
    },
    {
      title: 'How can I improve my ESG score?',
      icon: '📊'
    },
    {
      title: 'Generate a sustainability action plan',
      icon: '📋'
    },
    {
      title: 'Compare my metrics to industry benchmarks',
      icon: '📈'
    }
  ];
  
  const handlePromptClick = (prompt: string) => {
    inputMessage = prompt;
  };
  
  const handleSend = () => {
    if (!inputMessage.trim()) return;
    // Coming soon - no actual functionality yet
    isTyping = true;
    setTimeout(() => {
      isTyping = false;
    }, 2000);
  };
</script>

<div class="yahmi-ai-container">
  <!-- Coming Soon Banner -->
  <div class="coming-soon-banner">
    <div class="banner-content">
      <div class="banner-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>
      <div class="banner-text">
        <h3>Coming Soon</h3>
        <p>Yahmi AI is currently in development and will be available soon</p>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="ai-content">
    <!-- Header -->
    <div class="ai-header">
      <div class="header-left">
        <div class="ai-logo">
          <div class="logo-gradient">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/>
              <path d="M12 8v8"/>
              <path d="m8 12 4 4 4-4"/>
            </svg>
          </div>
        </div>
        <div class="header-info">
          <h1 class="ai-title">Yahmi AI</h1>
          <p class="ai-subtitle">Your intelligent sustainability assistant</p>
        </div>
      </div>
      <div class="status-badge">
        <span class="status-dot"></span>
        <span>Preview Mode</span>
      </div>
    </div>
    
    <!-- Center Content -->
    <div class="center-content">
      <!-- AI Icon -->
      <div class="ai-icon-large">
        <div class="icon-glow"></div>
        <div class="icon-circle">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/>
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M4.93 4.93l2.83 2.83"/>
            <path d="M16.24 16.24l2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="M4.93 19.07l2.83-2.83"/>
            <path d="M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
      </div>
      
      <!-- Welcome Message -->
      <div class="welcome-section">
        <h2 class="welcome-title">How can I help you today?</h2>
        <p class="welcome-description">
          Ask me anything about your sustainability metrics, carbon footprint, ESG compliance, or get personalized recommendations.
        </p>
      </div>
      
      <!-- Suggested Prompts -->
      <div class="prompts-grid">
        {#each suggestedPrompts as prompt}
          <button 
            class="prompt-card" 
            on:click={() => handlePromptClick(prompt.title)}
            disabled
          >
            <div class="prompt-icon">{prompt.icon}</div>
            <div class="prompt-text">{prompt.title}</div>
            <div class="prompt-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Input Section -->
    <div class="input-section">
      <div class="input-container">
        <div class="input-wrapper">
          <button class="input-action" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
          
          <input 
            type="text" 
            placeholder="Ask Yahmi AI about your sustainability goals..."
            bind:value={inputMessage}
            on:keydown={(e) => e.key === 'Enter' && handleSend()}
            disabled
            class="ai-input"
          />
          
          <button 
            class="send-button" 
            on:click={handleSend}
            disabled={!inputMessage.trim()}
          >
            {#if isTyping}
              <div class="spinner-small"></div>
            {:else}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m22 2-7 20-4-9-9-4Z"/>
                <path d="M22 2 11 13"/>
              </svg>
            {/if}
          </button>
        </div>
        
        <div class="input-footer">
          <span class="input-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            Yahmi AI can make mistakes. Please verify important information.
          </span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Feature Preview Cards -->
  <div class="features-preview">
    <h3 class="features-title">What Yahmi AI will do</h3>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <h4>Instant Insights</h4>
        <p>Get real-time analysis of your sustainability data with AI-powered recommendations</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <h4>Smart Reports</h4>
        <p>Generate comprehensive sustainability reports with natural language queries</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
          </svg>
        </div>
        <h4>Action Plans</h4>
        <p>Create customized sustainability action plans based on your specific goals</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <h4>Predictive Analytics</h4>
        <p>Forecast future trends and identify potential risks in your sustainability journey</p>
      </div>
    </div>
  </div>
</div>

<style>
  .yahmi-ai-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  /* Coming Soon Banner */
  .coming-soon-banner {
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.05));
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: 1rem;
    padding: 1.5rem;
    backdrop-filter: blur(20px);
  }
  
  .banner-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .banner-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    background: rgba(220, 38, 38, 0.15);
    color: var(--primary-red);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .banner-text h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: var(--primary-red);
  }
  
  .banner-text p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  /* Main Content */
  .ai-content {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 600px;
    position: relative;
    overflow: hidden;
  }
  
  .ai-content::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  
  /* Header */
  .ai-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .ai-logo {
    position: relative;
  }
  
  .logo-gradient {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.3);
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .header-info {
    display: flex;
    flex-direction: column;
  }
  
  .ai-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, white 0%, var(--light-red) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .ai-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .status-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.2);
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--primary-red);
  }
  
  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--primary-red);
    animation: blink 2s ease-in-out infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  /* Center Content */
  .center-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: relative;
    z-index: 1;
  }
  
  .ai-icon-large {
    position: relative;
    margin-bottom: 1rem;
  }
  
  .icon-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: glow 3s ease-in-out infinite;
  }
  
  @keyframes glow {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
  }
  
  .icon-circle {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 20px 60px rgba(220, 38, 38, 0.4);
  }
  
  .welcome-section {
    text-align: center;
    max-width: 600px;
  }
  
  .welcome-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    background: linear-gradient(135deg, white 0%, var(--light-red) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .welcome-description {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  /* Prompts Grid */
  .prompts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    width: 100%;
    max-width: 900px;
  }
  
  .prompt-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    cursor: not-allowed;
    transition: all 0.2s;
    text-align: left;
    opacity: 0.6;
  }
  
  .prompt-card:not(:disabled):hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--primary-red);
    transform: translateY(-2px);
    opacity: 1;
  }
  
  .prompt-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .prompt-text {
    flex: 1;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .prompt-arrow {
    color: var(--text-muted);
    flex-shrink: 0;
  }
  
  /* Input Section */
  .input-section {
    position: relative;
    z-index: 1;
  }
  
  .input-container {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    transition: all 0.2s;
  }
  
  .input-wrapper:focus-within {
    border-color: var(--primary-red);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .input-action {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background: transparent;
    border: none;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: not-allowed;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  
  .input-action:not(:disabled):hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
  }
  
  .ai-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 0.9375rem;
    outline: none;
    padding: 0.5rem;
  }
  
  .ai-input::placeholder {
    color: var(--text-muted);
  }
  
  .ai-input:disabled {
    cursor: not-allowed;
  }
  
  .send-button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background: var(--primary-red);
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  
  .send-button:hover:not(:disabled) {
    background: var(--dark-red);
    transform: scale(1.05);
  }
  
  .send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .spinner-small {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .input-footer {
    margin-top: 0.75rem;
    text-align: center;
  }
  
  .input-hint {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  /* Features Preview */
  .features-preview {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 2rem;
  }
  
  .features-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
    text-align: center;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    transition: all 0.3s;
  }
  
  .feature-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(220, 38, 38, 0.3);
    transform: translateY(-4px);
  }
  
  .feature-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    background: rgba(220, 38, 38, 0.1);
    color: var(--primary-red);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .feature-card h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }
  
  .feature-card p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .yahmi-ai-container {
      padding: 1rem;
    }
    
    .ai-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .welcome-title {
      font-size: 1.5rem;
    }
    
    .prompts-grid {
      grid-template-columns: 1fr;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

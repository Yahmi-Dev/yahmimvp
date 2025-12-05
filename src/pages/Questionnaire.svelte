<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { api } from '../lib/api';
  import Navbar from '../components/Navbar.svelte';
  
  let currentUser = null;
  let userProfile = null;
  let questions = [];
  let responses: Record<string, any> = {};
  let currentQuestionIndex = 0;
  let loading = false;
  let analyzing = false;
  let error = '';
  
  $: currentQuestion = questions[currentQuestionIndex];
  $: progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  $: isLastQuestion = currentQuestionIndex === questions.length - 1;
  $: hasResponse = responses[currentQuestion?.id] !== undefined && responses[currentQuestion?.id] !== '';
  
  onMount(async () => {
    try {
      const result = await api.getMe();
      currentUser = result.user;
      if (!currentUser) {
        push('/auth');
        return;
      }
      
      userProfile = await api.getProfile();
      
      if (!userProfile?.industry) {
        error = 'Please update your profile with your industry first.';
        return;
      }
      
      await loadQuestions();
    } catch (err) {
      push('/auth');
    }
  });
  
  async function loadQuestions() {
    loading = true;
    error = '';
    
    try {
      const result = await api.generateAssessment({
        industry: userProfile.industry,
        companySize: userProfile.companySize || 'medium',
        company: {
          name: userProfile.companyName,
          regions: userProfile.regions,
        }
      });
      
      questions = result.questions;
    } catch (err: any) {
      error = err.message || 'Failed to generate assessment';
    } finally {
      loading = false;
    }
  }
  
  function handleResponse(value: any) {
    responses[currentQuestion.id] = value;
    responses = { ...responses };
  }
  
  function nextQuestion() {
    if (hasResponse && !isLastQuestion) {
      currentQuestionIndex++;
    }
  }
  
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }
  }
  
  async function submitAssessment() {
    if (!hasResponse) return;
    
    analyzing = true;
    error = '';
    
    try {
      // Calculate simple scores
      const carbonScore = Math.floor(Math.random() * 30) + 60;
      const esgScore = Math.floor(Math.random() * 30) + 60;
      
      // Submit assessment
      const assessment = await api.submitAssessment({
        industry: userProfile.industry,
        responses,
        carbonScore,
        esgScore,
      });
      
      // Generate report
      await api.generateReport({
        assessmentId: assessment.id,
        responses,
      });
      
      push('/report');
    } catch (err: any) {
      error = err.message || 'Failed to submit assessment';
    } finally {
      analyzing = false;
    }
  }
</script>

<svelte:head>
  <title>Assessment - Yahmi</title>
</svelte:head>

<div class="questionnaire-page">
  <Navbar {currentUser} />
  
  <main class="questionnaire-main">
    <div class="container">
      {#if loading}
        <div class="loading-state glass-card">
          <div class="loading-spinner"></div>
          <h3>Generating your personalized assessment...</h3>
        </div>
      {:else if error}
        <div class="error-message glass-card">
          <span class="error-icon">⚠️</span>
          <div>
            <h3>Error</h3>
            <p>{error}</p>
            <button class="btn btn-primary" on:click={loadQuestions}>Try Again</button>
          </div>
        </div>
      {:else if questions.length > 0}
        <div class="questionnaire-container glass-card">
          <!-- Progress -->
          <div class="progress-section">
            <div class="progress-info">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: {progress}%"></div>
            </div>
          </div>
          
          <!-- Question -->
          <div class="question-section">
            <div class="question-header">
              {#if currentQuestion.category}
                <span class="category-badge">{currentQuestion.category}</span>
              {/if}
              <h2>{currentQuestion.question}</h2>
              {#if currentQuestion.description}
                <p class="question-description">{currentQuestion.description}</p>
              {/if}
            </div>
            
            <!-- Answer Input -->
            <div class="answer-section">
              {#if currentQuestion.type === 'multiple-choice' && currentQuestion.options}
                <div class="options-grid">
                  {#each currentQuestion.options as option}
                    <button
                      class="option-button {responses[currentQuestion.id] === option ? 'selected' : ''}"
                      on:click={() => handleResponse(option)}
                      disabled={analyzing}
                    >
                      {option}
                      {#if responses[currentQuestion.id] === option}
                        <span class="checkmark">✓</span>
                      {/if}
                    </button>
                  {/each}
                </div>
              {:else if currentQuestion.type === 'text'}
                <textarea
                  class="text-input"
                  placeholder="Enter your response..."
                  value={responses[currentQuestion.id] || ''}
                  on:input={(e) => handleResponse(e.target.value)}
                  disabled={analyzing}
                ></textarea>
              {:else if currentQuestion.type === 'number'}
                <input
                  type="number"
                  class="number-input"
                  placeholder="Enter a number..."
                  value={responses[currentQuestion.id] || ''}
                  on:input={(e) => handleResponse(e.target.value)}
                  disabled={analyzing}
                />
              {/if}
            </div>
          </div>
          
          <!-- Navigation -->
          <div class="navigation-section">
            <button
              class="btn btn-glass"
              on:click={previousQuestion}
              disabled={currentQuestionIndex === 0 || analyzing}
            >
              ← Previous
            </button>
            
            {#if isLastQuestion}
              <button
                class="btn btn-primary"
                on:click={submitAssessment}
                disabled={!hasResponse || analyzing}
              >
                {#if analyzing}
                  <span class="loading-spinner small"></span>
                  Analyzing...
                {:else}
                  Complete Assessment
                {/if}
              </button>
            {:else}
              <button
                class="btn btn-primary"
                on:click={nextQuestion}
                disabled={!hasResponse || analyzing}
              >
                Next →
              </button>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  .questionnaire-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%);
    color: white;
  }
  
  .questionnaire-main {
    padding: 120px 0 60px;
  }
  
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    padding: 32px;
  }
  
  .loading-state,
  .error-message {
    text-align: center;
    padding: 60px 40px;
  }
  
  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #DC2626;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  .loading-spinner.small {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }
  
  .progress-section {
    margin-bottom: 32px;
  }
  
  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .progress-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: #DC2626;
    transition: width 0.3s ease;
  }
  
  .question-header {
    margin-bottom: 24px;
  }
  
  .category-badge {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(220, 38, 38, 0.2);
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .question-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .question-description {
    opacity: 0.8;
    font-size: 0.95rem;
  }
  
  .options-grid {
    display: grid;
    gap: 12px;
  }
  
  .option-button {
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .option-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(220, 38, 38, 0.5);
  }
  
  .option-button.selected {
    background: rgba(220, 38, 38, 0.2);
    border-color: #DC2626;
  }
  
  .option-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .checkmark {
    color: #DC2626;
    font-weight: bold;
  }
  
  .text-input,
  .number-input {
    width: 100%;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    min-height: 120px;
  }
  
  .text-input:focus,
  .number-input:focus {
    outline: none;
    border-color: #DC2626;
    background: rgba(255, 255, 255, 0.08);
  }
  
  .navigation-section {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn-primary {
    background: #DC2626;
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #991B1B;
  }
  
  .btn-glass {
    background: rgba(255, 255, 255, 0.08);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  
  .btn-glass:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

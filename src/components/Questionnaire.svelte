<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Question } from '../services/ai';
  
  const dispatch = createEventDispatcher();
  
  export let questions: Question[] = [];
  export let currentQuestionIndex = 0;
  export let responses: Record<string, any> = {};
  export let loading = false;
  
  $: currentQuestion = questions[currentQuestionIndex] || null;
  $: progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  $: isLastQuestion = currentQuestionIndex === questions.length - 1;
  $: currentResponse = currentQuestion ? responses[currentQuestion.id] : undefined;
  $: hasResponse = currentResponse !== undefined && currentResponse !== null && currentResponse !== '';
  
  function handleOptionSelect(value: string) {
    if (currentQuestion) {
      const newResponses = { ...responses };
      newResponses[currentQuestion.id] = value;
      dispatch('responseUpdate', { questionId: currentQuestion.id, value, allResponses: newResponses });
    }
  }
  
  function handleTextInput(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (currentQuestion) {
      const newResponses = { ...responses };
      newResponses[currentQuestion.id] = target.value;
      dispatch('responseUpdate', { questionId: currentQuestion.id, value: target.value, allResponses: newResponses });
    }
  }
  
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1 && hasResponse) {
      const newIndex = currentQuestionIndex + 1;
      dispatch('questionChange', { index: newIndex });
    }
  }
  
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      dispatch('questionChange', { index: newIndex });
    }
  }
  
  function submitQuestionnaire() {
    if (hasResponse) {
      dispatch('submit');
    }
  }
</script>

{#if questions.length === 0}
  <div class="loading-state glass-card">
    <div class="loading-icon">
      <div class="loading-spinner"></div>
    </div>
    <h3>Loading Questions...</h3>
    <p>Preparing your sustainability assessment...</p>
  </div>
{:else if currentQuestion}
  <div class="questionnaire-container glass-card">
    <!-- Progress -->
    <div class="progress-section">
      <div class="progress-info">
        <span class="question-counter">Q {currentQuestionIndex + 1}/{questions.length}</span>
        <span class="progress-percentage">{Math.round(progress)}%</span>
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
        <h2 class="question-title">{currentQuestion.question}</h2>
        {#if currentQuestion.description}
          <p class="question-description">{currentQuestion.description}</p>
        {/if}
      </div>

      <!-- Answers -->
      <div class="answer-section">
        {#if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'multiple-choice') && currentQuestion.options}
          <div class="options-grid">
            {#each currentQuestion.options as option}
              <button
                class="option-button {currentResponse === option ? 'selected' : ''}"
                on:click={() => handleOptionSelect(option)}
                disabled={loading}
              >
                <span>{option}</span>
                {#if currentResponse === option}
                  <span class="checkmark">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        {:else if currentQuestion.type === 'text'}
          <textarea
            class="text-input"
            placeholder="Write your response..."
            value={currentResponse || ''}
            on:input={handleTextInput}
            disabled={loading}
          ></textarea>
        {:else if currentQuestion.type === 'number'}
          <input
            type="number"
            class="number-input"
            placeholder="Enter a number..."
            value={currentResponse || ''}
            on:input={handleTextInput}
            disabled={loading}
          />
        {/if}
      </div>
    </div>

    <!-- Navigation -->
    <div class="navigation-section">
      <button class="btn btn-glass" on:click={previousQuestion} disabled={currentQuestionIndex === 0 || loading}>
        ← Previous
      </button>

      {#if isLastQuestion}
        <button class="btn btn-primary" on:click={submitQuestionnaire} disabled={!hasResponse || loading}>
          {#if loading}
            <span class="loading-spinner small"></span> Analyzing...
          {:else}
            Complete Assessment
          {/if}
        </button>
      {:else}
        <button class="btn btn-secondary" on:click={nextQuestion} disabled={!hasResponse || loading}>
          Next →
        </button>
      {/if}
    </div>
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --primary-red: #DC2626;
    --primary-white: #FFFFFF;
    --dark-red: #991B1B;
    --light-red: #FCA5A5;
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-border: rgba(255, 255, 255, 0.12);
    --text-primary: #FFFFFF;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --text-muted: rgba(255, 255, 255, 0.5);
  }

  * {
    font-family: 'Inter', sans-serif;
  }

  .glass-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    backdrop-filter: blur(16px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }

  .questionnaire-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    color: var(--text-primary);
  }

  /* Progress */
  .progress-section {
    margin-bottom: 2rem;
  }
  .progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: .5rem;
  }
  .progress-bar {
    height: 8px;
    background: var(--glass-border);
    border-radius: 6px;
    overflow: hidden;
  }
  .progress-fill {
    background: var(--primary-red);
    height: 100%;
    transition: width .3s ease;
  }

  /* Question */
  .question-title {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 1rem 0;
    color: var(--primary-white);
  }
  .question-description {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  .category-badge {
    background: var(--dark-red);
    color: var(--primary-white);
    padding: 0.35rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  /* Answers */
  .options-grid {
    display: grid;
    gap: 1rem;
  }
  .option-button {
    padding: 1rem 1.2rem;
    border-radius: 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .2s ease;
    cursor: pointer;
  }
  .option-button:hover {
    border-color: var(--light-red);
    background: rgba(220,38,38,0.15);
  }
  .option-button.selected {
    background: var(--dark-red);
    border-color: var(--primary-red);
  }
  .checkmark {
    font-weight: bold;
    color: var(--light-red);
  }

  .text-input,
  .number-input {
    width: 100%;
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--glass-border);
    background: rgba(255,255,255,0.05);
    color: var(--text-primary);
    font-size: 1rem;
    margin-top: 1rem;
  }
  .text-input:focus,
  .number-input:focus {
    outline: none;
    border-color: var(--primary-red);
    background: rgba(220,38,38,0.1);
  }

  /* Navigation */
  .navigation-section {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  .btn {
    border: none;
    padding: 0.9rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s ease;
  }
  .btn:disabled { opacity: .6; cursor: not-allowed; }
  .btn-primary {
    background: var(--primary-red);
    color: var(--primary-white);
  }
  .btn-primary:hover:not(:disabled) {
    background: #b91c1c;
  }
  .btn-secondary {
    background: rgba(255,255,255,0.12);
    color: var(--text-primary);
  }
  .btn-secondary:hover:not(:disabled) {
    background: rgba(255,255,255,0.2);
  }
  .btn-glass {
    background: transparent;
    border: 1px solid var(--glass-border);
    color: var(--text-secondary);
  }
  .btn-glass:hover:not(:disabled) {
    color: var(--text-primary);
    border-color: var(--primary-red);
  }

  /* Loading Spinner */
  .loading-spinner {
    border: 3px solid rgba(255,255,255,0.2);
    border-left-color: var(--primary-red);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
  .loading-spinner.small {
    width: 18px;
    height: 18px;
    border-width: 2px;
  }
  @keyframes spin { 0%{transform:rotate(0)}100%{transform:rotate(360deg)} }
</style>

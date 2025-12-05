<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  
  export let assessments: any[] = [];
  
  const dispatch = createEventDispatcher();
  
  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#DC2626';
  };
</script>

<div class="assessments-container">
  <div class="page-header">
    <div>
      <h1 class="page-title">Assessments</h1>
      <p class="page-subtitle">View and manage your sustainability assessments</p>
    </div>
    <button class="btn-primary" on:click={() => push('/questionnaire')}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      New Assessment
    </button>
  </div>
  
  {#if assessments.length === 0}
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>No assessments yet</h3>
      <p>Start your first sustainability assessment to track your environmental impact.</p>
      <button class="btn-primary" on:click={() => push('/questionnaire')}>
        Start Assessment
      </button>
    </div>
  {:else}
    <div class="assessments-grid">
      {#each assessments as assessment}
        <div class="assessment-card">
          <div class="card-header">
            <div class="industry-badge">{assessment.industry}</div>
            <div class="date-badge">{formatDate(assessment.completedAt)}</div>
          </div>
          
          <div class="card-body">
            <div class="scores-row">
              <div class="score-item">
                <span class="score-label">Carbon Score</span>
                <div class="score-circle" style="--progress: {assessment.carbonScore}; --color: {getScoreColor(assessment.carbonScore)}">
                  <span class="score-value">{assessment.carbonScore}</span>
                </div>
              </div>
              
              <div class="score-item">
                <span class="score-label">ESG Score</span>
                <div class="score-circle" style="--progress: {assessment.esgScore}; --color: {getScoreColor(assessment.esgScore)}">
                  <span class="score-value">{assessment.esgScore}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <button class="btn-text" on:click={() => push('/report')}>
              View Report →
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .assessments-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }
  
  .page-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    background: var(--primary-red);
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary:hover {
    background: var(--dark-red);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
  }
  
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .empty-state p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
  
  .assessments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  
  .assessment-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s;
  }
  
  .assessment-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .industry-badge {
    padding: 0.375rem 0.75rem;
    background: rgba(220, 38, 38, 0.15);
    color: var(--primary-red);
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .date-badge {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  .card-body {
    margin-bottom: 1.5rem;
  }
  
  .scores-row {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }
  
  .score-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .score-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .score-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: conic-gradient(
      from 0deg,
      var(--color) 0deg,
      var(--color) calc(var(--progress) * 3.6deg),
      rgba(255, 255, 255, 0.1) calc(var(--progress) * 3.6deg),
      rgba(255, 255, 255, 0.1) 360deg
    );
    position: relative;
  }
  
  .score-circle::before {
    content: '';
    position: absolute;
    width: 64px;
    height: 64px;
    background: var(--bg-secondary);
    border-radius: 50%;
  }
  
  .score-value {
    position: relative;
    z-index: 1;
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .card-footer {
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }
  
  .btn-text {
    background: none;
    border: none;
    color: var(--primary-red);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .btn-text:hover {
    color: var(--light-red);
  }
  
  @media (max-width: 768px) {
    .assessments-container {
      padding: 1rem;
    }
    
    .page-header {
      flex-direction: column;
      gap: 1rem;
    }
    
    .assessments-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

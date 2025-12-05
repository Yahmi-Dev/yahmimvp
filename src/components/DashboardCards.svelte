<script lang="ts">
  import { link } from 'svelte-spa-router';
  
  export let carbonScore = 0;
  export let esgScore = 0;
  export let totalAssessments = 0;
  export let lastAssessmentDate = null;
  export let loading = false;
  
  // Calculate score colors and status
  $: carbonStatus = carbonScore >= 80 ? 'excellent' : carbonScore >= 60 ? 'good' : carbonScore >= 40 ? 'fair' : 'poor';
  $: esgStatus = esgScore >= 80 ? 'excellent' : esgScore >= 60 ? 'good' : esgScore >= 40 ? 'fair' : 'poor';
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Emerald
    if (score >= 60) return '#F59E0B'; // Amber
    if (score >= 40) return '#F97316'; // Orange
    return '#DC2626'; // Red
  };
  
  const formatDate = (date: any) => {
    if (!date) return 'Never';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
</script>

<div class="dashboard-grid">
  <!-- Carbon Footprint Card -->
  <div class="card primary-card">
    <div class="card-header">
      <div class="header-left">
        <div class="icon-container carbon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            <path d="M12 12h.01"/>
          </svg>
        </div>
        <div class="header-content">
          <h3 class="card-title">Carbon Footprint</h3>
          <p class="card-subtitle">Environmental Impact Score</p>
        </div>
      </div>
      <div class="trend-indicator positive">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      </div>
    </div>
    
    <div class="card-body">
      {#if loading}
        <div class="loading-state">
          <div class="skeleton-circle"></div>
          <div class="skeleton-text"></div>
        </div>
      {:else}
        <div class="score-container">
          <div class="score-circle" style="--progress: {carbonScore}; --color: {getScoreColor(carbonScore)}">
            <div class="score-content">
              <span class="score-number">{carbonScore}</span>
              <span class="score-suffix">/100</span>
            </div>
          </div>
          <div class="score-details">
            <div class="status-badge {carbonStatus}">
              {carbonStatus}
            </div>
            <p class="score-description">
              {#if carbonScore >= 80}
                Excellent environmental performance
              {:else if carbonScore >= 60}
                Good progress on sustainability goals
              {:else if carbonScore >= 40}
                Room for improvement in carbon reduction
              {:else}
                Significant improvement needed
              {/if}
            </p>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="card-footer">
      <a href="/questionnaire" use:link class="action-link">
        <span>Improve Score</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </a>
    </div>
  </div>
  
  <!-- ESG Governance Card -->
  <div class="card">
    <div class="card-header">
      <div class="header-left">
        <div class="icon-container esg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
          </svg>
        </div>
        <div class="header-content">
          <h3 class="card-title">ESG Governance</h3>
          <p class="card-subtitle">Social & Governance Score</p>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      {#if loading}
        <div class="loading-state">
          <div class="skeleton-circle"></div>
          <div class="skeleton-text"></div>
        </div>
      {:else}
        <div class="score-container">
          <div class="score-circle" style="--progress: {esgScore}; --color: {getScoreColor(esgScore)}">
            <div class="score-content">
              <span class="score-number">{esgScore}</span>
              <span class="score-suffix">/100</span>
            </div>
          </div>
          <div class="score-details">
            <div class="status-badge {esgStatus}">
              {esgStatus}
            </div>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="card-footer">
      <a href="/report" use:link class="action-link">
        <span>View Report</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </a>
    </div>
  </div>
  
  <!-- Assessments Progress Card -->
  <div class="card">
    <div class="card-header">
      <div class="header-left">
        <div class="icon-container assessments">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <div class="header-content">
          <h3 class="card-title">Assessment Progress</h3>
          <p class="card-subtitle">Completed Evaluations</p>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      {#if loading}
        <div class="loading-state">
          <div class="skeleton-large"></div>
          <div class="skeleton-text"></div>
        </div>
      {:else}
        <div class="metrics-container">
          <div class="primary-metric">
            <span class="metric-number">{totalAssessments}</span>
            <span class="metric-label">Assessments Completed</span>
          </div>
          
          <div class="secondary-metrics">
            <div class="metric-item">
              <span class="metric-label">Last Assessment</span>
              <span class="metric-value">{formatDate(lastAssessmentDate)}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">This Month</span>
              <span class="metric-value">3 completed</span>
            </div>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="card-footer">
      <a href="/questionnaire" use:link class="action-link">
        <span>Start New Assessment</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </a>
    </div>
  </div>
  
  <!-- Quick Actions Card -->
  <div class="card actions-card">
    <div class="card-header">
      <div class="header-left">
        <div class="icon-container actions">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div class="header-content">
          <h3 class="card-title">Quick Actions</h3>
          <p class="card-subtitle">Common Tasks</p>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <div class="actions-grid">
        <a href="/questionnaire" use:link class="action-button">
          <div class="action-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </div>
          <span class="action-text">New Assessment</span>
        </a>
        
        <a href="/report" use:link class="action-button">
          <div class="action-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <span class="action-text">View Reports</span>
        </a>
        
        <button class="action-button" on:click={() => {
          alert('Export functionality coming soon!');
        }}>
          <div class="action-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <span class="action-text">Export Data</span>
        </button>
        
        <button class="action-button" on:click={() => {
          alert('Settings page coming soon!');
        }}>
          <div class="action-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <span class="action-text">Settings</span>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 24px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin-bottom: 32px;
  }
  
  .card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
  
  .card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .primary-card {
    background: linear-gradient(135deg, var(--glass-bg) 0%, rgba(220, 38, 38, 0.05) 100%);
    border-color: rgba(220, 38, 38, 0.2);
  }
  
  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .icon-container {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
  }
  
  .icon-container::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
  }
  
  .carbon {
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
  }
  
  .esg {
    background: linear-gradient(135deg, #F59E0B, #D97706);
    color: white;
  }
  
  .assessments {
    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
    color: white;
  }
  
  .actions {
    background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
    color: white;
  }
  
  .header-content {
    flex: 1;
  }
  
  .card-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 4px 0;
    letter-spacing: -0.025em;
  }
  
  .card-subtitle {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 400;
  }
  
  .trend-indicator {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(16, 185, 129, 0.1);
    color: #10B981;
  }
  
  .card-body {
    margin-bottom: 20px;
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px 0;
  }
  
  .skeleton-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .skeleton-large {
    width: 60px;
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .skeleton-text {
    width: 120px;
    height: 16px;
    border-radius: 4px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .score-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: conic-gradient(
      from 0deg,
      var(--color) 0deg,
      var(--color) calc(var(--progress) * 3.6deg),
      rgba(255, 255, 255, 0.08) calc(var(--progress) * 3.6deg),
      rgba(255, 255, 255, 0.08) 360deg
    );
  }
  
  .score-circle::before {
    content: '';
    position: absolute;
    width: 76px;
    height: 76px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border-radius: 50%;
  }
  
  .score-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
  
  .score-number {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    letter-spacing: -0.025em;
  }
  
  .score-suffix {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
    margin-top: 2px;
  }
  
  .score-details {
    text-align: center;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 0.025em;
    margin-bottom: 8px;
  }
  
  .status-badge.excellent {
    background: rgba(16, 185, 129, 0.15);
    color: #10B981;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  
  .status-badge.good {
    background: rgba(245, 158, 11, 0.15);
    color: #F59E0B;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  
  .status-badge.fair {
    background: rgba(249, 115, 22, 0.15);
    color: #F97316;
    border: 1px solid rgba(249, 115, 22, 0.2);
  }
  
  .status-badge.poor {
    background: rgba(220, 38, 38, 0.15);
    color: var(--primary-red);
    border: 1px solid rgba(220, 38, 38, 0.2);
  }
  
  .score-description {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.4;
  }
  
  .metrics-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .primary-metric {
    text-align: center;
  }
  
  .metric-number {
    display: block;
    font-size: 36px;
    font-weight: 700;
    color: var(--primary-red);
    line-height: 1;
    letter-spacing: -0.025em;
  }
  
  .metric-label {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 500;
    margin-top: 4px;
  }
  
  .secondary-metrics {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .metric-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
  
  .metric-item .metric-label {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0;
  }
  
  .metric-value {
    font-size: 13px;
    color: var(--text-primary);
    font-weight: 500;
  }
  
  .actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  
  .action-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    text-decoration: none;
    color: var(--text-primary);
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  
  .action-button:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
  
  .action-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(220, 38, 38, 0.1);
    border-radius: 8px;
    color: var(--primary-red);
  }
  
  .action-text {
    text-align: center;
    line-height: 1.3;
  }
  
  .card-footer {
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  
  .action-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--primary-red);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 0;
    transition: all 0.2s ease;
  }
  
  .action-link:hover {
    color: var(--light-red);
    transform: translateX(2px);
  }
  
  .actions-card .card-body {
    margin-bottom: 0;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .card {
      padding: 20px;
    }
    
    .score-circle {
      width: 80px;
      height: 80px;
    }
    
    .score-circle::before {
      width: 64px;
      height: 64px;
    }
    
    .score-number {
      font-size: 20px;
    }
    
    .metric-number {
      font-size: 28px;
    }
    
    .actions-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (min-width: 1200px) {
    .dashboard-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .primary-card {
      grid-column: span 1;
    }
  }
</style>
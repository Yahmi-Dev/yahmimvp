<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  
  export let userProfile: any = null;
  export let assessments: any[] = [];
  export let latestReport: any = null;
  export let latestAnalytics: any = null;
  
  const dispatch = createEventDispatcher();
  
  $: carbonScore = latestReport?.carbonFootprint || 0;
  $: esgScore = latestReport?.esgScore || 0;
  $: totalAssessments = assessments.length;
  $: lastAssessmentDate = assessments.length > 0 ? assessments[0]?.completedAt : null;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#F97316';
    return '#DC2626';
  };
  
  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };
  
  const formatDate = (date: any) => {
    if (!date) return 'Never';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const refreshData = () => {
    dispatch('refresh');
  };
</script>

<div class="overview-container">
  <!-- Header -->
  <div class="page-header">
    <div class="header-content">
      <div>
        <h1 class="page-title">
          Welcome back{userProfile?.displayName ? `, ${userProfile.displayName}` : ''}!
        </h1>
        <p class="page-subtitle">
          Here's your sustainability overview
          {#if userProfile?.companyName}
            for {userProfile.companyName}
          {/if}
        </p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" on:click={refreshData}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
            <path d="M16 21h5v-5"/>
          </svg>
          Refresh
        </button>
        <button class="btn-primary" on:click={() => push('/questionnaire')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Assessment
        </button>
      </div>
    </div>
  </div>
  
  <!-- Stats Grid -->
  <div class="stats-grid">
    <!-- Carbon Footprint Card -->
    <div class="stat-card primary">
      <div class="stat-header">
        <div class="stat-icon carbon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </div>
        <div class="stat-trend positive">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <span>12%</span>
        </div>
      </div>
      <div class="stat-body">
        <h3 class="stat-label">Carbon Footprint</h3>
        <div class="stat-value-container">
          <div class="stat-value">{carbonScore}<span class="stat-unit">/100</span></div>
          <div class="stat-status" style="color: {getScoreColor(carbonScore)}">
            {getScoreStatus(carbonScore)}
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {carbonScore}%; background: {getScoreColor(carbonScore)}"></div>
        </div>
      </div>
      <div class="stat-footer">
        <span class="stat-meta">Environmental Impact Score</span>
      </div>
    </div>
    
    <!-- ESG Score Card -->
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon esg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
          </svg>
        </div>
        <div class="stat-trend positive">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <span>8%</span>
        </div>
      </div>
      <div class="stat-body">
        <h3 class="stat-label">ESG Governance</h3>
        <div class="stat-value-container">
          <div class="stat-value">{esgScore}<span class="stat-unit">/100</span></div>
          <div class="stat-status" style="color: {getScoreColor(esgScore)}">
            {getScoreStatus(esgScore)}
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {esgScore}%; background: {getScoreColor(esgScore)}"></div>
        </div>
      </div>
      <div class="stat-footer">
        <span class="stat-meta">Social & Governance Score</span>
      </div>
    </div>
    
    <!-- Total Assessments Card -->
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon assessments">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
        </div>
      </div>
      <div class="stat-body">
        <h3 class="stat-label">Total Assessments</h3>
        <div class="stat-value-container">
          <div class="stat-value large">{totalAssessments}</div>
        </div>
        <div class="stat-meta-row">
          <span class="meta-label">Last completed:</span>
          <span class="meta-value">{formatDate(lastAssessmentDate)}</span>
        </div>
      </div>
      <div class="stat-footer">
        <button class="stat-action" on:click={() => push('/questionnaire')}>
          Start New Assessment →
        </button>
      </div>
    </div>
    
    <!-- Quick Actions Card -->
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon actions">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
      </div>
      <div class="stat-body">
        <h3 class="stat-label">Quick Actions</h3>
        <div class="quick-actions">
          <button class="quick-action-btn" on:click={() => push('/report')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span>View Reports</span>
          </button>
          <button class="quick-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Recent Activity -->
  <div class="activity-section">
    <div class="section-header">
      <div>
        <h2 class="section-title">Recent Activity</h2>
        <p class="section-subtitle">Track your latest sustainability assessments</p>
      </div>
      <button class="btn-text" on:click={() => push('/report')}>
        View All Reports →
      </button>
    </div>
    
    <div class="activity-content">
      {#if assessments.length === 0}
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <h3>No assessments yet</h3>
          <p>Complete your first sustainability assessment to see your progress here.</p>
          <button class="btn-primary" on:click={() => push('/questionnaire')}>
            Start Assessment
          </button>
        </div>
      {:else}
        <div class="activity-list">
          {#each assessments.slice(0, 5) as assessment}
            <div class="activity-item">
              <div class="activity-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <div class="activity-details">
                <div class="activity-title">Sustainability Assessment Completed</div>
                <div class="activity-meta">
                  <span>{assessment.industry}</span>
                  <span class="separator">•</span>
                  <span>{formatDate(assessment.completedAt)}</span>
                </div>
              </div>
              <div class="activity-scores">
                <div class="score-badge carbon">
                  <span class="badge-label">Carbon</span>
                  <span class="badge-value">{assessment.carbonScore}</span>
                </div>
                <div class="score-badge esg">
                  <span class="badge-label">ESG</span>
                  <span class="badge-value">{assessment.esgScore}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .overview-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }
  
  .page-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, white 0%, #FCA5A5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .page-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    gap: 0.75rem;
  }
  
  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: var(--primary-red);
    color: white;
  }
  
  .btn-primary:hover {
    background: var(--dark-red);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
  }
  
  .btn-secondary {
    background: var(--glass-bg);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
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
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s;
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  .stat-card.primary {
    background: linear-gradient(135deg, var(--glass-bg) 0%, rgba(220, 38, 38, 0.05) 100%);
    border-color: rgba(220, 38, 38, 0.2);
  }
  
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .stat-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .stat-icon.carbon {
    background: linear-gradient(135deg, #10B981, #059669);
  }
  
  .stat-icon.esg {
    background: linear-gradient(135deg, #F59E0B, #D97706);
  }
  
  .stat-icon.assessments {
    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
  }
  
  .stat-icon.actions {
    background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
  }
  
  .stat-trend {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .stat-trend.positive {
    background: rgba(16, 185, 129, 0.1);
    color: #10B981;
  }
  
  .stat-body {
    margin-bottom: 1rem;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 0.75rem 0;
    font-weight: 500;
  }
  
  .stat-value-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  
  .stat-value.large {
    font-size: 2.5rem;
  }
  
  .stat-unit {
    font-size: 1rem;
    color: var(--text-muted);
    margin-left: 0.25rem;
  }
  
  .stat-status {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
  }
  
  .progress-bar {
    height: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.25rem;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    border-radius: 0.25rem;
    transition: width 0.5s ease;
  }
  
  .stat-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }
  
  .meta-label {
    color: var(--text-muted);
  }
  
  .meta-value {
    color: var(--text-primary);
    font-weight: 500;
  }
  
  .stat-footer {
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }
  
  .stat-meta {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  .stat-action {
    background: none;
    border: none;
    color: var(--primary-red);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .stat-action:hover {
    color: var(--light-red);
  }
  
  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  
  .quick-action-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .quick-action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-red);
    transform: translateX(4px);
  }
  
  /* Activity Section */
  .activity-section {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 2rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }
  
  .section-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .empty-state h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .empty-state p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    transition: all 0.2s;
  }
  
  .activity-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }
  
  .activity-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.625rem;
    background: rgba(220, 38, 38, 0.1);
    color: var(--primary-red);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .activity-details {
    flex: 1;
  }
  
  .activity-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .activity-meta {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .separator {
    margin: 0 0.5rem;
  }
  
  .activity-scores {
    display: flex;
    gap: 0.75rem;
  }
  
  .score-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .score-badge.carbon {
    background: rgba(220, 38, 38, 0.15);
    color: var(--primary-red);
  }
  
  .score-badge.esg {
    background: rgba(251, 191, 36, 0.15);
    color: #FBD024;
  }
  
  .badge-label {
    opacity: 0.8;
    margin-bottom: 0.125rem;
  }
  
  .badge-value {
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    .overview-container {
      padding: 1rem;
    }
    
    .header-content {
      flex-direction: column;
    }
    
    .header-actions {
      width: 100%;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .activity-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .activity-scores {
      width: 100%;
      justify-content: space-between;
    }
  }
</style>

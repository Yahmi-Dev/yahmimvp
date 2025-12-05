<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let latestAnalytics: any = null;
  
  const dispatch = createEventDispatcher();
  
  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null) return 'N/A';
    return num.toLocaleString();
  };
  
  const formatPercent = (num: number | undefined) => {
    if (num === undefined || num === null) return 'N/A';
    return `${Math.round(num * 100)}%`;
  };
</script>

<div class="analytics-container">
  <div class="page-header">
    <div>
      <h1 class="page-title">Analytics</h1>
      <p class="page-subtitle">Deep dive into your sustainability metrics</p>
    </div>
    <span class="badge-new">New</span>
  </div>
  
  {#if !latestAnalytics}
    <div class="empty-state">
      <div class="empty-icon">📈</div>
      <h3>No analytics available</h3>
      <p>Complete an assessment to unlock advanced analytics and insights.</p>
    </div>
  {:else}
    <div class="analytics-grid">
      <!-- Emissions Card -->
      <div class="analytics-card">
        <div class="card-header">
          <h3>Emissions Breakdown</h3>
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Scope 1</span>
            <span class="metric-value">{formatNumber(latestAnalytics.scope1Emissions)} tCO2e</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Scope 2</span>
            <span class="metric-value">{formatNumber(latestAnalytics.scope2Emissions)} tCO2e</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Scope 3</span>
            <span class="metric-value">{formatNumber(latestAnalytics.scope3Emissions)} tCO2e</span>
          </div>
        </div>
      </div>
      
      <!-- Intensity Card -->
      <div class="analytics-card">
        <div class="card-header">
          <h3>Intensity Metrics</h3>
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Per Unit</span>
            <span class="metric-value">{formatNumber(latestAnalytics.intensityPerUnit)} kWh</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Per Revenue</span>
            <span class="metric-value">{formatNumber(latestAnalytics.intensityPerRevenue)} kWh/$k</span>
          </div>
        </div>
      </div>
      
      <!-- Energy Card -->
      <div class="analytics-card">
        <div class="card-header">
          <h3>Energy Mix</h3>
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Renewables Share</span>
            <span class="metric-value">{formatPercent(latestAnalytics.renewablesShare)}</span>
          </div>
        </div>
      </div>
      
      <!-- Circularity Card -->
      <div class="analytics-card">
        <div class="card-header">
          <h3>Circularity</h3>
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 21h5v-5"/>
            </svg>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Score</span>
            <span class="metric-value">{formatNumber(latestAnalytics.circularityScore)}/100</span>
          </div>
        </div>
      </div>
      
      <!-- People Card -->
      <div class="analytics-card">
        <div class="card-header">
          <h3>People & Culture</h3>
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Engagement Index</span>
            <span class="metric-value">{formatNumber(latestAnalytics.engagementIndex)}/100</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Deep Report Section -->
    {#if latestAnalytics.deepReport}
      <div class="deep-report-section">
        <h2 class="section-title">Detailed Insights</h2>
        <div class="report-content">
          <p class="report-text">Advanced analytics and detailed insights are available. Explore comprehensive data visualizations and recommendations in the full report.</p>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .analytics-container {
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
  
  .badge-new {
    padding: 0.375rem 0.75rem;
    background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
    color: white;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
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
  }
  
  .analytics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .analytics-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s;
  }
  
  .analytics-card:hover {
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
  
  .card-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }
  
  .card-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    background: rgba(220, 38, 38, 0.1);
    color: var(--primary-red);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .metrics-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .metric-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.5rem;
  }
  
  .metric-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .metric-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .deep-report-section {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }
  
  .report-content {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.75rem;
  }
  
  .report-text {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .analytics-container {
      padding: 1rem;
    }
    
    .analytics-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { api } from '../lib/api';
  import Navbar from '../components/Navbar.svelte';
  
  let currentUser = null;
  let reports = [];
  let currentReport = null;
  let userProfile = null;
  let loading = true;
  let error = '';
  
  onMount(async () => {
    try {
      const result = await api.getMe();
      currentUser = result.user;
      if (!currentUser) {
        push('/auth');
        return;
      }
      await loadReports();
    } catch (err) {
      push('/auth');
    }
  });
  
  const loadReports = async () => {
    loading = true;
    error = '';
    
    try {
      userProfile = await api.getProfile();
      reports = await api.getReports();
      currentReport = reports.length > 0 ? reports[0] : null;
    } catch (err: any) {
      console.error('Error loading reports:', err);
      error = 'Failed to load reports. Please try again.';
    } finally {
      loading = false;
    }
  };
  
  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
</script>

<svelte:head>
  <title>Reports - Yahmi</title>
</svelte:head>

<div class="report-page">
  <Navbar {currentUser} />
  
  <main class="report-main">
    <div class="container">
      <div class="page-header">
        <h1>Sustainability Reports</h1>
        <p>View your comprehensive sustainability assessments</p>
      </div>
      
      {#if error}
        <div class="error-message glass-card">
          <span class="error-icon">⚠️</span>
          <div>
            <h3>Unable to load reports</h3>
            <p>{error}</p>
            <button class="btn btn-primary" on:click={loadReports}>Try Again</button>
          </div>
        </div>
      {:else if loading}
        <div class="loading-state glass-card">
          <div class="loading-spinner"></div>
          <p>Loading reports...</p>
        </div>
      {:else if reports.length === 0}
        <div class="no-reports glass-card">
          <div class="empty-icon">📊</div>
          <h3>No Reports Available</h3>
          <p>Complete your first sustainability assessment to generate your report.</p>
          <div class="actions">
            <a href="/questionnaire" class="btn btn-primary">Start Assessment</a>
            <a href="/dashboard" class="btn btn-glass">View Dashboard</a>
          </div>
        </div>
      {:else}
        <div class="reports-grid">
          {#each reports as report}
            <div class="report-card glass-card">
              <div class="report-header">
                <h3>ESG Report</h3>
                <span class="report-date">{formatDate(report.generatedAt)}</span>
              </div>
              <div class="report-scores">
                <div class="score-item">
                  <span class="score-label">ESG Score</span>
                  <span class="score-value">{report.esgScore}/100</span>
                </div>
                <div class="score-item">
                  <span class="score-label">Carbon Footprint</span>
                  <span class="score-value">{report.carbonFootprint}/100</span>
                </div>
              </div>
              {#if report.recommendations && report.recommendations.length > 0}
                <div class="recommendations">
                  <h4>Top Recommendations:</h4>
                  <ul>
                    {#each report.recommendations.slice(0, 3) as rec}
                      <li>{rec}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  .report-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%);
    color: white;
  }
  
  .report-main {
    padding: 120px 0 60px;
  }
  
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .page-header {
    margin-bottom: 48px;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(135deg, white 0%, #FCA5A5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .page-header p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    padding: 32px;
  }
  
  .loading-state,
  .no-reports {
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
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 24px;
  }
  
  .no-reports h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
  
  .no-reports p {
    opacity: 0.8;
    margin-bottom: 32px;
  }
  
  .actions {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn-primary {
    background: #DC2626;
    color: white;
  }
  
  .btn-primary:hover {
    background: #991B1B;
  }
  
  .btn-glass {
    background: rgba(255, 255, 255, 0.08);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  
  .reports-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
  }
  
  .report-card {
    transition: transform 0.2s ease;
  }
  
  .report-card:hover {
    transform: translateY(-4px);
  }
  
  .report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .report-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .report-date {
    font-size: 0.875rem;
    opacity: 0.7;
  }
  
  .report-scores {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .score-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 12px;
  }
  
  .score-label {
    font-size: 0.875rem;
    opacity: 0.7;
  }
  
  .score-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #DC2626;
  }
  
  .recommendations h4 {
    font-size: 1rem;
    margin-bottom: 12px;
    opacity: 0.9;
  }
  
  .recommendations ul {
    list-style: none;
    padding: 0;
  }
  
  .recommendations li {
    padding: 8px 0;
    padding-left: 24px;
    position: relative;
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .recommendations li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: #DC2626;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

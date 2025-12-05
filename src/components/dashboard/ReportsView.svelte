<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ReportView from '../ReportView.svelte';
  
  export let latestReport: any = null;
  
  const dispatch = createEventDispatcher();
</script>

<div class="reports-container">
  <div class="page-header">
    <div>
      <h1 class="page-title">Reports</h1>
      <p class="page-subtitle">View your sustainability reports and insights</p>
    </div>
  </div>
  
  {#if !latestReport}
    <div class="empty-state">
      <div class="empty-icon">📊</div>
      <h3>No reports available</h3>
      <p>Complete an assessment to generate your first sustainability report.</p>
    </div>
  {:else}
    <ReportView report={latestReport} />
  {/if}
</div>

<style>
  .reports-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .page-header {
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
  
  @media (max-width: 768px) {
    .reports-container {
      padding: 1rem;
    }
  }
</style>

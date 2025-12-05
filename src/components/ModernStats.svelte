<script lang="ts">
  const stats = [
    { value: '500+', label: 'Companies Trust Us', description: 'From startups to Fortune 500' },
    { value: '2.5M', label: 'Tons CO₂ Measured', description: 'And counting every day' },
    { value: '95%', label: 'See Real Improvement', description: 'In their ESG performance' },
    { value: '50%', label: 'Less Time Reporting', description: 'More time making impact' },
  ];
</script>

<section class="modern-stats section">
  <div class="container">
    <div class="stats-header">
      <h2 class="section-title">Making a Real Difference Together</h2>
      <p class="section-subtitle">See what businesses like yours are achieving with Yahmi</p>
    </div>
    
    <div class="stats-grid">
      {#each stats as stat, i}
        <div class="stat-card glass-card" style="animation-delay: {i * 100}ms">
          <div class="stat-value text-gradient-red">{stat.value}</div>
          <div class="stat-label">{stat.label}</div>
          <div class="stat-description">{stat.description}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .modern-stats {
    background: var(--bg-secondary);
  }
  
  .stats-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    color: #000000;
  }
  
  .section-subtitle {
    font-size: 1.125rem;
    color: #1F2937;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .stat-card {
    padding: 2.5rem 2rem;
    text-align: center;
    animation: slideUp 0.6s ease-out both;
  }
  
  .stat-value {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #000000;
  }
  
  .stat-description {
    font-size: 0.875rem;
    color: #4B5563;
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .stat-card {
      padding: 1.5rem 1rem;
    }
  }
</style>

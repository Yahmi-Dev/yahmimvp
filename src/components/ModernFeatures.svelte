<script lang="ts">
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Assessment',
      description: 'Advanced ML algorithms analyze your practices and generate personalized sustainability questionnaires.',
      benefits: ['Industry-specific', 'Smart recommendations', 'Continuous learning']
    },
    {
      icon: '📊',
      title: 'ESG Reporting',
      description: 'Comprehensive reports meeting international standards and regulatory requirements.',
      benefits: ['Automated generation', 'Compliance tracking', 'Stakeholder ready']
    },
    {
      icon: '🌱',
      title: 'Carbon Tracking',
      description: 'Real-time monitoring of emissions with actionable insights for reduction.',
      benefits: ['Real-time data', 'Scope 1,2,3', 'Reduction strategies']
    },
    {
      icon: '💡',
      title: 'Smart Recommendations',
      description: 'AI-driven suggestions tailored to your industry and performance.',
      benefits: ['Personalized advice', 'Cost-benefit analysis', 'Implementation roadmap']
    },
    {
      icon: '🏢',
      title: 'Enterprise Dashboard',
      description: 'Monitor metrics, track progress, and manage sustainability initiatives.',
      benefits: ['Real-time analytics', 'Team collaboration', 'Progress tracking']
    },
    {
      icon: '🔗',
      title: 'Supply Chain Integration',
      description: 'Track and optimize your entire supply chain carbon footprint.',
      benefits: ['Supplier engagement', 'Data collection', 'Impact analysis']
    }
  ];
</script>

<section id="features" class="modern-features section">
  <div class="container">
    <div class="features-header">
      <div class="badge glass">Features</div>
      <h2 class="section-title">
        Everything You Need for
        <span class="text-gradient-red">Sustainable Growth</span>
      </h2>
      <p class="section-subtitle">
        Comprehensive tools to transform your business into a sustainable enterprise
      </p>
    </div>
    
    <div class="features-grid">
      {#each features as feature, i}
        <div class="feature-card glass-card" style="animation-delay: {i * 100}ms">
          <div class="feature-icon">{feature.icon}</div>
          <h3 class="feature-title">{feature.title}</h3>
          <p class="feature-description">{feature.description}</p>
          <ul class="feature-benefits">
            {#each feature.benefits as benefit}
              <li>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {benefit}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .modern-features {
    position: relative;
  }
  
  .features-header {
    text-align: center;
    margin-bottom: 5rem;
  }
  
  .badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  
  .section-subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    padding: 2.5rem;
    animation: slideUp 0.6s ease-out both;
  }
  
  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  .feature-title {
    font-size: 1.375rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .feature-description {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  
  .feature-benefits {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .feature-benefits li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .feature-benefits svg {
    color: var(--primary-red);
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .feature-card {
      padding: 2rem;
    }
  }
</style>

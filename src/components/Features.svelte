<script lang="ts">
  import { link } from 'svelte-spa-router';
  
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Assessment',
      description: 'Advanced machine learning algorithms analyze your business practices and generate personalized sustainability questionnaires.',
      benefits: ['Industry-specific questions', 'Smart recommendations', 'Continuous learning']
    },
    {
      icon: '📊',
      title: 'ESG Reporting',
      description: 'Comprehensive Environmental, Social, and Governance reports that meet international standards and regulatory requirements.',
      benefits: ['Automated report generation', 'Compliance tracking', 'Stakeholder ready']
    },
    {
      icon: '🌱',
      title: 'Carbon Footprint Tracking',
      description: 'Real-time monitoring and measurement of your carbon emissions with actionable insights for reduction.',
      benefits: ['Real-time monitoring', 'Emission tracking', 'Reduction strategies']
    },
    {
      icon: '💡',
      title: 'Smart Recommendations',
      description: 'AI-driven suggestions for sustainable practices tailored to your industry, size, and current performance.',
      benefits: ['Personalized advice', 'Cost-benefit analysis', 'Implementation roadmap']
    },
    {
      icon: '🏢',
      title: 'Enterprise Dashboard',
      description: 'Comprehensive dashboard for businesses to monitor sustainability metrics, track progress, and manage initiatives.',
      benefits: ['Real-time analytics', 'Team collaboration', 'Progress tracking']
    },
    {
      icon: '🛒',
      title: 'Sustainable Marketplace',
      description: 'Curated marketplace of verified sustainable products and services to help implement recommended changes.',
      benefits: ['Verified suppliers', 'Competitive pricing', 'Easy procurement']
    }
  ];
</script>

<section class="features" id="features">
  <div class="container">
    <div class="features-header">
      <div class="badge">Features</div>
      <h2 class="section-title">
        Everything you need to drive 
        <span class="gradient-text">sustainable growth</span>
      </h2>
      <p class="section-description">
        From AI-powered assessments to actionable insights, Yahmi provides comprehensive 
        tools to transform your business into a sustainable enterprise.
      </p>
    </div>
    
    <div class="features-grid">
      {#each features as feature, index}
        <div class="feature-card" style="animation-delay: {index * 100}ms">
          <div class="feature-header">
            <div class="feature-icon">
              <span class="icon-emoji">{feature.icon}</span>
            </div>
            <h3 class="feature-title">{feature.title}</h3>
          </div>
          <p class="feature-description">{feature.description}</p>
          <div class="feature-benefits">
            {#each feature.benefits as benefit}
              <div class="benefit-item">
                <svg class="check-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{benefit}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <div class="features-cta">
      <div class="cta-content">
        <h3 class="cta-title">Ready to transform your business?</h3>
        <p class="cta-description">
          Join 500+ companies already using Yahmi to reduce their environmental impact 
          and improve their ESG performance.
        </p>
        <div class="cta-actions">
          <a href="/auth" use:link class="btn btn-primary">
            Start free trial
            <svg class="arrow-icon" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <button class="btn btn-secondary" on:click={() => {
            document.querySelector('.demo-section')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            View demo
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  .features {
    padding: 120px 0;
    position: relative;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%);
    color: #ffffff;
    overflow: hidden;
  }

  .features::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(220, 20, 60, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }
  
  .features-header {
    text-align: center;
    margin-bottom: 96px;
  }

  .badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 24px;
    letter-spacing: 0.025em;
  }
  
  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 24px;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .gradient-text {
    background: linear-gradient(135deg, #dc143c 0%, #ff6b8a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .section-description {
    font-size: 18px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    max-width: 640px;
    margin: 0 auto;
    font-weight: 400;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 32px;
    margin-bottom: 96px;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 32px;
    position: relative;
    opacity: 0;
    transform: translateY(24px);
    animation: fadeInUp 0.6s ease forwards;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(220, 20, 60, 0.3) 50%, transparent 100%);
    border-radius: 16px 16px 0 0;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    border-color: rgba(220, 20, 60, 0.2);
    background: rgba(255, 255, 255, 0.06);
  }
  
  .feature-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, rgba(220, 20, 60, 0.2) 0%, rgba(220, 20, 60, 0.1) 100%);
    border: 1px solid rgba(220, 20, 60, 0.3);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .icon-emoji {
    font-size: 20px;
  }
  
  .feature-title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.01em;
  }
  
  .feature-description {
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 24px;
    font-weight: 400;
  }
  
  .feature-benefits {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
  }

  .check-icon {
    width: 16px;
    height: 16px;
    color: #dc143c;
    flex-shrink: 0;
  }
  
  .features-cta {
    text-align: center;
  }
  
  .cta-content {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 64px 48px;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }

  .cta-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(220, 20, 60, 0.4) 50%, transparent 100%);
    border-radius: 24px 24px 0 0;
  }
  
  .cta-title {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  
  .cta-description {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
    font-weight: 400;
  }
  
  .cta-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
    letter-spacing: -0.01em;
  }

  .btn-primary {
    background: linear-gradient(135deg, #dc143c 0%, #b91c5c 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(220, 20, 60, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(220, 20, 60, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .arrow-icon {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  .btn:hover .arrow-icon {
    transform: translateX(2px);
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .features {
      padding: 80px 0;
    }

    .container {
      padding: 0 16px;
    }
    
    .features-header {
      margin-bottom: 64px;
    }

    .section-title {
      font-size: 2.5rem;
    }

    .section-description {
      font-size: 16px;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 64px;
    }
    
    .feature-card {
      padding: 24px;
    }

    .feature-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .feature-icon {
      width: 40px;
      height: 40px;
    }

    .icon-emoji {
      font-size: 18px;
    }

    .feature-title {
      font-size: 18px;
    }
    
    .cta-content {
      padding: 48px 32px;
      border-radius: 16px;
    }

    .cta-title {
      font-size: 24px;
    }

    .cta-description {
      font-size: 15px;
    }
    
    .cta-actions {
      flex-direction: column;
      gap: 12px;
    }
    
    .btn {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
    
    .feature-card {
      padding: 20px;
    }
    
    .cta-content {
      padding: 32px 24px;
    }
  }
</style>
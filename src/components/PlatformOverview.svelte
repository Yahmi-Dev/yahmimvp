<script lang="ts">
  const capabilities = [
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>`,
      title: 'Measure What Matters',
      description: 'Get a complete view of your carbon footprint across all three scopes. We help you understand where your emissions come from and what they mean for your business.',
      features: ['Scope 1, 2 & 3 tracking', 'Real-time data sync', 'Industry benchmarks']
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>`,
      title: 'Take Smart Action',
      description: 'Receive clear, practical recommendations tailored to your business. Know exactly what to do next to reduce emissions and improve your sustainability performance.',
      features: ['Personalized insights', 'Actionable strategies', 'Progress tracking']
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>`,
      title: 'Report with Confidence',
      description: 'Generate professional ESG reports that meet global standards (CSRD, GRI, TCFD). Impress stakeholders and stay compliant—without the headache.',
      features: ['Multi-framework support', 'One-click exports', 'Audit-ready reports']
    }
  ];
</script>

<section id="platform-overview" class="platform-overview">
  <div class="container">
    <div class="section-header">
      <div class="section-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
        </svg>
        <span>The Yahmi Platform</span>
      </div>
      <h2 class="section-title">
        One Simple Platform.<br />
        <span class="title-highlight">Complete Sustainability Solution.</span>
      </h2>
      <p class="section-description">
        Everything you need to understand, manage, and improve your environmental impact—all in one place, designed for real businesses.
      </p>
    </div>
    
    <div class="capabilities-grid">
      {#each capabilities as capability, i}
        <div class="capability-card" style="animation-delay: {i * 150}ms">
          <div class="capability-icon-wrapper">
            <div class="capability-icon">
              {@html capability.icon}
            </div>
          </div>
          <h3 class="capability-title">{capability.title}</h3>
          <p class="capability-description">{capability.description}</p>
          <ul class="capability-features">
            {#each capability.features as feature}
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    
    <!-- Integration Section -->
    <div class="integration-section">
      <div class="integration-content">
        <div class="integration-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
          </svg>
          <span>Seamless Integration</span>
        </div>
        <h3 class="integration-title">Works with Your Existing Tools</h3>
        <p class="integration-description">
          Connect Yahmi with your business systems through our flexible API. Import data automatically and export reports wherever you need them.
        </p>
        <div class="integration-logos">
          <div class="integration-logo">Excel</div>
          <div class="integration-logo">Salesforce</div>
          <div class="integration-logo">SAP</div>
          <div class="integration-logo">QuickBooks</div>
          <div class="integration-logo">+ More</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .platform-overview {
    padding: 8rem 0;
    background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
    position: relative;
  }
  
  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 5rem;
  }
  
  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(220, 38, 38, 0.05);
    border: 1px solid rgba(220, 38, 38, 0.15);
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #DC2626;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
  }
  
  .section-badge svg {
    color: #DC2626;
  }
  
  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: #000000;
    margin-bottom: 1.5rem;
  }
  
  .title-highlight {
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .section-description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #374151;
  }
  
  .capabilities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem;
    margin-bottom: 5rem;
  }
  
  .capability-card {
    padding: 2.5rem;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideUp 0.6s ease-out both;
    position: relative;
    overflow: hidden;
  }
  
  .capability-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #DC2626 0%, #991B1B 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .capability-card:hover::before {
    transform: scaleX(1);
  }
  
  .capability-card:hover {
    transform: translateY(-8px);
    border-color: rgba(220, 38, 38, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  }
  
  .capability-icon-wrapper {
    margin-bottom: 1.5rem;
  }
  
  .capability-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0.04) 100%);
    border: 1px solid rgba(220, 38, 38, 0.15);
    border-radius: 16px;
    color: #DC2626;
    transition: all 0.3s ease;
  }
  
  .capability-card:hover .capability-icon {
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: #FFFFFF;
    transform: scale(1.05);
  }
  
  .capability-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000000;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  
  .capability-description {
    font-size: 1rem;
    line-height: 1.6;
    color: #4B5563;
    margin-bottom: 1.5rem;
  }
  
  .capability-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .capability-features li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9375rem;
    color: #1F2937;
    font-weight: 500;
  }
  
  .capability-features svg {
    color: #10B981;
    flex-shrink: 0;
  }
  
  /* Integration Section */
  .integration-section {
    margin-top: 5rem;
    padding: 3rem;
    background: linear-gradient(135deg, #FEF2F2 0%, #FFFFFF 100%);
    border: 1px solid #FEE2E2;
    border-radius: 24px;
    text-align: center;
  }
  
  .integration-content {
    max-width: 700px;
    margin: 0 auto;
  }
  
  .integration-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #FFFFFF;
    border: 1px solid #FEE2E2;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #DC2626;
    margin-bottom: 1.5rem;
  }
  
  .integration-badge svg {
    color: #DC2626;
  }
  
  .integration-title {
    font-size: 2rem;
    font-weight: 700;
    color: #000000;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  
  .integration-description {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #4B5563;
    margin-bottom: 2rem;
  }
  
  .integration-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .integration-logo {
    padding: 0.75rem 1.5rem;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1F2937;
    transition: all 0.3s ease;
  }
  
  .integration-logo:hover {
    border-color: #DC2626;
    color: #DC2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .platform-overview {
      padding: 5rem 0;
    }
    
    .capabilities-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .capability-card {
      padding: 2rem 1.5rem;
    }
    
    .integration-section {
      padding: 2rem 1.5rem;
    }
    
    .integration-logos {
      gap: 1rem;
    }
  }
</style>

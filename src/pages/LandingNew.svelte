<script lang="ts">
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import ModernNavbar from '../components/ModernNavbar.svelte';
  import EnterpriseHero from '../components/EnterpriseHero.svelte';
  import PlatformOverview from '../components/PlatformOverview.svelte';
  import ModernStats from '../components/ModernStats.svelte';
  import ModernFooter from '../components/ModernFooter.svelte';
  import { api } from '../lib/api';
  
  let currentUser: any = null;
  let loading = true;
  
  onMount(async () => {
    try {
      const result = await api.getMe();
      currentUser = result.user;
    } catch (error) {
      currentUser = null;
    } finally {
      loading = false;
    }
  });
  
  // Features data - SEO optimized & human-centric
  const features = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>`,
      title: "Complete Carbon Footprint Mapping",
      description: "Understand your environmental impact across all three scopes. Our intelligent platform helps you identify emission sources, track progress, and make data-driven decisions for a sustainable future."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>`,
      title: "ESG Reporting Made Simple",
      description: "Create compliance-ready reports in minutes instead of weeks. Fully aligned with GRI, SASB, TCFD, CSRD, and CDP standards—so you can focus on impact, not paperwork."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>`,
      title: "Live Sustainability Dashboard",
      description: "See your environmental performance in real-time. Track key metrics, spot trends, and benchmark against industry leaders—all from one intuitive dashboard."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
      title: "Enterprise-Grade Security",
      description: "Your data deserves the best protection. We're ISO 27001 certified, GDPR compliant, and use bank-level encryption to keep your information safe and secure."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`,
      title: "Built for Team Collaboration",
      description: "Sustainability is a team sport. Invite colleagues, assign responsibilities, and work together across departments to achieve your environmental goals."
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>`,
      title: "Seamless System Integration",
      description: "Connect Yahmi with your existing business tools. Our flexible API and integrations ensure your sustainability data flows where you need it."
    }
  ];
  
  // How it works steps - Human-centric approach
  const steps = [
    {
      number: "01",
      title: "Start Your Assessment",
      description: "Tell us about your business through a simple questionnaire designed for your industry. No technical expertise required—just honest answers."
    },
    {
      number: "02",
      title: "Discover Your Impact",
      description: "Get a clear picture of your carbon footprint and ESG performance. We'll show you where you stand and what it means for your business."
    },
    {
      number: "03",
      title: "Track Your Journey",
      description: "Watch your progress unfold with intuitive dashboards. See improvements in real-time and celebrate milestones with your team."
    },
    {
      number: "04",
      title: "Make Real Change",
      description: "Follow personalized recommendations to reduce emissions and strengthen your sustainability position. Every action counts."
    }
  ];
</script>

<div class="landing-page">
  <ModernNavbar {currentUser} />
  <EnterpriseHero {currentUser} />
  
  <!-- Features Section -->
  <section id="features" class="features-section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Platform Features</span>
        <h2 class="section-title">Everything Your Business Needs<br/>for <span class="text-gradient">Sustainable Growth</span></h2>
        <p class="section-description">
          Powerful tools designed to help you measure, manage, and reduce your environmental impact—without the complexity
        </p>
      </div>
      
      <div class="features-grid">
        {#each features as feature}
          <div class="feature-card glass-card">
            <div class="feature-icon">
              {@html feature.icon}
            </div>
            <h3 class="feature-title">{feature.title}</h3>
            <p class="feature-description">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- How It Works Section -->
  <section id="how-it-works" class="how-it-works-section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">How It Works</span>
        <h2 class="section-title">Your Path to <span class="text-gradient">Sustainable Impact</span></h2>
        <p class="section-description">
          Four straightforward steps to understand and improve your environmental footprint
        </p>
      </div>
      
      <div class="steps-grid">
        {#each steps as step, index}
          <div class="step-card">
            <div class="step-number">{step.number}</div>
            <h3 class="step-title">{step.title}</h3>
            <p class="step-description">{step.description}</p>
            {#if index < steps.length - 1}
              <div class="step-connector">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <PlatformOverview />
  <ModernStats />
  
  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-background">
      <div class="grain-overlay"></div>
      <div class="cta-orb cta-orb-1"></div>
      <div class="cta-orb cta-orb-2"></div>
    </div>
    
    <div class="container">
      <div class="cta-content">
        <h2 class="cta-title">Ready to Lead the Way in<br/><span class="text-gradient">Sustainable Business?</span></h2>
        <p class="cta-description">
          Join 500+ forward-thinking companies using Yahmi to build a better future for their business and the planet
        </p>
        <div class="cta-actions">
          {#if currentUser}
            <a href="/dashboard" use:link class="btn btn-primary btn-lg">
              Go to Dashboard
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>
          {:else}
            <a href="/auth" use:link class="btn btn-primary btn-lg">
              Start Free Assessment
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>
            <button class="btn btn-glass btn-lg">
              Schedule Demo
            </button>
          {/if}
        </div>
        <p class="cta-note">No credit card required • Free 14-day trial • Cancel anytime</p>
      </div>
    </div>
  </section>
  
  <ModernFooter />
</div>

<style>
  .landing-page {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    background: #FFFFFF;
  }
  
  /* Section Styles */
  section {
    position: relative;
    padding: 6rem 0;
  }
  
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .section-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.2);
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #DC2626;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.2;
    color: #000000;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }
  
  .text-gradient {
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .section-description {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #4B5563;
    max-width: 700px;
    margin: 0 auto;
  }
  
  /* Features Section */
  .features-section {
    background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(220, 38, 38, 0.1);
    border-radius: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(220, 38, 38, 0.3);
    box-shadow: 0 20px 40px rgba(220, 38, 38, 0.1);
  }
  
  .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    border-radius: 1rem;
    color: white;
    margin-bottom: 1.5rem;
  }
  
  .feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 0.75rem;
  }
  
  .feature-description {
    font-size: 1rem;
    line-height: 1.6;
    color: #4B5563;
  }
  
  /* How It Works Section */
  .how-it-works-section {
    background: #FFFFFF;
  }
  
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    position: relative;
  }
  
  .step-card {
    position: relative;
    padding: 2rem;
    text-align: center;
  }
  
  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    border-radius: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
  }
  
  .step-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 0.75rem;
  }
  
  .step-description {
    font-size: 1rem;
    line-height: 1.6;
    color: #4B5563;
  }
  
  .step-connector {
    display: none;
  }
  
  /* CTA Section */
  .cta-section {
    position: relative;
    padding: 8rem 0;
    overflow: hidden;
  }
  
  .cta-background {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #FFFFFF 0%, #FEF2F2 100%);
  }
  
  .grain-overlay {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    opacity: 1;
  }
  
  .cta-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
  }
  
  .cta-orb-1 {
    width: 500px;
    height: 500px;
    top: -150px;
    right: -100px;
    background: #DC2626;
  }
  
  .cta-orb-2 {
    width: 400px;
    height: 400px;
    bottom: -100px;
    left: -100px;
    background: #FCA5A5;
  }
  
  .cta-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .cta-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.2;
    color: #000000;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }
  
  .cta-description {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #4B5563;
    margin-bottom: 3rem;
  }
  
  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  
  .cta-note {
    font-size: 0.875rem;
    color: #6B7280;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    section {
      padding: 4rem 0;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .steps-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .cta-section {
      padding: 5rem 0;
    }
    
    .cta-actions {
      flex-direction: column;
      align-items: stretch;
    }
  }
  
  @media (min-width: 769px) {
    .step-connector {
      display: flex;
      position: absolute;
      top: 2rem;
      right: -1rem;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      color: #DC2626;
    }
  }
</style>

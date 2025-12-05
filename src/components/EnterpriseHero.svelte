<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  
  export let currentUser: any = null;
  
  let mounted = false;
  let videoLoaded = false;
  
  onMount(() => {
    mounted = true;
    setTimeout(() => videoLoaded = true, 300);
  });
</script>

<section class="enterprise-hero">
  <!-- Subtle Background Elements -->
  <div class="hero-background">
    <div class="gradient-mesh"></div>
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
  </div>
  
  <div class="container">
    <div class="hero-grid" class:mounted>
      <!-- Left Content -->
      <div class="hero-content">
        <!-- Trust Badge -->
        <div class="trust-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
          <span>Trusted by 500+ enterprises worldwide</span>
        </div>
        
        <!-- Main Headline - SEO Optimized -->
        <h1 class="hero-headline">
          <span class="black-text">Your Partner in</span>
          <span class="highlight-text">Sustainable Business</span>
          <span class="black-text">Transformation</span>
        </h1>
        
        <!-- Subheadline - Human-Centric -->
        <p class="hero-description">
          Yahmi helps forward-thinking companies understand, reduce, and report their environmental impact. 
          Get clear insights, actionable strategies, and compliance-ready reports—all in one intelligent platform.
        </p>
        
        <!-- Value Props -->
        <div class="value-props">
          <div class="value-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Complete carbon footprint mapping</span>
          </div>
          <div class="value-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Automated ESG reporting (GRI, TCFD, CSRD)</span>
          </div>
          <div class="value-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Real-time analytics & benchmarking</span>
          </div>
        </div>
        
        <!-- CTA Buttons -->
        <div class="hero-actions">
          {#if currentUser}
            <a href="/dashboard" use:link class="btn-primary">
              <span>Go to Dashboard</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          {:else}
            <a href="/auth" use:link class="btn-primary">
              <span>Start Free Assessment</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <button class="btn-secondary" on:click={() => {
              document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>Watch Demo</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </button>
          {/if}
        </div>
        
        <!-- Social Proof -->
        <div class="social-proof">
          <p class="proof-text">No credit card required • Free 14-day trial • Setup in minutes</p>
        </div>
      </div>
      
      <!-- Right Visual -->
      <div class="hero-visual" class:loaded={videoLoaded}>
        <div class="visual-card">
          <div class="card-header">
            <div class="status-indicator">
              <span class="status-dot"></span>
              <span class="status-text">Live Dashboard</span>
            </div>
            <div class="card-actions">
              <span class="action-dot"></span>
              <span class="action-dot"></span>
              <span class="action-dot"></span>
            </div>
          </div>
          
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div class="metric-content">
                <div class="metric-label">Carbon Footprint</div>
                <div class="metric-value">2,450 <span>tCO₂e</span></div>
                <div class="metric-change positive">↓ 12% vs last quarter</div>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              </div>
              <div class="metric-content">
                <div class="metric-label">ESG Score</div>
                <div class="metric-value">87 <span>/100</span></div>
                <div class="metric-change positive">↑ 8 points improved</div>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-icon purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <div class="metric-content">
                <div class="metric-label">Reports Generated</div>
                <div class="metric-value">24 <span>this month</span></div>
                <div class="metric-change neutral">Ready to export</div>
              </div>
            </div>
          </div>
          
          <div class="progress-section">
            <div class="progress-header">
              <span class="progress-title">Sustainability Goals 2024</span>
              <span class="progress-percentage">68%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 68%"></div>
            </div>
            <div class="progress-milestones">
              <span class="milestone completed">Q1</span>
              <span class="milestone completed">Q2</span>
              <span class="milestone active">Q3</span>
              <span class="milestone">Q4</span>
            </div>
          </div>
        </div>
        
        <!-- Floating Stats -->
        <div class="floating-stat stat-1">
          <div class="stat-icon">🌱</div>
          <div class="stat-text">
            <div class="stat-number">2.5M+</div>
            <div class="stat-label">Tons CO₂ Tracked</div>
          </div>
        </div>
        
        <div class="floating-stat stat-2">
          <div class="stat-icon">⚡</div>
          <div class="stat-text">
            <div class="stat-number">95%</div>
            <div class="stat-label">Faster Reporting</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .enterprise-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 8rem 0 4rem;
    position: relative;
    overflow: hidden;
    background: #FFFFFF;
  }
  
  /* Background Elements */
  .hero-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  
  .gradient-mesh {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(220, 38, 38, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(220, 38, 38, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.02) 0%, transparent 70%);
  }
  
  .floating-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.08;
    animation: float 20s ease-in-out infinite;
  }
  
  .orb-1 {
    width: 400px;
    height: 400px;
    top: -100px;
    right: 10%;
    background: radial-gradient(circle, #DC2626 0%, transparent 70%);
  }
  
  .orb-2 {
    width: 350px;
    height: 350px;
    bottom: -80px;
    left: 5%;
    background: radial-gradient(circle, #FCA5A5 0%, transparent 70%);
    animation-delay: -10s;
  }
  
  /* Hero Grid Layout */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .hero-grid.mounted {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Left Content */
  .hero-content {
    max-width: 600px;
  }
  
  .trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(220, 38, 38, 0.05);
    border: 1px solid rgba(220, 38, 38, 0.15);
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1F2937;
    margin-bottom: 2rem;
  }
  
  .trust-badge svg {
    color: #DC2626;
  }
  
  .hero-headline {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }
  
  .black-text {
    display: block;
    color: #000000 !important;
  }
  
  .highlight-text {
    display: block;
    color: #DC2626;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .hero-description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #374151;
    margin-bottom: 2rem;
  }
  
  .value-props {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }
  
  .value-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9375rem;
    color: #1F2937;
    font-weight: 500;
  }
  
  .value-item svg {
    color: #DC2626;
    flex-shrink: 0;
  }
  
  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.75rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.25);
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(220, 38, 38, 0.35);
  }
  
  .btn-secondary {
    background: #FFFFFF;
    color: #1F2937;
    border: 1.5px solid #E5E7EB;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  
  .btn-secondary:hover {
    border-color: #DC2626;
    color: #DC2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.1);
  }
  
  .social-proof {
    padding-top: 1.5rem;
    border-top: 1px solid #E5E7EB;
  }
  
  .proof-text {
    font-size: 0.875rem;
    color: #6B7280;
  }
  
  /* Right Visual */
  .hero-visual {
    position: relative;
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
  }
  
  .hero-visual.loaded {
    opacity: 1;
    transform: translateX(0);
  }
  
  .visual-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #F3F4F6;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    background: #10B981;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }
  
  .status-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1F2937;
  }
  
  .card-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-dot {
    width: 10px;
    height: 10px;
    background: #E5E7EB;
    border-radius: 50%;
  }
  
  .metrics-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .metric-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #F9FAFB;
    border: 1px solid #F3F4F6;
    border-radius: 12px;
    transition: all 0.3s;
  }
  
  .metric-card:hover {
    background: #FFFFFF;
    border-color: #E5E7EB;
    transform: translateX(4px);
  }
  
  .metric-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 10px;
    flex-shrink: 0;
  }
  
  .metric-icon.green {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: #FFFFFF;
  }
  
  .metric-icon.blue {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    color: #FFFFFF;
  }
  
  .metric-icon.purple {
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    color: #FFFFFF;
  }
  
  .metric-content {
    flex: 1;
  }
  
  .metric-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }
  
  .metric-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000000;
    margin-bottom: 0.25rem;
  }
  
  .metric-value span {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6B7280;
  }
  
  .metric-change {
    font-size: 0.8125rem;
    font-weight: 500;
  }
  
  .metric-change.positive {
    color: #10B981;
  }
  
  .metric-change.neutral {
    color: #6B7280;
  }
  
  .progress-section {
    padding: 1.25rem;
    background: linear-gradient(135deg, #FEF2F2 0%, #FFFFFF 100%);
    border: 1px solid #FEE2E2;
    border-radius: 12px;
  }
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .progress-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1F2937;
  }
  
  .progress-percentage {
    font-size: 1.25rem;
    font-weight: 700;
    color: #DC2626;
  }
  
  .progress-bar {
    height: 8px;
    background: #FEE2E2;
    border-radius: 100px;
    overflow: hidden;
    margin-bottom: 0.75rem;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #DC2626 0%, #991B1B 100%);
    border-radius: 100px;
    transition: width 1s ease-out;
  }
  
  .progress-milestones {
    display: flex;
    justify-content: space-between;
  }
  
  .milestone {
    font-size: 0.75rem;
    font-weight: 600;
    color: #9CA3AF;
    padding: 0.25rem 0.75rem;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
  }
  
  .milestone.completed {
    background: #DC2626;
    color: #FFFFFF;
    border-color: #DC2626;
  }
  
  .milestone.active {
    background: #FEF2F2;
    color: #DC2626;
    border-color: #DC2626;
  }
  
  /* Floating Stats */
  .floating-stat {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    animation: floatStat 3s ease-in-out infinite;
  }
  
  .stat-1 {
    top: -20px;
    right: -40px;
    animation-delay: 0s;
  }
  
  .stat-2 {
    bottom: 40px;
    left: -60px;
    animation-delay: -1.5s;
  }
  
  .stat-icon {
    font-size: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.125rem;
    font-weight: 700;
    color: #000000;
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: #6B7280;
  }
  
  /* Animations */
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }
  
  @keyframes floatStat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.95); }
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .hero-content {
      max-width: 100%;
    }
    
    .floating-stat {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .enterprise-hero {
      padding: 6rem 0 3rem;
    }
    
    .hero-headline {
      font-size: 2.25rem;
    }
    
    .hero-actions {
      flex-direction: column;
    }
    
    .btn-primary,
    .btn-secondary {
      width: 100%;
      justify-content: center;
    }
    
    .metrics-grid {
      gap: 0.75rem;
    }
    
    .metric-card {
      padding: 0.875rem;
    }
    
    .metric-icon {
      width: 40px;
      height: 40px;
    }
  }
</style>

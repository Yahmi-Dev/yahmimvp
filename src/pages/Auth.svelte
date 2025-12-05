<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { api } from '../lib/api';
  import AuthForm from '../components/AuthForm.svelte';
  
  let currentUser: any = null;
  let showSuccessMessage = false;
  let successMessage = '';
  
  onMount(async () => {
    try {
      const result = await api.getMe();
      currentUser = result.user;
      if (currentUser) {
        push('/dashboard');
      }
    } catch (error) {
      currentUser = null;
    }
  });
  
  const handleAuthSuccess = (event: CustomEvent) => {
    successMessage = event.detail.message;
    showSuccessMessage = true;
    
    setTimeout(() => {
      showSuccessMessage = false;
    }, 3000);
  };
</script>

<svelte:head>
  <title>Sign In - Yahmi</title>
  <meta name="description" content="Sign in to your Yahmi account to access your sustainability dashboard." />
</svelte:head>

<div class="auth-page">
  <!-- Success Toast -->
  {#if showSuccessMessage}
    <div class="success-toast">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17L4 12" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>{successMessage}</span>
    </div>
  {/if}
  
  <div class="auth-container">
    <!-- Left Side - Form -->
    <div class="auth-left">
      <div class="auth-left-inner">
        <!-- Logo -->
        <a href="/" class="auth-logo">
          <div class="logo-icon">Y</div>
          <span class="logo-text">ahmi</span>
        </a>
        
        <!-- Form -->
        <div class="form-wrapper">
          <AuthForm on:success={handleAuthSuccess} />
        </div>
        
        <!-- Footer -->
        <div class="auth-footer">
          <p>© 2024 Yahmi. All rights reserved.</p>
        </div>
      </div>
    </div>
    
    <!-- Right Side - Hero -->
    <div class="auth-right">
      <div class="auth-right-inner">
        <!-- Pattern Background -->
        <div class="pattern-bg"></div>
        
        <!-- Content -->
        <div class="hero-content">
          <div class="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Enterprise Sustainability Platform</span>
          </div>
          
          <h1 class="hero-title">
            Your Partner in<br/>
            <span class="hero-highlight">Sustainable Business</span>
          </h1>
          
          <p class="hero-description">
            Join 500+ forward-thinking companies using Yahmi to measure, manage, and reduce their environmental impact with intelligent insights.
          </p>
          
          <!-- Features -->
          <div class="features-list">
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Complete carbon footprint mapping</span>
            </div>
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Automated ESG reporting (GRI, TCFD, CSRD)</span>
            </div>
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Real-time analytics & benchmarking</span>
            </div>
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Enterprise-grade security & compliance</span>
            </div>
          </div>
          
          <!-- Stats -->
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-value">500+</div>
              <div class="stat-label">Companies</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">2.5M</div>
              <div class="stat-label">Tons CO₂</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">95%</div>
              <div class="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .auth-page {
    min-height: 100vh;
    width: 100%;
    background: #FFFFFF;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
  .success-toast {
    position: fixed;
    top: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: #FFFFFF;
    border: 1px solid #10B981;
    border-radius: 12px;
    color: #10B981;
    font-weight: 600;
    font-size: 0.9375rem;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
    animation: slideIn 0.3s ease-out;
  }
  
  .auth-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }
  
  /* Left Side - Form */
  .auth-left {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    background: #FFFFFF;
  }
  
  .auth-left-inner {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    padding: 2rem 0;
  }
  
  .auth-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    margin-bottom: 3rem;
  }
  
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: #FFFFFF;
    border-radius: 12px;
    font-size: 1.5rem;
    font-weight: 900;
  }
  
  .logo-text {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .form-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  .auth-footer {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #E5E7EB;
  }
  
  .auth-footer p {
    font-size: 0.875rem;
    color: #6B7280;
  }
  
  /* Right Side - Hero */
  .auth-right {
    position: relative;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 3rem;
    overflow: hidden;
  }
  
  .pattern-bg {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
    opacity: 0.5;
  }
  
  .pattern-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  .auth-right-inner {
    position: relative;
    z-index: 1;
    max-width: 600px;
  }
  
  .hero-content {
    color: #FFFFFF;
  }
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }
  
  .hero-highlight {
    display: block;
    color: #FEF2F2;
  }
  
  .hero-description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 3rem;
  }
  
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
  }
  
  .feature-item svg {
    flex-shrink: 0;
    color: #FEF2F2;
  }
  
  .stats-row {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
  }
  
  .stat-item {
    flex: 1;
    text-align: center;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #FFFFFF;
    margin-bottom: 0.25rem;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }
  
  .stat-divider {
    width: 1px;
    height: 3rem;
    background: rgba(255, 255, 255, 0.2);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .auth-container {
      grid-template-columns: 1fr;
    }
    
    .auth-right {
      display: none;
    }
    
    .auth-left-inner {
      min-height: auto;
      padding: 3rem 0;
    }
  }
  
  @media (max-width: 640px) {
    .auth-left {
      padding: 2rem 1rem;
    }
    
    .auth-left-inner {
      padding: 2rem 0;
    }
    
    .logo-icon {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.25rem;
    }
    
    .logo-text {
      font-size: 1.5rem;
    }
    
    .success-toast {
      right: 1rem;
      left: 1rem;
    }
  }
</style>

<script lang="ts">
  import { link } from 'svelte-spa-router';
  export let currentUser: any = null;
</script>

<section class="modern-cta section">
  <div class="container">
    <div class="cta-card glass-card">
      <div class="cta-content">
        <h2 class="cta-title">Ready to Transform Your Sustainability Journey?</h2>
        <p class="cta-description">
          Join 500+ companies already using Yahmi to reduce their environmental impact 
          and improve their ESG performance.
        </p>
        <div class="cta-actions">
          {#if currentUser}
            <a href="/dashboard" use:link class="btn btn-primary btn-lg">
              Go to Dashboard →
            </a>
          {:else}
            <a href="/auth" use:link class="btn btn-primary btn-lg">
              Start Free Trial →
            </a>
            <button class="btn btn-glass btn-lg">
              Schedule Demo
            </button>
          {/if}
        </div>
        <p class="cta-note">No credit card required • Free 14-day trial</p>
      </div>
    </div>
  </div>
</section>

<style>
  .modern-cta {
    position: relative;
  }
  
  .cta-card {
    padding: 5rem 3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .cta-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
  }
  
  .cta-content {
    max-width: 700px;
    margin: 0 auto;
  }
  
  .cta-title {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }
  
  .cta-description {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
  }
  
  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  
  .cta-note {
    font-size: 0.875rem;
    color: var(--text-muted);
  }
  
  @media (max-width: 768px) {
    .cta-card {
      padding: 3rem 2rem;
    }
    
    .cta-actions {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>

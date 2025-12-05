<script lang="ts">
  import { link } from 'svelte-spa-router';
  
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features', external: true },
      { name: 'Pricing', href: '/pricing', external: false },
      { name: 'API', href: '/api', external: false },
      { name: 'Documentation', href: '/docs', external: false }
    ],
    company: [
      { name: 'About Us', href: '/about', external: false },
      { name: 'Careers', href: '/careers', external: false },
      { name: 'Blog', href: '/blog', external: false },
      { name: 'Contact', href: '/contact', external: false }
    ],
    resources: [
      { name: 'Help Center', href: '/help', external: false },
      { name: 'Community', href: '/community', external: false },
      { name: 'Sustainability Guide', href: '/guide', external: false },
      { name: 'Case Studies', href: '/cases', external: false }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', external: false },
      { name: 'Terms of Service', href: '/terms', external: false },
      { name: 'Cookie Policy', href: '/cookies', external: false },
      { name: 'GDPR', href: '/gdpr', external: false }
    ]
  };
  
  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/yahmi' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/yahmi' },
    { name: 'GitHub', icon: '🐙', href: 'https://github.com/yahmi' },
    { name: 'YouTube', icon: '📺', href: 'https://youtube.com/yahmi' }
  ];
</script>

<footer class="footer glass">
  <div class="container">
    <div class="footer-content">
      <!-- Brand Section -->
      <div class="footer-brand">
        <div class="footer-logo">
          <span class="logo-text">Yahmi</span>
          <span class="logo-subtitle">AI Sustainability Platform</span>
        </div>
        <p class="footer-description">
          Empowering businesses and individuals to build a sustainable future 
          through AI-powered insights and actionable recommendations.
        </p>
        <div class="social-links">
          {#each socialLinks as social}
            <a href={social.href} target="_blank" rel="noopener noreferrer" class="social-link glass-hover">
              <span class="social-icon">{social.icon}</span>
              <span class="social-name">{social.name}</span>
            </a>
          {/each}
        </div>
      </div>
      
      <!-- Links Sections -->
      <div class="footer-links">
        {#each Object.entries(footerLinks) as [groupName, groupLinks]}
          <div class="link-group glass-hover">
            <h4 class="link-group-title">{groupName.charAt(0).toUpperCase() + groupName.slice(1)}</h4>
            <ul class="link-list">
              {#each groupLinks as link}
                <li>
                  {#if link.external}
                    <a href={link.href} class="footer-link">{link.name}</a>
                  {:else}
                    <a href={link.href} use:link class="footer-link">{link.name}</a>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Newsletter Section -->
    <div class="newsletter-section glass-card">
      <div class="newsletter-content">
        <h3 class="newsletter-title">Stay Updated</h3>
        <p class="newsletter-description">
          Get the latest sustainability insights and product updates delivered to your inbox.
        </p>
      </div>
      <form class="newsletter-form" on:submit|preventDefault={() => {
        alert('Newsletter signup functionality to be implemented');
      }}>
        <div class="form-group">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="input newsletter-input glass-hover"
            required
          />
          <button type="submit" class="btn btn-primary newsletter-btn">
            Subscribe
          </button>
        </div>
      </form>
    </div>
    
    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">
          © {currentYear} Yahmi. All rights reserved. Building a sustainable future with AI.
        </p>
        <div class="footer-badges">
          <div class="badge glass-hover">
            <span class="badge-icon">🌱</span>
            <span>Carbon Neutral</span>
          </div>
          <div class="badge glass-hover">
            <span class="badge-icon">🔒</span>
            <span>SOC 2 Compliant</span>
          </div>
          <div class="badge glass-hover">
            <span class="badge-icon">🏆</span>
            <span>B Corp Certified</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 80px 0 20px;
    margin-top: 100px;
    position: relative;
  }

  /* Shared hover glassy effect */
  .glass-hover {
    transition: all 0.3s ease;
    border-radius: 10px;
  }
  .glass-hover:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 255, 128, 0.2);
    transform: translateY(-2px);
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 60px;
    margin-bottom: 60px;
  }
  
  .footer-logo {
    margin-bottom: 20px;
  }
  
  .logo-text {
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary-white), var(--primary-green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    line-height: 1;
  }
  
  .logo-subtitle {
    font-size: 12px;
    opacity: 0.7;
    margin-top: 5px;
    display: block;
  }
  
  .footer-description {
    font-size: 1rem;
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    text-decoration: none;
    color: var(--primary-white);
    font-size: 0.9rem;
  }
  
  .social-icon {
    font-size: 1.2rem;
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
  
  .link-group-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--primary-green);
  }
  
  .footer-link {
    color: var(--primary-white);
    text-decoration: none;
    opacity: 0.8;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: inline-block;
  }
  
  .footer-link:hover {
    opacity: 1;
    color: var(--primary-green);
    transform: translateX(4px);
  }
  
  .newsletter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    margin-bottom: 60px;
  }
  
  .newsletter-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--primary-white);
  }
  
  .newsletter-description {
    opacity: 0.8;
    font-size: 0.95rem;
  }
  
  .form-group {
    display: flex;
    gap: 10px;
  }
  
  .newsletter-input {
    flex: 1;
    padding: 12px 15px;
  }
  
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 30px;
  }
  
  .footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .footer-badges {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  @media (max-width: 1024px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .footer-links {
      grid-template-columns: repeat(2, 1fr);
    }
    .newsletter-section {
      flex-direction: column;
      text-align: center;
      gap: 30px;
    }
  }
  
  @media (max-width: 768px) {
    .footer-links {
      grid-template-columns: 1fr;
    }
    .form-group {
      flex-direction: column;
    }
    .newsletter-btn {
      width: 100%;
    }
    .footer-bottom-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>

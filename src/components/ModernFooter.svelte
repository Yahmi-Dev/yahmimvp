<script lang="ts">
  import { link } from 'svelte-spa-router';
  const currentYear = new Date().getFullYear();
</script>

<footer class="modern-footer">
  <div class="container">
    <!-- Newsletter Section -->
    <div class="newsletter-section">
      <div class="newsletter-content">
        <div class="newsletter-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <div class="newsletter-text">
          <h3 class="newsletter-title">Stay Updated on Sustainability</h3>
          <p class="newsletter-description">Get insights, tips, and updates delivered to your inbox monthly</p>
        </div>
      </div>
      <div class="newsletter-form">
        <input type="email" placeholder="Enter your email" class="newsletter-input" />
        <button class="newsletter-button">
          <span>Subscribe</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="footer-divider"></div>
    
    <div class="footer-content">
      <div class="footer-brand">
        <div class="logo-brand">
          <span class="logo-icon">Y</span>
          <span class="logo-text">ahmi</span>
        </div>
        <p class="brand-tagline">
          Empowering businesses to build a sustainable future through intelligent carbon management and ESG reporting.
        </p>
        <div class="social-links">
          <a href="#" aria-label="Twitter" class="social-link">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="social-link">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="#" aria-label="GitHub" class="social-link">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube" class="social-link">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
            </svg>
            Product
          </h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="/auth" use:link>Pricing</a></li>
            <li><a href="#">API Documentation</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div>
        
        <div class="link-group">
          <h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Company
          </h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Kit</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        
        <div class="link-group">
          <h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Resources
          </h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Webinars</a></li>
            <li><a href="#">Case Studies</a></li>
          </ul>
        </div>
        
        <div class="link-group">
          <h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Legal
          </h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Compliance</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-divider"></div>
    
    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <p class="copyright">© {currentYear} Yahmi. All rights reserved.</p>
        <div class="footer-badges">
          <span class="badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
            Carbon Neutral
          </span>
          <span class="badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            SOC 2 Type II
          </span>
          <span class="badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            ISO 27001
          </span>
        </div>
      </div>
      <div class="footer-bottom-right">
        <a href="#" class="footer-link">Status</a>
        <span class="separator">•</span>
        <a href="#" class="footer-link">Sitemap</a>
        <span class="separator">•</span>
        <a href="#" class="footer-link">Accessibility</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .modern-footer {
    background: #FFFFFF;
    border-top: 1px solid #E5E7EB;
    padding: 4rem 0 2rem;
    margin-top: 6rem;
  }
  
  /* Newsletter Section */
  .newsletter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem;
    background: linear-gradient(135deg, #FEF2F2 0%, #FFFFFF 100%);
    border: 1px solid #FEE2E2;
    border-radius: 20px;
    margin-bottom: 4rem;
  }
  
  .newsletter-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 1;
  }
  
  .newsletter-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    border-radius: 16px;
    color: #FFFFFF;
    flex-shrink: 0;
  }
  
  .newsletter-text {
    flex: 1;
  }
  
  .newsletter-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #000000;
    margin-bottom: 0.25rem;
  }
  
  .newsletter-description {
    font-size: 0.9375rem;
    color: #6B7280;
  }
  
  .newsletter-form {
    display: flex;
    gap: 0.75rem;
    min-width: 400px;
  }
  
  .newsletter-input {
    flex: 1;
    padding: 0.875rem 1.25rem;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    font-size: 0.9375rem;
    color: #000000;
    transition: all 0.3s;
  }
  
  .newsletter-input:focus {
    outline: none;
    border-color: #DC2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  .newsletter-input::placeholder {
    color: #9CA3AF;
  }
  
  .newsletter-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
  }
  
  .newsletter-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
  }
  
  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #E5E7EB 50%, transparent 100%);
    margin: 3rem 0;
  }
  
  /* Footer Content */
  .footer-content {
    display: grid;
    grid-template-columns: 1.5fr 2.5fr;
    gap: 5rem;
    margin-bottom: 3rem;
  }
  
  .footer-brand {
    max-width: 400px;
  }
  
  .logo-brand {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: white;
    border-radius: 0.75rem;
    font-weight: 900;
  }
  
  .logo-text {
    background: linear-gradient(135deg, #DC2626, #991B1B);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .brand-tagline {
    color: #4B5563;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-size: 0.9375rem;
  }
  
  .social-links {
    display: flex;
    gap: 0.75rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    color: #6B7280;
    transition: all 0.3s;
  }
  
  .social-link:hover {
    color: #FFFFFF;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    border-color: #DC2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }
  
  .link-group h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.25rem;
    color: #000000;
  }
  
  .link-group h4 svg {
    color: #DC2626;
  }
  
  .link-group ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  
  .link-group a {
    color: #6B7280;
    text-decoration: none;
    font-size: 0.9375rem;
    transition: all 0.2s;
    display: inline-block;
  }
  
  .link-group a:hover {
    color: #DC2626;
    transform: translateX(2px);
  }
  
  /* Footer Bottom */
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .footer-bottom-left {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .copyright {
    color: #6B7280;
    font-size: 0.875rem;
  }
  
  .footer-badges {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.875rem;
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #4B5563;
  }
  
  .badge svg {
    color: #10B981;
  }
  
  .footer-bottom-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .footer-link {
    color: #6B7280;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
  }
  
  .footer-link:hover {
    color: #DC2626;
  }
  
  .separator {
    color: #D1D5DB;
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .newsletter-section {
      flex-direction: column;
      text-align: center;
    }
    
    .newsletter-content {
      flex-direction: column;
    }
    
    .newsletter-form {
      min-width: 100%;
      width: 100%;
    }
    
    .footer-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .footer-links {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }
  
  @media (max-width: 640px) {
    .modern-footer {
      padding: 3rem 0 1.5rem;
    }
    
    .newsletter-section {
      padding: 2rem 1.5rem;
    }
    
    .newsletter-form {
      flex-direction: column;
    }
    
    .newsletter-button {
      width: 100%;
      justify-content: center;
    }
    
    .footer-links {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }
    
    .footer-bottom-left {
      flex-direction: column;
      gap: 1rem;
    }
    
    .footer-bottom-right {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .separator {
      display: none;
    }
  }
</style>

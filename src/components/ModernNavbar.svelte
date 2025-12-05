<script lang="ts">
  import { link, push } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { api } from '../lib/api';
  
  export let currentUser: any = null;
  
  let scrolled = false;
  let mobileMenuOpen = false;
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const handleLogout = async () => {
    try {
      await api.signOut();
      mobileMenuOpen = false;
      push('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
</script>

<nav class="modern-navbar" class:scrolled>
  <div class="container">
    <div class="nav-wrapper">
      <a href="/" use:link class="logo-brand">
        <span class="logo-icon">Y</span>
        <span class="logo-text">ahmi</span>
      </a>
      
      <ul class="nav-menu desktop">
        <li><a href="/" use:link>Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        {#if currentUser}
          <li><a href="/dashboard" use:link>Dashboard</a></li>
          <li><a href="/questionnaire" use:link>Assessment</a></li>
        {/if}
      </ul>
      
      <div class="nav-actions desktop">
        {#if currentUser}
          <button class="btn btn-secondary-nav" on:click={handleLogout}>Logout</button>
        {:else}
          <a href="/auth" use:link class="btn btn-secondary-nav">Sign In</a>
          <a href="/auth" use:link class="btn btn-primary-nav">Get Started →</a>
        {/if}
      </div>
      
      <button class="mobile-toggle" on:click={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Toggle mobile menu">
        <span class="hamburger" class:active={mobileMenuOpen}></span>
      </button>
    </div>
    
    {#if mobileMenuOpen}
      <div class="mobile-menu glass-card">
        <ul>
          <li><a href="/" use:link on:click={() => mobileMenuOpen = false}>Home</a></li>
          <li><a href="#features" on:click={() => mobileMenuOpen = false}>Features</a></li>
          {#if currentUser}
            <li><a href="/dashboard" use:link on:click={() => mobileMenuOpen = false}>Dashboard</a></li>
            <li><button class="btn btn-primary w-full" on:click={handleLogout}>Logout</button></li>
          {:else}
            <li><a href="/auth" use:link class="btn btn-primary w-full">Get Started</a></li>
          {/if}
        </ul>
      </div>
    {/if}
  </div>
</nav>

<style>
  .modern-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1.25rem 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;
  }
  
  .modern-navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(220, 38, 38, 0.15);
    padding: 0.875rem 0;
    box-shadow: 0 4px 20px rgba(220, 38, 38, 0.08);
  }
  
  .nav-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo-brand {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--gradient-red);
    color: white;
    border-radius: 0.75rem;
    font-weight: 900;
  }
  
  .logo-text {
    background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }
  
  .nav-menu a {
    color: #1F2937;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9375rem;
    transition: color 0.2s;
    position: relative;
  }
  
  .nav-menu a:hover {
    color: #000000;
  }
  
  .nav-menu a::after {
    content: '';
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-red);
    transition: width 0.3s;
  }
  
  .nav-menu a:hover::after {
    width: 100%;
  }
  
  .nav-actions {
    display: flex;
    gap: 0.75rem;
  }
  
  /* Navbar Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
    font-weight: 600;
    border-radius: 10px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
  }
  
  .btn-primary-nav {
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: #FFFFFF;
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
  }
  
  .btn-primary-nav:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }
  
  .btn-secondary-nav {
    background: #FFFFFF;
    color: #000000;
    border: 1.5px solid #E5E7EB;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .btn-secondary-nav:hover {
    border-color: #DC2626;
    color: #DC2626;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.15);
  }
  
  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: #000000;
    position: relative;
    transition: all 0.3s;
  }
  
  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: #000000;
    transition: all 0.3s;
  }
  
  .hamburger::before { top: -7px; }
  .hamburger::after { bottom: -7px; }
  
  .hamburger.active {
    background: transparent;
  }
  
  .hamburger.active::before {
    transform: rotate(45deg);
    top: 0;
  }
  
  .hamburger.active::after {
    transform: rotate(-45deg);
    bottom: 0;
  }
  
  .mobile-menu {
    display: none;
    margin-top: 1rem;
    padding: 1.5rem;
  }
  
  .mobile-menu ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .mobile-menu a {
    color: #000000;
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 0;
    display: block;
  }
  
  .w-full {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .desktop {
      display: none;
    }
    
    .mobile-toggle {
      display: block;
    }
    
    .mobile-menu {
      display: block;
    }
  }
</style>

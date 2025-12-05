<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { api } from '../lib/api';
  import { push } from 'svelte-spa-router';
  
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
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
</script>

<nav class="navbar {scrolled ? 'scrolled' : ''}">
  <div class="container">
    <div class="nav-content">
      <!-- Logo -->
      <a href="/" use:link class="logo">
        <span class="logo-text">Yahmi</span>
        <span class="logo-subtitle">For Enterprises</span>
      </a>
      
      <!-- Desktop Navigation -->
      <ul class="nav-links desktop-nav">
        <li><a href="/" use:link>Home</a></li>
        {#if currentUser}
          <li><a href="/dashboard" use:link>Dashboard</a></li>
          <li><a href="/questionnaire" use:link>Assessment</a></li>
          <li><a href="/report" use:link>Reports</a></li>
          <li>
            <button class="btn btn-glass" on:click={handleLogout}>
              Logout
            </button>
          </li>
        {:else}
          <li>
            <a href="/auth" use:link class="btn btn-primary">
              Get Started
            </a>
          </li>
        {/if}
      </ul>
      
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" on:click={toggleMobileMenu}>
        <span class="hamburger {mobileMenuOpen ? 'active' : ''}"></span>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <div class="mobile-nav glass">
        <ul class="mobile-nav-links">
          <li><a href="/" use:link on:click={() => mobileMenuOpen = false}>Home</a></li>
          {#if currentUser}
            <li><a href="/dashboard" use:link on:click={() => mobileMenuOpen = false}>Dashboard</a></li>
            <li><a href="/questionnaire" use:link on:click={() => mobileMenuOpen = false}>Assessment</a></li>
            <li><a href="/report" use:link on:click={() => mobileMenuOpen = false}>Reports</a></li>
            <li>
              <button class="btn btn-glass mobile-logout" on:click={handleLogout}>
                Logout
              </button>
            </li>
          {:else}
            <li>
              <a href="/auth" use:link class="btn btn-primary" on:click={() => mobileMenuOpen = false}>
                Get Started
              </a>
            </li>
          {/if}
        </ul>
      </div>
    {/if}
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 20px 0;
    transition: all 0.3s ease;
  }
  
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 15px 0;
  }
  
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--primary-white);
  }
  
  .logo-text {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(45deg, var(--primary-white), var(--primary-red));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .logo-subtitle {
    font-size: 10px;
    font-weight: 400;
    opacity: 0.8;
    margin-top: -2px;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    gap: 30px;
    align-items: center;
  }
  
  .nav-links a {
    color: var(--primary-white);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .nav-links a:hover {
    color: var(--primary-green);
  }
  
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-green);
    transition: width 0.3s ease;
  }
  
  .nav-links a:hover::after {
    width: 100%;
  }
  
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  
  .hamburger {
    display: block;
    width: 25px;
    height: 3px;
    background: var(--primary-white);
    position: relative;
    transition: all 0.3s ease;
  }
  
  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background: var(--primary-white);
    transition: all 0.3s ease;
  }
  
  .hamburger::before {
    top: -8px;
  }
  
  .hamburger::after {
    bottom: -8px;
  }
  
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
  
  .mobile-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 20px;
    right: 20px;
    padding: 20px;
    margin-top: 10px;
  }
  
  .mobile-nav-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .mobile-nav-links a {
    color: var(--primary-white);
    text-decoration: none;
    font-weight: 500;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .mobile-logout {
    margin-top: 10px;
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
    
    .mobile-menu-btn {
      display: block;
    }
    
    .mobile-nav {
      display: block;
    }
  }
</style>
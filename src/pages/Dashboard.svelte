<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { api } from '../lib/api';
  
  // Import components
  import DashboardOverview from '../components/dashboard/DashboardOverview.svelte';
  import AssessmentsView from '../components/dashboard/AssessmentsView.svelte';
  import ReportsView from '../components/dashboard/ReportsView.svelte';
  import AnalyticsView from '../components/dashboard/AnalyticsView.svelte';
  import SettingsView from '../components/dashboard/SettingsView.svelte';
  import YahmiAIView from '../components/dashboard/YahmiAIView.svelte';
  
  // State
  let currentUser: any = null;
  let userProfile: any = null;
  let assessments: any[] = [];
  let latestReport: any = null;
  let latestAnalytics: any = null;
  let loading = true;
  let error = '';
  let sidebarCollapsed = false;
  let activeView = 'overview';
  let showUserMenu = false;
  
  // Menu items
  const menuItems = [
    { id: 'overview', title: 'Dashboard', icon: 'dashboard', badge: null },
    { id: 'yahmi-ai', title: 'Yahmi AI', icon: 'ai', badge: 'Soon' },
    { id: 'assessments', title: 'Assessments', icon: 'file', badge: null },
    { id: 'reports', title: 'Reports', icon: 'chart', badge: null },
    { id: 'analytics', title: 'Analytics', icon: 'trending', badge: 'New' },
    { id: 'settings', title: 'Settings', icon: 'settings', badge: null }
  ];
  
  onMount(async () => {
    try {
      const result = await api.getMe();
      currentUser = result.user;
      if (!currentUser) {
        push('/auth');
        return;
      }
      await loadDashboardData();
    } catch (err) {
      push('/auth');
    }
  });
  
  const loadDashboardData = async () => {
    loading = true;
    error = '';
    
    try {
      const dashboard = await api.getDashboard();
      userProfile = dashboard.profile;
      assessments = dashboard.assessments || [];
      latestReport = dashboard.latestReport;
      latestAnalytics = dashboard.latestAnalytics;
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
      error = 'Failed to load dashboard data. Please try again.';
    } finally {
      loading = false;
    }
  };
  
  const handleSignOut = async () => {
    try {
      await api.signOut();
      push('/auth');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };
  
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  
  const toggleSidebar = () => {
    sidebarCollapsed = !sidebarCollapsed;
  };
  
  const setActiveView = (viewId: string) => {
    activeView = viewId;
    showUserMenu = false;
  };
</script>

<svelte:head>
  <title>Dashboard - Yahmi</title>
  <meta name="description" content="Manage your sustainability metrics and track progress." />
</svelte:head>

<div class="dashboard-container">
  <!-- Sidebar -->
  <aside class="sidebar" class:collapsed={sidebarCollapsed}>
    <!-- Logo Section -->
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </div>
        {#if !sidebarCollapsed}
          <div class="logo-text">
            <h1>Yahmi</h1>
            <p>Sustainability Platform</p>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="sidebar-nav">
      {#each menuItems as item}
        <button
          class="nav-item"
          class:active={activeView === item.id}
          on:click={() => setActiveView(item.id)}
          title={item.title}
        >
          <div class="nav-icon">
            {#if item.icon === 'dashboard'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
            {:else if item.icon === 'ai'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/>
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v4"/>
                <path d="M12 18v4"/>
                <path d="M4.93 4.93l2.83 2.83"/>
                <path d="M16.24 16.24l2.83 2.83"/>
                <path d="M2 12h4"/>
                <path d="M18 12h4"/>
                <path d="M4.93 19.07l2.83-2.83"/>
                <path d="M16.24 7.76l2.83-2.83"/>
              </svg>
            {:else if item.icon === 'file'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            {:else if item.icon === 'chart'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            {:else if item.icon === 'trending'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            {:else if item.icon === 'settings'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            {/if}
          </div>
          {#if !sidebarCollapsed}
            <span class="nav-label">{item.title}</span>
            {#if item.badge}
              <span class="nav-badge">{item.badge}</span>
            {/if}
          {/if}
          {#if activeView === item.id}
            <div class="active-indicator"></div>
          {/if}
        </button>
      {/each}
    </nav>
    
    <!-- User Profile -->
    <div class="sidebar-footer">
      <div class="divider"></div>
      <div class="user-profile">
        <button class="user-button" on:click={() => showUserMenu = !showUserMenu}>
          <div class="user-avatar">
            {getInitials(userProfile?.displayName || currentUser?.email)}
          </div>
          {#if !sidebarCollapsed}
            <div class="user-info">
              <span class="user-name">{userProfile?.displayName || 'User'}</span>
              <span class="user-email">{currentUser?.email || ''}</span>
            </div>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          {/if}
        </button>
        
        {#if showUserMenu}
          <div class="user-menu">
            <button class="menu-item" on:click={() => setActiveView('settings')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Profile</span>
            </button>
            <button class="menu-item" on:click={() => setActiveView('settings')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span>Account Settings</span>
            </button>
            <div class="menu-divider"></div>
            <button class="menu-item danger" on:click={handleSignOut}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        {/if}
      </div>
      
      <!-- Toggle Button -->
      <button class="toggle-button" on:click={toggleSidebar}>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          style="transform: rotate({sidebarCollapsed ? 0 : 180}deg); transition: transform 0.2s;"
        >
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  </aside>
  
  <!-- Main Content -->
  <main class="main-content" class:expanded={sidebarCollapsed}>
    {#if loading}
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    {:else if error}
      <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>Unable to load dashboard</h3>
        <p>{error}</p>
        <button class="btn-primary" on:click={loadDashboardData}>
          Try Again
        </button>
      </div>
    {:else}
      {#if activeView === 'overview'}
        <DashboardOverview 
          {userProfile} 
          {assessments} 
          {latestReport} 
          {latestAnalytics}
          on:refresh={loadDashboardData}
        />
      {:else if activeView === 'yahmi-ai'}
        <YahmiAIView />
      {:else if activeView === 'assessments'}
        <AssessmentsView {assessments} on:refresh={loadDashboardData} />
      {:else if activeView === 'reports'}
        <ReportsView {latestReport} on:refresh={loadDashboardData} />
      {:else if activeView === 'analytics'}
        <AnalyticsView {latestAnalytics} on:refresh={loadDashboardData} />
      {:else if activeView === 'settings'}
        <SettingsView {userProfile} {currentUser} on:refresh={loadDashboardData} />
      {/if}
    {/if}
  </main>
</div>

<style>
  :global(:root) {
    --primary-red: #DC2626;
    --dark-red: #991B1B;
    --light-red: #FCA5A5;
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --bg-tertiary: #2a2a2a;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --text-muted: rgba(255, 255, 255, 0.5);
    --border-color: rgba(255, 255, 255, 0.1);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.12);
  }
  
  .dashboard-container {
    display: flex;
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
  }
  
  /* Sidebar Styles */
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 16rem;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 40;
  }
  
  .sidebar.collapsed {
    width: 4rem;
  }
  
  .sidebar-header {
    height: 4rem;
    border-bottom: 1px solid var(--border-color);
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.625rem;
    background: linear-gradient(135deg, var(--primary-red), var(--dark-red));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }
  
  .logo-icon svg {
    color: white;
  }
  
  .logo-text {
    overflow: hidden;
  }
  
  .logo-text h1 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary);
  }
  
  .logo-text p {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin: 0;
  }
  
  .sidebar-nav {
    flex: 1;
    padding: 1rem 0.5rem;
    overflow-y: auto;
  }
  
  .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.625rem 0.75rem;
    border-radius: 0.625rem;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 0.25rem;
  }
  
  .nav-item:hover {
    background: var(--glass-bg);
    color: var(--text-primary);
  }
  
  .nav-item.active {
    background: rgba(220, 38, 38, 0.1);
    color: var(--primary-red);
  }
  
  .nav-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-label {
    flex: 1;
    text-align: left;
    white-space: nowrap;
  }
  
  .nav-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 0.375rem;
    background: var(--primary-red);
    color: white;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }
  
  .nav-item:has(.nav-badge) .nav-badge {
    animation: pulse-badge 2s ease-in-out infinite;
  }
  
  @keyframes pulse-badge {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .active-indicator {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.25rem;
    height: 2rem;
    background: var(--primary-red);
    border-radius: 0 0.25rem 0.25rem 0;
  }
  
  .sidebar-footer {
    border-top: 1px solid var(--border-color);
    padding: 0.5rem;
  }
  
  .divider {
    height: 1px;
    background: var(--border-color);
    margin: 0.5rem 0;
  }
  
  .user-profile {
    position: relative;
  }
  
  .user-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.625rem 0.75rem;
    border-radius: 0.625rem;
    border: none;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .user-button:hover {
    background: var(--glass-bg);
  }
  
  .user-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(220, 38, 38, 0.15);
    color: var(--primary-red);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
  }
  
  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
  }
  
  .user-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  
  .user-email {
    font-size: 0.75rem;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  
  .chevron {
    flex-shrink: 0;
    color: var(--text-muted);
  }
  
  .user-menu {
    position: absolute;
    bottom: 100%;
    left: 0.5rem;
    right: 0.5rem;
    margin-bottom: 0.5rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 0.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    z-index: 50;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.625rem 0.75rem;
    border-radius: 0.5rem;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.2s;
    text-align: left;
  }
  
  .menu-item:hover {
    background: var(--glass-bg);
  }
  
  .menu-item.danger {
    color: var(--primary-red);
  }
  
  .menu-divider {
    height: 1px;
    background: var(--border-color);
    margin: 0.5rem 0;
  }
  
  .toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.625rem;
    border-radius: 0.625rem;
    border: none;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 0.5rem;
  }
  
  .toggle-button:hover {
    background: var(--glass-bg);
    color: var(--text-primary);
  }
  
  /* Main Content */
  .main-content {
    margin-left: 16rem;
    flex: 1;
    min-height: 100vh;
    background: linear-gradient(135deg, var(--bg-primary) 0%, #1a0a0a 100%);
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .main-content.expanded {
    margin-left: 4rem;
  }
  
  .loading-container,
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
  }
  
  .spinner {
    width: 3rem;
    height: 3rem;
    border: 3px solid rgba(220, 38, 38, 0.2);
    border-top-color: var(--primary-red);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .error-container h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .error-container p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  
  .btn-primary {
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    border: none;
    background: var(--primary-red);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary:hover {
    background: var(--dark-red);
    transform: translateY(-2px);
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 4rem;
    }
    
    .sidebar.collapsed {
      width: 0;
      border: none;
    }
    
    .main-content {
      margin-left: 4rem;
    }
    
    .main-content.expanded {
      margin-left: 0;
    }
  }
</style>

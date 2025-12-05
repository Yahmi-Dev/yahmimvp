<script lang="ts">
  import Router, { replace } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { api } from './lib/api';
  
  // Import pages
  import LandingNew from './pages/LandingNew.svelte';
  import Auth from './pages/Auth.svelte';
  import Questionnaire from './pages/Questionnaire.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import Report from './pages/Report.svelte';
  
  // Import components
  import LoadingScreen from './components/LoadingScreen.svelte';
  
  // Import global styles
  import './app.css';
  
  // Auth state
  let currentUser: any = null;
  let loading = true;
  
  // Routes configuration
  const routes = {
    '/': LandingNew,
    '/auth': Auth,
    '/questionnaire': Questionnaire,
    '/dashboard': Dashboard,
    '/report': Report
  };
  
  // Route guard function
  function routeGuard(detail: any) {
    const { location } = detail;
    const protectedRoutes = ['/questionnaire', '/dashboard', '/report'];
    
    if (protectedRoutes.includes(location) && !currentUser) {
      // Redirect to auth if not logged in
      replace('/auth');
      return false;
    }
    
    return true;
  }
  
  onMount(async () => {
    // Check if user is logged in
    try {
      const result = await api.getMe();
      currentUser = result.user;
    } catch (error) {
      currentUser = null;
    } finally {
      loading = false;
    }
  });
</script>

<main class="app">
  {#if loading}
    <LoadingScreen />
  {:else}
    <Router {routes} on:routeEvent={routeGuard}></Router>
  {/if}
</main>

<style>
  .app {
    min-height: 100vh;
    width: 100%;
    position: relative;
  }
</style>
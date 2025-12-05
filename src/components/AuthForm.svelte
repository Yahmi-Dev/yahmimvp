<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { api } from '../lib/api';
  
  const dispatch = createEventDispatcher();
  
  let mode: 'signin' | 'signup' = 'signin';
  let email = '';
  let password = '';
  let displayName = '';
  let companyName = '';
  let industry = '';
  let loading = false;
  let error = '';
  let showPassword = false;
  
  const industries = [
    'Technology & Software', 'Manufacturing', 'Healthcare & Pharmaceuticals',
    'Financial Services', 'Retail & E-commerce', 'Energy & Utilities',
    'Transportation & Logistics', 'Construction & Real Estate', 'Food & Beverage',
    'Education', 'Consulting & Professional Services', 'Media & Entertainment',
    'Agriculture', 'Automotive', 'Aerospace & Defense', 'Telecommunications',
    'Mining & Metals', 'Chemicals', 'Textiles & Apparel', 'Other'
  ];
  
  async function handleSubmit() {
    error = '';
    loading = true;
    
    try {
      if (mode === 'signup') {
        await api.signUp(email, password, {
          displayName,
          companyName,
          industry,
        });
        dispatch('success', { message: 'Account created successfully!' });
        push('/dashboard');
      } else {
        await api.signIn(email, password);
        dispatch('success', { message: 'Signed in successfully!' });
        push('/dashboard');
      }
    } catch (err: any) {
      error = err.message || 'Authentication failed';
    } finally {
      loading = false;
    }
  }
  
  function toggleMode() {
    mode = mode === 'signin' ? 'signup' : 'signin';
    error = '';
    email = '';
    password = '';
    displayName = '';
    companyName = '';
    industry = '';
  }
</script>

<div class="auth-form">
  <div class="form-header">
    <h2>{mode === 'signin' ? 'Welcome Back' : 'Get Started'}</h2>
    <p>{mode === 'signin' ? 'Enter your credentials to access your account' : 'Create your account to start your sustainability journey'}</p>
  </div>
  
  <form on:submit|preventDefault={handleSubmit}>
    {#if mode === 'signup'}
      <div class="form-group">
        <label for="displayName">Full Name</label>
        <input
          id="displayName"
          type="text"
          bind:value={displayName}
          placeholder="John Doe"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input
          id="companyName"
          type="text"
          bind:value={companyName}
          placeholder="Acme Corporation"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="industry">Industry</label>
        <select id="industry" bind:value={industry} required>
          <option value="">Select your industry</option>
          {#each industries as ind}
            <option value={ind}>{ind}</option>
          {/each}
        </select>
      </div>
    {/if}
    
    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        placeholder="you@company.com"
        required
      />
    </div>
    
    <div class="form-group">
      <label for="password">
        <span>Password</span>
        {#if mode === 'signin'}
          <button type="button" class="forgot-link">Forgot password?</button>
        {/if}
      </label>
      <div class="password-input">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          bind:value={password}
          placeholder="••••••••"
          required
          minlength="6"
        />
        <button
          type="button"
          class="password-toggle"
          on:click={() => showPassword = !showPassword}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {#if showPassword}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>
    
    {#if error}
      <div class="error-message">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>{error}</span>
      </div>
    {/if}
    
    <button type="submit" class="btn-primary" disabled={loading}>
      {#if loading}
        <span class="spinner"></span>
        {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
      {:else}
        {mode === 'signin' ? 'Sign In' : 'Create Account'}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      {/if}
    </button>
  </form>
  
  <div class="form-footer">
    <p>
      {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
      <button class="toggle-link" on:click={toggleMode}>
        {mode === 'signin' ? 'Sign up' : 'Sign in'}
      </button>
    </p>
  </div>
</div>

<style>
  .auth-form {
    width: 100%;
  }
  
  .form-header {
    margin-bottom: 2rem;
  }
  
  .form-header h2 {
    font-size: 2rem;
    font-weight: 800;
    color: #000000;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }
  
  .form-header p {
    font-size: 0.9375rem;
    color: #6B7280;
    line-height: 1.5;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 0.5rem;
  }
  
  .forgot-link {
    background: none;
    border: none;
    color: #DC2626;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }
  
  .forgot-link:hover {
    color: #991B1B;
  }
  
  input, select {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 0.9375rem;
    background: #FFFFFF;
    border: 1.5px solid #E5E7EB;
    border-radius: 10px;
    color: #000000;
    transition: all 0.2s;
    font-family: inherit;
  }
  
  input::placeholder {
    color: #9CA3AF;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #DC2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  .password-input {
    position: relative;
  }
  
  .password-input input {
    padding-right: 3rem;
  }
  
  .password-toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }
  
  .password-toggle:hover {
    color: #000000;
  }
  
  .error-message {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: #FEF2F2;
    border: 1px solid #FEE2E2;
    border-radius: 10px;
    color: #DC2626;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  
  .error-message svg {
    flex-shrink: 0;
  }
  
  .btn-primary {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
  }
  
  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
  }
  
  .btn-primary:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #FFFFFF;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  .form-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #E5E7EB;
  }
  
  .form-footer p {
    font-size: 0.9375rem;
    color: #6B7280;
  }
  
  .toggle-link {
    background: none;
    border: none;
    color: #DC2626;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    margin-left: 0.25rem;
    transition: color 0.2s;
  }
  
  .toggle-link:hover {
    color: #991B1B;
    text-decoration: underline;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

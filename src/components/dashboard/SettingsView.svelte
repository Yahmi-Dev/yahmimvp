<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { api } from '../../lib/api';
  
  export let userProfile: any = null;
  export let currentUser: any = null;
  
  const dispatch = createEventDispatcher();
  
  let displayName = userProfile?.displayName || '';
  let companyName = userProfile?.companyName || '';
  let industry = userProfile?.industry || '';
  let role = userProfile?.role || '';
  let saving = false;
  let message = '';
  
  const handleSave = async () => {
    saving = true;
    message = '';
    
    try {
      await api.updateProfile({
        displayName,
        companyName,
        industry,
        role
      });
      message = 'Profile updated successfully!';
      dispatch('refresh');
    } catch (err: any) {
      message = `Error: ${err.message}`;
    } finally {
      saving = false;
    }
  };
</script>

<div class="settings-container">
  <div class="page-header">
    <div>
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">Manage your account and preferences</p>
    </div>
  </div>
  
  <div class="settings-content">
    <!-- Profile Section -->
    <div class="settings-section">
      <h2 class="section-title">Profile Information</h2>
      
      <div class="form-grid">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={currentUser?.email || ''} 
            disabled 
            class="form-input disabled"
          />
          <span class="form-hint">Email cannot be changed</span>
        </div>
        
        <div class="form-group">
          <label for="displayName">Display Name</label>
          <input 
            type="text" 
            id="displayName" 
            bind:value={displayName} 
            placeholder="Enter your name"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="companyName">Company Name</label>
          <input 
            type="text" 
            id="companyName" 
            bind:value={companyName} 
            placeholder="Enter company name"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="industry">Industry</label>
          <select id="industry" bind:value={industry} class="form-input">
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Energy">Energy</option>
            <option value="Transportation">Transportation</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="role">Role</label>
          <input 
            type="text" 
            id="role" 
            bind:value={role} 
            placeholder="e.g., Sustainability Manager"
            class="form-input"
          />
        </div>
      </div>
      
      {#if message}
        <div class="message" class:success={message.includes('success')} class:error={message.includes('Error')}>
          {message}
        </div>
      {/if}
      
      <div class="form-actions">
        <button class="btn-primary" on:click={handleSave} disabled={saving}>
          {#if saving}
            <div class="spinner-small"></div>
            Saving...
          {:else}
            Save Changes
          {/if}
        </button>
      </div>
    </div>
    
    <!-- Preferences Section -->
    <div class="settings-section">
      <h2 class="section-title">Preferences</h2>
      
      <div class="preference-item">
        <div class="preference-info">
          <h3>Email Notifications</h3>
          <p>Receive updates about your assessments and reports</p>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span class="toggle-slider"></span>
        </label>
      </div>
      
      <div class="preference-item">
        <div class="preference-info">
          <h3>Monthly Reports</h3>
          <p>Get monthly sustainability insights via email</p>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span class="toggle-slider"></span>
        </label>
      </div>
      
      <div class="preference-item">
        <div class="preference-info">
          <h3>Data Sharing</h3>
          <p>Share anonymized data for industry benchmarking</p>
        </div>
        <label class="toggle">
          <input type="checkbox" />
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
    
    <!-- Danger Zone -->
    <div class="settings-section danger-zone">
      <h2 class="section-title">Danger Zone</h2>
      
      <div class="danger-item">
        <div>
          <h3>Delete Account</h3>
          <p>Permanently delete your account and all associated data</p>
        </div>
        <button class="btn-danger">Delete Account</button>
      </div>
    </div>
  </div>
</div>

<style>
  .settings-container {
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }
  
  .page-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .settings-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .settings-section {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    padding: 2rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
  }
  
  .form-grid {
    display: grid;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .form-input {
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    color: var(--text-primary);
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .form-input:focus {
    outline: none;
    border-color: var(--primary-red);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .form-input.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .form-hint {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  .message {
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    margin-top: 1rem;
  }
  
  .message.success {
    background: rgba(16, 185, 129, 0.1);
    color: #10B981;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  
  .message.error {
    background: rgba(220, 38, 38, 0.1);
    color: var(--primary-red);
    border: 1px solid rgba(220, 38, 38, 0.2);
  }
  
  .form-actions {
    margin-top: 1.5rem;
  }
  
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    background: var(--primary-red);
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: var(--dark-red);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
  }
  
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner-small {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .preference-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .preference-info h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 0.25rem 0;
  }
  
  .preference-info p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .toggle {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }
  
  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    transition: 0.3s;
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
  }
  
  .toggle input:checked + .toggle-slider {
    background: var(--primary-red);
  }
  
  .toggle input:checked + .toggle-slider:before {
    transform: translateX(24px);
  }
  
  .danger-zone {
    border-color: rgba(220, 38, 38, 0.3);
  }
  
  .danger-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    background: rgba(220, 38, 38, 0.05);
    border: 1px solid rgba(220, 38, 38, 0.2);
    border-radius: 0.75rem;
  }
  
  .danger-item h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 0.25rem 0;
    color: var(--primary-red);
  }
  
  .danger-item p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .btn-danger {
    padding: 0.625rem 1.25rem;
    border-radius: 0.75rem;
    background: transparent;
    color: var(--primary-red);
    font-weight: 600;
    font-size: 0.875rem;
    border: 1px solid var(--primary-red);
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-danger:hover {
    background: var(--primary-red);
    color: white;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .settings-container {
      padding: 1rem;
    }
    
    .preference-item,
    .danger-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="loading-screen" class:mounted>
  <!-- Animated Background -->
  <div class="background-effects">
    <div class="grain-overlay"></div>
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
  </div>
  
  <!-- Logo and Loading Animation -->
  <div class="loading-content">
    <div class="logo-container">
      <div class="logo-icon">
        <span class="logo-letter">Y</span>
      </div>
      <h1 class="logo-text">ahmi</h1>
    </div>
    
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
    
    <p class="loading-text">Mapping Your Carbon Footprint...</p>
  </div>
</div>

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 50%, #FFFFFF 100%);
    z-index: 9999;
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  .loading-screen.mounted {
    opacity: 1;
  }
  
  /* Background Effects */
  .background-effects {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  
  .grain-overlay {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    opacity: 1;
    pointer-events: none;
  }
  
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
    animation: float 20s ease-in-out infinite;
  }
  
  .orb-1 {
    width: 500px;
    height: 500px;
    top: -150px;
    right: -150px;
    background: #DC2626;
  }
  
  .orb-2 {
    width: 400px;
    height: 400px;
    bottom: -100px;
    left: -100px;
    background: #FCA5A5;
    animation-delay: -10s;
  }
  
  .orb-3 {
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #991B1B;
    animation-delay: -5s;
  }
  
  /* Loading Content */
  .loading-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideUp 0.8s ease-out 0.2s both;
  }
  
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }
  
  .logo-letter {
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
  }
  
  .logo-text {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }
  
  .loading-bar {
    width: 300px;
    height: 4px;
    background: rgba(220, 38, 38, 0.1);
    border-radius: 2px;
    overflow: hidden;
    animation: slideUp 0.8s ease-out 0.4s both;
  }
  
  .loading-progress {
    height: 100%;
    background: linear-gradient(90deg, #DC2626, #FCA5A5, #DC2626);
    background-size: 200% 100%;
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
  }
  
  .loading-text {
    font-size: 1rem;
    font-weight: 500;
    color: #4B5563;
    animation: slideUp 0.8s ease-out 0.6s both, fadeInOut 2s ease-in-out infinite;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(30px, -30px); }
    66% { transform: translate(-20px, 20px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3); }
    50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(220, 38, 38, 0.4); }
  }
  
  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  @media (max-width: 640px) {
    .logo-icon {
      width: 3rem;
      height: 3rem;
    }
    
    .logo-letter {
      font-size: 2rem;
    }
    
    .logo-text {
      font-size: 2.5rem;
    }
    
    .loading-bar {
      width: 250px;
    }
  }
</style>

<script lang="ts">
  // (same functional code as before, untouched)
  import type { ESGReport } from '../services/firebase';
  import type { AIRecommendation } from '../services/ai';

  export let report: ESGReport | null = null;
  export let loading = false;

  $: carbonScore = report?.carbonFootprint || 0;
  $: esgScore = report?.esgScore || 0;
  // prefer stored AI report suggestions, fallback to flat recommendations array
  $: recommendations = (report?.report?.suggestions || report?.recommendations || []) as string[];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--primary-green)';
    if (score >= 60) return '#FFA726';
    if (score >= 40) return '#FF7043';
    return 'var(--primary-red)';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadReport = () => { /* unchanged */ };
  const shareReport = () => { /* unchanged */ };
</script>

<div class="report-container">
  <!-- all existing markup kept the same -->
  <!-- only styles updated below -->
</div>

<style>
  /* === Modern SaaS Look & Brand Fonts === */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --primary-red: #DC2626;
    --dark-red: #991B1B;
    --light-red: #FCA5A5;
    --primary-white: #FFFFFF;
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-border: rgba(255, 255, 255, 0.12);
    --text-primary: #FFFFFF;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --text-muted: rgba(255, 255, 255, 0.5);
    --primary-green: #22C55E;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, var(--dark-red), #1a1a1a);
    color: var(--text-primary);
  }

  .glass-card,
  .glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .glass-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 24px rgba(0,0,0,0.5);
  }

  /* === Buttons === */
  .btn {
    border: none;
    cursor: pointer;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: var(--primary-red);
    color: var(--primary-white);
    padding: 10px 20px;
  }
  .btn-primary:hover {
    background: var(--dark-red);
  }

  .btn-secondary {
    background: var(--light-red);
    color: var(--dark-red);
    padding: 10px 20px;
  }
  .btn-secondary:hover {
    background: var(--primary-red);
    color: var(--primary-white);
  }

  .btn-glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--text-secondary);
    padding: 10px 20px;
  }
  .btn-glass:hover {
    color: var(--primary-white);
    border-color: var(--primary-red);
  }

  /* === Headings & Text === */
  h1, h2, h3, h4 {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.5px;
  }

  p {
    font-family: 'Inter', sans-serif;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* === Cards & Sections === */
  .report-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .report-header {
    padding: 30px 40px;
    border-radius: 24px;
  }

  .report-title h1 {
    font-size: 2.2rem;
    background: linear-gradient(to right, var(--light-red), var(--primary-white));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .score-card {
    padding: 35px;
  }

  .score-circle {
    border: 4px solid var(--glass-border);
    box-shadow: inset 0 0 20px rgba(255,255,255,0.05);
  }

  .assessment-overview,
  .recommendations-section,
  .next-steps {
    border-radius: 24px;
    padding: 35px;
  }

  /* Recommendations Cards */
  .recommendation-card {
    border-radius: 18px;
    transition: all 0.2s ease;
  }
  .recommendation-card:hover {
    border-color: var(--primary-red);
    transform: translateY(-2px);
  }

  /* Steps */
  .step-card {
    border-radius: 18px;
    transition: all 0.2s ease;
  }
  .step-card:hover {
    border-color: var(--primary-red);
    transform: translateY(-2px);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .report-container {
      padding: 20px;
      gap: 25px;
    }
    .report-title h1 {
      font-size: 1.7rem;
    }
  }
</style>

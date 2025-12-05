<script lang="ts">
  import type { EnterpriseDeepReport } from '../services/ai_enterprise';
  import { createEventDispatcher } from 'svelte';
  export let deep: EnterpriseDeepReport | null = null;
  const dispatch = createEventDispatcher();

  type ModuleStatus = { key: string; title: string; score: number; missing: string[]; cta?: string };

  const pct = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

  function calcStatuses(): ModuleStatus[] {
    if (!deep) return [];

    const statuses: ModuleStatus[] = [];

    // Emissions & Resource
    const e = deep.emissionsResource;
    const eMissing: string[] = [];
    if (!e?.details?.liveOps?.energy_kwh) eMissing.push('energy_kwh');
    if (!e?.details?.liveOps?.water_m3) eMissing.push('water_m3');
    if (!e?.details?.liveOps?.waste_tons) eMissing.push('waste_tons');
    if (!e?.details?.intensity?.per_unit) eMissing.push('production_units');
    if (!e?.details?.intensity?.per_revenue) eMissing.push('revenue_usd');
    const eScore = 100 - (eMissing.length * 20); // crude completeness proxy
    statuses.push({ key: 'emissions', title: 'Emissions & Resources', score: pct(eScore), missing: eMissing, cta: 'Add ops & intensity data' });

    // PCF/LCA
    const p = deep.pcfLca;
    const pMissing: string[] = [];
    if (!p?.details?.productsAnalyzed) pMissing.push('products');
    if (!(p?.details?.alignment && p?.details?.alignment !== 'None')) pMissing.push('PACT/Pathfinder alignment');
    if (!p?.details?.dataCoverage || p?.details?.dataCoverage < 0.5) pMissing.push('supplier primary data');
    const pScore = 100 - (pMissing.length * 25);
    statuses.push({ key: 'pcf', title: 'PCF & LCA Readiness', score: pct(pScore), missing: pMissing, cta: 'Import SKUs/BOM + supplier data' });

    // Targets & MACC
    const t = deep.targetsPlanning;
    const tMissing: string[] = [];
    if (!t?.details?.sbtiReady) tMissing.push('SBTi target');
    if (!t?.details?.portfolio?.length) tMissing.push('decarb portfolio');
    if (!t?.details?.internalCarbonPrice) tMissing.push('internal carbon price');
    const tScore = 100 - (tMissing.length * 30);
    statuses.push({ key: 'targets', title: 'Targets & MACC', score: pct(tScore), missing: tMissing, cta: 'Define targets & portfolio' });

    // Compliance
    const c = deep.complianceReporting;
    const avg = (c?.details?.frameworks?.length || 0) ? (c.details.frameworks.reduce((s, f) => s + (f.readiness || 0), 0) / c.details.frameworks.length) : 0;
    const cMissing: string[] = [];
    if (!c?.details?.frameworks?.length) cMissing.push('framework mapping');
    if (!c?.details?.xbrlReady) cMissing.push('XBRL tagging');
    const cScore = Math.round(avg * 100) - (cMissing.length * 10);
    statuses.push({ key: 'compliance', title: 'Compliance & Reporting', score: pct(cScore), missing: cMissing, cta: 'Map ESRS/IFRS S2 + XBRL' });

    // Supply Chain
    const s = deep.supplyChain;
    const sMissing: string[] = [];
    if (!s?.details?.suppliers) sMissing.push('supplier count');
    if (!s?.details?.primaryDataShare || s.details.primaryDataShare < 0.5) sMissing.push('primary data coverage');
    const sScore = 100 - (sMissing.length * 40);
    statuses.push({ key: 'supply', title: 'Supply Chain', score: pct(sScore), missing: sMissing, cta: 'Launch supplier portal' });

    // Energy & Offsets
    const en = deep.energyOffsets;
    const enMissing: string[] = [];
    if (en?.details?.renewablesShare == null) enMissing.push('renewables share');
    if (en?.details?.cfe247Score == null) enMissing.push('24/7 CFE');
    if (!en?.details?.offsetsQuality) enMissing.push('offsets quality');
    const enScore = 100 - (enMissing.length * 30);
    statuses.push({ key: 'energy', title: 'Energy & Offsets', score: pct(enScore), missing: enMissing, cta: 'Add PPAs/RECs & 24/7 CFE' });

    // Nature & Circularity
    const n = deep.natureCircularity;
    const nMissing: string[] = [];
    if (!n?.details?.circularityScore) nMissing.push('circularity score');
    if (!n?.details?.waterRisk) nMissing.push('water risk');
    if (n?.details?.tnfdReady == null || n.details.tnfdReady === false) nMissing.push('TNFD readiness');
    const nScore = 100 - (nMissing.length * 30);
    statuses.push({ key: 'nature', title: 'Nature & Circularity', score: pct(nScore), missing: nMissing, cta: 'Map nature & circular flows' });

    // People & Culture
    const pe = deep.peopleCulture;
    const peMissing: string[] = [];
    if (!pe?.details?.engagementIndex) peMissing.push('engagement index');
    if (!pe?.details?.trainingCoverage) peMissing.push('training coverage');
    const peScore = 100 - (peMissing.length * 40);
    statuses.push({ key: 'people', title: 'People & Culture', score: pct(peScore), missing: peMissing, cta: 'Roll out training & pulse' });

    return statuses;
  }

  $: statuses = calcStatuses();

  function openPack(key: string) {
    dispatch('openPack', { key });
  }
</script>

{#if deep}
<div class="data-completeness glass-card">
  <div class="header">
    <h2>Data Completeness</h2>
    <p class="sub">Improve analytics fidelity by completing priority data</p>
  </div>

  <div class="grid">
    {#each statuses as s}
      <div class="mod">
        <div class="row">
          <div class="title">{s.title}</div>
          <div class="score">{s.score}%</div>
        </div>
        <div class="bar">
          <div class="fill" style={`width:${s.score}%`}></div>
        </div>
        {#if s.missing.length}
          <div class="missing">
            <span class="label">Missing:</span>
            <span class="items">{s.missing.join(', ')}</span>
          </div>
        {/if}
        <div class="actions">
          <button class="btn" on:click={() => openPack(s.key)}>{s.cta || 'Add data'}</button>
        </div>
      </div>
    {/each}
  </div>
</div>
{:else}
<div class="data-completeness glass-card"><h3>Data Completeness</h3><p>Complete an assessment to see coverage.</p></div>
{/if}

<style>
  .data-completeness { display: flex; flex-direction: column; gap: 14px; }
  .header h2 { margin: 0; }
  .sub { opacity:.8; margin: 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
  .mod { background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 12px; }
  .row { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
  .title { font-weight:600; }
  .score { opacity:.85; }
  .bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; }
  .fill { height: 100%; background: linear-gradient(90deg, #22c55e, #f59e0b 60%, #ef4444); }
  .missing { font-size:.9rem; margin-top:8px; opacity:.9; }
  .label { opacity:.8; margin-right:6px; }
  .actions { margin-top:8px; }
  .btn { padding:8px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.2); background: transparent; color: inherit; cursor: pointer; }
  .btn:hover { border-color: #DC2626; }
</style>
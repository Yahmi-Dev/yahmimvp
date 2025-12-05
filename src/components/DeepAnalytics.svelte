<script lang="ts">
  // DeepAnalyticsEnhanced.svelte — premium, visual-first analytics using Apache ECharts
  // Drop-in replacement for your existing Deep Analytics component.
  // Requirements: npm i echarts
  // Optional: npm i file-saver (if you enable PNG export below)

  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import * as echarts from 'echarts';
  // import { saveAs } from 'file-saver'; // optional for export helpers

  type EnterpriseDeepReport = {
    meta: { industry?: string; generatedAt: string | number | Date };
    emissionsResource: {
      summary?: string;
      kpis?: {
        scope1_tco2e?: number; scope2_tco2e?: number; scope3_tco2e?: number;
      };
      details?: {
        intensity?: { per_unit?: number; per_revenue?: number };
        // Optional time series if you have it
        trend?: Array<{ date: string; s1?: number; s2?: number; s3?: number; total?: number }>
      };
      recommendations?: string[];
    };
    targetsPlanning: {
      summary?: string;
      details?: {
        sbtiReady?: boolean;
        internalCarbonPrice?: number;
        portfolio?: Array<{ name: string; abatement_tco2e?: number; cost_per_tco2e?: number; payback_years?: number; irr?: number }>
      };
    };
    complianceReporting: {
      summary?: string;
      details?: {
        frameworks?: Array<{ name: string; readiness?: number; gaps?: string[] }>
      };
    };
    supplyChain: {
      summary?: string;
      details?: {
        suppliers?: number; primaryDataShare?: number; priorityCategories?: string[];
        // optional breakdown for visuals
        categories?: Array<{ name: string; emissions_tco2e?: number; suppliers?: number }>
      }
    };
    riskResilience: {
      summary?: string;
      details?: {
        physicalRisk?: Array<{ hazard: string; exposure: string | number }>; // e.g., High/Med/Low or 0-100
        transitionRisk?: Array<{ scenario: string; impact: string | number }>
      }
    };
    energyOffsets: {
      summary?: string;
      details?: {
        renewablesShare?: number; // 0-1
        cfe247Score?: number;     // 0-1
        offsetsQuality?: string;  // e.g., High/Med/Low
        // optional breakdowns
        energyMix?: Array<{ source: string; share?: number }>; // share 0-1
      }
    };
    natureCircularity: {
      summary?: string;
      details?: { circularityScore?: number; waterRisk?: string; tnfdReady?: boolean }
    };
    peopleCulture: {
      summary?: string;
      details?: { engagementIndex?: number; trainingCoverage?: number }
    };
  };

  export let deep: EnterpriseDeepReport | null = null;

  // ----------------------------
  // Formatting helpers & palette
  // ----------------------------
  const fmtPct = (n?: number) => (n == null ? '-' : `${Math.round(n * 100)}%`);
  const fmtInt = (n?: number) => (n == null ? '-' : Math.round(n).toLocaleString());
  const fmt = (n?: number) => (n == null ? '-' : n.toLocaleString());

  // Exclusive palette (keeps your original hues but upgraded)
  const palette = {
    bg: '#0b1020',
    card: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.1)',
    textPri: '#e9eefc',
    textSec: 'rgba(233,238,252,0.75)',
    glow1: 'rgba(96,165,250,0.35)',   // blue glow
    glow2: 'rgba(52,211,153,0.35)',   // green glow
    s1: '#60a5fa',
    s2: '#34d399',
    s3: '#fbbf24',
    danger: '#ef4444',
    ok: '#10b981',
    warn: '#f59e0b'
  };

  const scopeColors = [palette.s1, palette.s2, palette.s3];

  // ----------------------------
  // Chart DOM refs
  // ----------------------------
  let elScopesDonut: HTMLDivElement;
  let elScopesHStack: HTMLDivElement;
  let elTrendArea: HTMLDivElement;
  let elGauges: HTMLDivElement;
  let elRadar: HTMLDivElement;
  let elPortfolio: HTMLDivElement;
  let elComplianceBars: HTMLDivElement;
  let elSupplyTreemap: HTMLDivElement;
  let elRiskHeat: HTMLDivElement;
  let elEnergyMix: HTMLDivElement;

  // ----------------------------
  // Chart instances + resize management
  // ----------------------------
  let charts: echarts.ECharts[] = [];
  let resizeObs: ResizeObserver;

  function attachResize(node: HTMLElement, instance: echarts.ECharts) {
    if (!resizeObs) {
      resizeObs = new ResizeObserver(() => {
        charts.forEach((c) => c.resize());
      });
    }
    resizeObs.observe(node);
  }

  function initChart(el: HTMLDivElement | undefined, option: echarts.EChartsCoreOption) {
    if (!el) return null;
    const c = echarts.init(el, undefined, { renderer: 'canvas' });
    c.setOption(option);
    charts.push(c);
    attachResize(el, c);
    return c;
  }

  function disposeCharts() {
    charts.forEach((c) => c.dispose());
    charts = [];
    if (resizeObs) resizeObs.disconnect();
  }

  // ----------------------------
  // Data extraction helpers
  // ----------------------------
  function getScopes() {
    const s1 = deep?.emissionsResource?.kpis?.scope1_tco2e ?? 0;
    const s2 = deep?.emissionsResource?.kpis?.scope2_tco2e ?? 0;
    const s3 = deep?.emissionsResource?.kpis?.scope3_tco2e ?? 0;
    return { s1, s2, s3, total: Math.max(1, s1 + s2 + s3) };
  }

  function getTrend() {
    // expecting optional deep.emissionsResource.details.trend
    const t = deep?.emissionsResource?.details?.trend ?? [];
    // Ensure we always return an array (could be empty, chart handles gracefully)
    return t;
  }

  function getPortfolio() {
    return deep?.targetsPlanning?.details?.portfolio ?? [];
  }

  function getFrameworks() {
    return deep?.complianceReporting?.details?.frameworks ?? [];
  }

  function getSupplyCategories() {
    return deep?.supplyChain?.details?.categories ?? [];
  }

  function getEnergyMix() {
    return deep?.energyOffsets?.details?.energyMix ?? [];
  }

  function normScore(v?: number, max = 100) {
    if (v == null) return 0;
    const n = Math.max(0, Math.min(max, v));
    return n;
  }

  // ----------------------------
  // Chart option builders
  // ----------------------------
  function scopesDonutOption() : echarts.EChartsCoreOption {
    const { s1, s2, s3 } = getScopes();
    return {
      backgroundColor: 'transparent',
      title: { text: 'Emissions Breakdown', left: 'center', top: 6, textStyle: { color: palette.textPri, fontWeight: 600 } },
      tooltip: { trigger: 'item', formatter: ({name, value, percent}: any) => `${name}: ${fmt(value)} tCO2e (${percent}%)` },
      legend: { bottom: 0, textStyle: { color: palette.textSec } },
      series: [
        {
          type: 'pie', radius: ['40%', '70%'], avoidLabelOverlap: false,
          labelLine: { show: true },
          label: { show: true, formatter: '{b}: {d}%'},
          data: [
            { value: s1, name: 'Scope 1', itemStyle: { color: scopeColors[0] } },
            { value: s2, name: 'Scope 2', itemStyle: { color: scopeColors[1] } },
            { value: s3, name: 'Scope 3', itemStyle: { color: scopeColors[2] } }
          ],
          animationDuration: 900, animationEasing: 'cubicOut'
        }
      ]
    };
  }

  function scopesHStackOption(): echarts.EChartsCoreOption {
    const { s1, s2, s3, total } = getScopes();
    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: () => `Total: ${fmt(total)} tCO2e` },
      grid: { left: 8, right: 8, top: 20, bottom: 20, containLabel: true },
      xAxis: { type: 'value', show: false, max: total },
      yAxis: { type: 'category', show: false, data: ['Scopes'] },
      series: [
        { type: 'bar', stack: 'x', name: 'Scope 1', data: [s1], itemStyle: { color: scopeColors[0] }, emphasis: { focus: 'series' } },
        { type: 'bar', stack: 'x', name: 'Scope 2', data: [s2], itemStyle: { color: scopeColors[1] }, emphasis: { focus: 'series' } },
        { type: 'bar', stack: 'x', name: 'Scope 3', data: [s3], itemStyle: { color: scopeColors[2] }, emphasis: { focus: 'series' } }
      ]
    };
  }

  function trendAreaOption(): echarts.EChartsCoreOption {
    const trend = getTrend();
    const dates = trend.map((d) => d.date);
    const s1 = trend.map((d) => d.s1 ?? 0);
    const s2 = trend.map((d) => d.s2 ?? 0);
    const s3 = trend.map((d) => d.s3 ?? 0);
    return {
      backgroundColor: 'transparent',
      title: { text: 'Emissions Trend', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      tooltip: { trigger: 'axis' },
      legend: { bottom: 0, textStyle: { color: palette.textSec } },
      grid: { left: 12, right: 12, top: 40, bottom: 40 },
      xAxis: { type: 'category', data: dates, axisLine: { lineStyle: { color: palette.border } }, axisLabel: { color: palette.textSec } },
      yAxis: { type: 'value', axisLabel: { color: palette.textSec }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } } },
      series: [
        { name: 'Scope 1', type: 'line', stack: 'total', areaStyle: {}, itemStyle: { color: scopeColors[0] }, data: s1, smooth: true },
        { name: 'Scope 2', type: 'line', stack: 'total', areaStyle: {}, itemStyle: { color: scopeColors[1] }, data: s2, smooth: true },
        { name: 'Scope 3', type: 'line', stack: 'total', areaStyle: {}, itemStyle: { color: scopeColors[2] }, data: s3, smooth: true }
      ]
    };
  }

  function gaugesOption(): echarts.EChartsCoreOption {
    const ren = deep?.energyOffsets?.details?.renewablesShare ?? 0;
    const cfe = deep?.energyOffsets?.details?.cfe247Score ?? 0;
    return {
      backgroundColor: 'transparent',
      title: { text: 'Energy Quality', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      tooltip: { formatter: '{b}: {c}%' },
      series: [
        {
          name: 'Renewables', type: 'gauge', center: ['25%','58%'], radius: '60%',
          min: 0, max: 100, splitNumber: 4,
          axisLine: { lineStyle: { width: 10, color: [[0.33, palette.danger],[0.66, palette.warn],[1, palette.ok]] } },
          pointer: { itemStyle: { color: palette.textPri } },
          title: { color: palette.textSec, fontSize: 12, offsetCenter: [0, '70%'] },
          detail: { valueAnimation: true, formatter: '{value}%', color: palette.textPri },
          data: [{ value: Math.round(ren * 100), name: 'Renewables' }]
        },
        {
          name: '24/7 CFE', type: 'gauge', center: ['75%','58%'], radius: '60%',
          min: 0, max: 100, splitNumber: 4,
          axisLine: { lineStyle: { width: 10, color: [[0.33, palette.danger],[0.66, palette.warn],[1, palette.ok]] } },
          pointer: { itemStyle: { color: palette.textPri } },
          title: { color: palette.textSec, fontSize: 12, offsetCenter: [0, '70%'] },
          detail: { valueAnimation: true, formatter: '{value}%', color: palette.textPri },
          data: [{ value: Math.round(cfe * 100), name: '24/7 CFE' }]
        }
      ]
    };
  }

  function radarOption(): echarts.EChartsCoreOption {
    const circ = normScore(deep?.natureCircularity?.details?.circularityScore ?? 0);
    const engage = normScore(deep?.peopleCulture?.details?.engagementIndex ?? 0);
    const train = Math.round((deep?.peopleCulture?.details?.trainingCoverage ?? 0) * 100);
    const offsetsQ = (() => {
      const q = (deep?.energyOffsets?.details?.offsetsQuality || '').toLowerCase();
      if (q === 'high') return 90; if (q === 'medium' || q === 'mid') return 60; if (q === 'low') return 30; return 45;
    })();
    const compAvg = (() => {
      const f = getFrameworks();
      if (!f.length) return 40;
      const sum = f.reduce((a, b) => a + (Math.round((b.readiness ?? 0) * 100)), 0);
      return Math.round(sum / f.length);
    })();

    return {
      backgroundColor: 'transparent',
      title: { text: 'ESG Dimension Profile', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      radar: {
        indicator: [
          { name: 'Circularity', max: 100 }, { name: 'Engagement', max: 100 }, { name: 'Training', max: 100 }, { name: 'Offsets Quality', max: 100 }, { name: 'Compliance', max: 100 }
        ],
        splitArea: { areaStyle: { color: ['rgba(96,165,250,0.08)','rgba(96,165,250,0.04)'] } },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
        name: { textStyle: { color: palette.textSec } }
      },
      series: [
        {
          type: 'radar', areaStyle: { opacity: 0.2 }, lineStyle: { width: 2, color: palette.s1 }, itemStyle: { color: palette.s1 },
          data: [ { value: [circ, engage, train, offsetsQ, compAvg], name: 'Profile' } ]
        }
      ]
    };
  }

  function portfolioOption(): echarts.EChartsCoreOption {
    const p = getPortfolio();
    return {
      backgroundColor: 'transparent',
      title: { text: 'Abatement Portfolio (Cost vs Impact)', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      tooltip: { trigger: 'item', formatter: (p: any) => {
        const d = p.data; return `${d.name}<br/>Abatement: ${fmt(d.abatement)} tCO2e<br/>Cost: $${fmt(d.cost)}/t<br/>Payback: ${d.payback ?? '-'} yrs<br/>IRR: ${d.irr ?? '-'}%`;
      } },
      grid: { left: 20, right: 20, top: 50, bottom: 40 },
      xAxis: { name: 'Cost $/tCO2e', nameTextStyle: { color: palette.textSec }, axisLabel: { color: palette.textSec }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } } },
      yAxis: { name: 'Abatement (tCO2e)', nameTextStyle: { color: palette.textSec }, axisLabel: { color: palette.textSec }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } } },
      series: [
        {
          type: 'scatter', symbolSize: (val: any) => {
            const irr = val[2]; // encoded IRR for bubble sizing
            return Math.max(10, Math.min(50, (irr || 10)));
          },
          data: p.map((x) => ({
            value: [x.cost_per_tco2e ?? 0, x.abatement_tco2e ?? 0, x.irr ?? 12],
            name: x.name,
            abatement: x.abatement_tco2e ?? 0,
            cost: x.cost_per_tco2e ?? 0,
            payback: x.payback_years,
            irr: x.irr
          })),
          itemStyle: { color: palette.s2 },
          emphasis: { focus: 'series' }
        }
      ]
    };
  }

  function complianceBarsOption(): echarts.EChartsCoreOption {
    const f = getFrameworks();
    const names = f.map((x) => x.name);
    const vals = f.map((x) => Math.round((x.readiness ?? 0) * 100));
    return {
      backgroundColor: 'transparent',
      title: { text: 'Compliance Readiness', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      grid: { left: 80, right: 20, top: 40, bottom: 20 },
      xAxis: { type: 'value', max: 100, axisLabel: { color: palette.textSec, formatter: '{value}%' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } } },
      yAxis: { type: 'category', data: names, axisLabel: { color: palette.textSec } },
      series: [ { type: 'bar', data: vals, itemStyle: { color: palette.s3 }, label: { show: true, position: 'right', formatter: '{c}%' } } ]
    };
  }

  function supplyTreemapOption(): echarts.EChartsCoreOption {
    const cats = getSupplyCategories();
    const data = cats.map((c) => ({ name: `${c.name}`, value: Math.max(1, c.emissions_tco2e ?? 0), suppliers: c.suppliers ?? 0 }));
    return {
      backgroundColor: 'transparent',
      title: { text: 'Supply Chain Footprint', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      tooltip: { formatter: (p: any) => `${p.name}<br/>Emissions: ${fmt(p.value)} tCO2e<br/>Suppliers: ${fmt(p.data.suppliers)}` },
      series: [ { type: 'treemap', roam: true, nodeClick: false, label: { show: true }, data } ]
    };
  }

  function riskHeatOption(): echarts.EChartsCoreOption {
    const phys = deep?.riskResilience?.details?.physicalRisk ?? [];
    const trans = deep?.riskResilience?.details?.transitionRisk ?? [];
    const hazards = phys.map((r) => r.hazard);
    const scenarios = trans.map((r) => r.scenario);

    // Map qualitative exposure/impact into numeric 1..5
    function q2n(v: any) {
      if (typeof v === 'number') return v;
      const s = String(v || '').toLowerCase();
      if (s.includes('very high')) return 5;
      if (s.includes('high')) return 4;
      if (s.includes('med')) return 3;
      if (s.includes('low')) return 2;
      if (s.includes('very low')) return 1;
      return 3;
    }

    const data: Array<[number, number, number]> = [];
    hazards.forEach((h, i) => data.push([0, i, q2n((phys[i] as any)?.exposure)]));
    scenarios.forEach((s, i) => data.push([1, i, q2n((trans[i] as any)?.impact)]));

    return {
      backgroundColor: 'transparent',
      title: { text: 'Risk Heatmap', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      tooltip: { position: 'top' },
      grid: { left: 100, right: 20, top: 40, bottom: 40 },
      xAxis: { type: 'category', data: ['Physical', 'Transition'], splitArea: { show: false }, axisLabel: { color: palette.textSec } },
      yAxis: { type: 'category', data: [...hazards, ...scenarios.map((s) => `T: ${s}`)], axisLabel: { color: palette.textSec }, splitArea: { show: false } },
      visualMap: { min: 1, max: 5, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, textStyle: { color: palette.textSec } },
      series: [
        {
          name: 'Risk', type: 'heatmap',
          data: data.map((d) => [d[0], d[1], d[2]]),
          label: { show: false },
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        }
      ]
    };
  }

  function energyMixOption(): echarts.EChartsCoreOption {
    const mix = getEnergyMix();
    return {
      backgroundColor: 'transparent',
      title: { text: 'Energy Mix', left: 'center', top: 6, textStyle: { color: palette.textPri } },
      tooltip: { trigger: 'item', formatter: (p: any) => `${p.name}: ${Math.round((p.value || 0) * 100)}%` },
      legend: { bottom: 0, textStyle: { color: palette.textSec } },
      series: [
        {
          type: 'pie', radius: ['30%', '65%'], selectedMode: 'single',
          data: mix.map((m, i) => ({ value: m.share ?? 0, name: m.source })),
          animationDuration: 900
        }
      ]
    };
  }

  // ----------------------------
  // Mount / Update lifecycle
  // ----------------------------
  function buildAll() {
    disposeCharts();
    if (!deep) return;
    initChart(elScopesDonut, scopesDonutOption());
    initChart(elScopesHStack, scopesHStackOption());
    initChart(elTrendArea, trendAreaOption());
    initChart(elGauges, gaugesOption());
    initChart(elRadar, radarOption());
    initChart(elPortfolio, portfolioOption());
    initChart(elComplianceBars, complianceBarsOption());
    initChart(elSupplyTreemap, supplyTreemapOption());
    initChart(elRiskHeat, riskHeatOption());
    initChart(elEnergyMix, energyMixOption());
  }

  onMount(() => { buildAll(); });
  afterUpdate(() => { buildAll(); });
  onDestroy(() => disposeCharts());

  // ----------------------------
  // Export helpers (PNG / CSV)
  // ----------------------------
  function exportChartPNG(target: HTMLElement, filename = 'chart.png') {
    const inst = charts.find((c) => c.getDom() === target);
    if (!inst) return;
    const dataUrl = inst.getDataURL({ pixelRatio: 2, backgroundColor: palette.bg });
    const a = document.createElement('a');
    a.href = dataUrl; a.download = filename; a.click();
    a.remove();
    // If using file-saver: saveAs(dataUrl, filename);
  }

  function downloadCSV(rows: Array<Record<string, any>>, filename = 'data.csv') {
    if (!rows?.length) return;
    const headers = Object.keys(rows[0]);
    const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? '')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  // Data export sources
  function exportScopesCSV() {
    const { s1, s2, s3, total } = getScopes();
    downloadCSV([
      { metric: 'Scope 1 (tCO2e)', value: s1 },
      { metric: 'Scope 2 (tCO2e)', value: s2 },
      { metric: 'Scope 3 (tCO2e)', value: s3 },
      { metric: 'Total (tCO2e)', value: total },
    ], 'scopes.csv');
  }

  function exportPortfolioCSV() {
    const p = getPortfolio();
    downloadCSV(p.map((x) => ({ name: x.name, abatement_tco2e: x.abatement_tco2e, cost_per_tco2e: x.cost_per_tco2e, payback_years: x.payback_years, irr: x.irr })), 'portfolio.csv');
  }

  function exportFrameworksCSV() {
    const f = getFrameworks();
    downloadCSV(f.map((x) => ({ framework: x.name, readiness_pct: Math.round((x.readiness ?? 0) * 100), gaps: (x.gaps || []).join('; ') })), 'compliance.csv');
  }
</script>

{#if deep}
<div class="deep-analytics pro">
  <div class="header">
    <div>
      <h2>Deep Analytics</h2>
      <div class="meta">{deep.meta.industry || 'Industry'} • {new Date(deep.meta.generatedAt).toLocaleString()}</div>
    </div>

    <div class="actions">
      <button class="btn ghost" on:click={exportScopesCSV} title="Export Scopes CSV">Export Scopes</button>
      <button class="btn ghost" on:click={exportPortfolioCSV} title="Export Portfolio CSV">Export Portfolio</button>
      <button class="btn ghost" on:click={exportFrameworksCSV} title="Export Compliance CSV">Export Compliance</button>
    </div>
  </div>

  <!-- Emissions & Resource Intelligence -->
  <section class="module glow">
    <div class="module-head">
      <h3>Emissions & Resource Intelligence</h3>
      <p class="summary">{deep.emissionsResource?.summary}</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi">
        <label>Scope 1</label>
        <div class="value">{fmt(deep.emissionsResource?.kpis?.scope1_tco2e)}<span class="unit"> tCO2e</span></div>
      </div>
      <div class="kpi">
        <label>Scope 2</label>
        <div class="value">{fmt(deep.emissionsResource?.kpis?.scope2_tco2e)}<span class="unit"> tCO2e</span></div>
      </div>
      <div class="kpi">
        <label>Scope 3</label>
        <div class="value">{fmt(deep.emissionsResource?.kpis?.scope3_tco2e)}<span class="unit"> tCO2e</span></div>
      </div>
      <div class="kpi">
        <label>Intensity / Unit</label>
        <div class="value">{fmt(deep.emissionsResource?.details?.intensity?.per_unit)}<span class="unit"> kWh/unit</span></div>
      </div>
      <div class="kpi">
        <label>Intensity / Revenue</label>
        <div class="value">{fmt(deep.emissionsResource?.details?.intensity?.per_revenue)}<span class="unit"> kWh per $k</span></div>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-head">
          <span>Scopes Donut</span>
          <div class="tools">
            <button class="btn xs" on:click={() => exportChartPNG(elScopesDonut, 'scopes-donut.png')}>PNG</button>
          </div>
        </div>
        <div bind:this={elScopesDonut} class="echart h-320"></div>
      </div>

      <div class="chart-card">
        <div class="chart-head">
          <span>Scopes Stacked</span>
          <div class="tools">
            <button class="btn xs" on:click={() => exportChartPNG(elScopesHStack, 'scopes-stacked.png')}>PNG</button>
          </div>
        </div>
        <div bind:this={elScopesHStack} class="echart h-160"></div>
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-head">
        <span>Emissions Trend</span>
        <div class="tools">
          <button class="btn xs" on:click={() => exportChartPNG(elTrendArea, 'emissions-trend.png')}>PNG</button>
        </div>
      </div>
      <div bind:this={elTrendArea} class="echart h-280"></div>
    </div>

    {#if deep.emissionsResource?.recommendations?.length}
      <div class="recs">
        <div class="recs-head">AI Recommendations</div>
        <ul>
          {#each deep.emissionsResource?.recommendations as r}
            <li>{r}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>

  <!-- Targets, Planning & Optimization -->
  <section class="module">
    <div class="module-head">
      <h3>Targets, Planning & Optimization</h3>
      <p class="summary">{deep.targetsPlanning?.summary}</p>
    </div>

    <div class="mini-grid">
      <div class="mini-kpi">
        <label>SBTi Ready</label>
        <div class="pill {deep.targetsPlanning?.details?.sbtiReady ? 'ok' : 'no'}">{deep.targetsPlanning?.details?.sbtiReady ? 'Yes' : 'No'}</div>
      </div>
      <div class="mini-kpi">
        <label>Internal Carbon Price</label>
        <div class="badge">${fmt(deep.targetsPlanning?.details?.internalCarbonPrice)}</div>
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-head">
        <span>Abatement Portfolio</span>
        <div class="tools">
          <button class="btn xs" on:click={() => exportChartPNG(elPortfolio, 'portfolio.png')}>PNG</button>
        </div>
      </div>
      <div bind:this={elPortfolio} class="echart h-320"></div>
    </div>

    {#if deep.targetsPlanning?.details?.portfolio?.length}
      <div class="table">
        <div class="t-head">
          <div>Initiative</div><div>Abatement (tCO2e)</div><div>$/tCO2e</div><div>Payback (yrs)</div><div>IRR</div>
        </div>
        {#each deep.targetsPlanning.details.portfolio as p}
          <div class="t-row">
            <div>{p.name}</div>
            <div>{fmt(p.abatement_tco2e)}</div>
            <div>{fmt(p.cost_per_tco2e)}</div>
            <div>{p.payback_years ?? '-'}</div>
            <div>{p.irr ? p.irr + '%': '-'}</div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Compliance & Reporting -->
  <section class="module">
    <div class="module-head">
      <h3>Compliance & Reporting</h3>
      <p class="summary">{deep.complianceReporting?.summary}</p>
    </div>

    <div class="chart-card">
      <div class="chart-head">
        <span>Framework Readiness</span>
        <div class="tools">
          <button class="btn xs" on:click={() => exportChartPNG(elComplianceBars, 'compliance.png')}>PNG</button>
        </div>
      </div>
      <div bind:this={elComplianceBars} class="echart h-320"></div>
    </div>

    {#if deep.complianceReporting?.details?.frameworks?.length}
      <div class="table">
        <div class="t-head">
          <div>Framework</div><div>Readiness</div><div>Gaps</div>
        </div>
        {#each deep.complianceReporting.details.frameworks as f}
          <div class="t-row">
            <div>{f.name}</div>
            <div>{Math.round((f.readiness ?? 0) * 100)}%</div>
            <div>{f.gaps?.join(', ')}</div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Supply Chain & Supplier Engagement -->
  <section class="module">
    <div class="module-head">
      <h3>Supply Chain & Supplier Engagement</h3>
      <p class="summary">{deep.supplyChain?.summary}</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi"><label>Suppliers</label><div class="value">{fmt(deep.supplyChain?.details?.suppliers)}</div></div>
      <div class="kpi"><label>Primary Data</label><div class="value">{fmtPct(deep.supplyChain?.details?.primaryDataShare)}</div></div>
    </div>

    <div class="chart-card">
      <div class="chart-head">
        <span>Priority Categories Treemap</span>
        <div class="tools">
          <button class="btn xs" on:click={() => exportChartPNG(elSupplyTreemap, 'supply-treemap.png')}>PNG</button>
        </div>
      </div>
      <div bind:this={elSupplyTreemap} class="echart h-360"></div>
    </div>

    {#if deep.supplyChain?.details?.priorityCategories?.length}
      <div class="tags">
        {#each deep.supplyChain.details.priorityCategories as c}
          <span class="tag">{c}</span>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Risk & Resilience -->
  <section class="module">
    <div class="module-head">
      <h3>Risk & Resilience</h3>
      <p class="summary">{deep.riskResilience?.summary}</p>
    </div>

    <div class="chart-card">
      <div class="chart-head">
        <span>Physical & Transition Risk</span>
        <div class="tools">
          <button class="btn xs" on:click={() => exportChartPNG(elRiskHeat, 'risk-heatmap.png')}>PNG</button>
        </div>
      </div>
      <div bind:this={elRiskHeat} class="echart h-320"></div>
    </div>
  </section>

  <!-- Energy & Offsets -->
  <section class="module">
    <div class="module-head">
      <h3>Energy & Offsets</h3>
      <p class="summary">{deep.energyOffsets?.summary}</p>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-head">
          <span>Renewables & 24/7 CFE</span>
          <div class="tools">
            <button class="btn xs" on:click={() => exportChartPNG(elGauges, 'energy-gauges.png')}>PNG</button>
          </div>
        </div>
        <div bind:this={elGauges} class="echart h-260"></div>
      </div>

      <div class="chart-card">
        <div class="chart-head">
          <span>Energy Mix</span>
          <div class="tools">
            <button class="btn xs" on:click={() => exportChartPNG(elEnergyMix, 'energy-mix.png')}>PNG</button>
          </div>
        </div>
        <div bind:this={elEnergyMix} class="echart h-260"></div>
      </div>
    </div>
  </section>

  <!-- Nature & Circularity / People & Culture -->
  <section class="split">
    <div class="module">
      <div class="module-head">
        <h3>Nature & Circularity</h3>
        <p class="summary">{deep.natureCircularity?.summary}</p>
      </div>
      <div class="kpi-grid">
        <div class="kpi"><label>Circularity</label><div class="value">{fmtInt(deep.natureCircularity?.details?.circularityScore)}<span class="unit">/100</span></div></div>
        <div class="kpi"><label>Water Risk</label><div class="value">{deep.natureCircularity?.details?.waterRisk}</div></div>
        <div class="kpi"><label>TNFD Ready</label><div class="value">{deep.natureCircularity?.details?.tnfdReady ? 'Yes' : 'No'}</div></div>
      </div>
    </div>

    <div class="module">
      <div class="module-head">
        <h3>People & Culture</h3>
        <p class="summary">{deep.peopleCulture?.summary}</p>
      </div>
      <div class="kpi-grid">
        <div class="kpi"><label>Engagement</label><div class="value">{fmtInt(deep.peopleCulture?.details?.engagementIndex)}<span class="unit">/100</span></div></div>
        <div class="kpi"><label>Training Coverage</label><div class="value">{fmtPct(deep.peopleCulture?.details?.trainingCoverage)}</div></div>
      </div>
    </div>
  </section>

  <section class="module">
    <div class="module-head">
      <h3>Cross-Domain Radar</h3>
      <p class="summary">A compact profile across Circularity, Engagement, Training, Offsets Quality, and Compliance readiness averaged.</p>
    </div>
    <div class="chart-card">
      <div class="chart-head">
        <span>ESG Profile</span>
        <div class="tools">
          <button class="btn xs" on:click={() => exportChartPNG(elRadar, 'esg-radar.png')}>PNG</button>
        </div>
      </div>
      <div bind:this={elRadar} class="echart h-320"></div>
    </div>
  </section>
</div>
{:else}
<div class="deep-analytics pro">
  <div class="empty">
    <h3>Deep Analytics</h3>
    <p>Run a new assessment to generate enterprise-grade analytics.</p>
  </div>
</div>
{/if}

<style>
  :global(:root) {
    --bg: #0b1020;
    --card: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.1);
    --textPri: #e9eefc;
    --textSec: rgba(233,238,252,0.75);
    --glow1: rgba(96,165,250,0.25);
    --glow2: rgba(52,211,153,0.25);
  }

  .deep-analytics.pro { display: flex; flex-direction: column; gap: 18px; }
  .header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .header h2 { margin: 0; font-size: 1.6rem; color: var(--textPri); letter-spacing: .2px; }
  .meta { color: var(--textSec); font-size: .9rem; margin-top: 4px; }

  .actions { display: flex; gap: 8px; }
  .btn { background: var(--card); color: var(--textPri); border: 1px solid var(--border); padding: 8px 12px; border-radius: 10px; cursor: pointer; transition: 160ms ease; }
  .btn:hover { transform: translateY(-1px); box-shadow: 0 8px 30px -12px var(--glow1); }
  .btn.ghost { background: transparent; }
  .btn.xs { padding: 4px 8px; font-size: .8rem; }

  .module { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px; position: relative; overflow: hidden; }
  .module.glow::before {
    content: ""; position: absolute; inset: -40%; background: radial-gradient(600px 200px at 20% -10%, var(--glow1), transparent 60%), radial-gradient(500px 200px at 120% 0%, var(--glow2), transparent 60%);
    filter: blur(18px); opacity: .6; pointer-events: none;
  }
  .module-head h3 { margin: 0 0 6px 0; color: var(--textPri); }
  .summary { color: var(--textSec); }

  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-top: 10px; }
  .kpi { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 12px; }
  .kpi label { font-size: .8rem; color: var(--textSec); }
  .kpi .value { font-weight: 700; font-size: 1.25rem; color: var(--textPri); }
  .unit { margin-left: 4px; font-size: .8rem; color: var(--textSec); }

  .charts-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 12px; }
  @media (max-width: 900px){ .charts-row{ grid-template-columns: 1fr; } }

  .chart-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 10px; }
  .chart-head { display:flex; align-items:center; justify-content:space-between; color: var(--textSec); padding: 0 4px 8px 4px; font-size: .9rem; }
  .tools { display:flex; gap: 6px; }
  .echart { width: 100%; background: transparent; }
  .h-160 { height: 160px; } .h-200 { height: 200px; } .h-240 { height: 240px; } .h-260 { height: 260px; } .h-280 { height: 280px; } .h-320 { height: 320px; } .h-360 { height: 360px; }

  .mini-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-top: 12px; }
  .mini-kpi label { display:block; color: var(--textSec); font-size: .8rem; margin-bottom: 6px; }
  .pill { display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border-radius: 999px; font-weight: 600; border: 1px solid var(--border); }
  .pill.ok { color: #10b981; background: rgba(16,185,129,0.12); }
  .pill.no { color: #f43f5e; background: rgba(244,63,94,0.12); }
  .badge { display:inline-block; padding:6px 10px; border-radius: 10px; background: rgba(96,165,250,0.15); color: var(--textPri); border: 1px solid rgba(96,165,250,0.35); font-weight: 700; }

  .table { display: grid; gap: 6px; margin-top: 10px; }
  .t-head, .t-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 8px; padding: 10px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: var(--textPri); }
  .t-head { font-weight: 700; color: var(--textSec); }

  .tags { display:flex; gap:8px; margin-top: 10px; flex-wrap: wrap; }
  .tag { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); padding: 6px 10px; border-radius: 999px; color: var(--textPri); }

  .split { display:grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 900px){ .split{ grid-template-columns: 1fr; } }

  .recs { margin-top: 12px; }
  .recs-head { color: var(--textPri); font-weight: 700; margin-bottom: 6px; }
  .recs ul { margin: 0; padding-left: 18px; color: var(--textSec); }

  .empty { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; text-align: center; }
</style>

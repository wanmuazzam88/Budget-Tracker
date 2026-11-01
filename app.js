const STORAGE_KEY = 'personal_money_tracker_live_v4';

const DEFAULT_STATE = {
  cycle: 'October 2026 — November 2026',
  status: 'Active',
  monthlyBudget: 0.00,
  categories: [
    { id: 'Food', label: 'Food', allocated: 0.00 },
    { id: 'Cloth', label: 'Cloth', allocated: 0.00 },
    { id: 'Grab', label: 'Grab', allocated: 0.00 },
    { id: 'Other items', label: 'Other items', allocated: 0.00 }
  ],
  transactions: [],
  savingsPlatforms: [
    {
      id: 'versa',
      name: 'Versa',
      tag: 'Cash Management • 3.7% p.a.',
      color: '#2563EB',
      tint: '#EFF6FF',
      balance: 0.00,
      target: 0.00
    },
    {
      id: 'shopee',
      name: 'Shopee',
      tag: 'ShopeePay / MariBank High-Yield',
      color: '#EE4D2D',
      tint: '#FFF1EE',
      balance: 0.00,
      target: 0.00
    }
  ],
  savingsRecords: [],
  pastPerformance: []
};

const CATEGORY_META = {
  'Savings': {
    key: 'savings',
    color: '#059669',
    tint: '#ECFDF5',
    border: 'rgba(5, 150, 105, 0.22)',
    text: '#047857'
  },
  'Food': {
    key: 'food',
    color: '#F59E0B',
    tint: '#FFFBEB',
    border: 'rgba(245, 158, 11, 0.22)',
    text: '#B45309'
  },
  'Cloth': {
    key: 'cloth',
    color: '#8B5CF6',
    tint: '#F5F3FF',
    border: 'rgba(139, 92, 246, 0.22)',
    text: '#6D28D9'
  },
  'Grab': {
    key: 'grab',
    color: '#10B981',
    tint: '#ECFDF5',
    border: 'rgba(16, 185, 129, 0.22)',
    text: '#047857'
  },
  'Other items': {
    key: 'other',
    color: '#EC4899',
    tint: '#FDF2F8',
    border: 'rgba(236, 72, 153, 0.22)',
    text: '#BE185D'
  },
  'Event / Competition': {
    key: 'savings',
    color: '#059669',
    tint: '#ECFDF5',
    border: 'rgba(5, 150, 105, 0.22)',
    text: '#047857'
  }
};

function getCategoryMeta(catId) {
  return CATEGORY_META[catId] || CATEGORY_META['Other items'];
}

function getPlatformSvg(platformId, size = 18) {
  const pId = String(platformId || '').toLowerCase();
  const attrs = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
  if (pId.includes('versa')) {
    return `<svg ${attrs}>
      <path d="m4 6 8 13 8-13"></path>
      <path d="M8 6h8"></path>
    </svg>`;
  } else if (pId.includes('shopee')) {
    return `<svg ${attrs}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <path d="M3 6h18"></path>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>`;
  } else {
    return `<svg ${attrs}>
      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
      <path d="M16 13h.01"></path>
      <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path>
    </svg>`;
  }
}

/**
 * Custom bespoke SVG icons for each category and action
 */
function getCategorySvg(categoryId, size = 16) {
  const attrs = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"`;
  switch (categoryId) {
    case 'Savings':
    case 'Event / Competition':
      return `<svg ${attrs}>
        <path d="M7 20h10"></path>
        <path d="M10 20c5.5-2.5.8-6.4 3-13"></path>
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"></path>
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"></path>
      </svg>`;
    case 'Food':
      return `<svg ${attrs}>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
      </svg>`;
    case 'Cloth':
      return `<svg ${attrs}>
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
      </svg>`;
    case 'Grab':
      return `<svg ${attrs}>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
        <circle cx="7" cy="17" r="2"></circle>
        <path d="M9 17h6"></path>
        <circle cx="17" cy="17" r="2"></circle>
      </svg>`;
    case 'Other items':
    default:
      return `<svg ${attrs}>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
        <path d="m3.3 7 8.7 5 8.7-5"></path>
        <path d="M12 22V12"></path>
      </svg>`;
  }
}

const CLOSE_ICON_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

let appState = loadState();
let selectedCategoryFilter = 'ALL';
let isBalanceHidden = false;
try {
  isBalanceHidden = localStorage.getItem('money_tracker_balance_hidden') === 'true';
} catch {
  isBalanceHidden = false;
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let state = raw ? JSON.parse(raw) : cloneDefaultState();
    if (!state || !Array.isArray(state.categories) || !Array.isArray(state.transactions)) {
      state = cloneDefaultState();
    }
    // Ensure savings platforms and records exist
    if (!Array.isArray(state.savingsPlatforms) || state.savingsPlatforms.length === 0) {
      state.savingsPlatforms = cloneDefaultState().savingsPlatforms;
    }
    if (!Array.isArray(state.savingsRecords)) {
      state.savingsRecords = [];
    }
    // Ensure pastPerformance exists
    if (!Array.isArray(state.pastPerformance)) {
      state.pastPerformance = [];
    }
    // Remove 'Savings' from expense categories if present
    if (Array.isArray(state.categories)) {
      state.categories = state.categories.filter(
        (c) => c.id !== 'Savings' && c.label !== 'Savings'
      );
    }
    // Migrate any legacy 'Savings' transactions to 'Other items'
    if (Array.isArray(state.transactions)) {
      state.transactions.forEach((tx) => {
        if (tx.category === 'Savings') {
          tx.category = 'Other items';
        }
      });
    }
    // Ensure monthlyBudget is a valid number
    if (typeof state.monthlyBudget !== 'number' || isNaN(state.monthlyBudget)) {
      const catSum = (state.categories || []).reduce((acc, c) => acc + Number(c.allocated || 0), 0);
      state.monthlyBudget = catSum > 0 ? catSum : 0.00;
    }
    // Strip out legacy demo transactions
    state.transactions = state.transactions.filter(
      (tx) => !['tx-1', 'tx-2', 'tx-3', 'tx-4', 'tx-5'].includes(tx.id)
    );
    // Strip out legacy demo savings records
    state.savingsRecords = state.savingsRecords.filter(
      (r) => !['sav-1', 'sav-2', 'sav-3'].includes(r.id)
    );
    // Strip out legacy mock past performance
    state.pastPerformance = state.pastPerformance.filter(
      (p) => !['2026-09', '2026-08', '2026-07'].includes(p.month)
    );
    // If platforms still hold legacy mock numbers, reset balance to 0
    if (Array.isArray(state.savingsPlatforms)) {
      state.savingsPlatforms.forEach((p) => {
        if (p.id === 'versa' && p.balance === 1450) p.balance = 0;
        if (p.id === 'shopee' && p.balance === 620) p.balance = 0;
      });
    }
    return state;
  } catch {
    return cloneDefaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch {
    // ignore storage errors
  }
}

function formatNumber(num) {
  return Number(num || 0).toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatRM(num) {
  const val = Number(num || 0);
  if (val < 0) {
    return `-RM ${formatNumber(Math.abs(val))}`;
  }
  return `RM ${formatNumber(val)}`;
}

function computeMetrics() {
  const catAllocTotal = appState.categories.reduce((acc, c) => acc + Number(c.allocated || 0), 0);
  const directBudget = Number(appState.monthlyBudget || 0);
  const totalBudget = Math.max(directBudget, catAllocTotal);
  const totalSpent = appState.transactions.reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const balanceLeft = totalBudget - totalSpent;
  const remainingCapPct = totalBudget > 0 ? (balanceLeft / totalBudget) * 100 : 0;

  const categoryMap = {};
  appState.categories.forEach((cat) => {
    categoryMap[cat.id] = {
      ...cat,
      spent: 0,
      remaining: cat.allocated,
      pctRaw: 0,
      pctRounded: 0
    };
  });

  appState.transactions.forEach((tx) => {
    if (categoryMap[tx.category]) {
      categoryMap[tx.category].spent += Number(tx.amount || 0);
    }
  });

  const categoryRows = appState.categories.map((cat) => {
    const entry = categoryMap[cat.id];
    entry.remaining = entry.allocated - entry.spent;
    entry.pctRaw = entry.allocated > 0 ? (entry.spent / entry.allocated) * 100 : 0;
    entry.pctRounded = Math.round(entry.pctRaw);
    return entry;
  });

  const platforms = Array.isArray(appState.savingsPlatforms) ? appState.savingsPlatforms : [];
  const records = Array.isArray(appState.savingsRecords) ? appState.savingsRecords : [];
  const totalSavings = platforms.reduce((acc, p) => acc + Number(p.balance || 0), 0);
  const platformsCount = platforms.length;
  const thisMonthDeposits = records
    .filter((r) => r.type === 'deposit')
    .reduce((acc, r) => acc + Number(r.amount || 0), 0);
  const thisMonthWithdrawals = records
    .filter((r) => r.type === 'withdraw')
    .reduce((acc, r) => acc + Number(r.amount || 0), 0);
  const netSavingsThisMonth = thisMonthDeposits - thisMonthWithdrawals;

  return {
    totalBudget,
    totalSpent,
    balanceLeft,
    remainingCapPct,
    categoryRows,
    categoryMap,
    totalSavings,
    platformsCount,
    thisMonthDeposits,
    thisMonthWithdrawals,
    netSavingsThisMonth
  };
}

function renderApp() {
  const m = computeMetrics();

  // 1. Hero Balance & Radial Gauge
  const isBudgetSet = m.totalBudget > 0;
  const isBlueZone = isBudgetSet ? m.remainingCapPct > 20 : true;
  const capFormatted = isBudgetSet ? `${m.remainingCapPct.toFixed(1)}%` : '0.0%';

  const heroCard = document.getElementById('balance-hero-card');
  heroCard.classList.toggle('pink-zone-alert', isBudgetSet && !isBlueZone);

  const heroBalEl = document.getElementById('hero-balance-amount');
  if (heroBalEl) heroBalEl.textContent = formatRM(m.balanceLeft);

  document.getElementById('hero-spent-amount').textContent = formatRM(m.totalSpent);
  document.getElementById('hero-budget-amount').textContent = formatRM(m.totalBudget);
  const metricCapEl = document.getElementById('metric-remaining-cap');
  if (metricCapEl) {
    metricCapEl.textContent = capFormatted;
    metricCapEl.className = `stat-value ${isBlueZone ? 'text-blue' : 'text-pink'}`;
  }
  document.getElementById('hero-zone-text').textContent = isBudgetSet ? (isBlueZone ? 'Blue Zone' : 'Low Capacity') : 'Set Budget';

  // SVG Gauge (r = 75 -> circumference = 471.24)
  const circumference = 2 * Math.PI * 75;
  const clampedPct = isBudgetSet ? Math.max(0, Math.min(100, m.remainingCapPct)) : 0;
  const dashOffset = circumference * (1 - clampedPct / 100);
  const gaugeCircle = document.getElementById('gauge-fill-circle');
  if (gaugeCircle) {
    gaugeCircle.style.strokeDasharray = `${circumference.toFixed(2)}`;
    gaugeCircle.style.strokeDashoffset = `${dashOffset.toFixed(2)}`;
  }

  // Update inside the circle with hide/reveal support
  updateBalanceVisibilityUI(m);

  // 2. Guardrails Strip
  renderGuardrails(m);

  // 3. Recent Activity (Overview Tab)
  renderRecentActivity();

  // 4. Categories List
  renderCategories(m);

  // 5. Savings Tracker
  renderSavingsTracker(m);

  // 6. Settings Budget Allocations & Past Performance
  renderSettingsBudgets();
  renderSettingsPerformance(m);

  // 7. Update Simulator if open
  updateSimulatorPreview(m);
}

function updateBalanceVisibilityUI(m) {
  if (!m) m = computeMetrics();
  const valEl = document.getElementById('gauge-balance-text');
  const currencyEl = document.querySelector('.gauge-currency');
  const eyeBtn = document.getElementById('btn-toggle-balance');
  const eyeOpenIcon = document.querySelector('.eye-open-icon');
  const eyeOffIcon = document.querySelector('.eye-off-icon');
  const eyeBtnText = document.querySelector('.eye-btn-text');

  if (isBalanceHidden) {
    if (valEl) {
      valEl.textContent = '••••••';
      valEl.classList.add('is-hidden');
    }
    if (currencyEl) currencyEl.textContent = 'RM';
    if (eyeBtn) {
      eyeBtn.setAttribute('title', 'Show balance');
      eyeBtn.setAttribute('aria-label', 'Show balance');
    }
    if (eyeBtnText) eyeBtnText.textContent = 'Show';
    if (eyeOpenIcon) eyeOpenIcon.classList.add('hidden');
    if (eyeOffIcon) eyeOffIcon.classList.remove('hidden');
  } else {
    const rawBal = formatNumber(Math.abs(m.balanceLeft));
    const prefix = m.balanceLeft < 0 ? '-' : '';
    const fullText = `${prefix}${rawBal}`;
    if (valEl) {
      valEl.textContent = fullText;
      valEl.classList.remove('is-hidden');
      if (fullText.length > 10) {
        valEl.style.fontSize = '0.96rem';
      } else if (fullText.length > 8) {
        valEl.style.fontSize = '1.06rem';
      } else {
        valEl.style.fontSize = '1.18rem';
      }
    }
    if (currencyEl) currencyEl.textContent = 'RM';
    if (eyeBtn) {
      eyeBtn.setAttribute('title', 'Hide balance');
      eyeBtn.setAttribute('aria-label', 'Hide balance');
    }
    if (eyeBtnText) eyeBtnText.textContent = 'Hide';
    if (eyeOpenIcon) eyeOpenIcon.classList.remove('hidden');
    if (eyeOffIcon) eyeOffIcon.classList.add('hidden');
  }
}

function toggleBalanceVisibility() {
  isBalanceHidden = !isBalanceHidden;
  try {
    localStorage.setItem('money_tracker_balance_hidden', isBalanceHidden ? 'true' : 'false');
  } catch {
    // ignore
  }
  updateBalanceVisibilityUI();
  showToast(isBalanceHidden ? 'Balance hidden' : 'Balance visible');
}

function updateSettingsLiveTotal() {
  const totalEl = document.getElementById('settings-budget-total-val');
  if (!totalEl) return;
  const m = computeMetrics();
  totalEl.textContent = formatRM(m.totalBudget);
}

function renderSettingsBudgets() {
  const m = computeMetrics();
  const totalEl = document.getElementById('settings-budget-total-val');
  if (totalEl) {
    totalEl.textContent = formatRM(m.totalBudget);
  }

  const directInput = document.getElementById('setting-input-total-budget');
  if (directInput && document.activeElement !== directInput) {
    const curVal = Number(appState.monthlyBudget || m.totalBudget || 0);
    directInput.value = curVal > 0 ? curVal.toFixed(2) : '';
  }

  const form = document.getElementById('form-settings-budgets');
  if (!form) return;
  form.innerHTML = appState.categories
    .map((c, idx) => {
      const meta = getCategoryMeta(c.id);
      const allocVal = Number(c.allocated || 0);
      return `
        <div class="settings-alloc-row">
          <div class="settings-alloc-left">
            <span class="tx-icon-box tx-box-${meta.key}">${getCategorySvg(c.id, 14)}</span>
            <span class="settings-alloc-name" style="color: ${meta.color};">${escapeHtml(c.label)}</span>
          </div>
          <div class="amount-field settings-alloc-input-wrap">
            <span class="currency-prefix">RM</span>
            <input type="number" data-settings-cat-idx="${idx}" class="input-clean input-num" inputmode="decimal" step="any" min="0" value="${allocVal > 0 ? allocVal.toFixed(2) : ''}" placeholder="0.00" aria-label="${escapeHtml(c.label)} budget allocation" />
          </div>
        </div>
      `;
    })
    .join('');

  if (!form.dataset.hasInputListener) {
    form.addEventListener('input', () => {
      const inputs = document.querySelectorAll('#form-settings-budgets [data-settings-cat-idx]');
      let catSum = 0;
      inputs.forEach((inp) => {
        const val = parseFloat(inp.value.trim());
        if (!isNaN(val) && val > 0) catSum += val;
      });
      const curMonthly = Number(appState.monthlyBudget || 0);
      const effective = Math.max(curMonthly, catSum);
      if (totalEl) totalEl.textContent = formatRM(effective);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const saveBtn = document.getElementById('btn-save-settings-budgets');
      if (saveBtn) saveBtn.click();
    });

    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const saveBtn = document.getElementById('btn-save-settings-budgets');
        if (saveBtn) saveBtn.click();
      }
    });

    form.dataset.hasInputListener = 'true';
  }
}

function formatMonthYearLabel(ym) {
  if (!ym) return '';
  const parts = ym.split('-');
  if (parts.length < 2) return ym;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const date = new Date(y, m - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatShortMonthLabel(ym) {
  if (!ym) return '';
  const parts = ym.split('-');
  if (parts.length < 2) return ym;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const date = new Date(y, m - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function getMonthlyPerformanceList(m) {
  const map = {};

  // 1. Seed with past archived months
  const past = Array.isArray(appState.pastPerformance) ? appState.pastPerformance : [];
  past.forEach((p) => {
    if (!p.month) return;
    map[p.month] = {
      month: p.month,
      label: p.label || formatMonthYearLabel(p.month),
      saved: Number(p.saved || 0),
      spent: Number(p.spent || 0),
      isCurrent: false
    };
  });

  // 2. Aggregate live transactions
  const txs = Array.isArray(appState.transactions) ? appState.transactions : [];
  txs.forEach((tx) => {
    const ym = (tx.date || '').slice(0, 7);
    if (!ym || ym.length < 7) return;
    if (!map[ym]) {
      map[ym] = {
        month: ym,
        label: formatMonthYearLabel(ym),
        saved: 0,
        spent: 0,
        isCurrent: false
      };
    }
    map[ym].spent += Number(tx.amount || 0);
  });

  // 3. Aggregate live savings records
  const savs = Array.isArray(appState.savingsRecords) ? appState.savingsRecords : [];
  savs.forEach((r) => {
    const ym = (r.date || '').slice(0, 7);
    if (!ym || ym.length < 7) return;
    if (!map[ym]) {
      map[ym] = {
        month: ym,
        label: formatMonthYearLabel(ym),
        saved: 0,
        spent: 0,
        isCurrent: false
      };
    }
    const amt = Number(r.amount || 0);
    if (r.type === 'withdraw') {
      map[ym].saved = Math.max(0, map[ym].saved - amt);
    } else {
      map[ym].saved += amt;
    }
  });

  // 4. Mark current active month
  const keys = Object.keys(map).sort().reverse();
  const currentKey = keys.find((k) => k === '2026-10') || keys[0];
  if (currentKey && map[currentKey]) {
    map[currentKey].isCurrent = true;
  }

  return keys.map((k) => map[k]);
}

function renderSettingsPerformance(m) {
  const container = document.getElementById('settings-past-perf-list');
  if (!container) return;

  const monthList = getMonthlyPerformanceList(m);
  if (!monthList || monthList.length === 0) {
    container.innerHTML = `<div class="sav-empty-state">No monthly records available yet.</div>`;
    return;
  }

  container.innerHTML = monthList
    .map((item) => {
      const isCur = Boolean(item.isCurrent);
      return `
        <div class="perf-row ${isCur ? 'perf-row-current' : ''}">
          <div class="perf-col-month">
            <span class="perf-month-text perf-month-full">${escapeHtml(item.label)}</span>
            <span class="perf-month-text perf-month-short">${escapeHtml(formatShortMonthLabel(item.month))}</span>
            ${isCur ? '<span class="perf-active-dot" title="Active Cycle" aria-label="Active cycle"></span>' : ''}
          </div>
          <div class="perf-col-saved">
            <span class="perf-val-saved">${formatRM(item.saved)}</span>
          </div>
          <div class="perf-col-spent">
            <span class="perf-val-spent">${formatRM(item.spent)}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

function initAssistiveTouch() {
  const el = document.getElementById('assistive-touch-btn');
  if (!el) return;

  let isDragging = false;
  let startPointerX = 0;
  let startPointerY = 0;
  let initialLeft = 0;
  let initialTop = 0;
  let hasMoved = false;

  const getMargin = () => (window.innerWidth <= 768 ? 8 : 12);
  const getMinY = () => 16;
  const getMaxY = () => {
    const bottomNav = document.querySelector('.bottom-nav');
    const bottomNavHeight = bottomNav ? bottomNav.offsetHeight : 70;
    const btnHeight = el.offsetHeight || 56;
    return Math.max(getMinY(), window.innerHeight - btnHeight - (bottomNavHeight + 12));
  };

  function snapToSide(isLeft, targetY, animate = true) {
    const margin = getMargin();
    const btnWidth = el.offsetWidth || 56;
    const minY = getMinY();
    const maxY = getMaxY();

    const targetLeft = isLeft ? margin : (window.innerWidth - btnWidth - margin);
    const clampedTop = Math.max(minY, Math.min(maxY, targetY));

    el.classList.toggle('docked-left', isLeft);
    el.classList.toggle('docked-right', !isLeft);

    if (!animate) {
      el.classList.add('no-transition');
      el.style.left = `${targetLeft}px`;
      el.style.top = `${clampedTop}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      void el.offsetWidth; // Force synchronous reflow
      el.classList.remove('no-transition');
    } else {
      el.style.left = `${targetLeft}px`;
      el.style.top = `${clampedTop}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
    }

    try {
      localStorage.setItem(
        'money_tracker_assistive_touch_side',
        JSON.stringify({
          side: isLeft ? 'left' : 'right',
          topRatio: clampedTop / Math.max(1, window.innerHeight),
          top: Math.round(clampedTop)
        })
      );
    } catch {
      // ignore
    }
  }

  // Restore saved side preference & position from localStorage
  const savedState = localStorage.getItem('money_tracker_assistive_touch_side');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      const isLeft = parsed.side === 'left';
      let targetY;
      if (typeof parsed.topRatio === 'number') {
        targetY = Math.round(parsed.topRatio * window.innerHeight);
      } else if (typeof parsed.top === 'number') {
        targetY = parsed.top;
      } else {
        targetY = window.innerHeight - (window.innerWidth <= 768 ? 160 : 180);
      }
      snapToSide(isLeft, targetY, false);
    } catch {
      snapToSide(false, window.innerHeight - 180, false);
    }
  } else {
    // Check legacy pos if any
    const legacyPos = localStorage.getItem('money_tracker_assistive_touch_pos');
    if (legacyPos) {
      try {
        const parsed = JSON.parse(legacyPos);
        const isLeft = parsed.left < window.innerWidth / 2;
        snapToSide(isLeft, parsed.top || (window.innerHeight - 180), false);
      } catch {
        snapToSide(false, window.innerHeight - (window.innerWidth <= 768 ? 160 : 180), false);
      }
    } else {
      // Default: snap to right side above bottom nav
      const defaultY = window.innerHeight - (window.innerWidth <= 768 ? 160 : 180);
      snapToSide(false, defaultY, false);
    }
  }

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;

    isDragging = true;
    hasMoved = false;
    startPointerX = e.clientX;
    startPointerY = e.clientY;

    const rect = el.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    el.classList.add('is-dragging');
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - startPointerX;
    const deltaY = e.clientY - startPointerY;

    if (!hasMoved && Math.hypot(deltaX, deltaY) > 6) {
      hasMoved = true;
    }

    if (hasMoved) {
      if (e.cancelable) e.preventDefault();

      const newLeft = initialLeft + deltaX;
      const newTop = initialTop + deltaY;

      const margin = getMargin();
      const btnWidth = el.offsetWidth || 56;
      const maxX = window.innerWidth - btnWidth - margin;
      const minY = getMinY();
      const maxY = getMaxY();

      // Free fluid movement inside screen bounds during drag
      const clampedX = Math.max(margin, Math.min(maxX, newLeft));
      const clampedY = Math.max(minY, Math.min(maxY, newTop));

      el.style.left = `${clampedX}px`;
      el.style.top = `${clampedY}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
    }
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    el.classList.remove('is-dragging');

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);

    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (hasMoved) {
      // Automatically snap to the nearest side (left or right)
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const screenMid = window.innerWidth / 2;
      const isNearestLeft = centerX < screenMid;

      snapToSide(isNearestLeft, rect.top, true);
    } else {
      // Clean tap without drag: open 3-Second Check
      updateSimulatorPreview(computeMetrics());
      openModal('modal-three-sec');
    }
  }

  el.addEventListener('pointerdown', onPointerDown);

  // Keyboard accessibility
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      updateSimulatorPreview(computeMetrics());
      openModal('modal-three-sec');
    }
  });

  // Keep stuck to side on window resize or device orientation changes
  window.addEventListener('resize', () => {
    if (!isDragging) {
      const isLeft = el.classList.contains('docked-left');
      const rect = el.getBoundingClientRect();
      snapToSide(isLeft, rect.top, false);
    }
  });
}


function switchTab(tabId) {
  const views = document.querySelectorAll('.app-view');
  let matched = false;
  views.forEach((v) => {
    if (v.id === tabId) {
      v.classList.add('active-view');
      matched = true;
    } else {
      v.classList.remove('active-view');
    }
  });

  if (!matched && views.length > 0) {
    views[0].classList.add('active-view');
    tabId = views[0].id;
  }

  document.querySelectorAll('.bottom-nav-item').forEach((btn) => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  if (history.replaceState) {
    const shortName = tabId.replace('view-', '');
    history.replaceState(null, '', '#' + shortName);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRecentActivity() {
  const listEl = document.getElementById('recent-tx-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  const recent = appState.transactions.slice(0, 5);
  if (recent.length === 0) {
    listEl.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        No expenses logged yet.
      </div>
    `;
    return;
  }

  recent.forEach((tx) => {
    const meta = getCategoryMeta(tx.category);
    const row = document.createElement('div');
    row.className = 'recent-tx-row';
    row.innerHTML = `
      <div class="recent-tx-left">
        <span class="tx-icon-box tx-box-${meta.key}">${getCategorySvg(tx.category, 14)}</span>
        <div class="recent-tx-info">
          <span class="recent-tx-desc">${escapeHtml(tx.description)}</span>
          <div class="recent-tx-meta">
            <span>${escapeHtml(tx.date)}</span>
            <span>•</span>
            <span style="color: ${meta.color}; font-weight: 600;">${escapeHtml(tx.category)}</span>
            <span>•</span>
            <span>${escapeHtml(tx.method)}</span>
          </div>
        </div>
      </div>
      <div class="recent-tx-right">
        <div class="recent-tx-amt">-RM ${formatNumber(tx.amount)}</div>
        <button type="button" class="btn-row-del" data-del-recent="${escapeHtml(tx.id)}" title="Delete expense" aria-label="Delete expense">
          ${CLOSE_ICON_SVG}
        </button>
      </div>
    `;
    listEl.appendChild(row);
  });

  listEl.querySelectorAll('[data-del-recent]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const txId = btn.getAttribute('data-del-recent');
      appState.transactions = appState.transactions.filter((t) => t.id !== txId);
      saveState();
      renderApp();
      showToast('Expense deleted');
    });
  });
}

function renderGuardrails(m) {
  // 3-Second Check
  const isBudgetSet = m.totalBudget > 0;
  const floor20 = m.totalBudget * 0.2;
  const headroom = m.balanceLeft - floor20;
  const isRule1Pass = isBudgetSet ? m.remainingCapPct > 20 : true;

  const card1 = document.getElementById('rule-card-1');
  if (card1) {
    card1.classList.toggle('rule-warning', isBudgetSet && !isRule1Pass);
  }

  const badge1 = document.getElementById('rule1-badge');
  if (badge1) {
    badge1.textContent = isBudgetSet ? (isRule1Pass ? 'Safe' : 'Low Buffer') : 'Ready';
  }

  const headroom1 = document.getElementById('rule1-headroom');
  if (headroom1) {
    headroom1.textContent = formatRM(Math.max(0, headroom));
  }
}

function renderCategories(m) {
  const listEl = document.getElementById('category-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  m.categoryRows.forEach((row) => {
    const meta = getCategoryMeta(row.id);
    const item = document.createElement('div');
    item.className = `cat-item cat-item-${meta.key}`;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('title', `Click to add expense for ${row.label}`);

    const isGrab = row.id === 'Grab';
    const isWarn = isGrab ? row.pctRaw > 70 : row.pctRaw > 100;
    const barWidth = Math.min(100, Math.max(0, row.pctRaw)).toFixed(1);

    item.innerHTML = `
      <div class="cat-row-top">
        <div class="cat-title">
          <span class="cat-icon-box cat-box-${meta.key}">${getCategorySvg(row.id, 16)}</span>
          <span class="cat-name">${escapeHtml(row.label)}</span>
        </div>
        <div class="cat-amounts">
          <span class="cat-rem ${row.remaining < 0 ? 'text-pink' : ''}">${formatRM(row.remaining)} left</span>
          <span class="cat-alloc">/ ${formatRM(row.allocated)}</span>
          <button type="button" class="cat-add-btn" aria-label="Add expense for ${escapeHtml(row.label)}" title="Add expense">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="cat-bar-track">
        ${isGrab ? '<div class="grab-marker" title="70% threshold"></div>' : ''}
        <div class="cat-bar-fill cat-fill-${meta.key} ${isWarn ? 'fill-warn' : ''}" style="width: ${barWidth}%"></div>
      </div>
      <div class="cat-row-sub">
        <span>Spent <strong>${formatRM(row.spent)}</strong></span>
        <span class="cat-text-${meta.key}"><strong>${row.pctRounded}%</strong></span>
      </div>
    `;

    const addBtn = item.querySelector('.cat-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openKeyInExpenseModal(row.id);
      });
    }

    item.addEventListener('click', () => {
      openKeyInExpenseModal(row.id);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openKeyInExpenseModal(row.id);
      }
    });

    listEl.appendChild(item);
  });

  const totalPct = m.totalBudget > 0 ? Math.round((m.totalSpent / m.totalBudget) * 100) : 0;
  const footerEl = document.getElementById('category-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <span>Allocated <strong>${formatRM(m.totalBudget)}</strong></span>
      <span>Spent <strong>${formatRM(m.totalSpent)} (${totalPct}%)</strong></span>
    `;
  }
}

function renderSavingsTracker(m) {
  const platforms = Array.isArray(appState.savingsPlatforms) ? appState.savingsPlatforms : [];
  const records = Array.isArray(appState.savingsRecords) ? appState.savingsRecords : [];

  // 1. Top summary metrics
  const totalAmountEl = document.getElementById('savings-total-amount');
  if (totalAmountEl) totalAmountEl.textContent = formatRM(m.totalSavings);

  const platformsCountEl = document.getElementById('savings-platforms-count');
  if (platformsCountEl) {
    platformsCountEl.textContent = `${platforms.length} Platform${platforms.length === 1 ? '' : 's'}`;
  }

  const monthDepEl = document.getElementById('savings-month-deposited');
  if (monthDepEl) {
    monthDepEl.textContent = `+${formatRM(m.thisMonthDeposits)}`;
  }

  // 2. Render Platforms Cards (Versa, Shopee, etc.)
  const platformsContainer = document.getElementById('savings-platforms-container');
  if (platformsContainer) {
    platformsContainer.innerHTML = '';

    platforms.forEach((plat) => {
      const card = document.createElement('div');
      card.className = 'savings-platform-card';
      card.style.setProperty('--plat-color', plat.color || '#2563EB');
      card.style.setProperty('--plat-tint', plat.tint || 'rgba(37, 99, 235, 0.08)');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Key in savings for ${plat.name}`);

      const balance = Number(plat.balance || 0);
      const target = Number(plat.target || 0);
      const hasTarget = target > 0;
      const pct = hasTarget ? Math.min(100, Math.round((balance / target) * 100)) : 0;

      card.innerHTML = `
        <div class="platform-card-top">
          <div class="platform-info">
            <span class="platform-badge-icon" style="background: ${plat.tint || 'rgba(37, 99, 235, 0.1)'}; color: ${plat.color || '#2563EB'}; border: 1px solid ${plat.color || '#2563EB'}33;">
              ${getPlatformSvg(plat.id, 18)}
            </span>
            <div class="platform-title-group">
              <h4 class="platform-title">${escapeHtml(plat.name)}</h4>
              <span class="platform-subtitle">${escapeHtml(plat.tag || 'Savings Stash')}</span>
            </div>
          </div>
          <div class="platform-balance-wrap">
            <div class="platform-bal-row">
              <div class="platform-bal-text-group">
                <span class="platform-bal-label">Saved</span>
                <span class="platform-balance">${formatRM(balance)}</span>
              </div>
              <button type="button" class="cat-add-btn plat-add-btn" data-keyin-save="${escapeHtml(plat.id)}" title="Key in savings for ${escapeHtml(plat.name)}" aria-label="Key in savings for ${escapeHtml(plat.name)}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="platform-progress-wrap">
          <div class="platform-progress-track">
            <div class="platform-progress-fill" style="width: ${hasTarget ? pct : 0}%; background: ${plat.color || '#2563EB'};"></div>
          </div>
          <div class="platform-progress-text">
            <span>${hasTarget ? `${pct}% of ${formatRM(target)} goal` : 'No goal set'}</span>
          </div>
        </div>
      `;

      const addBtn = card.querySelector('.plat-add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openKeyInSavingsModal(plat.id);
        });
      }

      card.addEventListener('click', () => {
        openKeyInSavingsModal(plat.id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openKeyInSavingsModal(plat.id);
        }
      });

      platformsContainer.appendChild(card);
    });
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

function openKeyInExpenseModal(categoryId, defaultAmount = null, defaultDesc = '') {
  const selectedCat = categoryId || 'Food';
  const hiddenInput = document.getElementById('key-in-cat-input');
  if (hiddenInput) hiddenInput.value = selectedCat;

  const chipsContainer = document.getElementById('key-in-cat-chips');
  if (chipsContainer) {
    chipsContainer.innerHTML = appState.categories
      .map((c) => {
        const meta = getCategoryMeta(c.id);
        const isSelected = c.id === selectedCat;
        return `
          <button type="button" class="key-in-chip ${isSelected ? 'active chip-' + meta.key : ''}" data-cat-id="${escapeHtml(c.id)}">
            <span class="chip-dot" style="background: ${meta.color}"></span>
            <span>${escapeHtml(c.label)}</span>
          </button>
        `;
      })
      .join('');

    chipsContainer.querySelectorAll('.key-in-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        if (hiddenInput) hiddenInput.value = catId;
        chipsContainer.querySelectorAll('.key-in-chip').forEach((b) => {
          const bCat = b.getAttribute('data-cat-id');
          const bMeta = getCategoryMeta(bCat);
          const isActive = bCat === catId;
          b.className = isActive ? `key-in-chip active chip-${bMeta.key}` : 'key-in-chip';
        });
        const subEl = document.getElementById('modal-key-in-sub');
        if (subEl) subEl.textContent = `Record an expense under ${catId}`;
      });
    });
  }

  const subEl = document.getElementById('modal-key-in-sub');
  if (subEl) subEl.textContent = `Record an expense under ${selectedCat}`;

  const amtInput = document.getElementById('key-in-amount');
  if (amtInput) amtInput.value = defaultAmount !== null ? Number(defaultAmount).toFixed(2) : '';

  const descInput = document.getElementById('key-in-desc');
  if (descInput) descInput.value = defaultDesc || '';

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const dateInput = document.getElementById('key-in-date');
  if (dateInput) dateInput.value = `${yyyy}-${mm}-${dd}`;

  openModal('modal-key-in-expense');

  setTimeout(() => {
    if (defaultAmount !== null && descInput) {
      descInput.focus();
    } else if (amtInput) {
      amtInput.focus();
    }
  }, 120);
}

function openKeyInSavingsModal(platformId, defaultAmount = null) {
  const platforms = Array.isArray(appState.savingsPlatforms) ? appState.savingsPlatforms : [];
  const selectedPlat = platforms.find((p) => p.id === platformId) || platforms[0] || { id: 'versa', name: 'Versa' };

  const hiddenInput = document.getElementById('key-in-savings-platform-id');
  if (hiddenInput) hiddenInput.value = selectedPlat.id;

  const chipsContainer = document.getElementById('key-in-savings-platform-chips');
  if (chipsContainer) {
    chipsContainer.innerHTML = platforms
      .map((p) => {
        const isSelected = p.id === selectedPlat.id;
        return `
          <button type="button" class="key-in-chip ${isSelected ? 'active' : ''}" data-plat-id="${escapeHtml(p.id)}" style="${isSelected ? `background: ${p.color || '#2563EB'}; color: #FFFFFF; border-color: ${p.color || '#2563EB'};` : ''}">
            <span class="chip-dot" style="background: ${isSelected ? '#FFFFFF' : (p.color || '#2563EB')}"></span>
            <span>${escapeHtml(p.name)}</span>
          </button>
        `;
      })
      .join('');

    chipsContainer.querySelectorAll('.key-in-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-plat-id');
        if (hiddenInput) hiddenInput.value = pId;
        const clickedPlat = platforms.find((p) => p.id === pId);
        chipsContainer.querySelectorAll('.key-in-chip').forEach((b) => {
          const bId = b.getAttribute('data-plat-id');
          const bPlat = platforms.find((p) => p.id === bId);
          const isActive = bId === pId;
          b.className = isActive ? 'key-in-chip active' : 'key-in-chip';
          b.style = isActive ? `background: ${bPlat.color || '#2563EB'}; color: #FFFFFF; border-color: ${bPlat.color || '#2563EB'};` : '';
        });
        const subEl = document.getElementById('modal-key-in-savings-sub');
        if (subEl && clickedPlat) subEl.textContent = `Record savings for ${clickedPlat.name}`;
      });
    });
  }

  const subEl = document.getElementById('modal-key-in-savings-sub');
  if (subEl) subEl.textContent = `Record savings for ${selectedPlat.name}`;

  // Reset action type toggle to deposit
  const actionTypeInput = document.getElementById('key-in-savings-action-type');
  if (actionTypeInput) actionTypeInput.value = 'deposit';
  document.querySelectorAll('.action-toggle-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-action') === 'deposit');
  });
  const submitText = document.querySelector('#btn-save-key-in-savings span');
  if (submitText) submitText.textContent = 'Save Deposit';

  const amtInput = document.getElementById('key-in-savings-amount');
  if (amtInput) amtInput.value = defaultAmount !== null ? Number(defaultAmount).toFixed(2) : '';

  const noteInput = document.getElementById('key-in-savings-note');
  if (noteInput) noteInput.value = '';

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const dateInput = document.getElementById('key-in-savings-date');
  if (dateInput) dateInput.value = `${yyyy}-${mm}-${dd}`;

  openModal('modal-key-in-savings');

  setTimeout(() => {
    if (amtInput) amtInput.focus();
  }, 120);
}

function updateSimulatorPreview(m) {
  const simAmount = parseFloat(document.getElementById('sim-purchase-amount').value) || 0;
  const simCat = document.getElementById('sim-purchase-cat').value;
  const meta = getCategoryMeta(simCat);

  const newBalance = m.balanceLeft - simAmount;
  const newCapPct = m.totalBudget > 0 ? (newBalance / m.totalBudget) * 100 : 0;
  const catObj = m.categoryMap[simCat] || { remaining: 0, allocated: 0, spent: 0 };
  const newCatRem = catObj.remaining - simAmount;

  const banner = document.getElementById('sim-result-banner');
  const verdict = document.getElementById('sim-verdict-title');

  const staysSafe = newCapPct > 20 && newCatRem >= 0;
  banner.classList.toggle('sim-danger', !staysSafe);

  if (newCapPct <= 20) {
    verdict.textContent = 'Caution — drops balance below 20% Blue Zone';
  } else if (newCatRem < 0) {
    verdict.textContent = `Caution — exceeds ${simCat} allocation`;
  } else if (simCat === 'Grab' && catObj.allocated > 0 && ((catObj.spent + simAmount) / catObj.allocated) * 100 > 70) {
    verdict.textContent = 'Grab > 70% — consider public transit';
  } else {
    verdict.textContent = 'Safe to proceed — stays in Blue Zone';
  }

  document.getElementById('sim-new-balance').textContent = formatRM(newBalance);
  document.getElementById('sim-new-capacity').textContent = `${newCapPct.toFixed(1)}%`;
  const catRemEl = document.getElementById('sim-cat-remaining');
  catRemEl.textContent = formatRM(newCatRem);
  catRemEl.style.color = newCatRem < 0 ? 'var(--pink)' : meta.color;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp();

  // Key In Expense Form Handler
  const keyInForm = document.getElementById('form-key-in-expense');
  if (keyInForm) {
    keyInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const catVal = document.getElementById('key-in-cat-input').value || 'Food';
      const amountVal = parseFloat(document.getElementById('key-in-amount').value);
      let descVal = document.getElementById('key-in-desc').value.trim();
      const methodVal = document.getElementById('key-in-method').value || 'DuitNow QR';
      const dateVal = document.getElementById('key-in-date').value || '2026-10-31';

      if (isNaN(amountVal) || amountVal <= 0) {
        document.getElementById('key-in-amount').focus();
        return;
      }

      if (!descVal) {
        descVal = `${catVal} Expense`;
      }

      appState.transactions.unshift({
        id: `tx-${Date.now()}`,
        date: dateVal,
        category: catVal,
        description: descVal,
        method: methodVal,
        amount: Math.round(amountVal * 100) / 100
      });

      saveState();
      renderApp();
      closeModal('modal-key-in-expense');
      showToast(`Logged RM ${formatNumber(amountVal)} for ${catVal}`);
    });
  }

  // Action toggle buttons in Key In Savings modal
  document.querySelectorAll('.action-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const hiddenInput = document.getElementById('key-in-savings-action-type');
      if (hiddenInput) hiddenInput.value = action;
      document.querySelectorAll('.action-toggle-btn').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-action') === action);
      });
      const submitText = document.querySelector('#btn-save-key-in-savings span');
      if (submitText) {
        submitText.textContent = action === 'deposit' ? 'Save Deposit' : 'Confirm Withdrawal';
      }
    });
  });

  // Key In Savings Form Handler
  const keyInSavingsForm = document.getElementById('form-key-in-savings');
  if (keyInSavingsForm) {
    keyInSavingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const platformIdVal = document.getElementById('key-in-savings-platform-id').value;
      const actionTypeVal = document.getElementById('key-in-savings-action-type').value || 'deposit';
      const amountVal = parseFloat(document.getElementById('key-in-savings-amount').value);
      let noteVal = document.getElementById('key-in-savings-note').value.trim();
      const dateVal = document.getElementById('key-in-savings-date').value || '2026-10-31';

      if (isNaN(amountVal) || amountVal <= 0) {
        document.getElementById('key-in-savings-amount').focus();
        return;
      }

      const targetPlat = (appState.savingsPlatforms || []).find((p) => p.id === platformIdVal);
      const platName = targetPlat ? targetPlat.name : platformIdVal;

      if (!noteVal) {
        noteVal = actionTypeVal === 'deposit' ? `${platName} Stash Deposit` : `${platName} Withdrawal`;
      }

      if (targetPlat) {
        if (actionTypeVal === 'deposit') {
          targetPlat.balance = (targetPlat.balance || 0) + amountVal;
        } else {
          targetPlat.balance = Math.max(0, (targetPlat.balance || 0) - amountVal);
        }
      }

      if (!Array.isArray(appState.savingsRecords)) {
        appState.savingsRecords = [];
      }

      appState.savingsRecords.unshift({
        id: `sav-${Date.now()}`,
        date: dateVal,
        platformId: platformIdVal,
        type: actionTypeVal,
        amount: Math.round(amountVal * 100) / 100,
        note: noteVal
      });

      saveState();
      renderApp();
      closeModal('modal-key-in-savings');
      showToast(actionTypeVal === 'deposit' ? `Saved +${formatRM(amountVal)} to ${platName}` : `Logged -${formatRM(amountVal)} withdrawal from ${platName}`);
    });
  }

  // Open Add Platform Modal
  const openAddPlatformBtn = document.getElementById('btn-open-add-platform');
  if (openAddPlatformBtn) {
    openAddPlatformBtn.addEventListener('click', () => {
      openModal('modal-add-platform');
      setTimeout(() => {
        const nameInput = document.getElementById('platform-input-name');
        if (nameInput) nameInput.focus();
      }, 120);
    });
  }

  // Handle Add Platform Form Submit
  const addPlatformForm = document.getElementById('form-add-platform');
  if (addPlatformForm) {
    addPlatformForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = document.getElementById('platform-input-name').value.trim();
      const tagVal = document.getElementById('platform-input-tag').value.trim() || 'Savings Stash';
      const initialVal = parseFloat(document.getElementById('platform-input-initial').value) || 0;
      const targetVal = parseFloat(document.getElementById('platform-input-target').value) || 1000;
      const selectedColor = document.querySelector('input[name="platform-color"]:checked')?.value || '#2563EB';

      if (!nameVal) {
        document.getElementById('platform-input-name').focus();
        return;
      }

      const newId = nameVal.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
      if (!Array.isArray(appState.savingsPlatforms)) {
        appState.savingsPlatforms = [];
      }

      appState.savingsPlatforms.push({
        id: newId,
        name: nameVal,
        tag: tagVal,
        color: selectedColor,
        tint: `${selectedColor}18`,
        balance: Math.max(0, initialVal),
        target: Math.max(0, targetVal)
      });

      if (initialVal > 0) {
        if (!Array.isArray(appState.savingsRecords)) appState.savingsRecords = [];
        appState.savingsRecords.unshift({
          id: `sav-${Date.now()}`,
          date: '2026-10-31',
          platformId: newId,
          type: 'deposit',
          amount: initialVal,
          note: 'Starting balance'
        });
      }

      // Reset form
      document.getElementById('platform-input-name').value = '';
      document.getElementById('platform-input-tag').value = '';

      saveState();
      renderApp();
      closeModal('modal-add-platform');
      showToast(`Added ${nameVal} savings platform!`);
    });
  }

  // Past Performance Collapsible Drawer Toggle
  const togglePerfRow = document.getElementById('btn-toggle-past-perf');
  const perfDrawer = document.getElementById('past-perf-drawer');
  const perfToggleLabel = document.getElementById('perf-toggle-label');

  function togglePastPerformanceDrawer() {
    if (!perfDrawer) return;
    const isCurrentlyHidden = perfDrawer.classList.contains('hidden');
    const groupEl = togglePerfRow ? togglePerfRow.closest('.settings-row-group') : null;
    if (isCurrentlyHidden) {
      perfDrawer.classList.remove('hidden');
      if (groupEl) groupEl.classList.add('is-open');
      if (perfToggleLabel) perfToggleLabel.textContent = 'Hide';
      if (togglePerfRow) togglePerfRow.setAttribute('aria-expanded', 'true');
    } else {
      perfDrawer.classList.add('hidden');
      if (groupEl) groupEl.classList.remove('is-open');
      if (perfToggleLabel) perfToggleLabel.textContent = 'View';
      if (togglePerfRow) togglePerfRow.setAttribute('aria-expanded', 'false');
    }
  }

  if (togglePerfRow) {
    togglePerfRow.addEventListener('click', togglePastPerformanceDrawer);
    togglePerfRow.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePastPerformanceDrawer();
      }
    });
  }

  // Open Add Past Performance Modal
  const btnOpenAddPastPerf = document.getElementById('btn-open-add-past-perf');
  if (btnOpenAddPastPerf) {
    btnOpenAddPastPerf.addEventListener('click', (e) => {
      e.stopPropagation();
      const form = document.getElementById('form-add-past-perf');
      if (form) form.reset();
      const monthInput = document.getElementById('perf-input-month');
      if (monthInput) monthInput.value = '2026-06';
      openModal('modal-add-past-perf');
    });
  }

  // Handle Add Past Performance Form Submit
  const formAddPastPerf = document.getElementById('form-add-past-perf');
  if (formAddPastPerf) {
    formAddPastPerf.addEventListener('submit', (e) => {
      e.preventDefault();
      const monthVal = document.getElementById('perf-input-month').value;
      const savedVal = parseFloat(document.getElementById('perf-input-saved').value) || 0;
      const spentVal = parseFloat(document.getElementById('perf-input-spent').value) || 0;

      if (!monthVal) return;

      if (!Array.isArray(appState.pastPerformance)) {
        appState.pastPerformance = [];
      }

      const existingIdx = appState.pastPerformance.findIndex((p) => p.month === monthVal);
      const label = formatMonthYearLabel(monthVal);
      if (existingIdx !== -1) {
        appState.pastPerformance[existingIdx] = {
          month: monthVal,
          label,
          saved: savedVal,
          spent: spentVal
        };
      } else {
        appState.pastPerformance.push({
          month: monthVal,
          label,
          saved: savedVal,
          spent: spentVal
        });
      }

      saveState();
      renderApp();
      closeModal('modal-add-past-perf');
      showToast(`Saved performance for ${label}`);
    });
  }

  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(btn.getAttribute('data-close'));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop:not(.hidden)').forEach((m) => {
        m.classList.add('hidden');
      });
    }
  });

  // 3-Second Check Modal
  const threeSecBtn = document.getElementById('btn-three-sec-check');
  if (threeSecBtn) {
    threeSecBtn.addEventListener('click', () => {
      updateSimulatorPreview(computeMetrics());
      openModal('modal-three-sec');
    });
  }

  document.getElementById('sim-purchase-amount').addEventListener('input', () => {
    updateSimulatorPreview(computeMetrics());
  });
  document.getElementById('sim-purchase-cat').addEventListener('change', () => {
    updateSimulatorPreview(computeMetrics());
  });

  const simLogBtn = document.getElementById('btn-sim-log-now');
  if (simLogBtn) {
    simLogBtn.addEventListener('click', () => {
      const amt = parseFloat(document.getElementById('sim-purchase-amount').value);
      const cat = document.getElementById('sim-purchase-cat').value;
      if (isNaN(amt) || amt <= 0) return;
      closeModal('modal-three-sec');
      openKeyInExpenseModal(cat, amt);
    });
  }

  // Adjust Budgets Modal (Legacy / Quick Trigger)
  const editBudgetsBtn = document.getElementById('btn-edit-budgets');
  if (editBudgetsBtn) {
    editBudgetsBtn.addEventListener('click', () => {
      const form = document.getElementById('form-edit-budgets');
      if (!form) return;
      form.innerHTML = appState.categories
        .map(
          (c, idx) => {
            const meta = getCategoryMeta(c.id);
            return `
            <div class="budget-edit-row">
              <label class="budget-edit-label" for="alloc-input-${idx}">
                <span class="tx-icon-box tx-box-${meta.key}">${getCategorySvg(c.id, 14)}</span>
                <span style="color: ${meta.color}; font-weight: 600;">${escapeHtml(c.label)}</span>
              </label>
              <input type="number" id="alloc-input-${idx}" data-cat-idx="${idx}" class="input-clean input-lg" step="10" min="0" value="${Number(c.allocated).toFixed(2)}" />
            </div>
          `;
          }
        )
        .join('');
      openModal('modal-budgets');
    });
  }

  const saveBudgetsBtn = document.getElementById('btn-save-budgets');
  if (saveBudgetsBtn) {
    saveBudgetsBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('#form-edit-budgets [data-cat-idx]');
      inputs.forEach((inp) => {
        const idx = Number(inp.getAttribute('data-cat-idx'));
        const val = parseFloat(inp.value);
        if (!isNaN(val) && val >= 0 && appState.categories[idx]) {
          appState.categories[idx].allocated = Math.round(val * 100) / 100;
        }
      });
      saveState();
      renderApp();
      closeModal('modal-budgets');
      showToast('Budgets updated');
    });
  }

  // Reset Data (Legacy button if present)
  const resetDataBtn = document.getElementById('btn-reset-data');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      appState = cloneDefaultState();
      selectedCategoryFilter = 'ALL';
      saveState();
      renderApp();
      showToast('Reset to default data');
    });
  }

  // Settings: Direct Monthly Budget Save
  const saveTotalBudgetBtn = document.getElementById('btn-save-total-budget');
  const directTotalBudgetInput = document.getElementById('setting-input-total-budget');

  function handleSaveTotalBudget() {
    if (!directTotalBudgetInput) return;
    const raw = directTotalBudgetInput.value.trim();
    const val = raw === '' ? 0 : parseFloat(raw);
    if (isNaN(val) || val < 0) {
      showToast('Please enter a valid budget amount');
      return;
    }
    const cleanVal = Math.round(val * 100) / 100;
    appState.monthlyBudget = cleanVal;
    saveState();
    renderApp();
    if (directTotalBudgetInput) directTotalBudgetInput.blur();
    showToast(`Monthly budget set: ${formatRM(cleanVal)}`);
  }

  if (saveTotalBudgetBtn) {
    saveTotalBudgetBtn.addEventListener('click', handleSaveTotalBudget);
  }
  if (directTotalBudgetInput) {
    directTotalBudgetInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSaveTotalBudget();
      }
    });
  }

  // Settings: Add On to Budget (Top-up)
  const applyAddonBtn = document.getElementById('btn-apply-addon-budget');
  const addonInput = document.getElementById('setting-input-addon');

  function handleApplyAddonBudget() {
    if (!addonInput) return;
    const raw = addonInput.value.trim();
    const addVal = parseFloat(raw);
    if (isNaN(addVal) || addVal <= 0) {
      showToast('Please enter an amount to add on');
      addonInput.focus();
      return;
    }
    const cleanAdd = Math.round(addVal * 100) / 100;
    const currentMetrics = computeMetrics();
    const cur = Number(appState.monthlyBudget || 0) > 0 ? Number(appState.monthlyBudget) : currentMetrics.totalBudget;
    appState.monthlyBudget = Math.round((cur + cleanAdd) * 100) / 100;
    addonInput.value = '';
    saveState();
    renderApp();
    if (addonInput) addonInput.blur();
    showToast(`Added ${formatRM(cleanAdd)} to budget! New total: ${formatRM(appState.monthlyBudget)}`);
  }

  if (applyAddonBtn) {
    applyAddonBtn.addEventListener('click', handleApplyAddonBudget);
  }
  if (addonInput) {
    addonInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleApplyAddonBudget();
      }
    });
  }

  // Settings: Save Category Caps
  const saveSettingsBtn = document.getElementById('btn-save-settings-budgets');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('#form-settings-budgets [data-settings-cat-idx]');
      let total = 0;
      inputs.forEach((inp) => {
        const idx = Number(inp.getAttribute('data-settings-cat-idx'));
        const raw = inp.value.trim();
        const val = raw === '' ? 0 : parseFloat(raw);
        if (!isNaN(val) && val >= 0 && appState.categories[idx]) {
          const cleanVal = Math.round(val * 100) / 100;
          appState.categories[idx].allocated = cleanVal;
          total += cleanVal;
        }
      });
      if (total > Number(appState.monthlyBudget || 0) || !appState.monthlyBudget) {
        appState.monthlyBudget = total;
      }
      saveState();
      renderApp();
      showToast(`Category caps saved: ${formatRM(total)}`);
    });
  }



  // Settings: Toggle Privacy Masking
  const settingsTogglePrivacyBtn = document.getElementById('btn-settings-toggle-privacy');
  if (settingsTogglePrivacyBtn) {
    settingsTogglePrivacyBtn.addEventListener('click', toggleBalanceVisibility);
  }

  // Settings: Reset Tracker Data
  const settingsResetBtn = document.getElementById('btn-settings-reset-data');
  if (settingsResetBtn) {
    settingsResetBtn.addEventListener('click', () => {
      if (!confirm('Are you sure you want to clear all logged expenses and reset to a clean state?')) {
        return;
      }
      appState = cloneDefaultState();
      selectedCategoryFilter = 'ALL';
      saveState();
      renderApp();
      showToast('All data cleared. Ready for your expenses!');
    });
  }

  // Bottom navigation tab switching
  document.querySelectorAll('.bottom-nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      switchTab(target);
    });
  });

  // Adjust budgets button inside Categories view (if present)
  const viewEditBudgetsBtn = document.getElementById('btn-view-edit-budgets');
  if (viewEditBudgetsBtn) {
    viewEditBudgetsBtn.addEventListener('click', () => {
      switchTab('view-settings');
    });
  }

  // Toggle Balance Visibility (Hide / Show)
  const toggleBalBtn = document.getElementById('btn-toggle-balance');
  if (toggleBalBtn) {
    toggleBalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBalanceVisibility();
    });
  }

  const gaugeBalGroup = document.getElementById('gauge-balance-group');
  if (gaugeBalGroup) {
    gaugeBalGroup.addEventListener('click', toggleBalanceVisibility);
    gaugeBalGroup.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBalanceVisibility();
      }
    });
  }

  // Initialize AssistiveTouch 3-Second Check Draggable Button
  initAssistiveTouch();

  // Hash-based view activation
  const initialHash = (window.location.hash || '').replace('#', '').toLowerCase();
  if (initialHash === 'categories') {
    switchTab('view-categories');
  } else if (initialHash === 'savings' || initialHash === 'saving' || initialHash === 'events' || initialHash === 'event') {
    switchTab('view-savings');
  } else if (initialHash === 'transactions' || initialHash === 'ledger') {
    switchTab('view-categories');
  } else if (initialHash === 'settings') {
    switchTab('view-settings');
  } else {
    switchTab('view-overview');
  }
});

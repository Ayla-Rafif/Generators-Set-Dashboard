const state = {
  data: [],
  liveData: [],
  section: "dashboard",
  subIndex: 0,
  range: 60,
  chart: null
};

const SECTION_CONFIG = {
  dashboard: {
    title: "DASHBOARD",
    items: []
  },
  kelistrikan: {
    title: "KELISTRIKAN",
    items: [
      {
        key: "Output Voltage (V)",
        label: "Tegangan Output",
        unit: "V",
        decimals: 0,
        color: "#4da3ff",
        description: "Menunjukkan kestabilan tegangan keluaran genset untuk menjaga suplai listrik tetap aman.",
        observation: "Tegangan yang stabil membantu menjaga kualitas daya pada beban gedung.",
        thresholds: { warnLow: 360, warnHigh: 400, critLow: 345, critHigh: 415 },
        scale: { min: 340, max: 420 }
      },
      {
        key: "Output Current (A)",
        label: "Arus Output",
        unit: "A",
        decimals: 0,
        color: "#36d364",
        description: "Arus output menunjukkan besar beban listrik yang sedang ditanggung generator.",
        observation: "Arus tinggi biasanya sejalan dengan beban yang meningkat.",
        thresholds: { warnHigh: 200, critHigh: 230 },
        scale: { min: 0, max: 250 }
      },
      {
        key: "Frequency (Hz)",
        label: "Frekuensi",
        unit: "Hz",
        decimals: 1,
        color: "#f5c542",
        description: "Frekuensi harus tetap mendekati 50 Hz agar peralatan listrik bekerja stabil.",
        observation: "Penyimpangan frekuensi dapat menandakan perubahan RPM atau beban.",
        thresholds: { warnLow: 49.5, warnHigh: 50.5, critLow: 49.0, critHigh: 51.0 },
        scale: { min: 48.5, max: 51.5 }
      },
      {
        key: "Output Power (kW)",
        label: "Daya Output",
        unit: "kW",
        decimals: 1,
        color: "#7ab5ff",
        description: "Daya output menggambarkan kemampuan genset dalam menyuplai daya ke beban aktif.",
        observation: "Semakin besar daya output, semakin besar energi yang disalurkan ke sistem.",
        thresholds: { warnHigh: 85, critHigh: 95 },
        scale: { min: 0, max: 100 }
      },
      {
        key: "Load (%)",
        label: "Load",
        unit: "%",
        decimals: 0,
        color: "#ff6b6b",
        description: "Load menunjukkan persentase kapasitas generator yang sedang digunakan.",
        observation: "Load terlalu tinggi dapat memicu penurunan frekuensi dan peningkatan temperatur.",
        thresholds: { warnHigh: 80, critHigh: 90 },
        scale: { min: 0, max: 100 }
      }
    ]
  },
  mesin: {
    title: "MESIN",
    items: [
      {
        key: "Engine RPM",
        label: "RPM Mesin",
        unit: "RPM",
        decimals: 0,
        color: "#36d364",
        description: "RPM mesin menunjukkan kecepatan putar mesin genset. Stabilitas RPM sangat memengaruhi frekuensi keluaran.",
        observation: "RPM yang stabil menandakan mesin bekerja normal dan sinkron.",
        thresholds: { warnLow: 1480, warnHigh: 1520, critLow: 1450, critHigh: 1550 },
        scale: { min: 1440, max: 1560 }
      },
      {
        key: "Coolant Temp (C)",
        label: "Temperatur Coolant",
        unit: "°C",
        decimals: 1,
        color: "#f5c542",
        description: "Temperatur coolant menunjukkan kondisi sistem pendinginan mesin genset.",
        observation: "Temperatur coolant yang meningkat perlu dipantau untuk mencegah overheating.",
        thresholds: { warnHigh: 88, critHigh: 92 },
        scale: { min: 78, max: 95 }
      },
      {
        key: "Oil Temp (C)",
        label: "Suhu Oli",
        unit: "°C",
        decimals: 1,
        color: "#ffb347",
        description: "Suhu oli memengaruhi pelumasan dan kestabilan kerja komponen mesin.",
        observation: "Suhu oli yang tinggi dapat menandakan beban kerja mesin meningkat.",
        thresholds: { warnHigh: 80, critHigh: 85 },
        scale: { min: 68, max: 88 }
      },
      {
        key: "Oil Pressure (bar)",
        label: "Tekanan Oli",
        unit: "bar",
        decimals: 2,
        color: "#7de3b6",
        description: "Tekanan oli menunjukkan kondisi pelumasan pada mesin genset.",
        observation: "Tekanan oli yang turun terlalu rendah dapat mengindikasikan masalah pada sistem pelumasan.",
        thresholds: { warnLow: 3.8, critLow: 3.2 },
        scale: { min: 2.5, max: 5.5 }
      }
    ]
  },
  bahanbakar: {
    title: "BAHAN BAKAR",
    items: [
      {
        key: "Fuel Consumption (L/h)",
        label: "Fuel Consumption",
        unit: "L/h",
        decimals: 1,
        color: "#9a8cff",
        description: "Fuel consumption menunjukkan laju pemakaian bahan bakar berdasarkan kondisi beban genset.",
        observation: "Konsumsi bahan bakar biasanya naik ketika load meningkat.",
        thresholds: { warnHigh: 15, critHigh: 18 },
        scale: { min: 0, max: 20 }
      },
      {
        key: "Fuel Level (%)",
        label: "Fuel Level",
        unit: "%",
        decimals: 0,
        color: "#36d364",
        description: "Fuel level menunjukkan sisa bahan bakar yang tersedia untuk operasional genset.",
        observation: "Fuel level yang rendah memerlukan perhatian karena memengaruhi durasi operasi.",
        thresholds: { warnLow: 30, critLow: 15 },
        scale: { min: 0, max: 100 }
      },
      {
        key: "Estimated Runtime (h)",
        label: "Estimasi Runtime",
        unit: "h",
        decimals: 1,
        color: "#ffb347",
        description: "Estimasi runtime adalah perkiraan lama genset masih dapat beroperasi dengan sisa bahan bakar saat ini.",
        observation: "Runtime yang turun menandakan waktu operasi genset semakin terbatas.",
        thresholds: { warnLow: 4, critLow: 2 },
        scale: { min: 0, max: 12 }
      },
      {
        key: "Oil Level (%)",
        label: "Oil Level",
        unit: "%",
        decimals: 0,
        color: "#ffa62b",
        description: "Oil level menunjukkan sisa level oli yang mendukung pelumasan mesin.",
        observation: "Level oli yang cukup penting untuk menjaga performa mesin tetap stabil.",
        thresholds: { warnLow: 80, critLow: 70 },
        scale: { min: 0, max: 100 }
      }
    ]
  }
};

const OVERVIEW_METRICS = [
  { section: "kelistrikan", key: "Output Voltage (V)", label: "Voltage", unit: "V", decimals: 0, color: "#4da3ff", thresholds: { warnLow: 360, warnHigh: 400, critLow: 345, critHigh: 415 } },
  { section: "kelistrikan", key: "Output Current (A)", label: "Current", unit: "A", decimals: 0, color: "#36d364", thresholds: { warnHigh: 200, critHigh: 230 } },
  { section: "kelistrikan", key: "Frequency (Hz)", label: "Frequency", unit: "Hz", decimals: 1, color: "#f5c542", thresholds: { warnLow: 49.5, warnHigh: 50.5, critLow: 49.0, critHigh: 51.0 } },
  { section: "bahanbakar", key: "Fuel Level (%)", label: "Fuel", unit: "%", decimals: 0, color: "#ff9f43", thresholds: { warnLow: 30, critLow: 15 } },
  { section: "kelistrikan", key: "Load (%)", label: "Load", unit: "%", decimals: 0, color: "#ff5e5e", thresholds: { warnHigh: 80, critHigh: 90 } }
];

const thresholdPlugin = {
  id: "thresholdPlugin",
  afterDraw(chart) {
    const lines = chart?.options?.plugins?.thresholds?.lines || [];
    if (!lines.length) return;

    const { ctx, chartArea, scales } = chart;
    const yScale = scales.y;

    ctx.save();
    ctx.lineWidth = 1.4;
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";

    lines.forEach((line) => {
      if (line.value === undefined || line.value === null || Number.isNaN(line.value)) return;

      const y = yScale.getPixelForValue(line.value);
      if (y < chartArea.top || y > chartArea.bottom) return;

      ctx.beginPath();
      ctx.setLineDash(line.dash || [7, 6]);
      ctx.strokeStyle = line.color || "#ffffff";
      ctx.moveTo(chartArea.left, y);
      ctx.lineTo(chartArea.right, y);
      ctx.stroke();
      ctx.setLineDash([]);

      const text = `${line.label}`;
      const textWidth = ctx.measureText(text).width;
      const padX = 8;
      const boxW = textWidth + padX * 2;
      const boxH = 18;
      const boxX = chartArea.right - boxW - 6;
      const boxY = y - boxH - 2;

      ctx.fillStyle = "rgba(8,21,37,0.92)";
      ctx.fillRect(boxX, boxY, boxW, boxH);

      ctx.strokeStyle = line.color || "#ffffff";
      ctx.strokeRect(boxX, boxY, boxW, boxH);

      ctx.fillStyle = line.color || "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(text, boxX + boxW / 2, boxY + boxH / 2);
    });

    ctx.restore();
  }
};

Chart.register(thresholdPlugin);

async function init() {
  const res = await fetch("/api/data");
  state.data = await res.json();

  filterRealtimeData();
  bindUI();

  renderRealtimeClock();
  renderTopStatus();
  renderSummaryCards();
  renderInsightCards();
  renderSection();

  setInterval(renderRealtimeClock, 1000);

  setInterval(() => {
    filterRealtimeData();
    renderTopStatus();
    renderSummaryCards();
    renderInsightCards();

    if (state.section !== "dashboard") {
      renderSection();
    }
  }, 60000);
}

function bindUI() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeSection(btn.dataset.section);
    });
  });

  document.querySelectorAll(".range-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeRange(Number(btn.dataset.range));
    });
  });

  document.getElementById("summary-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".mini-card[data-section]");
    if (!card) return;
    changeSection(card.dataset.section);
  });

  document.getElementById("insight-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".insight-card[data-section]");
    if (!card) return;
    changeSection(card.dataset.section);
  });
}

function changeSection(section) {
  state.section = section;
  state.subIndex = 0;
  updateActiveNav();
  renderSection();

  if (section !== "dashboard") {
    document.getElementById("detail-section").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function changeSub(index) {
  state.subIndex = index;
  updateActiveDetailMenu();
  renderSection();
}

function changeRange(minutes) {
  state.range = minutes;
  updateActiveRangeButtons();
  if (state.section !== "dashboard") {
    renderSection();
  }
}

function updateActiveNav() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === state.section);
  });
}

function updateActiveRangeButtons() {
  document.querySelectorAll(".range-btn").forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.range) === state.range);
  });

  const label = getRangeLabel(state.range);
  const rangeLabelEl = document.getElementById("chart-range-label");
  if (rangeLabelEl) rangeLabelEl.textContent = `Jendela data: ${label}`;
}

function updateActiveDetailMenu() {
  document.querySelectorAll(".detail-button").forEach((btn, index) => {
    btn.classList.toggle("active", index === state.subIndex);
  });
}

function filterRealtimeData() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  state.liveData = state.data.filter((row) => {
    const rowMinutes = timestampToMinutes(row["Timestamp"]);
    return rowMinutes !== null && rowMinutes <= currentMinutes;
  });

  if (state.liveData.length === 0) {
    state.liveData = [...state.data];
  }
}

function renderRealtimeClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("clock").textContent = `${hh}:${mm}:${ss}`;
  document.getElementById("date").textContent = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getLatestRow() {
  return state.liveData[state.liveData.length - 1] || state.data[state.data.length - 1];
}

function renderTopStatus() {
  const latest = getLatestRow();
  if (!latest) return;

  const pln = String(latest["PLN Status"] || "UNKNOWN");
  const genset = String(latest["Genset Status"] || "UNKNOWN");
  const health = calculateHealth(latest);

  const plnEl = document.getElementById("pln-status");
  const gensetEl = document.getElementById("genset-status");
  const modeEl = document.getElementById("mode-status");

  setBadge(plnEl, pln === "ON" ? "normal" : "critical", pln);
  setBadge(gensetEl, genset === "ON" ? "normal" : "critical", genset);
  setBadge(modeEl, genset === "ON" ? "normal" : "neutral", genset === "ON" ? "GENSET ACTIVE" : "PLN ACTIVE");

  const alarmBody = document.getElementById("alarm-system");
  const alarmText = document.getElementById("alarm-text");
  const alarmSubtitle = document.getElementById("alarm-subtitle");

  alarmBody.className = `alarm-body alarm-${health.level}`;
  alarmText.textContent = health.title;
  alarmSubtitle.textContent = health.subtitle;

  const events = state.liveData
    .filter((row) => String(row["Event Log"] || "").trim() !== "")
    .slice(-5)
    .reverse();

  const eventLog = document.getElementById("event-log");

  if (!events.length) {
    eventLog.innerHTML = `<div class="event-item"><span class="event-time">--:--</span><span class="event-text event-info">Belum ada event terbaru</span></div>`;
    return;
  }

  eventLog.innerHTML = events.map((row) => {
    const event = String(row["Event Log"]);
    const cls = classifyText(event);
    return `
      <div class="event-item">
        <div class="event-time">${formatClock(row["Timestamp"])}</div>
        <div class="event-text ${cls}">${event}</div>
      </div>
    `;
  }).join("");
}

function renderSummaryCards() {
  const latest = getLatestRow();
  if (!latest) return;

  const cards = OVERVIEW_METRICS.map((metric) => {
    const value = toNumber(latest[metric.key]);
    const status = evaluateStatus(value, metric);
    const displayValue = formatValue(value, metric.decimals);
    const unit = metric.unit;

    return `
      <article class="mini-card ${status.level}" data-section="${metric.section}" role="button" tabindex="0" aria-label="${metric.label}">
        <div class="mini-circle ${status.level}">
          <div class="mini-value">${displayValue}</div>
          <div class="mini-unit">${unit}</div>
        </div>
        <div class="mini-label">${metric.label}</div>
        <div class="mini-status ${status.level}">${status.label}</div>
      </article>
    `;
  }).join("");

  document.getElementById("summary-grid").innerHTML = `
    <div class="summary-card">
      <div class="summary-title">INFO SISTEM TERKINI</div>
      <div class="summary-mini-grid">
        ${cards}
      </div>
    </div>
  `;
}

function renderInsightCards() {
  const latest = getLatestRow();
  if (!latest) return;

  const health = calculateHealth(latest);
  const kpi = calculateOperationalKPI();

  const healthItems = [
    {
      label: "Voltage",
      item: SECTION_CONFIG.kelistrikan.items[0],
      value: toNumber(latest["Output Voltage (V)"])
    },
    {
      label: "Current",
      item: SECTION_CONFIG.kelistrikan.items[1],
      value: toNumber(latest["Output Current (A)"])
    },
    {
      label: "Frequency",
      item: SECTION_CONFIG.kelistrikan.items[2],
      value: toNumber(latest["Frequency (Hz)"])
    },
    {
      label: "Fuel",
      item: SECTION_CONFIG.bahanbakar.items[1],
      value: toNumber(latest["Fuel Level (%)"])
    },
    {
      label: "Load",
      item: SECTION_CONFIG.kelistrikan.items[4],
      value: toNumber(latest["Load (%)"])
    }
  ];

  const healthChecklist = healthItems.map(({ label, item, value }) => {
    const status = evaluateStatus(value, item);
    const icon = status.level === "critical" ? "✕" : status.level === "warning" ? "⚠" : "✓";
    return `
      <div class="health-item">
        <span>${label}</span>
        <span class="status-${status.level}">${icon} ${status.label}</span>
      </div>
    `;
  }).join("");

  document.getElementById("insight-grid").innerHTML = `
    <article class="insight-card health-${health.level}" data-section="kelistrikan" role="button" tabindex="0" aria-label="System Health">
      <div class="insight-title">SYSTEM HEALTH</div>
      <div class="health-score">${health.score}%</div>
      <div class="health-progress">
        <div class="health-progress-bar ${health.level}" style="width:${health.score}%"></div>
      </div>
      <div class="health-label">${health.label}</div>
      <div class="health-sub">${health.subtitle}</div>
      <div class="health-checklist">
        ${healthChecklist}
      </div>
    </article>

    <article class="insight-card" data-section="kelistrikan" role="button" tabindex="0" aria-label="Operational KPI">
      <div class="insight-title">OPERATIONAL KPI</div>
      <div class="insight-stack">
        <div class="insight-line"><span>Operating Hours</span><span>${formatValue(kpi.operatingHours, 1)} jam</span></div>
        <div class="insight-line"><span>Average Load</span><span>${formatValue(kpi.averageLoad, 1)}%</span></div>
        <div class="insight-line"><span>Energy Generated</span><span>${formatValue(kpi.energyGenerated, 1)} kWh</span></div>
        <div class="insight-line"><span>Start Count</span><span>${kpi.startCount}x</span></div>
      </div>
    </article>
  `;
}

function calculateHealth(latest) {
  let score = 100;

  const checks = [
    { item: SECTION_CONFIG.kelistrikan.items[0], value: toNumber(latest["Output Voltage (V)"]), warnDeduction: 8, critDeduction: 18 },
    { item: SECTION_CONFIG.kelistrikan.items[2], value: toNumber(latest["Frequency (Hz)"]), warnDeduction: 8, critDeduction: 18 },
    { item: SECTION_CONFIG.kelistrikan.items[4], value: toNumber(latest["Load (%)"]), warnDeduction: 10, critDeduction: 20 },
    { item: SECTION_CONFIG.mesin.items[1], value: toNumber(latest["Coolant Temp (C)"]), warnDeduction: 10, critDeduction: 20 },
    { item: SECTION_CONFIG.mesin.items[2], value: toNumber(latest["Oil Temp (C)"]), warnDeduction: 8, critDeduction: 15 },
    { item: SECTION_CONFIG.mesin.items[3], value: toNumber(latest["Oil Pressure (bar)"]), warnDeduction: 10, critDeduction: 20 },
    { item: SECTION_CONFIG.bahanbakar.items[1], value: toNumber(latest["Fuel Level (%)"]), warnDeduction: 8, critDeduction: 18 }
  ];

  checks.forEach((check) => {
    const status = evaluateStatus(check.value, check.item);
    if (status.level === "warning") score -= check.warnDeduction;
    if (status.level === "critical") score -= check.critDeduction;
  });

  const alarmText = String(latest["Alarm System"] || "NORMAL").toUpperCase();
  if (alarmText.includes("CRITICAL") || alarmText.includes("FAIL") || alarmText.includes("ERROR")) {
    score -= 15;
  } else if (alarmText !== "NORMAL" && alarmText !== "STANDBY") {
    score -= 8;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let level = "normal";
  let label = "Excellent";
  let subtitle = "Semua parameter berada pada kondisi ideal.";

  if (score < 90 && score >= 75) {
    level = "normal";
    label = "Good";
    subtitle = "Sistem masih dalam kondisi aman dan stabil.";
  } else if (score < 75 && score >= 60) {
    level = "warning";
    label = "Warning";
    subtitle = "Beberapa parameter perlu diperhatikan.";
  } else if (score < 60) {
    level = "critical";
    label = "Critical";
    subtitle = "Terdapat kondisi yang perlu penanganan segera.";
  }

  if (String(latest["PLN Status"] || "").toUpperCase() === "ON" && String(latest["Genset Status"] || "").toUpperCase() === "OFF") {
    subtitle = "Sistem standby karena suplai PLN aktif.";
    if (score > 85) {
      label = "Standby";
      level = "neutral";
    }
  }

  return { score, level, label, subtitle };
}

function calculateOperationalKPI() {
  const runningRows = state.liveData.filter((row) => String(row["Genset Status"] || "").toUpperCase() === "ON");
  const operatingHours = runningRows.length / 60;

  const loadValues = runningRows
    .map((row) => toNumber(row["Load (%)"]))
    .filter((v) => v !== null);

  const averageLoad = loadValues.length ? loadValues.reduce((a, b) => a + b, 0) / loadValues.length : 0;

  const energyGenerated = runningRows.reduce((sum, row) => {
    const power = toNumber(row["Output Power (kW)"]);
    return sum + (power || 0);
  }, 0) / 60;

  let startCount = 0;
  for (let i = 1; i < state.liveData.length; i++) {
    const prev = String(state.liveData[i - 1]["Genset Status"] || "").toUpperCase();
    const curr = String(state.liveData[i]["Genset Status"] || "").toUpperCase();
    if (prev === "OFF" && curr === "ON") startCount++;
  }

  return {
    operatingHours,
    averageLoad,
    energyGenerated,
    startCount
  };
}

function calculateFuelPrediction(latest, kpi) {
  const fuelLevel = toNumber(latest["Fuel Level (%)"]) ?? 0;
  const runtime = toNumber(latest["Estimated Runtime (h)"]) ?? 0;

  const startFuel = toNumber(state.liveData[0]?.["Fuel Level (%)"]) ?? fuelLevel;
  const fuelUsed = Math.max(0, startFuel - fuelLevel);

  return {
    fuelLevel,
    runtime,
    fuelUsed
  };
}

function calculateAlarmSummary() {
  const alarms = state.liveData.map((row) => String(row["Alarm System"] || "NORMAL").toUpperCase());

  const warningCount = alarms.filter((v) => v.includes("WARNING") || v.includes("LOW") || v.includes("HIGH")).length;
  const criticalCount = alarms.filter((v) => v.includes("CRITICAL") || v.includes("FAIL") || v.includes("ERROR")).length;

  const latest = String(state.liveData.at(-1)?.["Alarm System"] || "NORMAL").toUpperCase();
  let currentLabel = "NORMAL";
  let subtitle = "Tidak ada alarm aktif yang signifikan.";

  if (criticalCount > 0 || latest.includes("CRITICAL") || latest.includes("FAIL") || latest.includes("ERROR")) {
    currentLabel = "CRITICAL";
    subtitle = "Alarm kritis terdeteksi pada sistem.";
  } else if (warningCount > 0 || latest.includes("WARNING") || latest.includes("LOW") || latest.includes("HIGH")) {
    currentLabel = "WARNING";
    subtitle = "Terdapat alarm peringatan yang perlu diperhatikan.";
  }

  return {
    warningCount,
    criticalCount,
    currentLabel,
    subtitle
  };
}

function renderSection() {
  const detailSection = document.getElementById("detail-section");
  const summaryGrid = document.getElementById("summary-grid");
  const insightGrid = document.getElementById("insight-grid");

  if (state.section === "dashboard") {
    detailSection.classList.add("is-hidden");
    summaryGrid.classList.remove("is-hidden");
    insightGrid.classList.remove("is-hidden");
    return;
  }

  summaryGrid.classList.add("is-hidden");
  insightGrid.classList.add("is-hidden");
  detailSection.classList.remove("is-hidden");
  document.getElementById("detail-section-title").textContent = SECTION_CONFIG[state.section].title;

  renderDetailMenu();
  updateActiveRangeButtons();
  renderChart();
}

function renderDetailMenu() {
  const menu = SECTION_CONFIG[state.section].items;
  const wrap = document.getElementById("detail-menu");

  wrap.innerHTML = menu.map((item, index) => `
    <button class="detail-button ${index === state.subIndex ? "active" : ""}" data-index="${index}">
      ${item.label}
    </button>
  `).join("");

  wrap.querySelectorAll(".detail-button").forEach((btn) => {
    btn.addEventListener("click", () => changeSub(Number(btn.dataset.index)));
  });
}

function renderChart() {
  const config = SECTION_CONFIG[state.section];
  const item = config.items[state.subIndex];
  if (!item) return;

  const chartTitle = document.getElementById("chart-title");
  const chartDesc = document.getElementById("chart-desc");
  const currentStatusEl = document.getElementById("current-status");
  const currentValueEl = document.getElementById("current-value");
  const currentUnitEl = document.getElementById("current-unit");
  const currentTrendEl = document.getElementById("current-trend");
  const infoList = document.getElementById("info-list");
  const rangeLabel = document.getElementById("chart-range-label");

  chartTitle.textContent = item.label;
  chartDesc.textContent = `${item.description} ${getThresholdNarrative(item)}.`;
  rangeLabel.textContent = `Jendela data: ${getRangeLabel(state.range)}`;

  const sliced = state.liveData.slice(-state.range);
  const labels = sliced.map((row) => formatClock(row["Timestamp"]));
  const values = sliced.map((row) => {
    const val = toNumber(row[item.key]);
    if (val === null || val === 0) return null;
    return val;
  });

  const validValues = values.filter((v) => v !== null);
  const latestValue = lastValid(validValues);
  const previousValue = previousValid(validValues);
  const status = evaluateStatus(latestValue, item);
  const trend = getTrend(latestValue, previousValue);

  setBadge(currentStatusEl, status.level, status.label);
  currentValueEl.textContent = formatValue(latestValue, item.decimals);
  currentUnitEl.textContent = item.unit;
  currentTrendEl.textContent = trend.text;
  currentTrendEl.className = `trend-pill ${trend.level}`;

  const averageValue = average(validValues);
  const maxValue = validValues.length ? Math.max(...validValues) : null;
  const minValue = validValues.length ? Math.min(...validValues) : null;

  infoList.innerHTML = `
    <div class="info-item">
      <span>Status</span>
      <span>${status.label}</span>
    </div>
    <div class="info-item">
      <span>Rata-rata</span>
      <span>${formatValue(averageValue, item.decimals)} ${item.unit}</span>
    </div>
    <div class="info-item">
      <span>Maksimum</span>
      <span>${formatValue(maxValue, item.decimals)} ${item.unit}</span>
    </div>
    <div class="info-item">
      <span>Minimum</span>
      <span>${formatValue(minValue, item.decimals)} ${item.unit}</span>
    </div>
    <div class="info-item">
      <span>Ambang aman</span>
      <span>${getThresholdSummary(item)}</span>
    </div>

  `;

  if (state.chart) {
    state.chart.destroy();
  }

  const ctx = document.getElementById("mainChart").getContext("2d");
  const gradient = createGradient(ctx, item.color);
  const bounds = getSuggestedBounds(item, validValues);

  state.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: item.label,
        data: values,
        borderColor: item.color,
        backgroundColor: gradient,
        fill: true,
        tension: 0.22,
        pointRadius: 2.8,
        pointHoverRadius: 5,
        pointBackgroundColor: item.color,
        pointBorderColor: "#081525",
        pointBorderWidth: 1.2,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#ffffff",
            font: { size: 13 }
          }
        },
        tooltip: {
          callbacks: {
            label(context) {
              const val = context.parsed.y;
              return `${context.dataset.label}: ${formatValue(val, item.decimals)} ${item.unit}`;
            }
          }
        },
        thresholds: {
          lines: buildThresholdLines(item)
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Waktu",
            color: "#ffffff",
            font: { size: 15, weight: "bold" }
          },
          ticks: {
            color: "#d0d8e8",
            autoSkip: true,
            maxTicksLimit: 12,
            minRotation: 0,
            maxRotation: 0
          },
          grid: {
            color: "rgba(255,255,255,0.12)",
            lineWidth: 1
          },
          border: {
            color: "rgba(255,255,255,0.35)"
          }
        },
        y: {
          title: {
            display: true,
            text: item.unit,
            color: "#ffffff",
            font: { size: 15, weight: "bold" }
          },
          ticks: {
            color: "#d0d8e8"
          },
          grid: {
            color: "rgba(255,255,255,0.12)",
            lineWidth: 1
          },
          border: {
            color: "rgba(255,255,255,0.35)"
          },
          suggestedMin: bounds.min,
          suggestedMax: bounds.max
        }
      }
    }
  });
}

function calculateHealth(latest) {
  let score = 100;

  const checks = [
    { item: SECTION_CONFIG.kelistrikan.items[0], value: toNumber(latest["Output Voltage (V)"]), warnDeduction: 8, critDeduction: 18 },
    { item: SECTION_CONFIG.kelistrikan.items[2], value: toNumber(latest["Frequency (Hz)"]), warnDeduction: 8, critDeduction: 18 },
    { item: SECTION_CONFIG.kelistrikan.items[4], value: toNumber(latest["Load (%)"]), warnDeduction: 10, critDeduction: 20 },
    { item: SECTION_CONFIG.mesin.items[1], value: toNumber(latest["Coolant Temp (C)"]), warnDeduction: 10, critDeduction: 20 },
    { item: SECTION_CONFIG.mesin.items[2], value: toNumber(latest["Oil Temp (C)"]), warnDeduction: 8, critDeduction: 15 },
    { item: SECTION_CONFIG.mesin.items[3], value: toNumber(latest["Oil Pressure (bar)"]), warnDeduction: 10, critDeduction: 20 },
    { item: SECTION_CONFIG.bahanbakar.items[1], value: toNumber(latest["Fuel Level (%)"]), warnDeduction: 8, critDeduction: 18 }
  ];

  checks.forEach((check) => {
    const status = evaluateStatus(check.value, check.item);
    if (status.level === "warning") score -= check.warnDeduction;
    if (status.level === "critical") score -= check.critDeduction;
  });

  const alarmText = String(latest["Alarm System"] || "NORMAL").toUpperCase();
  if (alarmText.includes("CRITICAL") || alarmText.includes("FAIL") || alarmText.includes("ERROR")) {
    score -= 15;
  } else if (alarmText !== "NORMAL" && alarmText !== "STANDBY") {
    score -= 8;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let level = "normal";
  let label = "Excellent";
  let subtitle = "Semua parameter berada pada kondisi ideal.";

  if (score < 90 && score >= 75) {
    level = "normal";
    label = "Good";
    subtitle = "Sistem masih dalam kondisi aman dan stabil.";
  } else if (score < 75 && score >= 60) {
    level = "warning";
    label = "Warning";
    subtitle = "Beberapa parameter perlu diperhatikan.";
  } else if (score < 60) {
    level = "critical";
    label = "Critical";
    subtitle = "Terdapat kondisi yang perlu penanganan segera.";
  }

  if (String(latest["PLN Status"] || "").toUpperCase() === "ON" && String(latest["Genset Status"] || "").toUpperCase() === "OFF") {
    subtitle = "Sistem standby karena suplai PLN aktif.";
    if (score > 85) {
      label = "Standby";
      level = "neutral";
    }
  }

  return { score, level, label, subtitle };
}

function calculateOperationalKPI() {
  const runningRows = state.liveData.filter((row) => String(row["Genset Status"] || "").toUpperCase() === "ON");
  const operatingHours = runningRows.length / 60;

  const loadValues = runningRows
    .map((row) => toNumber(row["Load (%)"]))
    .filter((v) => v !== null);

  const averageLoad = loadValues.length ? loadValues.reduce((a, b) => a + b, 0) / loadValues.length : 0;

  const energyGenerated = runningRows.reduce((sum, row) => {
    const power = toNumber(row["Output Power (kW)"]);
    return sum + (power || 0);
  }, 0) / 60;

  let startCount = 0;
  for (let i = 1; i < state.liveData.length; i++) {
    const prev = String(state.liveData[i - 1]["Genset Status"] || "").toUpperCase();
    const curr = String(state.liveData[i]["Genset Status"] || "").toUpperCase();
    if (prev === "OFF" && curr === "ON") startCount++;
  }

  return {
    operatingHours,
    averageLoad,
    energyGenerated,
    startCount
  };
}

function calculateFuelPrediction(latest) {
  const fuelLevel = toNumber(latest["Fuel Level (%)"]) ?? 0;
  const runtime = toNumber(latest["Estimated Runtime (h)"]) ?? 0;

  const startFuel = toNumber(state.liveData[0]?.["Fuel Level (%)"]) ?? fuelLevel;
  const fuelUsed = Math.max(0, startFuel - fuelLevel);

  return {
    fuelLevel,
    runtime,
    fuelUsed
  };
}

function calculateAlarmSummary() {
  const alarms = state.liveData.map((row) => String(row["Alarm System"] || "NORMAL").toUpperCase());

  const warningCount = alarms.filter((v) => v.includes("WARNING") || v.includes("LOW") || v.includes("HIGH")).length;
  const criticalCount = alarms.filter((v) => v.includes("CRITICAL") || v.includes("FAIL") || v.includes("ERROR")).length;

  const latest = String(state.liveData.at(-1)?.["Alarm System"] || "NORMAL").toUpperCase();
  let currentLabel = "NORMAL";
  let subtitle = "Tidak ada alarm aktif yang signifikan.";

  if (criticalCount > 0 || latest.includes("CRITICAL") || latest.includes("FAIL") || latest.includes("ERROR")) {
    currentLabel = "CRITICAL";
    subtitle = "Alarm kritis terdeteksi pada sistem.";
  } else if (warningCount > 0 || latest.includes("WARNING") || latest.includes("LOW") || latest.includes("HIGH")) {
    currentLabel = "WARNING";
    subtitle = "Terdapat alarm peringatan yang perlu diperhatikan.";
  }

  return {
    warningCount,
    criticalCount,
    currentLabel,
    subtitle
  };
}

function evaluateStatus(value, item) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return { level: "neutral", label: "N/A" };
  }

  const t = item.thresholds || {};

  const critLow = t.critLow ?? null;
  const critHigh = t.critHigh ?? null;
  const warnLow = t.warnLow ?? null;
  const warnHigh = t.warnHigh ?? null;

  if ((critLow !== null && value <= critLow) || (critHigh !== null && value >= critHigh)) {
    return { level: "critical", label: "Critical" };
  }

  if ((warnLow !== null && value <= warnLow) || (warnHigh !== null && value >= warnHigh)) {
    return { level: "warning", label: "Warning" };
  }

  return { level: "normal", label: "Normal" };
}

function getThresholdNarrative(item) {
  const t = item.thresholds || {};
  const parts = [];

  if (t.warnLow !== undefined && t.warnLow !== null) {
    parts.push(`batas bawah waspada ${formatValue(t.warnLow, item.decimals)} ${item.unit}`);
  }
  if (t.warnHigh !== undefined && t.warnHigh !== null) {
    parts.push(`batas atas waspada ${formatValue(t.warnHigh, item.decimals)} ${item.unit}`);
  }

  if (!parts.length) return "Tidak ada batas waspada khusus pada parameter ini";
  return `Rentang pemantauan: ${parts.join(" dan ")}`;
}

function getThresholdSummary(item) {
  const t = item.thresholds || {};
  const low = t.warnLow ?? t.critLow ?? null;
  const high = t.warnHigh ?? t.critHigh ?? null;

  if (low !== null && high !== null) {
    return `${formatValue(low, item.decimals)}–${formatValue(high, item.decimals)} ${item.unit}`;
  }

  if (low !== null) {
    return `≥ ${formatValue(low, item.decimals)} ${item.unit}`;
  }

  if (high !== null) {
    return `≤ ${formatValue(high, item.decimals)} ${item.unit}`;
  }

  return "-";
}

function buildThresholdLines(item) {
  const t = item.thresholds || {};
  const lines = [];

  if (t.warnLow !== undefined && t.warnLow !== null) {
    lines.push({
      value: t.warnLow,
      label: "Warning Low",
      color: "#f5c542",
      dash: [8, 6]
    });
  }

  if (t.warnHigh !== undefined && t.warnHigh !== null) {
    lines.push({
      value: t.warnHigh,
      label: "Warning High",
      color: "#f5c542",
      dash: [8, 6]
    });
  }

  if (t.critLow !== undefined && t.critLow !== null) {
    lines.push({
      value: t.critLow,
      label: "Critical Low",
      color: "#ff5e5e",
      dash: [10, 6]
    });
  }

  if (t.critHigh !== undefined && t.critHigh !== null) {
    lines.push({
      value: t.critHigh,
      label: "Critical High",
      color: "#ff5e5e",
      dash: [10, 6]
    });
  }

  return lines;
}

function getSuggestedBounds(item, values) {
  const scale = item.scale || {};
  const all = [...values];

  const thresholdValues = (item.thresholds ? Object.values(item.thresholds) : [])
    .filter((v) => v !== null && v !== undefined && !Number.isNaN(v));

  all.push(...thresholdValues);

  if (!all.length) {
    return {
      min: scale.min ?? 0,
      max: scale.max ?? 1
    };
  }

  const minVal = Math.min(...all);
  const maxVal = Math.max(...all);
  const span = Math.max(maxVal - minVal, 1);
  const pad = span * 0.18;

  return {
    min: scale.min ?? (minVal - pad),
    max: scale.max ?? (maxVal + pad)
  };
}

function timestampToMinutes(ts) {
  const parts = String(ts || "").split(" ");
  if (parts.length < 2) return null;

  const time = parts[1].split(":");
  if (time.length < 2) return null;

  const h = Number(time[0]);
  const m = Number(time[1]);

  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function formatClock(ts) {
  const parts = String(ts || "").split(" ");
  if (parts.length < 2) return "--:--";
  return parts[1].slice(0, 5);
}

function getRangeLabel(minutes) {
  const map = {
    60: "1 Jam",
    360: "6 Jam",
    720: "12 Jam",
    1440: "24 Jam"
  };
  return map[minutes] || `${minutes} Menit`;
}

function formatValue(value, decimals = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  const num = Number(value);
  if (!Number.isFinite(num)) return "-";
  return num.toFixed(decimals);
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function average(values) {
  const nums = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function lastValid(values) {
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] !== null && values[i] !== undefined && !Number.isNaN(values[i])) {
      return values[i];
    }
  }
  return null;
}

function previousValid(values) {
  let foundOne = false;
  for (let i = values.length - 1; i >= 0; i--) {
    const v = values[i];
    if (v === null || v === undefined || Number.isNaN(v)) continue;

    if (!foundOne) {
      foundOne = true;
      continue;
    }

    return v;
  }
  return null;
}

function getTrend(current, previous) {
  if (current === null || previous === null) {
    return { level: "neutral", text: "↔ Stabil" };
  }

  const delta = current - previous;
  const abs = Math.abs(delta);

  if (abs < 0.05) {
    return { level: "neutral", text: "↔ Stabil" };
  }

  if (delta > 0) {
    return { level: "warning", text: `↑ Naik ${formatValue(abs, 2)}` };
  }

  return { level: "normal", text: `↓ Turun ${formatValue(abs, 2)}` };
}

function classifyText(text) {
  const value = String(text || "").toLowerCase();

  if (value.includes("critical") || value.includes("fail") || value.includes("error")) return "event-danger";
  if (value.includes("warning") || value.includes("low") || value.includes("high load")) return "event-warning";
  if (value.includes("start") || value.includes("online") || value.includes("transfer") || value.includes("running")) return "event-normal";
  if (value.includes("pln off") || value.includes("genset off")) return "event-danger";
  return "event-info";
}

function setBadge(element, level, text) {
  if (!element) return;
  element.className = `status-pill status-${level}`;
  element.textContent = text;
}

function createGradient(ctx, color) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 420);
  gradient.addColorStop(0, hexToRgba(color, 0.36));
  gradient.addColorStop(1, hexToRgba(color, 0.05));
  return gradient;
}

function hexToRgba(hex, alpha) {
  const clean = String(hex).replace("#", "");
  const value = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;

  const int = parseInt(value, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

init();
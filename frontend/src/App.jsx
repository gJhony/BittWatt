import React, { useEffect, useState } from 'react';

const paths = {
  bolt: <><path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  chart: <><path d="M3 3v18h18" /><path d="m7 14 4-4 4 4 6-7" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sliders: <><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  down: <path d="m7 10 5 5 5-5" />,
  arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  arrowDown: <><path d="m7 7 10 10M17 7v10H7" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  leaf: <><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z" /><path d="M4 21c3-5 7-8 12-11" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.6 1.4c-.9 1.1-2.2 1.2-2.2 3.1m0 3h.01" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
};

function Icon({ name, size = 18, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.grid}
    </svg>
  );
}

const navItems = [
  { id: 'overview', label: 'Resumen', icon: 'grid' },
  { id: 'alerts', label: 'Alertas', icon: 'bell', count: '3' },
  { id: 'history', label: 'Histórico', icon: 'chart' },
  { id: 'settings', label: 'Configuración', icon: 'sliders' },
];

const pageTitles = {
  overview: ['Resumen', 'Una vista clara de tu consumo energético.'],
  alerts: ['Centro de alertas', 'Detecta oportunidades y actúa a tiempo.'],
  history: ['Histórico de consumo', 'Explora el comportamiento energético de tu edificio.'],
  settings: ['Configuración', 'Tarifa, umbrales y zonas monitoreadas.'],
  help: ['Centro de ayuda', 'Guías y respuestas para aprovechar BitWatt.'],
};
const routes = new Set(['overview', 'alerts', 'history', 'settings', 'help', 'login', 'register']);

function getRoute() {
  const route = window.location.hash.replace(/^#\/?/, '');
  return routes.has(route) ? route : 'overview';
}

function Logo({ small = false }) {
  return (
    <div className={`brand ${small ? 'brand-small' : ''}`}>
      <span className="brand-mark"><Icon name="bolt" size={small ? 17 : 20} /></span>
      <span className="brand-name">Bit<span>Watt</span></span>
    </div>
  );
}

function Button({ children, variant = 'secondary', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

function Sidebar({ page, setPage, onLogout, open, onClose }) {
  return (
    <>
      {open && <button className="mobile-scrim" onClick={onClose} aria-label="Cerrar menú" />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <Logo />
          <button className="icon-button mobile-close" onClick={onClose} aria-label="Cerrar menú"><Icon name="close" /></button>
        </div>
        <button className="workspace-switcher" onClick={() => setPage('settings')} aria-label="Configurar este espacio de trabajo">
          <span className="workspace-icon"><Icon name="building" size={17} /></span>
          <span className="workspace-copy"><strong>Edificio Central</strong><small>Campus Norte</small></span>
          <Icon name="down" size={15} className="workspace-chevron" />
        </button>
        <div className="nav-section-label">ESPACIO DE TRABAJO</div>
        <nav className="sidebar-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-link ${page === item.id ? 'nav-active' : ''}`} onClick={() => { setPage(item.id); onClose(); }}>
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.count && <span className="nav-count">{item.count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="eco-card">
            <div className="eco-card-top"><span className="eco-icon"><Icon name="leaf" size={17} /></span><span className="live-dot" /> <small>IMPACTO DEL MES</small></div>
            <strong>−128 <span>kg CO₂</span></strong>
            <p>Un pequeño cambio, un gran impacto.</p>
            <div className="eco-progress"><i /></div>
            <small className="eco-target">64% de tu meta mensual</small>
          </div>
          <button className="sidebar-help" onClick={() => { setPage('help'); onClose(); }}><Icon name="help" size={17} /><span>Centro de ayuda</span><Icon name="chevron" size={15} /></button>
          <button className="profile-button" onClick={onLogout}>
            <span className="avatar">GB</span>
            <span className="profile-copy"><strong>Gadiel Bobadilla</strong><small>Administrador</small></span>
            <Icon name="down" size={15} />
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, onMenu, onLogout, onNotifications }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="topbar">
      <button className="icon-button menu-button" onClick={onMenu} aria-label="Abrir menú"><Icon name="menu" /></button>
      <div className="breadcrumb"><span>BitWatt</span><Icon name="chevron" size={14} /><strong>{title}</strong></div>
      <div className="topbar-actions">
        <div className="system-status"><span className="live-dot" /> Sistema en línea</div>
        <button className="icon-button notification-button" onClick={onNotifications} aria-label="Ver notificaciones"><Icon name="bell" /><i /></button>
        <div className="profile-menu-wrap">
          <button className="top-avatar" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú de cuenta">GB</button>
          {menuOpen && <div className="profile-menu"><strong>Gadiel Bobadilla</strong><span>Administrador</span><button onClick={onLogout}>Cerrar sesión</button></div>}
        </div>
      </div>
    </header>
  );
}

function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="page-heading">
      <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>
      {children && <div className="heading-actions">{children}</div>}
    </div>
  );
}

function MetricCard({ label, value, unit, change, tone = 'green', icon, detail }) {
  return (
    <article className="metric-card">
      <div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon name={icon} size={17} /></span></div>
      <div className="metric-value">{value}{unit && <small>{unit}</small>}</div>
      <div className="metric-footer">{change && <span className={`trend ${change.startsWith('+') ? 'trend-warn' : ''}`}><Icon name={change.startsWith('+') ? 'arrow' : 'arrowDown'} size={13} />{change}</span>}<span>{detail}</span></div>
    </article>
  );
}

const lineMain = 'M0 18 C14 15 28 17 42 17 L52 17 C59 17 60 39 62 70 C64 93 75 102 87 101 C99 100 101 88 103 66 C105 41 106 18 116 17 L151 17 C160 17 161 39 163 70 C165 93 176 102 188 101 C200 100 202 87 204 65 C206 40 207 18 217 17 L252 17 C261 17 262 39 264 70 C266 93 277 102 289 101 C301 100 303 87 305 65 C307 40 308 18 318 17 L353 17 C362 17 363 39 365 70 C367 93 378 102 390 101 C402 100 404 87 406 65 C408 40 409 18 419 17 L454 17 C463 17 464 39 466 70 C468 93 474 100 480 100';
const lineCompare = 'M0 28 C14 24 28 25 42 27 L57 27 C65 27 65 50 68 77 C71 96 81 106 93 104 C105 102 108 89 109 68 C111 44 112 28 122 27 L157 27 C166 27 167 49 169 77 C172 96 182 106 194 104 C206 102 209 89 210 68 C212 44 213 28 223 27 L258 27 C267 27 268 49 270 77 C273 96 283 106 295 104 C307 102 310 89 311 68 C313 44 314 28 324 27 L359 27 C368 27 369 49 371 77 C374 96 384 106 396 104 C408 102 411 89 412 68 C414 44 415 28 425 27 L460 27 C469 27 470 49 472 77 C475 96 478 102 480 103';

function ConsumptionChart({ compact = false }) {
  return (
    <div className={`chart-wrap ${compact ? 'chart-compact' : ''}`}>
      <div className="chart-y-labels"><span>300 kWh</span><span>225 kWh</span><span>150 kWh</span><span>75 kWh</span><span>0 kWh</span></div>
      <svg className="line-chart" viewBox="0 0 480 160" preserveAspectRatio="none" role="img" aria-label="Gráfica de consumo energético comparado">
        <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b5f34d" stopOpacity=".17" /><stop offset="100%" stopColor="#b5f34d" stopOpacity="0" /></linearGradient></defs>
        {[12, 49, 86, 123, 159].map((y) => <line key={y} x1="0" y1={y} x2="480" y2={y} className="chart-gridline" />)}
        <path d={`${lineMain} L480 159 L0 159 Z`} fill="url(#chartFill)" className="chart-area" />
        <path d={lineCompare} className="chart-line chart-line-compare" />
        <path d={lineMain} className="chart-line chart-line-current" />
        <circle cx="437" cy="19" r="4" className="chart-point" />
      </svg>
      <div className="chart-x-labels"><span>21 oct</span><span>25 oct</span><span>29 oct</span><span>02 nov</span><span>06 nov</span><span>10 nov</span><span>14 nov</span><span>18 nov</span></div>
    </div>
  );
}

function BarChart() {
  const sets = [
    { day: 'Lun', a: 72, b: 42 }, { day: 'Mar', a: 65, b: 38 }, { day: 'Mié', a: 84, b: 45 },
    { day: 'Jue', a: 58, b: 35 }, { day: 'Vie', a: 76, b: 40 }, { day: 'Sáb', a: 37, b: 22 }, { day: 'Dom', a: 28, b: 17 },
  ];
  return <div className="bar-chart">
    <div className="bar-y-labels"><span>300</span><span>225</span><span>150</span><span>75</span><span>0 kWh</span></div>
    <div className="bar-chart-body">
      <div className="bar-grid">{[0, 1, 2, 3].map((n) => <i key={n} />)}</div>
      <div className="bar-groups">{sets.map((set) => <div className="bar-group" key={set.day}><div className="bar-pair"><i className="bar bar-primary" style={{ '--bar-height': `${set.a}%` }} /><i className="bar bar-secondary" style={{ '--bar-height': `${set.b}%` }} /></div><small>{set.day}</small></div>)}</div>
    </div>
  </div>;
}

function Overview({ goTo }) {
  const [range, setRange] = useState('Últimos 30 días');
  const dateLabel = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()).toUpperCase();
  return (
    <div className="page-content page-enter">
      <PageHeading eyebrow={dateLabel} title="Buenos días, Gadiel" description="Aquí tienes el resumen energético de tu edificio.">
        <Button onClick={() => goTo('history')}><Icon name="chart" size={16} /> Ver reportes</Button>
      </PageHeading>
      <div className="metric-grid">
        <MetricCard label="Consumo actual" value="7,195.5" unit="kWh" change="+3.1%" detail="vs. periodo anterior" icon="bolt" />
        <MetricCard label="Periodo anterior" value="6,982.3" unit="kWh" detail="últimos 30 días" icon="chart" tone="blue" />
        <MetricCard label="Variación" value="+3.1%" unit="" detail="vs. periodo anterior" icon="arrow" tone="amber" />
        <MetricCard label="Costo estimado" value="$20,507" unit="MXN" detail="costo del periodo" icon="bolt" tone="purple" />
      </div>
      <div className="overview-grid">
        <section className="panel consumption-panel">
          <div className="panel-heading">
            <div><h2>Consumo energético</h2><p>Compara el consumo con el periodo anterior</p></div>
            <select className="select-control" value={range} onChange={(e) => setRange(e.target.value)} aria-label="Periodo del gráfico"><option>Últimos 30 días</option><option>Últimos 7 días</option><option>Este año</option></select>
          </div>
          <div className="chart-legend"><span><i className="legend-dot green-dot" /> Este periodo <strong>7,195.5 kWh</strong></span><span><i className="legend-dot dashed-dot" /> Periodo anterior <strong>6,982.3 kWh</strong></span></div>
          <ConsumptionChart />
          <div className="chart-summary"><span><i className="legend-dot green-dot" /> Consumo actual</span><span><i className="legend-dot dashed-dot" /> Periodo anterior</span><strong><Icon name="arrow" size={13} /> 7,195.5 kWh <small>en este periodo</small></strong></div>
        </section>
        <section className="panel efficiency-panel">
          <div className="panel-heading"><div><h2>Eficiencia energética</h2><p>Índice de eficiencia del edificio</p></div><button className="icon-button subtle-button" onClick={() => goTo('help')} aria-label="Más información sobre eficiencia"><Icon name="help" size={17} /></button></div>
          <div className="efficiency-gauge">
            <svg viewBox="0 0 200 116" aria-hidden="true"><path className="gauge-track" d="M20 100 A80 80 0 0 1 180 100" /><path className="gauge-value" d="M20 100 A80 80 0 0 1 146 31" /></svg>
            <div className="gauge-copy"><strong>78<span>/100</span></strong><small>Muy eficiente</small></div>
          </div>
          <div className="efficiency-scale"><span>Necesita atención</span><span>Excelente</span></div>
          <div className="efficiency-foot"><span className="scale-indicator" /> <span>Subiste <strong>+6 puntos</strong> este mes</span><Icon name="arrow" size={14} /></div>
        </section>
      </div>
      <div className="overview-grid bottom-grid">
        <section className="panel daily-panel">
          <div className="panel-heading"><div><h2>Consumo por día</h2><p>Distribución de energía en los últimos 7 días</p></div><button className="text-button" onClick={() => goTo('history')}>Ver histórico <Icon name="chevron" size={14} /></button></div>
          <div className="bar-legend"><span><i className="legend-dot blue-dot" /> Horario operativo</span><span><i className="legend-dot orange-dot" /> Fuera de horario</span></div>
          <BarChart />
        </section>
        <section className="panel alerts-preview">
          <div className="panel-heading"><div><h2>Alertas recientes</h2><p>Lo que necesita tu atención</p></div><button className="icon-button subtle-button" onClick={() => goTo('alerts')} aria-label="Ver todas las alertas"><Icon name="chevron" /></button></div>
          <AlertRow level="critical" title="Consumo fuera de horario" place="Edificio A · Piso 2" time="Hace 12 min" />
          <AlertRow level="warning" title="Pico de demanda detectado" place="Edificio Central · General" time="Hace 48 min" />
          <AlertRow level="info" title="Medidor reconectado" place="Laboratorio · Circuito 04" time="Hace 2 h" />
          <button className="all-alerts-button" onClick={() => goTo('alerts')}>Ver todas las alertas <Icon name="chevron" size={14} /></button>
        </section>
      </div>
      <footer className="page-footer"><span>Última actualización: hace 2 minutos</span><span><i className="live-dot" /> Datos sincronizados con tus medidores</span></footer>
    </div>
  );
}

function AlertRow({ level, title, place, time, onResolve, resolved = false }) {
  return (
    <div className={`alert-row alert-${level} ${resolved ? 'alert-resolved' : ''}`}>
      <span className="alert-symbol">{resolved ? <Icon name="check" size={16} /> : <Icon name={level === 'critical' ? 'bolt' : level === 'warning' ? 'chart' : 'check'} size={16} />}</span>
      <div className="alert-copy"><strong>{title}</strong><span>{place}</span></div>
      <span className="alert-time">{resolved ? 'Resuelta' : time}</span>
      {onResolve && !resolved && <button className="resolve-button" onClick={onResolve} title="Marcar como resuelta" aria-label={`Resolver: ${title}`}><Icon name="check" size={15} /></button>}
    </div>
  );
}

const initialAlerts = [
  { id: 1, level: 'critical', title: 'Consumo fuera de horario', place: 'Edificio A · Piso 2 · Circuito 08', time: 'Hace 12 min', description: 'El circuito mantiene un consumo de 18.4 kWh fuera del horario operativo.' },
  { id: 2, level: 'warning', title: 'Pico de demanda detectado', place: 'Edificio Central · General', time: 'Hace 48 min', description: 'La demanda superó el umbral establecido durante 15 minutos.' },
  { id: 3, level: 'warning', title: 'Consumo inusual en laboratorio', place: 'Laboratorio · Circuito 04', time: 'Hace 1 h', description: 'El consumo está 23% por encima del promedio habitual para este horario.' },
  { id: 4, level: 'info', title: 'Medidor reconectado', place: 'Edificio B · Planta baja', time: 'Hace 2 h', description: 'El medidor volvió a sincronizar correctamente con la plataforma.' },
  { id: 5, level: 'info', title: 'Meta semanal alcanzada', place: 'Edificio Central · General', time: 'Ayer, 16:24', description: 'El edificio consumió 5% menos energía que la meta de esta semana.' },
];

function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState('Todas');
  const [status, setStatus] = useState('Pendientes');
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = alerts.filter((alert) =>
    (filter === 'Todas' || alert.level === filter.toLowerCase()) &&
    (status === 'Todas' || (status === 'Pendientes' ? !alert.resolved : alert.resolved)) &&
    (!normalizedQuery || `${alert.title} ${alert.place} ${alert.description}`.toLowerCase().includes(normalizedQuery)),
  );
  const resolve = (id) => setAlerts((current) => current.map((alert) => alert.id === id ? { ...alert, resolved: true } : alert));
  const pendingCount = alerts.filter((alert) => !alert.resolved).length;
  return (
    <div className="page-content page-enter">
      <PageHeading eyebrow="MONITOREO EN TIEMPO REAL" title="Centro de alertas" description="Revisa eventos y mantén el consumo bajo control.">
        <Button onClick={() => setAlerts((current) => current.map((alert) => ({ ...alert, resolved: true })))}><Icon name="check" size={16} /> Resolver todas</Button>
      </PageHeading>
      <div className="alert-stats">
        <div className="alert-stat-card"><span className="stat-icon critical-icon"><Icon name="bolt" /></span><div><small>CRÍTICAS</small><strong>{alerts.filter((a) => a.level === 'critical' && !a.resolved).length.toString().padStart(2, '0')}</strong></div></div>
        <div className="alert-stat-card"><span className="stat-icon warning-icon"><Icon name="bell" /></span><div><small>ADVERTENCIAS</small><strong>{alerts.filter((a) => a.level === 'warning' && !a.resolved).length.toString().padStart(2, '0')}</strong></div></div>
        <div className="alert-stat-card"><span className="stat-icon info-icon"><Icon name="check" /></span><div><small>INFORMATIVAS</small><strong>{alerts.filter((a) => a.level === 'info' && !a.resolved).length.toString().padStart(2, '0')}</strong></div></div>
        <div className="alert-stat-card"><span className="stat-icon total-icon"><Icon name="grid" /></span><div><small>PENDIENTES</small><strong>{pendingCount.toString().padStart(2, '0')}</strong></div></div>
      </div>
      <section className="panel alerts-list-panel">
        <div className="list-toolbar">
          <div className="filter-tabs">{['Pendientes', 'Todas', 'Resueltas'].map((value) => <button key={value} className={status === value ? 'filter-active' : ''} onClick={() => setStatus(value)}>{value}{value === 'Pendientes' && <span>{pendingCount}</span>}</button>)}</div>
          <div className="toolbar-right"><label className="search-field"><Icon name="search" size={16} /><input placeholder="Buscar alerta..." aria-label="Buscar alerta" value={query} onChange={(e) => setQuery(e.target.value)} /></label><select className="select-control" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filtrar por prioridad"><option>Todas</option><option value="critical">Críticas</option><option value="warning">Advertencias</option><option value="info">Informativas</option></select></div>
        </div>
        <div className="alert-list">{filtered.length ? filtered.map((alert) => <div className="full-alert" key={alert.id}><AlertRow {...alert} onResolve={() => resolve(alert.id)} /><p>{alert.description}</p></div>) : <div className="empty-state"><span className="empty-icon"><Icon name="check" size={22} /></span><strong>Todo en orden</strong><p>No hay alertas en esta categoría.</p></div>}</div>
      </section>
      <footer className="page-footer"><span>Mostrando {filtered.length} de {alerts.length} eventos</span><span><i className="live-dot" /> Actualización automática activada</span></footer>
    </div>
  );
}

function HistoryPage() {
  const [range, setRange] = useState('30 días');
  const [view, setView] = useState('Consumo');
  const [notice, setNotice] = useState('');
  const [dateRange, setDateRange] = useState({ from: '2025-10-21', to: '2025-11-20' });
  const [draftDateRange, setDraftDateRange] = useState(dateRange);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const readings = [
    ['20 nov', '248.6', '$708.40', '51.2', '−8.2%'],
    ['19 nov', '271.1', '$773.20', '55.8', '+2.4%'],
    ['18 nov', '264.7', '$754.90', '54.5', '−3.1%'],
    ['17 nov', '198.3', '$565.20', '40.8', '−12.6%'],
    ['16 nov', '185.9', '$529.80', '38.3', '−6.4%'],
  ];
  const downloadCsv = () => {
    const csv = ['Fecha,Consumo (kWh),Costo (MXN),CO2e (kg)', ...readings.map(([day, energy, cost, carbon]) => `${day},${energy},${cost},${carbon}`)].join('\n');
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    link.href = url;
    link.download = 'bitwatt-historico.csv';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Reporte descargado correctamente');
    window.setTimeout(() => setNotice(''), 3000);
  };
  const formatDate = (date) => new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short' }).format(new Date(`${date}T12:00:00`));
  const createReport = () => {
    downloadCsv();
    setNotice('Reporte generado y descargado correctamente');
  };
  return (
    <div className="page-content page-enter">
      <PageHeading eyebrow="ANÁLISIS DE DATOS" title="Histórico de consumo" description="Entiende tus tendencias y compara periodos.">
        <Button onClick={downloadCsv}><Icon name="download" size={16} /> Exportar reporte</Button>
        <Button variant="primary" onClick={createReport}><Icon name="plus" size={17} /> Crear reporte</Button>
      </PageHeading>
      {notice && <div className="toast-message"><Icon name="check" size={16} />{notice}<button onClick={() => setNotice('')} aria-label="Cerrar"><Icon name="close" size={15} /></button></div>}
      <section className="panel history-panel">
        <div className="history-toolbar">
          <div className="segmented-control">{['Consumo', 'Costo', 'CO₂e'].map((item) => <button key={item} className={view === item ? 'segment-active' : ''} onClick={() => setView(item)}>{item}</button>)}</div>
          <div className="toolbar-right">
            <select className="select-control" value={range} onChange={(e) => setRange(e.target.value)} aria-label="Periodo del histórico"><option>7 días</option><option>30 días</option><option>90 días</option><option>Este año</option></select>
            <div className="date-picker-wrap">
              <button className="date-button" onClick={() => { setDraftDateRange(dateRange); setDatePickerOpen((open) => !open); }} aria-expanded={datePickerOpen}><Icon name="clock" size={15} /> {formatDate(dateRange.from)} — {formatDate(dateRange.to)} <Icon name="down" size={14} /></button>
              {datePickerOpen && <form className="date-picker-popover" onSubmit={(event) => { event.preventDefault(); setDateRange(draftDateRange); setDatePickerOpen(false); }}>
                <label>Desde<input type="date" value={draftDateRange.from} max={draftDateRange.to} onChange={(event) => setDraftDateRange((current) => ({ ...current, from: event.target.value }))} required /></label>
                <label>Hasta<input type="date" value={draftDateRange.to} min={draftDateRange.from} onChange={(event) => setDraftDateRange((current) => ({ ...current, to: event.target.value }))} required /></label>
                <Button type="submit" variant="primary">Aplicar fechas</Button>
              </form>}
            </div>
          </div>
        </div>
        <div className="history-highlight"><div><span className="eyebrow">CONSUMO TOTAL · ÚLTIMOS {range.toUpperCase()}</span><strong>{view === 'Consumo' ? '7,195.5' : view === 'Costo' ? '$20,507' : '1,482'} <small>{view === 'Consumo' ? 'kWh' : view === 'Costo' ? 'MXN' : 'kg CO₂e'}</small></strong></div><span className="history-change"><Icon name="arrowDown" size={14} /> 4.8% <small>vs. periodo anterior</small></span></div>
        <ConsumptionChart />
        <div className="chart-legend history-legend"><span><i className="legend-dot green-dot" /> Periodo actual</span><span><i className="legend-dot dashed-dot" /> Periodo anterior</span></div>
      </section>
      <section className="panel readings-panel">
        <div className="panel-heading"><div><h2>Detalle diario</h2><p>Lecturas agrupadas por día</p></div><button className="text-button" onClick={downloadCsv}>Descargar CSV <Icon name="download" size={15} /></button></div>
        <div className="table-scroll"><table><thead><tr><th>FECHA</th><th>CONSUMO</th><th>COSTO ESTIMADO</th><th>HUELLA CO₂e</th><th>VS. PROMEDIO</th></tr></thead><tbody>{readings.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell} className={index === 4 ? (cell.startsWith('+') ? 'table-up' : 'table-down') : ''}>{index === 4 && <Icon name={cell.startsWith('+') ? 'arrow' : 'arrowDown'} size={13} />}{index === 1 ? `${cell} kWh` : index === 2 ? `${cell} MXN` : index === 3 ? `${cell} kg` : cell}</td>)}</tr>)}</tbody></table></div>
      </section>
      <footer className="page-footer"><span>Datos consolidados de 4 medidores activos</span><span>Zona horaria: Ciudad de México (UTC−6)</span></footer>
    </div>
  );
}

const defaultSettings = {
  rate: '2.85',
  emissionFactor: '0.438',
  openingHour: '7',
  closingHour: '19',
  maxDemand: '22',
  afterHoursPeak: '1500',
  standbyLimit: '600',
  circuits: [true, true, true, true, true, true],
};
const settingsStorageKey = 'bitwatt-monitoring-settings';
const monitoredZones = [
  ['Aulas Edificio A', 'CTO-01', 'Iluminación y contactos de 12 aulas'],
  ['Laboratorio de Cómputo', 'CTO-02', '40 equipos de escritorio y proyector'],
  ['Oficinas Administrativas', 'CTO-03', 'Dirección, control escolar y servidores'],
  ['Biblioteca', 'CTO-04', 'Iluminación, consulta digital'],
  ['Cafetería', 'CTO-05', 'Refrigeración y equipo de cocina'],
  ['Climatización Central', 'CTO-06', 'Unidades de aire acondicionado'],
];

function readSettings() {
  try {
    const stored = window.localStorage.getItem(settingsStorageKey);
    const savedValue = stored ? JSON.parse(stored) : {};
    const parsed = savedValue && typeof savedValue === 'object' && !Array.isArray(savedValue) ? savedValue : {};
    const storedCircuits = Array.isArray(parsed.circuits) ? parsed.circuits : [];
    return {
      values: {
        ...defaultSettings,
        ...parsed,
        circuits: defaultSettings.circuits.map((enabled, index) => (
          typeof storedCircuits[index] === 'boolean' ? storedCircuits[index] : enabled
        )),
      },
      error: '',
    };
  } catch {
    return { values: defaultSettings, error: 'No se pudieron leer los valores guardados; se muestran los predeterminados.' };
  }
}

function SettingsPage() {
  const [initial] = useState(readSettings);
  const [config, setConfig] = useState(initial.values);
  const [notice, setNotice] = useState(initial.error);
  const update = (key) => (event) => setConfig((current) => ({ ...current, [key]: event.target.value }));
  const toggleCircuit = (index) => setConfig((current) => ({
    ...current,
    circuits: current.circuits.map((enabled, circuitIndex) => circuitIndex === index ? !enabled : enabled),
  }));
  useEffect(() => {
    try {
      window.localStorage.setItem(settingsStorageKey, JSON.stringify(config));
    } catch {
      setNotice('No se pudieron guardar los cambios en este navegador.');
    }
  }, [config]);
  const resetSettings = () => {
    setConfig({ ...defaultSettings, circuits: [...defaultSettings.circuits] });
    setNotice('Valores predeterminados restaurados.');
  };
  const field = (label, key, unit, description) => (
    <label className="reference-field">
      <span>{label}</span>
      <div className="reference-input"><input type="number" min="0" step="any" value={config[key]} onChange={update(key)} /><small>{unit}</small></div>
      <small className="field-description">{description}</small>
    </label>
  );
  return (
    <div className="page-content page-enter settings-reference">
      <div className="settings-reference-top">
        <PageHeading eyebrow="PREFERENCIAS" title="Configuración" description="Tarifa, umbrales y zonas monitoreadas." />
        {notice && <div className="settings-save-status" role="status"><Icon name="check" size={14} />{notice}<button onClick={() => setNotice('')} aria-label="Cerrar aviso"><Icon name="close" size={14} /></button></div>}
      </div>
      <div className="settings-reference-top-grid">
        <section className="panel reference-panel">
          <div className="reference-panel-heading"><h2>Tarifa y factor de emisión</h2><p>Se usan para calcular costos en MXN e impacto ambiental</p></div>
          <div className="reference-fields two-fields">
            {field('Tarifa eléctrica', 'rate', 'MXN/kWh', 'Precio promedio por kWh de tu recibo CFE (incluye IVA).')}
            {field('Factor de emisión', 'emissionFactor', 'kg CO₂e/kWh', 'Factor del Sistema Eléctrico Nacional publicado por SEMARNAT/CFE.')}
          </div>
        </section>
        <section className="panel reference-panel">
          <div className="reference-panel-heading"><h2>Horario operativo</h2><p>Fuera de este horario cualquier consumo se considera atípico</p></div>
          <div className="reference-fields two-fields">
            {field('Hora de apertura', 'openingHour', 'h', 'Hora de inicio de actividades (lunes a viernes).')}
            {field('Hora de cierre', 'closingHour', 'h', 'Hora en que el edificio queda sin ocupantes.')}
          </div>
        </section>
      </div>
      <section className="panel reference-panel">
        <div className="reference-panel-heading"><h2>Umbrales de alerta</h2><p>Las alertas automáticas se generan cuando se superan estos valores</p></div>
        <div className="reference-fields three-fields">
          {field('Demanda máxima', 'maxDemand', 'kW', 'Potencia total contratada. Superarla genera una alerta crítica.')}
          {field('Pico fuera de horario', 'afterHoursPeak', 'W por circuito', 'Consumo nocturno o en fin de semana que indica equipos encendidos.')}
          {field('Límite de espera (standby)', 'standbyLimit', 'W por circuito', 'Carga base sostenida que delata vampirismo energético.')}
        </div>
      </section>
      <section className="panel reference-panel zones-panel">
        <div className="reference-panel-heading"><h2>Circuitos y zonas monitoreadas</h2><p>{config.circuits.filter(Boolean).length} de {monitoredZones.length} circuitos activos · cada uno con un nodo ESP32 + SCT-013</p></div>
        <div className="zones-list">
          {monitoredZones.map(([name, id, description], index) => (
            <div className="zone-row" key={id}>
              <span className="zone-copy"><strong>{name} <small>{id}</small></strong><span>{description}</span></span>
              <button className={`zone-switch ${config.circuits[index] ? 'zone-switch-on' : ''}`} onClick={() => toggleCircuit(index)} aria-label={`${config.circuits[index] ? 'Desactivar' : 'Activar'} ${name}`} aria-pressed={config.circuits[index]}><i /></button>
            </div>
          ))}
        </div>
      </section>
      <div className="settings-reference-actions"><button className="button" onClick={resetSettings}><Icon name="clock" size={15} /> Restablecer valores predeterminados</button></div>
    </div>
  );
}

function HelpPage({ goTo }) {
  const [query, setQuery] = useState('');
  const helpTopics = [
    { title: '¿Cómo interpreto el consumo actual?', text: 'El resumen compara el consumo acumulado del periodo con el periodo anterior. Usa el Histórico para cambiar la escala y exportar las lecturas.' },
    { title: '¿Qué hago cuando recibo una alerta?', text: 'Abre el Centro de alertas, revisa el circuito y la descripción del evento. Al terminar la revisión, márcala como resuelta para mantener la lista al día.' },
    { title: '¿Cómo configuro tarifas y umbrales?', text: 'En Configuración puedes actualizar la tarifa eléctrica, el factor de emisión, el horario operativo y los límites que generan alertas.' },
    { title: '¿Cómo administro los circuitos?', text: 'Activa o pausa cada zona en Configuración. El estado se guarda en este navegador y puedes restaurar los valores predeterminados cuando quieras.' },
  ];
  const topics = helpTopics.filter(({ title, text }) => `${title} ${text}`.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="page-content page-enter">
      <PageHeading eyebrow="ASISTENCIA BITWATT" title="Centro de ayuda" description="Encuentra respuestas rápidas sobre monitoreo, alertas y configuración." />
      <section className="panel help-intro">
        <span className="help-intro-icon"><Icon name="help" size={22} /></span>
        <div><h2>¿En qué podemos ayudarte?</h2><p>Consulta las guías o visita directamente el apartado que necesitas.</p></div>
        <label className="search-field help-search"><Icon name="search" size={16} /><input placeholder="Buscar en la ayuda..." aria-label="Buscar en la ayuda" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </section>
      <section className="help-links" aria-label="Accesos rápidos">
        <button className="panel help-link-card" onClick={() => goTo('overview')}><Icon name="grid" /><span><strong>Resumen</strong><small>Consumo y eficiencia del edificio</small></span><Icon name="chevron" size={16} /></button>
        <button className="panel help-link-card" onClick={() => goTo('history')}><Icon name="chart" /><span><strong>Histórico</strong><small>Revisa y exporta tus lecturas</small></span><Icon name="chevron" size={16} /></button>
        <button className="panel help-link-card" onClick={() => goTo('alerts')}><Icon name="bell" /><span><strong>Alertas</strong><small>Revisa eventos y resuélvelos</small></span><Icon name="chevron" size={16} /></button>
        <button className="panel help-link-card" onClick={() => goTo('settings')}><Icon name="sliders" /><span><strong>Configuración</strong><small>Tarifas, horarios y circuitos</small></span><Icon name="chevron" size={16} /></button>
      </section>
      <section className="panel help-faq">
        <div className="panel-heading"><div><h2>Preguntas frecuentes</h2><p>Guías rápidas para las tareas más comunes.</p></div></div>
        <div className="help-faq-list">{topics.length ? topics.map(({ title, text }) => <details key={title}><summary>{title}<Icon name="down" size={16} /></summary><p>{text}</p></details>) : <div className="help-empty">No encontramos artículos para “{query}”. Prueba con otra búsqueda.</div>}</div>
      </section>
      <section className="help-contact"><span><strong>¿Necesitas más ayuda?</strong><small>Escríbenos y el equipo de BitWatt te orientará.</small></span><a className="button" href="mailto:soporte@bitwatt.mx?subject=Ayuda%20con%20BitWatt"><Icon name="help" size={15} /> Contactar soporte</a></section>
    </div>
  );
}

function AuthPage({ onLogin, onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <main className="auth-page page-enter">
      <div className="auth-main">
        <div className="auth-header"><Logo /><span>¿Necesitas ayuda? <a href="mailto:soporte@bitwatt.mx">Contáctanos</a></span></div>
        <div className="auth-content">
          <div className="auth-mark"><Icon name="bolt" size={19} /></div>
          <div className="eyebrow">QUÉ BUENO TENERTE DE VUELTA</div>
          <h1>Monitorea tu energía.<br /><span>Impulsa el cambio.</span></h1>
          <p className="auth-description">Inicia sesión para continuar con la gestión energética de tu edificio.</p>
          <form className="auth-form" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <label className="field-label">Correo electrónico<div className="auth-input"><Icon name="user" size={17} /><input type="email" placeholder="tu@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div></label>
            <label className="field-label">Contraseña<div className="auth-input"><Icon name="lock" size={17} /><input type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" required minLength="4" /><button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}><Icon name="eye" size={17} /></button></div></label>
            <div className="auth-options"><label className="checkbox-label"><input type="checkbox" /> <span>Recordarme</span></label><a href="mailto:soporte@bitwatt.mx?subject=Recuperar%20contrase%C3%B1a">¿Olvidaste tu contraseña?</a></div>
            <Button type="submit" variant="primary" className="auth-submit">Iniciar sesión <Icon name="chevron" size={16} /></Button>
          </form>
          <div className="auth-switch">¿Aún no tienes una cuenta? <button onClick={() => onSwitch('register')}>Crear cuenta <Icon name="chevron" size={14} /></button></div>
        </div>
        <div className="auth-footer"><span>© 2026 BitWatt GridSense</span><span><Icon name="lock" size={13} /> Conexión segura y cifrada</span></div>
      </div>
      <div className="auth-aside">
        <div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" />
        <span className="aside-glow" />
        <div className="aside-content">
          <div className="aside-kicker"><span className="live-dot" /> ENERGÍA CONSCIENTE, FUTURO SOSTENIBLE</div>
          <h2>Cada kilowatt<br />cuenta<span>.</span></h2>
          <p>Transforma los datos de tu edificio en decisiones que hacen la diferencia.</p>
          <div className="aside-graph">
            <div className="aside-graph-head"><span>Consumo optimizado</span><strong>−18.6% <Icon name="arrowDown" size={15} /></strong></div>
            <ConsumptionChart compact />
          </div>
          <div className="aside-foot"><span><Icon name="leaf" size={16} /> Monitoreo inteligente</span><span><Icon name="building" size={16} /> Edificios sostenibles</span></div>
        </div>
        <div className="aside-footer">ODS 7 · Energía asequible y no contaminante</div>
      </div>
    </main>
  );
}

function RegisterPage({ onLogin, onSwitch }) {
  return (
    <main className="auth-page page-enter">
      <div className="auth-main">
        <div className="auth-header"><Logo /><span>¿Ya tienes una cuenta? <button onClick={() => onSwitch('login')}>Inicia sesión</button></span></div>
        <div className="auth-content register-content">
          <div className="auth-mark"><Icon name="bolt" size={19} /></div>
          <div className="eyebrow">EMPIEZA A AHORRAR ENERGÍA</div>
          <h1>Tu edificio más<br /><span>inteligente.</span></h1>
          <p className="auth-description">Crea tu espacio de trabajo y descubre lo que pasa con tu energía.</p>
          <form className="auth-form" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <label className="field-label">Nombre completo<div className="auth-input"><Icon name="user" size={17} /><input placeholder="Tu nombre" required /></div></label>
            <label className="field-label">Correo electrónico<div className="auth-input"><Icon name="user" size={17} /><input type="email" placeholder="tu@empresa.com" required /></div></label>
            <label className="field-label">Contraseña<div className="auth-input"><Icon name="lock" size={17} /><input type="password" placeholder="Mínimo 8 caracteres" minLength="8" required /></div></label>
            <label className="checkbox-label terms-label"><input type="checkbox" required /> <span>Acepto los <a href="#terminos">términos de servicio</a> y la <a href="#privacidad">política de privacidad</a>.</span></label>
            <Button type="submit" variant="primary" className="auth-submit">Crear mi cuenta <Icon name="chevron" size={16} /></Button>
          </form>
          <div className="auth-switch">¿Ya eres parte de BitWatt? <button onClick={() => onSwitch('login')}>Iniciar sesión <Icon name="chevron" size={14} /></button></div>
        </div>
        <div className="auth-footer"><span>© 2026 BitWatt GridSense</span><span><Icon name="lock" size={13} /> Conexión segura y cifrada</span></div>
      </div>
      <div className="auth-aside">
        <div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" /><span className="aside-glow" />
        <div className="aside-content">
          <div className="aside-kicker"><span className="live-dot" /> ENERGÍA CONSCIENTE, FUTURO SOSTENIBLE</div>
          <h2>El cambio<br />empieza <span>hoy.</span></h2>
          <p>Únete a los edificios que están construyendo un futuro más eficiente.</p>
          <div className="signup-benefits"><div><span className="benefit-icon"><Icon name="chart" /></span><span><strong>Visibilidad en tiempo real</strong><small>Entiende cada consumo, cada día.</small></span></div><div><span className="benefit-icon"><Icon name="leaf" /></span><span><strong>Impacto medible</strong><small>Conoce tu ahorro y huella de carbono.</small></span></div><div><span className="benefit-icon"><Icon name="bell" /></span><span><strong>Alertas inteligentes</strong><small>Actúa antes de que el consumo crezca.</small></span></div></div>
          <div className="aside-quote">“Lo que se mide, se puede mejorar.”<small>— Principio de eficiencia energética</small></div>
        </div><div className="aside-footer">ODS 7 · Energía asequible y no contaminante</div>
      </div>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!window.location.hash) window.location.hash = '/overview';
    const syncRoute = () => setRoute(getRoute());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);
  useEffect(() => {
    const title = pageTitles[route]?.[0] || (route === 'login' ? 'Iniciar sesión' : 'Crear cuenta');
    document.title = `BitWatt — ${title}`;
    window.scrollTo(0, 0);
  }, [route]);
  const goTo = (next) => {
    setMenuOpen(false);
    if (routes.has(next) && next !== route) {
      window.location.hash = `/${next}`;
      setRoute(next);
    }
  };
  if (route === 'login') return <AuthPage onLogin={() => goTo('overview')} onSwitch={goTo} />;
  if (route === 'register') return <RegisterPage onLogin={() => goTo('overview')} onSwitch={goTo} />;
  return (
    <div className="app-shell">
      <Sidebar page={route} setPage={goTo} open={menuOpen} onClose={() => setMenuOpen(false)} onLogout={() => goTo('login')} />
      <div className="main-shell"><Topbar title={pageTitles[route][0]} onMenu={() => setMenuOpen(true)} onLogout={() => goTo('login')} onNotifications={() => goTo('alerts')} />
        <main className="main-content">
          {route === 'overview' && <Overview goTo={goTo} />}
          {route === 'alerts' && <AlertsPage />}
          {route === 'history' && <HistoryPage />}
          {route === 'settings' && <SettingsPage />}
          {route === 'help' && <HelpPage goTo={goTo} />}
        </main>
      </div>
    </div>
  );
}

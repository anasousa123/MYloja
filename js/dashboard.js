/* ==========================================================
   FASHION ERP
   DASHBOARD.CSS
   Visual premium — azul marinho + dourado
========================================================== */


/* ==========================================================
   CONTEÚDO PRINCIPAL
========================================================== */

.main-content {
    margin-left: 270px;
    width: calc(100% - 270px);
    min-height: 100vh;

    background: #f5f7fb;

    overflow-x: hidden;

    transition: .3s ease;
}


/* ==========================================================
   SIDEBAR
========================================================== */

.sidebar {
    position: fixed;

    top: 0;
    left: 0;

    width: 270px;
    height: 100vh;

    background: #0b1428;

    border-right: 1px solid rgba(255,255,255,.06);

    display: flex;
    flex-direction: column;

    z-index: 1000;
}


/* ==========================================================
   LOGO
========================================================== */

.sidebar-logo {

    min-height: 92px;

    display: flex;
    align-items: center;

    gap: 13px;

    padding: 0 22px;

    border-bottom: 1px solid rgba(255,255,255,.07);
}

.sidebar-logo .logo-icon {

    width: 49px;
    height: 49px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 14px;

    background: #d9b12d;

    color: #0b1428;

    font-size: 20px;

    box-shadow: 0 10px 28px rgba(217,177,45,.20);
}

.sidebar-logo h2 {

    margin: 0;

    color: #ffffff;

    font-size: 1.22rem;

    font-weight: 700;

    line-height: 1.2;
}

.sidebar-logo span {

    display: block;

    margin-top: 3px;

    color: #d9b12d;

    font-size: .68rem;

    font-weight: 700;

    letter-spacing: 1.5px;
}


/* ==========================================================
   MENU
========================================================== */

.sidebar-menu {

    flex: 1;

    padding: 20px 14px;

    overflow-y: auto;
}

.sidebar-menu::-webkit-scrollbar {
    width: 4px;
}

.sidebar-menu::-webkit-scrollbar-thumb {

    background: rgba(255,255,255,.12);

    border-radius: 10px;
}

.menu-title {

    margin: 15px 11px 9px;

    color: #73809a;

    font-size: .65rem;

    font-weight: 700;

    letter-spacing: 1.1px;
}

.menu-title:first-child {
    margin-top: 0;
}

.menu-item {

    min-height: 46px;

    display: flex;
    align-items: center;

    gap: 13px;

    margin-bottom: 4px;

    padding: 0 14px;

    border-radius: 11px;

    color: #b8c2d4;

    text-decoration: none;

    font-size: .84rem;

    font-weight: 500;

    transition: .25s ease;
}

.menu-item i {

    width: 20px;

    text-align: center;

    color: #aab5c8;

    font-size: 15px;
}

.menu-item:hover {

    background: rgba(217,177,45,.08);

    color: #ffffff;

    transform: translateX(2px);
}

.menu-item:hover i {
    color: #d9b12d;
}

.menu-item.active {

    background: #d9b12d;

    color: #101827;

    box-shadow:
        0 10px 25px rgba(217,177,45,.18);
}

.menu-item.active i {
    color: #101827;
}


/* ==========================================================
   USUÁRIO SIDEBAR
========================================================== */

.sidebar-user {

    min-height: 73px;

    display: flex;
    align-items: center;

    gap: 10px;

    padding: 14px 16px;

    border-top: 1px solid rgba(255,255,255,.07);
}

.user-avatar {

    width: 38px;
    height: 38px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: rgba(217,177,45,.14);

    color: #d9b12d;
}

.user-info {

    min-width: 0;

    flex: 1;
}

.user-info strong {

    display: block;

    color: #ffffff;

    font-size: .76rem;

    white-space: nowrap;
}

.user-info span {

    display: block;

    margin-top: 3px;

    color: #7f8ba0;

    font-size: .65rem;
}

.logout-button {

    width: 32px;
    height: 32px;

    border: 0;

    border-radius: 8px;

    background: transparent;

    color: #8792a5;

    cursor: pointer;

    transition: .2s;
}

.logout-button:hover {

    background: rgba(239,68,68,.10);

    color: #ef4444;
}


/* ==========================================================
   TOPBAR
========================================================== */

.topbar {

    min-height: 88px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 32px;

    background: #ffffff;

    border-bottom: 1px solid #e7ebf1;

    position: sticky;

    top: 0;

    z-index: 900;
}

.topbar-left {

    display: flex;
    align-items: center;

    gap: 14px;

    min-width: 0;
}

.topbar-left > div {
    min-width: 0;
}

.topbar-left h1 {

    margin: 0;

    color: #0f172a;

    font-size: 1.35rem;

    font-weight: 700;

    line-height: 1.2;
}

.topbar-left p {

    margin: 4px 0 0;

    color: #8490a3;

    font-size: .72rem;

    line-height: 1.3;
}

.mobile-menu {

    width: 38px;
    height: 38px;

    display: none;

    align-items: center;
    justify-content: center;

    border: 1px solid #e2e7ef;

    border-radius: 9px;

    background: #ffffff;

    color: #475569;

    cursor: pointer;
}

.topbar-right {

    display: flex;
    align-items: center;

    gap: 15px;
}

.notification-button {

    position: relative;

    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #e1e6ee;

    border-radius: 11px;

    background: #ffffff;

    color: #64748b;

    cursor: pointer;

    transition: .2s;
}

.notification-button:hover {

    border-color: #d9b12d;

    color: #b58e13;
}

.notification-dot {

    position: absolute;

    top: 8px;
    right: 8px;

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: #d9b12d;
}

.topbar-user {

    display: flex;
    align-items: center;

    gap: 9px;
}

.topbar-avatar {

    width: 39px;
    height: 39px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #0b1428;

    color: #d9b12d;

    font-size: .78rem;

    font-weight: 700;
}

.topbar-user strong {

    display: block;

    color: #172033;

    font-size: .75rem;

    line-height: 1.2;
}

.topbar-user span {

    display: block;

    margin-top: 3px;

    color: #22c55e;

    font-size: .62rem;
}


/* ==========================================================
   CONTEÚDO DO DASHBOARD
========================================================== */

.dashboard-content {

    padding: 30px 32px 40px;

    max-width: 1600px;

    margin: 0 auto;
}


/* ==========================================================
   CABEÇALHO / WELCOME
========================================================== */

.dashboard-header {

    min-height: 135px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 25px;

    padding: 25px 30px;

    margin-bottom: 25px;

    border-radius: 18px;

    background: #14213d;

    box-shadow:
        0 14px 30px rgba(15,23,42,.10);
}

.dashboard-welcome {

    display: block;

    margin-bottom: 5px;

    color: #d9b12d;

    font-size: .72rem;

    font-weight: 600;
}

.dashboard-header h2 {

    margin: 0;

    color: #ffffff;

    font-size: 1.55rem;

    font-weight: 700;

    line-height: 1.3;
}

.dashboard-header p {

    margin: 6px 0 0;

    color: #bdc7d8;

    font-size: .76rem;

    line-height: 1.4;
}

.dashboard-actions {

    flex-shrink: 0;
}


/* ==========================================================
   BOTÃO PRINCIPAL
========================================================== */

.btn-primary {

    min-height: 43px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 8px;

    padding: 0 18px;

    border: 0;

    border-radius: 10px;

    background: #d9b12d;

    color: #101827;

    font-size: .75rem;

    font-weight: 700;

    text-decoration: none;

    cursor: pointer;

    box-shadow:
        0 8px 20px rgba(217,177,45,.18);

    transition: .25s;
}

.btn-primary:hover {

    background: #e4bf3c;

    transform: translateY(-2px);
}


/* ==========================================================
   CARDS DE INDICADORES
========================================================== */

.dashboard-stats {

    display: grid;

    grid-template-columns:
        repeat(4, minmax(0, 1fr));

    gap: 18px;

    margin-bottom: 24px;
}

.stat-card {

    min-width: 0;

    min-height: 128px;

    display: grid;

    grid-template-columns: 44px minmax(0,1fr);

    grid-template-rows:
        auto
        auto
        auto;

    column-gap: 14px;

    padding: 20px;

    background: #ffffff;

    border: 1px solid #e6eaf0;

    border-radius: 15px;

    box-shadow:
        0 4px 16px rgba(15,23,42,.035);

    overflow: hidden;

    transition: .25s ease;
}

.stat-card:hover {

    transform: translateY(-3px);

    box-shadow:
        0 12px 28px rgba(15,23,42,.08);
}

.stat-card-header {

    grid-column: 1;

    grid-row: 1 / 4;

    margin: 0;

    display: block;
}

.stat-icon {

    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    font-size: 16px;
}

.stat-icon.blue {

    background: #fff8df;

    color: #c49a16;
}

.stat-icon.green {

    background: #ecfdf5;

    color: #16a34a;
}

.stat-icon.orange {

    background: #fff7ed;

    color: #ea580c;
}

.stat-icon.red {

    background: #fef2f2;

    color: #dc2626;
}

.stat-card-label {

    grid-column: 2;

    grid-row: 1;

    display: block;

    margin: 2px 0 3px;

    color: #7a8699;

    font-size: .68rem;

    font-weight: 500;

    line-height: 1.3;

    white-space: nowrap;
}

.stat-card-value {

    grid-column: 2;

    grid-row: 2;

    display: block;

    margin: 0;

    color: #0f172a;

    font-size: 1.28rem;

    font-weight: 700;

    line-height: 1.25;

    white-space: nowrap;
}

.stat-card-change {

    grid-column: 2;

    grid-row: 3;

    display: flex;

    align-items: center;

    gap: 5px;

    width: fit-content;

    margin-top: 5px;

    color: #94a3b8;

    font-size: .61rem;

    line-height: 1.3;
}

.stat-card-change.positive {

    color: #16a34a;
}

.stat-card-change small {

    color: #94a3b8;

    font-size: .59rem;

    font-weight: 400;

    white-space: nowrap;
}


/* ==========================================================
   GRID INFERIOR
========================================================== */

.dashboard-grid {

    display: grid;

    grid-template-columns:
        minmax(0, 1.55fr)
        minmax(310px, .9fr);

    gap: 20px;

    margin-bottom: 20px;
}


/* ==========================================================
   CARDS
========================================================== */

.dashboard-card {

    min-width: 0;

    background: #ffffff;

    border: 1px solid #e5e9ef;

    border-radius: 16px;

    overflow: hidden;

    box-shadow:
        0 4px 15px rgba(15,23,42,.035);
}

.dashboard-card-header {

    min-height: 73px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    padding: 17px 21px;

    border-bottom: 1px solid #edf0f4;
}

.dashboard-card-header h3 {

    margin: 0;

    color: #111827;

    font-size: .88rem;

    font-weight: 700;

    line-height: 1.3;
}

.dashboard-card-header p {

    margin: 4px 0 0;

    color: #94a3b8;

    font-size: .65rem;

    line-height: 1.4;
}

.dashboard-card-body {

    padding: 20px;
}


/* ==========================================================
   FILTRO
========================================================== */

.dashboard-filter {

    height: 35px;

    padding: 0 12px;

    border: 1px solid #e1e6ed;

    border-radius: 8px;

    background: #ffffff;

    color: #475569;

    font-family: inherit;

    font-size: .65rem;

    outline: none;

    cursor: pointer;
}


/* ==========================================================
   RESUMO DE VENDAS
========================================================== */

.sales-summary {

    min-height: 260px;
}

.sales-total {

    display: flex;

    flex-direction: column;

    gap: 4px;

    margin-bottom: 18px;
}

.sales-total span {

    color: #94a3b8;

    font-size: .67rem;
}

.sales-total strong {

    color: #0f172a;

    font-size: 1.35rem;

    font-weight: 700;
}


/* ==========================================================
   GRÁFICO
========================================================== */

.sales-chart {

    height: 160px;

    display: flex;

    align-items: flex-end;

    padding: 15px 8px 0;

    border-bottom: 1px solid #e9edf2;

    background:
        repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 39px,
            #eef1f5 40px
        );
}

.chart-line {

    width: 100%;

    height: 100%;

    display: flex;

    align-items: flex-end;

    justify-content: space-around;

    gap: 12px;
}

.chart-line span {

    width: 9%;

    min-height: 20px;

    border-radius: 7px 7px 0 0;

    background: #d9b12d;

    box-shadow:
        0 5px 12px rgba(217,177,45,.14);
}

.chart-days {

    display: grid;

    grid-template-columns:
        repeat(7,1fr);

    padding-top: 9px;

    color: #9aa5b5;

    font-size: .58rem;

    text-align: center;
}


/* ==========================================================
   ATIVIDADES
========================================================== */

.activity-item {

    min-width: 0;

    display: grid;

    grid-template-columns: 36px minmax(0,1fr) auto;

    align-items: center;

    gap: 10px;

    padding: 13px 0;

    border-bottom: 1px solid #eef1f4;
}

.activity-item:last-child {
    border-bottom: 0;
}

.activity-icon {

    width: 36px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;

    font-size: 13px;
}

.activity-icon.yellow {

    background: #fff8df;

    color: #c49a16;
}

.activity-icon.blue {

    background: #eff6ff;

    color: #2563eb;
}

.activity-icon.green {

    background: #ecfdf5;

    color: #16a34a;
}

.activity-icon.purple {

    background: #f5f3ff;

    color: #7c3aed;
}

.activity-item > div:nth-child(2) {
    min-width: 0;
}

.activity-item strong {

    display: block;

    overflow: hidden;

    color: #172033;

    font-size: .67rem;

    font-weight: 600;

    line-height: 1.4;

    white-space: nowrap;

    text-overflow: ellipsis;
}

.activity-item span {

    display: block;

    margin-top: 3px;

    overflow: hidden;

    color: #94a3b8;

    font-size: .59rem;

    line-height: 1.4;

    white-space: nowrap;

    text-overflow: ellipsis;
}

.activity-item > small {

    color: #9aa5b5;

    font-size: .58rem;

    white-space: nowrap;
}

.view-all {

    color: #c49a16;

    font-size: .63rem;

    font-weight: 600;

    text-decoration: none;
}

.view-all:hover {
    text-decoration: underline;
}


/* ==========================================================
   ACESSO RÁPIDO
========================================================== */

.quick-card {
    margin-top: 0;
}

.quick-actions {

    display: grid;

    grid-template-columns:
        repeat(4, minmax(0,1fr));

    gap: 12px;
}

.quick-action {

    min-height: 60px;

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 12px;

    border: 1px solid #e5e9ef;

    border-radius: 11px;

    background: #ffffff;

    color: #334155;

    text-decoration: none;

    transition: .2s;
}

.quick-action:hover {

    border-color: #d9b12d;

    background: #fffdf5;

    transform: translateY(-2px);
}

.quick-action i {

    width: 34px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    border-radius: 9px;

    background: #fff8df;

    color: #c49a16;

    font-size: 12px;
}

.quick-action span {

    font-size: .66rem;

    font-weight: 600;
}


/* ==========================================================
   RODAPÉ
========================================================== */

.dashboard-footer {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;

    padding: 20px 0 5px;

    color: #94a3b8;

    font-size: .61rem;
}


/* ==========================================================
   RESPONSIVIDADE
========================================================== */

@media (max-width: 1200px) {

    .dashboard-stats {

        grid-template-columns:
            repeat(2, minmax(0,1fr));
    }

    .dashboard-grid {

        grid-template-columns: 1fr;
    }

}


@media (max-width: 900px) {

    .sidebar {

        transform: translateX(-100%);
    }

    .sidebar.open {

        transform: translateX(0);
    }

    .main-content {

        margin-left: 0;

        width: 100%;
    }

    .mobile-menu {

        display: flex;
    }

    .dashboard-content {

        padding: 24px 20px 35px;
    }

}


@media (max-width: 650px) {

    .topbar {

        padding: 0 18px;
    }

    .topbar-user > div:last-child {

        display: none;
    }

    .dashboard-header {

        align-items: flex-start;

        flex-direction: column;
    }

    .dashboard-actions {

        width: 100%;
    }

    .dashboard-actions .btn-primary {

        width: 100%;
    }

    .dashboard-stats {

        grid-template-columns: 1fr;
    }

    .dashboard-grid {

        grid-template-columns: 1fr;
    }

    .quick-actions {

        grid-template-columns: 1fr 1fr;
    }

    .dashboard-footer {

        flex-direction: column;

        align-items: flex-start;
    }

}


@media (max-width: 430px) {

    .dashboard-content {

        padding: 18px 14px 30px;
    }

    .dashboard-header {

        padding: 22px;
    }

    .dashboard-header h2 {

        font-size: 1.25rem;
    }

    .quick-actions {

        grid-template-columns: 1fr;
    }

}
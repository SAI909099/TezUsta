import { Link, NavLink, Outlet } from 'react-router-dom';
import { BottomTabs, ButtonLink } from '../components/MobileChrome';
import { Icon } from '../components/Icons';

const customerLinks = [
  { to: '/app/dashboard', label: 'Dashboard', end: true },
  { to: '/app/masters', label: 'Ustalar', end: true },
  { to: '/app/jobs/new', label: 'Yangi ish', end: true },
  { to: '/app/wallet', label: 'Hamyon', end: true },
];

const customerTabs = [
  { to: '/app/dashboard', label: 'Asosiy', icon: 'home', end: true },
  { to: '/app/jobs/new', label: 'Yangi ish', icon: 'plus', end: true },
  { to: '/app/wallet', label: 'Hamyon', icon: 'wallet', end: true },
];

const masterLinks = [
  { to: '/master/dashboard', label: 'Mavjud ishlar', end: true },
  { to: '/app/wallet', label: 'Hamyon', end: true },
];

const masterTabs = [
  { to: '/master/dashboard', label: 'Ishlar', icon: 'jobs', end: true },
  { to: '/app/wallet', label: 'Hamyon', icon: 'wallet', end: true },
];

function AppHeader({ links, switchTo, switchLabel, roleLabel }) {
  return (
    <header className="site-header">
      <div className="shell-container site-header__inner">
        <div className="site-brand">
          <Link to="/" className="brand-link">
            TezUsta
          </Link>
          <span className="site-role-chip">{roleLabel}</span>
        </div>

        <nav className="desktop-nav" aria-label="Sahifa navigatsiyasi">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `desktop-nav__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link to="/app/wallet" className="header-icon-link" aria-label="Hamyon">
            <Icon name="wallet" size={18} />
          </Link>
          <Link to={switchTo} className="role-switch-link">
            {switchLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}

function AppLayout({ links, tabs, switchTo, switchLabel, roleLabel }) {
  return (
    <div className="site-shell">
      <AppHeader
        links={links}
        switchTo={switchTo}
        switchLabel={switchLabel}
        roleLabel={roleLabel}
      />
      <main className="site-main">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
      <BottomTabs items={tabs} />
    </div>
  );
}

export function PublicLayout() {
  return (
    <div className="site-shell">
      <header className="site-header site-header--public">
        <div className="shell-container site-header__inner">
          <Link to="/" className="brand-link">
            TezUsta
          </Link>
          <div className="site-header__actions site-header__actions--public">
            <Link to="/login" className="header-text-link">
              Kirish
            </Link>
            <Link to="/master/dashboard" className="header-text-link header-text-link--secondary">
              Usta bo'lish
            </Link>
            <ButtonLink to="/login" icon={null} className="button--small">
              Buyurtma berish
            </ButtonLink>
          </div>
        </div>
      </header>

      <main className="site-main site-main--public">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function CustomerLayout() {
  return (
    <AppLayout
      links={customerLinks}
      tabs={customerTabs}
      switchTo="/master/dashboard"
      switchLabel="Usta rejimi"
      roleLabel="Mijoz"
    />
  );
}

export function MasterLayout() {
  return (
    <AppLayout
      links={masterLinks}
      tabs={masterTabs}
      switchTo="/app/dashboard"
      switchLabel="Mijoz rejimi"
      roleLabel="Usta"
    />
  );
}

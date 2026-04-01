import { Link, NavLink } from 'react-router-dom';
import { Icon } from './Icons';

function classes(...values) {
  return values.filter(Boolean).join(' ');
}

export function ButtonLink({
  to,
  children,
  icon = 'chevron-right',
  tone = 'primary',
  className = '',
}) {
  return (
    <Link to={to} className={classes('button', `button--${tone}`, className)}>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} /> : null}
    </Link>
  );
}

export function PrimaryButton({
  children,
  type = 'button',
  onClick,
  icon = 'chevron-right',
  tone = 'primary',
  className = '',
}) {
  return (
    <button
      type={type}
      className={classes('button', `button--${tone}`, className)}
      onClick={onClick}
    >
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} /> : null}
    </button>
  );
}

export function SecondaryButton({
  children,
  type = 'button',
  onClick,
  icon = null,
  className = '',
}) {
  return (
    <button
      type={type}
      className={classes('button', 'button--secondary', className)}
      onClick={onClick}
    >
      {icon ? <Icon name={icon} size={18} /> : null}
      <span>{children}</span>
    </button>
  );
}

export function StatusPill({ children, tone = 'neutral', icon, className = '' }) {
  return (
    <span className={classes('status-pill', `status-pill--${tone}`, className)}>
      {icon ? <Icon name={icon} size={14} /> : null}
      <span>{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
  as: TitleTag = 'h1',
}) {
  return (
    <div className={classes('section-heading', className)}>
      {eyebrow ? <span className="section-heading__eyebrow">{eyebrow}</span> : null}
      <TitleTag className="section-heading__title">{title}</TitleTag>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}

function FieldFrame({ label, hint, icon, children }) {
  return (
    <label className="field-block">
      <span className="field-block__label">{label}</span>
      <div className="input-shell">
        {icon ? (
          <span className="field-prefix">
            <Icon name={icon} size={18} />
          </span>
        ) : null}
        {children}
      </div>
      {hint ? <span className="field-block__hint">{hint}</span> : null}
    </label>
  );
}

export function InputField({ label, icon, hint, className = '', ...props }) {
  return (
    <FieldFrame label={label} icon={icon} hint={hint}>
      <input className={classes('app-input', className)} {...props} />
    </FieldFrame>
  );
}

export function SelectField({ label, icon, hint, className = '', children, ...props }) {
  return (
    <FieldFrame label={label} icon={icon} hint={hint}>
      <select className={classes('app-input', 'app-select', className)} {...props}>
        {children}
      </select>
      <span className="field-suffix">
        <Icon name="chevron-down" size={16} />
      </span>
    </FieldFrame>
  );
}

export function TextareaField({ label, icon, hint, className = '', ...props }) {
  return (
    <FieldFrame label={label} icon={icon} hint={hint}>
      <textarea className={classes('app-input', 'app-textarea', className)} {...props} />
    </FieldFrame>
  );
}

export function BottomTabs({ items }) {
  if (!items.length) {
    return null;
  }

  return (
    <nav className="mobile-tabs" aria-label="Asosiy navigatsiya">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => classes('mobile-tabs__link', isActive && 'is-active')}
        >
          <span className="mobile-tabs__icon">
            <Icon name={item.icon} size={18} />
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function AvatarStack({ items }) {
  return (
    <div className="avatar-stack" aria-hidden="true">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="avatar-stack__item">
          {item}
        </span>
      ))}
    </div>
  );
}

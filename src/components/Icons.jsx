export function Icon({ name, size = 20, className = '' }) {
  const sharedProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    case 'arrow-left':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M15 18 9 12l6-6" />
        </svg>
      );
    case 'menu':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      );
    case 'bell':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M7 9a5 5 0 1 1 10 0c0 6 2 7 2 7H5s2-1 2-7" />
          <path {...sharedProps} d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case 'phone':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            {...sharedProps}
            d="M21 15.4v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.6 5.2 2 2 0 0 1 5.6 3h3a2 2 0 0 1 2 1.7l.4 2.6a2 2 0 0 1-.6 1.8l-1.3 1.3a16 16 0 0 0 4.8 4.8l1.3-1.3a2 2 0 0 1 1.8-.6l2.6.4A2 2 0 0 1 21 15.4Z"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M12 3 5 6v5c0 4.7 3 8.8 7 10 4-1.2 7-5.3 7-10V6l-7-3Z" />
          <path {...sharedProps} d="m9.5 12 1.8 1.8L15 10.2" />
        </svg>
      );
    case 'flash':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" />
        </svg>
      );
    case 'home':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="m4 11 8-6 8 6" />
          <path {...sharedProps} d="M6 10v9h12v-9" />
        </svg>
      );
    case 'jobs':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M8 6V4h8v2" />
          <rect {...sharedProps} x="4" y="6" width="16" height="13" rx="2.5" />
          <path {...sharedProps} d="M4 12h16" />
        </svg>
      );
    case 'orders':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <rect {...sharedProps} x="6" y="4" width="12" height="16" rx="2.5" />
          <path {...sharedProps} d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case 'user':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path {...sharedProps} d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
    case 'users':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" />
          <path {...sharedProps} d="M17 12a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 17 12Z" />
          <path {...sharedProps} d="M3.5 20a5.5 5.5 0 0 1 11 0" />
          <path {...sharedProps} d="M14 19.5a4.5 4.5 0 0 1 6.5-3.9" />
        </svg>
      );
    case 'plus':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <rect {...sharedProps} x="4" y="6" width="16" height="14" rx="2.5" />
          <path {...sharedProps} d="M8 3v5M16 3v5M4 10h16" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
          <circle {...sharedProps} cx="12" cy="10" r="2.4" />
        </svg>
      );
    case 'camera':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M8 6 9.4 4h5.2L16 6h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
          <circle {...sharedProps} cx="12" cy="12.5" r="3.5" />
        </svg>
      );
    case 'upload':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M12 16V6" />
          <path {...sharedProps} d="m8 10 4-4 4 4" />
          <path {...sharedProps} d="M5 18h14" />
        </svg>
      );
    case 'wallet':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5Z" />
          <path {...sharedProps} d="M4 8h12" />
          <circle {...sharedProps} cx="16" cy="13" r="1.2" />
        </svg>
      );
    case 'star':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.1L12 17.2 6.5 20l1-6.1L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M21 4 3.5 10.7l5.2 2 8-5.6-6.2 6 2 6.3L21 4Z" />
        </svg>
      );
    case 'message':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M5 18.5V6.8A2.8 2.8 0 0 1 7.8 4h8.4A2.8 2.8 0 0 1 19 6.8v5.4A2.8 2.8 0 0 1 16.2 15H10l-5 3.5Z" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="m10 6 6 6-6 6" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'search':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <circle {...sharedProps} cx="11" cy="11" r="6.5" />
          <path {...sharedProps} d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <circle {...sharedProps} cx="12" cy="12" r="8" />
          <path {...sharedProps} d="M12 8v4l3 2" />
        </svg>
      );
    case 'credit-card':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <rect {...sharedProps} x="3" y="5" width="18" height="14" rx="2.5" />
          <path {...sharedProps} d="M3 10h18M8 15h4" />
        </svg>
      );
    case 'gift':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M4 10h16v10H4zM12 10v10" />
          <path {...sharedProps} d="M2.5 7.5h19v3h-19z" />
          <path {...sharedProps} d="M12 7.5c0-2.2-1.2-4-3-4-1.2 0-2 .8-2 1.8 0 1.6 1.6 2.2 5 2.2Zm0 0c0-2.2 1.2-4 3-4 1.2 0 2 .8 2 1.8 0 1.6-1.6 2.2-5 2.2Z" />
        </svg>
      );
    case 'tool':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M14.5 4.5A4.2 4.2 0 0 0 10 10l-5 5a1.5 1.5 0 0 0 2.1 2.1l5-5a4.2 4.2 0 0 0 5.5-5.5l-2.6 2.6-2.1-2.1Z" />
        </svg>
      );
    case 'wrench':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M14.7 6.3a4 4 0 0 0-5.1 5.1l-4.8 4.8a1.6 1.6 0 0 0 2.2 2.2l4.8-4.8a4 4 0 0 0 5.1-5.1l-2.6 2.6-2.2-2.2Z" />
        </svg>
      );
    case 'drop':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M12 3s5 5.8 5 10a5 5 0 0 1-10 0c0-4.2 5-10 5-10Z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="M13 2 6 12h4l-1 10 7-10h-4l1-10Z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path {...sharedProps} d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
          <path {...sharedProps} d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
        </svg>
      );
    case 'lock':
      return (
        <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <rect {...sharedProps} x="5" y="11" width="14" height="10" rx="2.5" />
          <path {...sharedProps} d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    default:
      return null;
  }
}

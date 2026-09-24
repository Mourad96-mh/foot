// Line icons (24x24, stroke = currentColor). Decorative by default.
const paths = {
  coach: <><circle cx="12" cy="7" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /><path d="M9.5 4.5h5" /><path d="M12 14l-1.5 3h3z" /></>,
  tactics: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 8l2 2m0-2l-2 2" /><circle cx="16" cy="16" r="1.8" /><path d="M9 15c2-4 4-6 7-7m0 0h-3m3 0v3" /></>,
  chart: <><path d="M4 20h16" /><rect x="6" y="12" width="3" height="6" /><rect x="11" y="8" width="3" height="10" /><rect x="16" y="5" width="3" height="13" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 6H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4" /><path d="M12 13v4m-4 3h8m-6 0v-3h4v3" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="M8.5 11l1.5 1.5L13 9.5M8.5 16.5h7" /></>,
  handshake: <><path d="M2 11l4-4 4 2 3-2 4 1 5 4" /><path d="M6 7v6l5 5c.8.8 2 .8 2.8 0l4.2-4.2" /><path d="M10 9l-2 3 2 1 3-2" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.2a5 5 0 0 1 5 4.8v1" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></>,
  pin: <><path d="M12 21s-7-6.3-7-11.5A7 7 0 0 1 19 9.5C19 14.7 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  ball: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5l4 2.9-1.5 4.7h-5L8 10.4z" /><path d="M12 3v4.5m4 2.9l4.3-1.4M14.5 15.1l2.6 3.8M9.5 15.1l-2.6 3.8M8 10.4L3.7 9" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-4.5" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" /></>,
  heart: <><path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z" /><path d="M7 11h3l1.5-2.5 2 5L15 11h2" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h12l-2 4 2 4H5" /></>,
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  arrow: <path d="M5 12h14m-6-6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  play: <path d="M8 5v14l11-7z" />,
  download: <><path d="M12 4v11m-5-5l5 5 5-5" /><path d="M5 20h14" /></>,
  print: <><path d="M7 9V3h10v6" /><rect x="3" y="9" width="18" height="8" rx="2" /><path d="M7 14h10v7H7z" /></>,
  camera: <><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
};

const filled = new Set(['play']);

export default function Icon({ name, size = 24, className, label }) {
  const aria = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled.has(name) ? 'currentColor' : 'none'}
      stroke={filled.has(name) ? 'none' : 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      focusable="false"
      {...aria}
    >
      {paths[name]}
    </svg>
  );
}

// Brand marks, filled.
export function WhatsAppIcon({ size = 24, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

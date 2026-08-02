// Single inline-SVG icon set (24px grid, 1.5px stroke, currentColor) —
// replaces emoji so rendering is consistent across platforms.

const PATHS: Record<string, React.ReactNode> = {
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="M12 14l3.5-3.5" />
      <path d="M4 18h16" />
    </>
  ),
  landing: (
    <>
      <path d="M3 19h18" />
      <path d="M4 10.5l4.2 1.2 2.1-5.2 1.9.6-.5 5.7 4.8 1.4 1.5-1.9 1.6.5-1.5 3.6a1.5 1.5 0 0 1-1.8.9L4.6 13.4z" />
    </>
  ),
  store: (
    <>
      <path d="M4 9l1.2-4.5A1 1 0 0 1 6.2 3.7h11.6a1 1 0 0 1 1 .8L20 9" />
      <path d="M4 9h16v2.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-6 0 2.5 2.5 0 0 1-5 0V9z" />
      <path d="M5.5 14v6.3h13V14" />
      <path d="M9.5 20v-4h5v4" />
    </>
  ),
  map: (
    <>
      <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  checklist: (
    <>
      <path d="M4 6.5l1.5 1.5L8 5.5" />
      <path d="M4 12.5l1.5 1.5L8 11.5" />
      <path d="M4 18.5L5.5 20 8 17.5" />
      <path d="M11 6.5h9M11 12.5h9M11 18.5h9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.6v5.2c0 4.6-3 8.4-7 10.2-4-1.8-7-5.6-7-10.2V5.6L12 3z" />
      <path d="M9 11.8l2.1 2.2L15.2 9.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5.5" y="10.5" width="13" height="10" rx="2" />
      <path d="M8.5 10.5v-3a3.5 3.5 0 0 1 7 0v3" />
      <path d="M12 14.5v2.5" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10.5 4.9 8.2 4 5.5 4H4v14h1.5c2.7 0 5 .9 6.5 2.5 1.5-1.6 3.8-2.5 6.5-2.5H20V4h-1.5c-2.7 0-5 .9-6.5 2.5z" />
      <path d="M12 6.5v14" />
    </>
  ),
  arrowRight: <path d="M4 12h16m-6-6l6 6-6 6" />,
  alert: (
    <>
      <path d="M12 4L2.8 19.5h18.4L12 4z" />
      <path d="M12 10v4.5M12 17.5h.01" />
    </>
  ),
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  check: <path d="M4.5 12.5l5 5L19.5 6.5" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 20c.5-3.5 2.8-5.5 5.5-5.5s5 2 5.5 5.5" />
      <path d="M15.5 4.9a3.5 3.5 0 0 1 0 6.2M17.5 14.9c1.7.8 2.7 2.6 3 5.1" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5z" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6V3z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
    </>
  ),
  phone: (
    <>
      <path d="M5.5 4h4l1.5 4.5-2.2 1.7a13 13 0 0 0 5 5l1.7-2.2L20 14.5v4a1.5 1.5 0 0 1-1.6 1.5C10.6 19.4 4.6 13.4 4 5.6A1.5 1.5 0 0 1 5.5 4z" />
    </>
  ),
};

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  size = 24,
  className = "",
  strokeWidth = 1.5,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

// Filled maple-leaf brand mark.
export function LeafMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12 1.8l1.7 3.2 2.4-1.1-.6 2.8 3-.4-1.4 2.5 2.8 1.2-2.3 1.7 1.6 2.3-3.1-.3.3 3.1-2.7-1.4-.9 2.4v3.4h-1.6v-3.4l-.9-2.4-2.7 1.4.3-3.1-3.1.3 1.6-2.3-2.3-1.7 2.8-1.2-1.4-2.5 3 .4-.6-2.8 2.4 1.1L12 1.8z"
      />
    </svg>
  );
}

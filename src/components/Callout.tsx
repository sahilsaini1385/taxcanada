import Icon, { type IconName } from "./Icon";

// Semantic tones only — the brand saffron is reserved for accents,
// warnings use amber so alerts don't own the brand color.
const STYLES = {
  info: {
    box: "border-spruce-200 bg-spruce-50 text-spruce-900",
    icon: "book" as IconName,
    iconColor: "text-spruce-600",
  },
  warning: {
    box: "border-amber-200 bg-amber-50 text-amber-950",
    icon: "alert" as IconName,
    iconColor: "text-amber-600",
  },
  success: {
    box: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: "check" as IconName,
    iconColor: "text-emerald-600",
  },
} as const;

export default function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof STYLES;
  title?: string;
  children: React.ReactNode;
}) {
  const s = STYLES[variant];
  return (
    <div className={`my-5 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${s.box}`}>
      <Icon name={s.icon} size={20} className={`mt-0.5 shrink-0 ${s.iconColor}`} />
      <div className="min-w-0">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  );
}

const STYLES = {
  info: "border-primary-200 bg-primary-50 text-primary-900",
  warning: "border-saffron-200 bg-saffron-50 text-saffron-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
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
  return (
    <div className={`my-4 rounded-lg border p-4 text-sm leading-relaxed ${STYLES[variant]}`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}

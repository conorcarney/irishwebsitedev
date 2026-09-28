export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-balance text-ink md:text-6xl">
        {title}
      </h1>
      <div className="mt-5 text-lg leading-relaxed text-muted">{children}</div>
    </header>
  );
}

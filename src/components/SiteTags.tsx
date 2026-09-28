export function SiteTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full bg-card px-2.5 py-1 text-xs text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}

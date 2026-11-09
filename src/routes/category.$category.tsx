import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, getByCategory, formatDate, type Category } from "@/lib/articles";

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const meta = CATEGORIES.find((c) => c.slug === params.category);
    if (!meta) throw notFound();
    return { meta, articles: getByCategory(params.category as Category) };
  },
  head: ({ loaderData, params }) => {
    const label = loaderData?.meta.label ?? "Section";
    return {
      meta: [
        { title: `${label} — The Student Economist` },
        { name: "description", content: `Student writing on ${label.toLowerCase()} from The Student Economist.` },
        { property: "og:title", content: `${label} — The Student Economist` },
        { property: "og:url", content: `/category/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/category/${params.category}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-6 py-32 text-center">
      <h1 className="font-display text-5xl italic">Section not found</h1>
      <Link to="/" className="mt-8 inline-block underline">Front page</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-6 py-32 text-center">
      <h1 className="font-display text-4xl italic">Could not load section</h1>
      <p className="mt-2 text-ink-muted">{error.message}</p>
      <button onClick={reset} className="mt-6 underline">Try again</button>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { meta, articles } = Route.useLoaderData();

  return (
    <main className="mx-6">
      <header className="py-16 md:py-24 border-b border-ink text-center animate-reveal">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">The {meta.label} desk</p>
        <h1 className="mt-6 font-display text-6xl md:text-7xl italic">{meta.label}</h1>
        <p className="mt-6 max-w-xl mx-auto font-serif text-ink-muted">
          {articles.length} piece{articles.length === 1 ? "" : "s"} from student writers covering {meta.label.toLowerCase()}.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-ink-muted italic">No pieces filed yet.</p>
          <Link to="/submit" className="mt-4 inline-block underline">Be the first to write one.</Link>
        </div>
      ) : (
        <ul className="divide-y divide-ink/10 max-w-4xl mx-auto py-12">
          {articles.map((a: typeof articles[number], i: number) => (
            <li key={a.slug}>
              <Link
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="grid grid-cols-12 gap-6 py-8 group items-start animate-reveal"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="col-span-12 md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted pt-2">
                  {formatDate(a.publishedAt)}
                </span>
                <div className="col-span-12 md:col-span-10">
                  <h2 className="font-display text-2xl md:text-3xl leading-tight group-hover:italic transition-all">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-ink-muted leading-relaxed">{a.dek}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    {a.author} &middot; {a.affiliation} &middot; {a.readMinutes} min
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

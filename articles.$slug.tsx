import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ARTICLES, formatDate, getArticle } from "@/lib/articles";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    return {
      meta: [
        { title: a ? `${a.title} — The Student Economist` : "Article" },
        { name: "description", content: a?.dek ?? "" },
        { property: "og:title", content: a?.title ?? "" },
        { property: "og:description", content: a?.dek ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/articles/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/articles/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-6 py-32 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">Not in this issue</p>
      <h1 className="mt-4 font-display text-5xl italic">Article not found</h1>
      <Link to="/" className="mt-8 inline-block underline">Return to the front page</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-6 py-32 text-center">
      <h1 className="font-display text-4xl italic">Could not load article</h1>
      <p className="mt-2 text-ink-muted">{error.message}</p>
      <button onClick={reset} className="mt-6 underline">Try again</button>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3);

  return (
    <article className="mx-6">
      <div className="max-w-3xl mx-auto pt-12 md:pt-20 pb-12 border-b border-ink animate-reveal">
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/category/$category"
            params={{ category: article.category }}
            className="px-2 py-0.5 border border-ink text-[10px] font-mono uppercase tracking-tighter hover:bg-ink hover:text-paper transition-colors"
          >
            {article.category}
          </Link>
          <span className="text-[11px] font-mono text-ink-muted">{article.readMinutes} min read</span>
          <span className="text-[11px] font-mono text-ink-muted">&middot;</span>
          <span className="text-[11px] font-mono text-ink-muted">{formatDate(article.publishedAt)}</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-8 text-balance">
          {article.title}
        </h1>
        <p className="font-serif text-xl md:text-2xl text-ink-muted leading-relaxed text-pretty italic">
          {article.dek}
        </p>
        <div className="mt-10 pt-6 border-t border-ink/10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Words by</p>
          <p className="font-sans text-base font-medium mt-1">
            {article.author} <span className="text-ink-muted">— {article.affiliation}</span>
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto aspect-[21/9] bg-stone-200 my-12 grayscale hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.30_0.05_245)_0%,oklch(0.55_0.04_85)_50%,oklch(0.22_0.03_270)_100%)] opacity-80" />
      </div>

      <div className="max-w-2xl mx-auto pb-20 font-serif text-lg leading-[1.8] space-y-7">
        {article.body.map((p: string, i: number) => (
          <p
            key={i}
            className={i === 0 ? "first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85]" : ""}
          >
            {p}
          </p>
        ))}

        <div className="pt-10 mt-10 border-t border-ink/10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">End of piece</p>
          <p className="mt-2 font-serif italic text-ink-muted">
            Have a response? <Link to="/submit" className="text-accent underline">Write your own.</Link>
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="max-w-5xl mx-auto pb-20 border-t border-ink pt-10">
          <h2 className="font-mono text-xs uppercase tracking-widest mb-8">More from {article.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((a) => (
              <Link
                key={a.slug}
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="group"
              >
                <h3 className="font-display text-2xl leading-tight group-hover:italic transition-all">
                  {a.title}
                </h3>
                <p className="text-sm text-ink-muted mt-3">{a.dek}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {a.author}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

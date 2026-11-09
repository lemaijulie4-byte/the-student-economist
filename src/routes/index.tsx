import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, CATEGORIES, formatDate, getFeatured, type Article } from "@/lib/articles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Student Economist — Front Page" },
      { name: "description", content: "Rigorous writing on business, economics, and policy from students worldwide. The front page of The Student Economist." },
      { property: "og:title", content: "The Student Economist — Front Page" },
      { property: "og:description", content: "Rigorous writing on business, economics, and policy from students worldwide." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function ArticleByline({ article }: { article: Article }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
      {article.author} &middot; {article.affiliation}
    </p>
  );
}

function Home() {
  const featured = getFeatured();
  const briefings = ARTICLES.filter((a) => a.slug !== featured.slug).slice(0, 3);
  const secondary = ARTICLES.filter((a) => a.slug !== featured.slug).slice(3, 6);

  return (
    <>
      <header className="py-12 md:py-16 border-b border-ink mx-6">
        <h1 className="text-center text-6xl md:text-8xl font-display italic tracking-tight animate-reveal">
          The Student Economist
        </h1>
        <p className="text-center mt-6 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted animate-reveal [animation-delay:100ms]">
          Critical analysis for the next generation of thinkers
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-ink mx-6">
        <article className="lg:col-span-8 p-6 md:p-10 lg:border-r border-ink animate-reveal [animation-delay:200ms]">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/category/$category"
              params={{ category: featured.category }}
              className="px-2 py-0.5 border border-ink text-[10px] font-mono uppercase tracking-tighter hover:bg-ink hover:text-paper transition-colors"
            >
              {featured.category}
            </Link>
            <span className="text-[11px] font-mono text-ink-muted">{featured.readMinutes} min read</span>
          </div>
          <Link to="/articles/$slug" params={{ slug: featured.slug }} className="group block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] mb-6 text-balance group-hover:text-accent transition-colors">
              {featured.title}
            </h2>
          </Link>
          <p className="text-lg md:text-xl text-ink-muted max-w-2xl mb-8 leading-relaxed text-pretty">
            {featured.dek}
          </p>
          <div className="w-full aspect-[21/9] bg-stone-200 mb-8 grayscale hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.35_0.04_245)_0%,oklch(0.55_0.03_85)_50%,oklch(0.25_0.02_270)_100%)] opacity-80" />
          </div>
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Words by</p>
              <p className="text-lg font-medium font-sans">{featured.author}, {featured.affiliation}</p>
            </div>
            <Link
              to="/articles/$slug"
              params={{ slug: featured.slug }}
              className="px-8 py-3 bg-ink text-paper text-sm font-sans uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Read full analysis
            </Link>
          </div>
        </article>

        <aside className="lg:col-span-4 bg-ink/5 p-6 md:p-8 flex flex-col gap-10 animate-reveal [animation-delay:300ms]">
          <h3 className="font-mono text-xs uppercase tracking-widest border-b border-ink/20 pb-2">
            Latest briefings
          </h3>
          {briefings.map((a) => (
            <Link
              key={a.slug}
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="group block"
            >
              <span className="text-[10px] font-mono text-accent uppercase mb-1 block tracking-wider">
                {a.category}
              </span>
              <h4 className="text-xl font-display mb-2 group-hover:underline decoration-1 underline-offset-4">
                {a.title}
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed">{a.dek}</p>
            </Link>
          ))}
        </aside>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink border-b border-ink mx-6">
        {secondary.map((a, i) => (
          <Link
            key={a.slug}
            to="/articles/$slug"
            params={{ slug: a.slug }}
            className="p-6 md:p-8 group animate-reveal"
            style={{ animationDelay: `${400 + i * 100}ms` }}
          >
            <div className="w-full aspect-[4/3] bg-stone-200 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
              <div className={`absolute inset-0 opacity-80 ${
                i === 0
                  ? "bg-[linear-gradient(45deg,oklch(0.30_0.05_25)_0%,oklch(0.50_0.04_60)_100%)]"
                  : i === 1
                  ? "bg-[linear-gradient(160deg,oklch(0.25_0.04_245)_0%,oklch(0.45_0.05_200)_100%)]"
                  : "bg-[linear-gradient(200deg,oklch(0.20_0.02_270)_0%,oklch(0.40_0.04_140)_100%)]"
              }`} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent">{a.category}</span>
            <h3 className="text-2xl font-display mt-3 mb-4 group-hover:italic transition-all">{a.title}</h3>
            <p className="text-sm text-ink-muted mb-6 leading-relaxed">{a.dek}</p>
            <ArticleByline article={a} />
          </Link>
        ))}
      </section>

      <section className="mx-6 py-16 md:py-20 bg-accent text-paper flex flex-col items-center text-center px-6 md:px-8 animate-reveal [animation-delay:700ms]">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70 mb-4">A note from the editors</p>
        <h2 className="text-4xl md:text-5xl font-display italic mb-6 max-w-2xl">
          Shape the economic narrative.
        </h2>
        <p className="text-base md:text-lg max-w-xl mb-10 font-serif leading-relaxed opacity-90">
          We are seeking rigorously researched articles, op-eds, and data visualisations from undergraduate and graduate students worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/submit"
            className="px-10 py-4 bg-paper text-ink font-sans uppercase tracking-[0.2em] text-xs hover:bg-paper/90 transition-all"
          >
            Submit your manuscript
          </Link>
          <Link
            to="/category/$category"
            params={{ category: "opinion" }}
            className="px-10 py-4 border border-paper/30 text-paper font-sans uppercase tracking-[0.2em] text-xs hover:bg-paper hover:text-ink transition-all"
          >
            Read opinion
          </Link>
        </div>
        <p className="mt-12 font-mono text-[10px] uppercase tracking-widest opacity-60 italic">
          Rolling submissions &middot; Replies within two weeks
        </p>
      </section>

      <section className="mx-6 py-12 border-b border-ink">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl italic">From the archive</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            {ARTICLES.length} pieces
          </span>
        </div>
        <ul className="divide-y divide-ink/10">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="grid grid-cols-12 gap-4 py-4 items-baseline hover:bg-ink/5 -mx-3 px-3 transition-colors"
              >
                <span className="col-span-12 md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {formatDate(a.publishedAt)}
                </span>
                <span className="col-span-12 md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                  {CATEGORIES.find((c) => c.slug === a.category)?.label}
                </span>
                <span className="col-span-12 md:col-span-6 font-display text-lg md:text-xl leading-tight">
                  {a.title}
                </span>
                <span className="col-span-12 md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted md:text-right">
                  {a.author}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

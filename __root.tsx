import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CATEGORIES } from "../lib/articles";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">Error 404</p>
        <h1 className="mt-6 font-display text-6xl italic">Page not found</h1>
        <p className="mt-4 font-serif text-base text-ink-muted">
          The page you're looking for has been retracted, renamed, or never went to press.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.2em] text-paper hover:bg-accent transition-colors"
        >
          Return to the front page
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">Stop the presses</p>
        <h1 className="mt-6 font-display text-4xl italic">Something went wrong.</h1>
        <p className="mt-4 font-serif text-base text-ink-muted">
          An editor has been notified. You can try again or return to the front page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-ink px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-paper hover:bg-accent transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-ink px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Front page
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Student Economist — Critical analysis by the next generation" },
      { name: "description", content: "A student-run publication of rigorous writing on business, economics, and policy from undergraduates and graduates worldwide." },
      { name: "author", content: "The Student Economist" },
      { property: "og:site_name", content: "The Student Economist" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "The Student Economist — Critical analysis by the next generation" },
      { name: "twitter:title", content: "The Student Economist — Critical analysis by the next generation" },
      { property: "og:description", content: "A student-run publication of rigorous writing on business, economics, and policy from undergraduates and graduates worldwide." },
      { name: "twitter:description", content: "A student-run publication of rigorous writing on business, economics, and policy from undergraduates and graduates worldwide." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2021e76d-252a-418a-8853-6e17359bb9f4/id-preview-7a818e3e--08ffd442-4263-4803-b4ac-6ceba1c5dc99.lovable.app-1781414468192.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2021e76d-252a-418a-8853-6e17359bb9f4/id-preview-7a818e3e--08ffd442-4263-4803-b4ac-6ceba1c5dc99.lovable.app-1781414468192.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteNav() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <nav className="border-b border-ink py-2 px-6 flex flex-wrap gap-y-2 justify-between items-center bg-paper sticky top-0 z-50">
      <div className="flex gap-6 items-center text-[11px] font-mono uppercase tracking-widest text-ink-muted">
        <span>Vol. 04 / No. 02</span>
        <span className="hidden sm:inline">Worldwide</span>
      </div>
      <div className="flex gap-6 md:gap-8 items-center order-3 md:order-2 w-full md:w-auto justify-center">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/category/$category"
            params={{ category: c.slug }}
            className="text-xs uppercase font-sans tracking-tight hover:text-accent transition-colors"
            activeProps={{ className: "text-accent" }}
          >
            {c.label}
          </Link>
        ))}
        <Link
          to="/submit"
          className="text-xs uppercase font-sans tracking-tight hover:text-accent transition-colors italic"
          activeProps={{ className: "text-accent" }}
        >
          Write
        </Link>
      </div>
      <div className="text-[11px] font-mono uppercase tracking-widest order-2 md:order-3">
        {today}
      </div>
    </nav>
  );
}

const TICKERS = [
  { sym: "S&P 500", val: "+0.82%", up: true },
  { sym: "NASDAQ", val: "+1.21%", up: true },
  { sym: "DOW JONES", val: "+0.63%", up: true },
  { sym: "GOLD", val: "$3,450.20 +0.47%", up: true },
  { sym: "OIL (BRENT)", val: "$84.32 -0.35%", up: false },
];
const MARKETS = [
  { city: "NEW YORK", time: "09:30" },
  { city: "LONDON", time: "14:30" },
  { city: "TOKYO", time: "22:30" },
  { city: "SINGAPORE", time: "21:30" },
];

function MarketTicker() {
  return (
    <div className="border-b border-ink bg-paper overflow-hidden">
      <div className="mx-6 py-2 flex items-center gap-6 overflow-x-auto whitespace-nowrap font-mono text-[10px] uppercase tracking-wider">
        {TICKERS.map((t) => (
          <div key={t.sym} className="flex items-center gap-2 border-r border-ink/20 pr-6 last:border-0">
            <span className="font-medium">{t.sym}</span>
            <span className="text-ink-muted">{t.val}</span>
            <span className={t.up ? "text-accent" : "text-destructive"}>{t.up ? "▲" : "▼"}</span>
          </div>
        ))}
        <div className="flex items-center gap-5 pl-2 border-l border-ink/40">
          {MARKETS.map((m) => (
            <div key={m.city} className="flex flex-col leading-tight">
              <span className="text-ink-muted">{m.city}</span>
              <span>{m.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-6 border-t border-ink py-12 flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="max-w-xs">
        <h4 className="font-display text-2xl mb-4 italic">The Student Economist</h4>
        <p className="text-xs font-serif leading-loose text-ink-muted">
          A non-partisan publication dedicated to advancing economic discourse among the next generation of global thinkers.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest mb-2">Sections</span>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/category/$category"
              params={{ category: c.slug }}
              className="text-sm hover:underline"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest mb-2">Masthead</span>
          <Link to="/submit" className="text-sm hover:underline">Submit a piece</Link>
          <a href="#" className="text-sm hover:underline">Editorial board</a>
          <a href="#" className="text-sm hover:underline">Ethics policy</a>
          <a href="#" className="text-sm hover:underline">Newsletter</a>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-paper text-ink selection:bg-accent/15 selection:text-accent">
        <SiteNav />
        <MarketTicker />
        <Outlet />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

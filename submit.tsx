import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CATEGORIES } from "@/lib/articles";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a piece — The Student Economist" },
      { name: "description", content: "Submit your essay, op-ed, or analysis to The Student Economist. Open to undergraduates and graduates worldwide." },
      { property: "og:title", content: "Submit a piece — The Student Economist" },
      { property: "og:url", content: "/submit" },
    ],
    links: [{ rel: "canonical", href: "/submit" }],
  }),
  component: SubmitPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  affiliation: z.string().trim().min(2, "University or institution").max(150),
  category: z.enum(["markets", "policy", "finance", "opinion"]),
  title: z.string().trim().min(8, "Working title is too short").max(180),
  pitch: z.string().trim().min(80, "Pitch should be at least a paragraph (80 chars)").max(2000),
});

type FormState = z.input<typeof schema>;
type FieldErrors = Partial<Record<keyof FormState, string>>;

function SubmitPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    affiliation: "",
    category: "opinion",
    title: "",
    pitch: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="mx-6 py-24 md:py-32 text-center animate-reveal">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">Filed</p>
        <h1 className="mt-6 font-display text-5xl md:text-6xl italic">Thank you, {form.name.split(" ")[0]}.</h1>
        <p className="mt-6 max-w-xl mx-auto font-serif text-lg text-ink-muted leading-relaxed">
          Your pitch is with the {form.category} desk. An editor will reply within two weeks. In the meantime, read what other students are writing.
        </p>
        <a href="/" className="mt-10 inline-block bg-ink text-paper px-8 py-3 font-sans uppercase tracking-[0.2em] text-xs hover:bg-accent transition-colors">
          Return to the front page
        </a>
      </main>
    );
  }

  return (
    <main className="mx-6">
      <header className="py-16 md:py-24 border-b border-ink text-center animate-reveal">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">For student writers</p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl italic">Submit a piece</h1>
        <p className="mt-6 max-w-xl mx-auto font-serif text-lg text-ink-muted leading-relaxed">
          Pitch us an essay, op-ed, or data-led analysis. Send a working title and a paragraph of argument — not a finished draft.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto py-12 md:py-16 grid gap-8 animate-reveal [animation-delay:150ms]"
        noValidate
      >
        <Field label="Full name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={100}
            className="input"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={255}
            className="input"
          />
        </Field>

        <Field label="University or institution" error={errors.affiliation}>
          <input
            value={form.affiliation}
            onChange={(e) => update("affiliation", e.target.value)}
            maxLength={150}
            className="input"
          />
        </Field>

        <Field label="Desk" error={errors.category}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {CATEGORIES.map((c) => (
              <button
                type="button"
                key={c.slug}
                onClick={() => update("category", c.slug)}
                className={`px-3 py-2 border text-xs font-mono uppercase tracking-widest transition-colors ${
                  form.category === c.slug
                    ? "bg-ink text-paper border-ink"
                    : "border-ink/40 hover:border-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Working title" error={errors.title}>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            maxLength={180}
            className="input font-display text-xl"
          />
        </Field>

        <Field label="The pitch" hint="80–2000 characters. State your argument and what makes it new." error={errors.pitch}>
          <textarea
            value={form.pitch}
            onChange={(e) => update("pitch", e.target.value)}
            maxLength={2000}
            rows={8}
            className="input font-serif leading-relaxed resize-y"
          />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted text-right">
            {form.pitch.length} / 2000
          </p>
        </Field>

        <div className="pt-4 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted max-w-xs">
            By submitting, you confirm the work is your own and unpublished elsewhere.
          </p>
          <button
            type="submit"
            className="bg-ink text-paper px-10 py-4 font-sans uppercase tracking-[0.2em] text-xs hover:bg-accent transition-colors"
          >
            File pitch
          </button>
        </div>
      </form>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--rule);
          padding: 0.5rem 0;
          font-family: var(--font-sans);
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus {
          border-color: var(--accent);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted block mb-2">
        {label}
      </span>
      {children}
      {hint && !error && (
        <p className="mt-2 font-serif text-xs text-ink-muted italic">{hint}</p>
      )}
      {error && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent">
          {error}
        </p>
      )}
    </label>
  );
}

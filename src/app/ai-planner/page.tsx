import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, Mountain, ShieldCheck, Sparkles } from 'lucide-react';
import { photos } from '@/lib/treks';

export const metadata: Metadata = {
  title: 'AI Trek Planner | Evertrail',
  description: 'Check the availability of Evertrail’s personalized AI trek planner.',
};

export default function AIPlannerPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-7">
        <Link href="/" aria-label="Evertrail home" className="flex items-center gap-2 text-2xl font-semibold tracking-tight"><Mountain className="text-primary" />evertrail<span className="text-primary">.</span></Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"><ArrowLeft size={16} />Back home</Link>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Sparkles size={16} />AI Trek Planner</p>
          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl">Your pace.<br />Your path.<br /><span className="font-serif italic text-primary">Your next adventure.</span></h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">Personalized planning needs trustworthy trail information. We’ll use a verified trek catalog and your preferences to help you explore responsibly—not invent routes, prices or availability.</p>
          <div role="status" className="mt-8 rounded-2xl border border-primary/25 bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><Compass size={20} className="text-primary" />Planner not connected yet</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">AI generation and saved plans are unavailable. The linked Supabase organization must be reconnected, a verified catalog configured, and an AI provider connected before this service can be enabled.</p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">No itinerary has been generated or saved. The homepage collection contains illustrative sample treks only.</p>
          </div>
          <Link href="/#discover" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Browse sample treks<ArrowRight size={17} /></Link>
          <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-muted-foreground"><ShieldCheck size={18} className="mt-1 shrink-0 text-primary" />Trekking advice is informational. Consult qualified operators and medical professionals about fitness, altitude and safety; follow official closures and local guidance.</p>
        </div>
        <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-border md:min-h-[620px]">
          <Image src={photos.hero} alt="Mountain peaks rising above a rugged alpine landscape" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-x-5 bottom-5 rounded-xl bg-background/90 p-6"><p className="text-xs uppercase tracking-[0.2em] text-primary">A little further from the everyday</p><p className="mt-3 text-2xl font-medium">Good plans begin with<br />a little curiosity.</p></div>
        </div>
      </section>
    </main>
  );
}

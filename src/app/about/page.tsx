import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Compass, Leaf, Mountain, ShieldCheck } from 'lucide-react';
import { photos } from '@/lib/treks';

export const metadata: Metadata = {
  title: 'Our Story | Evertrail',
  description: 'Discover the purpose behind Evertrail: thoughtful exploration, honest trek information and respect for wild places.',
};

const values = [
  { icon: Compass, title: 'Your pace, not a checklist', description: 'A meaningful adventure begins with what works for you. Consider your time, experience and fitness—not just the summit photograph.' },
  { icon: ShieldCheck, title: 'Clarity before confidence', description: 'Sample information should look like sample information. AI can help you explore options, but it is not a guide, a medical professional or a guarantee of safety.' },
  { icon: Leaf, title: 'Respect the places we visit', description: 'Follow local rules, carry your waste out, respect wildlife and support local communities. A memorable journey should not come at the landscape’s expense.' },
];

export default function AboutPage() {
  return <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-12">
    <nav aria-label="Page navigation" className="flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-semibold"><Mountain className="text-primary" />evertrail.</Link>
      <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} />Back home</Link>
    </nav>
    <section className="grid gap-10 py-16 md:grid-cols-2 md:items-center lg:gap-16 lg:py-20">
      <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our story · Our purpose</p><h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">A little further<br />from everyday.<br /><span className="font-serif italic text-primary">A little closer to you.</span></h1><p className="mt-7 text-base leading-8 text-muted-foreground">Evertrail is built around a simple idea: finding a trail should start with curiosity, and planning for it should start with honest information.</p><p className="mt-5 text-sm leading-7 text-muted-foreground">Not every adventure needs to be the longest, highest or hardest. There is value in a quiet walk, a new landscape and enough space to notice what’s around you. Our aim is to help you explore those possibilities thoughtfully.</p></div>
      <figure><div className="relative h-[380px] overflow-hidden rounded-3xl border sm:h-[520px]"><Image src={photos.hero} alt="Rugged mountain peaks beneath a cloudy sky" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><figcaption className="mt-3 text-xs text-muted-foreground">A higher perspective. Illustrative mountain photography.</figcaption></figure>
    </section>
    <section className="border-y border-border py-12 sm:py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">What matters along the way</p><h2 className="mt-4 text-3xl font-medium tracking-tight">The way we explore matters.</h2>
      <div className="mt-9 grid gap-8 md:grid-cols-3">{values.map(({ icon: Icon, title, description }) => <article key={title} className="rounded-2xl border bg-card p-7"><Icon className="mb-6 text-primary" size={28} strokeWidth={1.5} /><h3 className="text-xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p></article>)}</div>
    </section>
    <section className="grid gap-8 py-14 md:grid-cols-[1fr_1.4fr] md:gap-16"><div><p className="text-xs uppercase tracking-[0.2em] text-primary">Where we are today</p><h2 className="mt-4 text-3xl font-medium">An invitation to explore.<br /><span className="font-serif italic text-primary">Not a promise of departure.</span></h2></div><div className="space-y-5 text-sm leading-7 text-muted-foreground"><p>Evertrail currently brings together a sample trek collection, preference-based matching and AI-assisted planning. You can explore routes and save ideas to your account. Sample records and indicative prices are for discovery, not confirmed booking inventory.</p><p>Reservations and payments are not enabled for the sample collection. Before committing to a journey, confirm current access, permits, itinerary and arrangements with a qualified operator. Seek appropriate medical advice for fitness and altitude concerns.</p><p>Our ambition is a more personal and transparent way to plan time outside—one that makes room for both excitement and preparation.</p></div></section>
    <section className="mb-12 rounded-3xl border border-primary/25 bg-card px-7 py-12 text-center sm:px-12"><Mountain className="mx-auto mb-5 text-primary" size={36} strokeWidth={1.3} /><h2 className="text-3xl font-medium sm:text-4xl">Find your own <span className="font-serif italic text-primary">out there.</span></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Start with a little curiosity. Take the next step thoughtfully.</p><div className="mt-7 flex flex-wrap justify-center gap-4"><Link href="/experiences" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Explore experiences<ArrowUpRight size={17} /></Link><Link href="/treks" className="rounded-xl border border-primary/30 px-6 py-3 text-sm hover:bg-primary/10">Browse all treks</Link></div></section>
  </main>;
}

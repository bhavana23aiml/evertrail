import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mountain } from 'lucide-react';
import { treks, currency } from '@/lib/treks';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = treks.find(item => item.slug === slug);
  return { title: trek ? `${trek.name} | Evertrail` : 'Trek not found | Evertrail', description: trek?.description };
}
export default async function TrekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = treks.find(item => item.slug === slug);
  if (!trek) notFound();
  return <main className="mx-auto min-h-screen max-w-6xl px-6 py-8">
    <nav className="mb-8 flex items-center justify-between"><Link href="/" className="flex items-center gap-2 text-2xl font-semibold"><Mountain className="text-primary" />evertrail.</Link><Link href="/treks" className="flex items-center gap-2 text-sm hover:text-primary"><ArrowLeft size={16} />All treks</Link></nav>
    <div className="relative h-[350px] overflow-hidden rounded-3xl sm:h-[460px]"><Image src={trek.image} alt={`Illustrative mountain landscape for ${trek.name}`} fill priority sizes="(max-width: 1200px) 100vw, 1152px" className="object-cover" /></div>
    <div className="grid gap-10 py-10 md:grid-cols-[2fr_1fr]"><section><p className="text-xs uppercase tracking-[0.2em] text-primary">{trek.state} · Sample trek</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{trek.name}</h1><p className="mt-6 leading-8 text-muted-foreground">{trek.description}</p><dl className="my-8 grid grid-cols-2 gap-5 rounded-2xl border bg-card p-6 sm:grid-cols-3">{[['Duration', `${trek.days} days`], ['Difficulty', trek.difficulty], ['Maximum altitude', `${trek.altitude.toLocaleString()} m`], ['Distance', `${trek.distance} km`], ['Typical season', trek.season]].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-2 text-sm">{value}</dd></div>)}</dl><h2 className="text-2xl">Before you plan</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">These are illustrative estimates, not verified operator details. Actual conditions, route access and fitness requirements vary. Consult a qualified trek operator, follow local advisories and seek medical guidance for altitude or health concerns.</p></section><aside className="h-fit rounded-2xl border border-primary/25 bg-card p-6"><p className="text-xs text-muted-foreground">Indicative sample price / person</p><p className="mt-2 text-3xl font-semibold">{currency(trek.price)}</p><h2 className="mt-6 text-lg font-medium">Departures not available</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Verified departures, availability, itinerary and booking terms have not been published. Reservations and payments are not enabled for this sample trek.</p><Link href="/treks" className="mt-6 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90">Keep exploring</Link></aside></div>
  </main>;
}

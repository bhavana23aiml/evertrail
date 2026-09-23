import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Mountain } from 'lucide-react';
import { treks, currency } from '@/lib/treks';

export const metadata: Metadata = { title: 'Explore Treks | Evertrail', description: 'Explore Evertrail’s sample trekking collection by destination, difficulty, duration and season.' };
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function inSeason(season: string, month: string) {
  const index = months.indexOf(month);
  if (index < 0) return true;
  const [start, end] = season.split(' – ').map(value => months.indexOf(value));
  return start <= end ? index >= start && index <= end : index >= start || index <= end;
}

export default async function TreksPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const get = (key: string) => typeof params[key] === 'string' ? params[key] as string : '';
  const q = get('q').trim();
  const destination = get('destination');
  const difficulty = get('difficulty');
  const duration = get('duration');
  const month = get('month');
  const sort = get('sort');
  const results = treks.filter(trek =>
    (!q || `${trek.name} ${trek.state}`.toLowerCase().includes(q.toLowerCase())) &&
    (!destination || trek.state === destination) &&
    (!difficulty || trek.difficulty === difficulty) &&
    (!duration || (duration === '1–3 days' ? trek.days <= 3 : duration === '4–6 days' ? trek.days >= 4 && trek.days <= 6 : duration === '7+ days' ? trek.days >= 7 : true)) && inSeason(trek.season, month)
  );
  if (sort === 'price-asc') results.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') results.sort((a, b) => b.price - a.price);
  if (sort === 'duration') results.sort((a, b) => a.days - b.days);
  const inputClass = 'mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm';
  return <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-12">
    <nav className="mb-14 flex items-center justify-between"><Link href="/" className="flex items-center gap-2 text-2xl font-semibold"><Mountain className="text-primary" />evertrail.</Link><Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} />Home</Link></nav>
    <p className="text-xs uppercase tracking-[0.2em] text-primary">Find your next chapter</p>
    <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">Explore <span className="font-serif italic text-primary">the extraordinary.</span></h1>
    <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Sample collection · Illustrative imagery and indicative prices. Trek information needs operator verification. No live departures or bookings are available.</p>
    <form action="/treks" className="my-9 grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-xs sm:col-span-2">Search treks<input name="q" defaultValue={q} placeholder="Trek name or destination" className={inputClass} /></label>
      <label className="text-xs">Destination<select name="destination" defaultValue={destination} className={inputClass}><option value="">All destinations</option>{Array.from(new Set([...treks.map(t => t.state), 'Ladakh', 'Maharashtra', 'Sikkim', 'Kerala'])).sort().map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="text-xs">Difficulty<select name="difficulty" defaultValue={difficulty} className={inputClass}><option value="">Any difficulty</option>{['Easy', 'Moderate', 'Challenging'].map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="text-xs">Duration<select name="duration" defaultValue={duration} className={inputClass}><option value="">Any duration</option>{['1–3 days', '4–6 days', '7+ days'].map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="text-xs">Month<select name="month" defaultValue={month} className={inputClass}><option value="">Any month</option>{months.map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="text-xs">Sort by<select name="sort" defaultValue={sort} className={inputClass}><option value="">Collection order</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="duration">Shortest duration</option></select></label>
      <div className="flex items-end gap-3"><button className="flex-1 rounded-lg bg-primary p-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Search treks</button><Link href="/treks" className="rounded-lg border p-3 text-sm hover:text-primary">Clear filters</Link></div>
    </form>
    <p role="status" className="mb-6 text-sm text-muted-foreground">{results.length} {results.length === 1 ? 'trek' : 'treks'} found</p>
    {results.length ? <div className="grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">{results.map(trek => <article key={trek.slug} className="overflow-hidden rounded-2xl border bg-card transition hover:border-primary/50"><Link href={`/treks/${trek.slug}`} className="group block"><div className="relative h-56 overflow-hidden"><Image src={trek.image} alt={`Illustrative landscape for ${trek.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-lg bg-background/90 px-3 py-2 text-xs">{trek.difficulty}</span></div><div className="p-5"><p className="text-xs text-muted-foreground">{trek.state}</p><h2 className="mt-2 text-2xl font-semibold">{trek.name}</h2><p className="my-4 text-sm text-muted-foreground">{trek.days} days · {trek.altitude.toLocaleString()} m · {trek.distance} km</p><div className="flex items-center justify-between border-t pt-4"><span><span className="block text-xs text-muted-foreground">Sample price / person</span><span className="text-xl">{currency(trek.price)}</span></span><span className="flex items-center gap-1 text-sm text-primary">View trek<ArrowUpRight size={16} /></span></div></div></Link></article>)}</div> : <section className="rounded-2xl border border-dashed p-12 text-center"><h2 className="text-2xl">No trails match just yet.</h2><p className="my-4 text-muted-foreground">Try a different destination or broaden your filters.</p><Link href="/treks" className="text-primary underline">Show all sample treks</Link></section>}
  </main>;
}

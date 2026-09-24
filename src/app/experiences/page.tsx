import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Compass, Mountain } from 'lucide-react';
import { photos } from '@/lib/treks';

export const metadata: Metadata = {
  title: 'Experiences | Evertrail',
  description: 'Explore short escapes, winter trails and longer mountain journeys in Evertrail’s sample trek collection.',
};

const experiences = [
  { title: 'A little weekend wild', label: 'SHORT ESCAPES', description: 'Make room for a change of scenery with routes lasting one to three days. Shorter does not always mean easier—check the terrain and preparation requirements.', image: photos.hills, href: '/treks?duration=1%E2%80%933%20days', action: 'Explore short treks' },
  { title: 'Find your winter rhythm', label: 'WINTER TRAILS', description: 'Discover sample routes with a typical January season. Snow, access and conditions vary; confirm the route with a qualified local operator before travelling.', image: photos.snow, href: '/treks?month=January', action: 'Explore winter treks' },
  { title: 'Take the longer way', label: 'MULTI-DAY JOURNEYS', description: 'Spend more time with changing landscapes. Browse journeys of a week or more, and give training, recovery and acclimatization the attention they deserve.', image: photos.lake, href: '/treks?duration=7%2B%20days', action: 'Explore longer treks' },
  { title: 'Start with curiosity', label: 'EASIER-RATED ROUTES', description: 'Explore routes labelled Easy in our sample catalog. Difficulty ratings are only a starting point; your fitness, the weather and local conditions all matter.', image: photos.valley, href: '/treks?difficulty=Easy', action: 'Explore easier-rated treks' },
];

export default function ExperiencesPage() {
  return <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-12">
    <nav aria-label="Page navigation" className="flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-semibold"><Mountain className="text-primary" />evertrail.</Link>
      <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} />Back home</Link>
    </nav>
    <header className="max-w-3xl pb-10 pt-16 sm:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Different paths. Your kind of adventure.</p>
      <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">More than a place.<br />A way to <span className="font-serif italic text-primary">feel alive.</span></h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">A quick escape or a week among the peaks? Start with the experience you’re looking for, then find a trail that fits your time and preparation.</p>
    </header>
    <section aria-label="Explore by experience" className="grid gap-7 md:grid-cols-2">
      {experiences.map(experience => <article key={experience.title} className="overflow-hidden rounded-3xl border bg-card">
        <Link href={experience.href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <div className="relative h-64 overflow-hidden sm:h-80"><Image src={experience.image} alt={`Illustrative landscape for ${experience.label.toLowerCase()}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
          <div className="p-7 sm:p-8"><p className="text-[10px] font-semibold tracking-[0.2em] text-primary">{experience.label}</p><h2 className="mt-3 text-2xl font-medium sm:text-3xl">{experience.title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{experience.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">{experience.action}<ArrowUpRight size={17} /></span></div>
        </Link>
      </article>)}
    </section>
    <p className="mt-6 text-xs leading-6 text-muted-foreground">Preview collection · Illustrative imagery and sample trek information, not bookable experience packages. Verify routes, permits, conditions and availability with a qualified operator.</p>
    <section className="my-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-primary/25 bg-card p-8 sm:p-10 md:flex-row md:items-center">
      <div><Compass className="mb-4 text-primary" /><h2 className="text-2xl font-medium">Not sure where to begin?</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Start with your preferences and explore your trek matches.</p></div>
      <Link href="/ai-trek-finder" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Find my trail<ArrowUpRight size={17} /></Link>
    </section>
    <nav aria-label="More about Evertrail" className="mb-10 flex flex-wrap gap-6 text-sm text-primary"><Link href="/treks" className="underline underline-offset-4">All treks</Link><Link href="/about" className="underline underline-offset-4">Our story</Link></nav>
  </main>;
}

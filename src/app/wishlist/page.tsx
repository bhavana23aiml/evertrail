'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart, Mountain, Trash2 } from 'lucide-react';
import { useSession } from '@/components/session-provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { currency } from '@/lib/treks';

type SavedTrek = {
  trek_id: string;
  treks: { name: string; slug: string; state: string; image: string; days: number; difficulty: string; price: number; is_sample: boolean } | null;
};

function SavedTreks({ userId }: { userId: string }) {
  const [items, setItems] = useState<SavedTrek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    async function load() {
      try {
        const { data, error } = await supabase.from('wishlists')
          .select('trek_id, treks(name,slug,state,image,days,difficulty,price,is_sample)')
          .eq('user_id', userId).order('created_at', { ascending: false }).returns<SavedTrek[]>();
        if (error) throw error;
        if (active) setItems(data ?? []);
      } catch {
        if (active) setError('Your saved treks could not be loaded. Please try again.');
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [userId, attempt]);

  async function remove(trekId: string) {
    setRemoving(trekId);
    setError('');
    try {
      const { data, error } = await supabase.from('wishlists').delete()
        .eq('user_id', userId).eq('trek_id', trekId).select('trek_id');
      if (error || !data?.length) throw new Error('Removal failed');
      setItems(previous => previous.filter(item => item.trek_id !== trekId));
    } catch {
      setError('We could not remove that trek. Please try again.');
    } finally {
      setRemoving(null);
    }
  }

  if (loading) return <p role="status" className="rounded-2xl border bg-card p-8 text-muted-foreground">Loading your saved trails…</p>;

  return <>
    {error && <div role="alert" className="mb-6 rounded-2xl border border-destructive/50 bg-card p-5"><p>{error}</p><Button variant="outline" onClick={() => setAttempt(value => value + 1)} className="mt-3 rounded-xl">Reload saved treks</Button></div>}
    {!items.length && !error ? <section className="rounded-3xl border border-dashed border-primary/40 bg-card p-10 text-center sm:p-16">
      <Heart className="mx-auto mb-5 h-10 w-10 text-primary" />
      <h2 className="text-2xl font-medium">Your next adventure starts here.</h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">Find your matches in the AI trek finder, then save a trek to keep it in this collection.</p>
      <Link href="/ai-trek-finder" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Find treks to save</Link>
    </section> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ trek_id, treks: trek }) => <article key={trek_id} className="overflow-hidden rounded-2xl border bg-card">
        {trek ? <>
          <div className="relative h-52"><Image src={trek.image} alt={`Landscape for ${trek.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></div>
          <div className="p-6">
            <p className="text-xs text-muted-foreground">{trek.state}{trek.is_sample ? ' · Sample trek' : ''}</p>
            <h2 className="mt-2 text-2xl font-semibold">{trek.name}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{trek.days} days · {trek.difficulty}</p>
            <p className="mt-3 text-lg">{currency(trek.price)} <span className="text-xs text-muted-foreground">{trek.is_sample ? 'indicative / person' : '/ person'}</span></p>
            <Link href={`/treks/${encodeURIComponent(trek.slug)}`} className="mt-4 inline-block text-sm text-primary underline underline-offset-4">View trek</Link>
          </div>
        </> : <div className="p-6"><Mountain className="mb-4 text-primary" /><h2 className="text-xl">Trek unavailable</h2><p className="mt-3 text-sm text-muted-foreground">This saved trek is no longer published.</p></div>}
        <div className="px-6 pb-6"><Button variant="outline" disabled={removing !== null} onClick={() => remove(trek_id)} aria-label={`Remove ${trek?.name ?? 'unavailable trek'} from saved treks`} className="w-full gap-2 rounded-xl border-primary/25 hover:bg-primary/10"><Trash2 size={16} />{removing === trek_id ? 'Removing…' : 'Remove from saved'}</Button></div>
      </article>)}
    </div>}
  </>;
}

export default function WishlistPage() {
  const { session, loading } = useSession();
  return <main className="mx-auto min-h-screen max-w-6xl px-6 py-8 sm:py-12">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} />Back home</Link>
    <div className="mb-10 mt-12"><p className="text-xs uppercase tracking-[0.2em] text-primary">Keep the adventure close</p><h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">Your saved <span className="font-serif italic text-primary">trails.</span></h1><p className="mt-5 text-sm leading-7 text-muted-foreground">A personal collection of places you want to explore.</p></div>
    {loading ? <p role="status">Checking your session…</p> : session ? <SavedTreks key={session.user.id} userId={session.user.id} /> : <section className="rounded-3xl border bg-card p-8 sm:p-12"><Heart className="mb-5 text-primary" size={32} /><h2 className="text-2xl">Sign in to see your saved treks</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Your collection is private and linked to your account. Sign in or create an account to get started.</p><Link href="/login" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Sign in / Sign up</Link></section>}
  </main>;
}

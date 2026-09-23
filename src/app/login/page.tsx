'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/components/session-provider';

export default function Login() {
  const { session, loading } = useSession();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signOut();
    if (error) setError('Could not sign out. Please try again.');
    setBusy(false);
  }
  return <main className="mx-auto min-h-screen max-w-lg px-6 py-16">
    <Link href="/ai-planner" className="text-sm text-primary">← Back to AI planner</Link>
    <h1 className="mt-8 text-4xl">Your trail. Remembered.</h1>
    <p className="my-5 text-sm leading-7 text-muted-foreground">Sign in to save plans, packing progress and your trek preferences. Confirmation emails are sent by Supabase; check your inbox after signing up.</p>
    <div className="rounded-2xl border bg-card p-6">
      {loading ? <p>Checking your session…</p> : session ? <>
        <p className="text-sm">Signed in as {session.user.email}</p>
        <Link className="my-5 block text-primary underline" href="/dashboard/ai-plans">Open AI history</Link>
        <button disabled={busy} onClick={logout} className="rounded-lg border p-3">{busy ? 'Signing out…' : 'Sign out'}</button>
      </> : <Auth
        supabaseClient={supabase}
        providers={[]}
        redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined}
        appearance={{
          theme: ThemeSupa,
          variables: { default: {
            colors: { brand: '#527A49', brandAccent: '#76A96B', inputText: '#F7F7F2', inputBackground: '#111512', inputBorder: '#344237', anchorTextColor: '#B5D59A' },
            radii: { borderRadiusButton: '10px', inputBorderRadius: '10px' },
          } },
        }}
        theme="dark"
      />}
      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
    </div>
  </main>;
}

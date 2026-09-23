'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
const Context=createContext<{session:Session|null;loading:boolean}>({session:null,loading:true});
export const useSession=()=>useContext(Context);
export function SessionProvider({children}:{children:React.ReactNode}){const [session,setSession]=useState<Session|null>(null);const [loading,setLoading]=useState(true);useEffect(()=>{const {data}=supabase.auth.onAuthStateChange((_event,value)=>{setSession(value);setLoading(false);});return()=>data.subscription.unsubscribe();},[]);return <Context.Provider value={{session,loading}}>{children}</Context.Provider>;}

import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
export const profileSchema=z.object({experience:z.enum(['First trek','Beginner','Intermediate','Advanced']),fitness:z.enum(['Low','Moderate','Good','Excellent']),age:z.enum(['Under 18','18–35','36–50','51–65','Over 65']),highAltitude:z.boolean(),altitudeConcerns:z.boolean(),destination:z.string().max(80),month:z.coerce.number().int().min(1).max(12),date:z.string().regex(/^$|^\d{4}-\d{2}-\d{2}$/),days:z.coerce.number().int().min(1).max(30),budget:z.coerce.number().min(500).max(1000000),groupSize:z.coerce.number().int().min(1).max(30),travelling:z.enum(['Solo','Couple','Friends','Family','Group']),difficulty:z.enum(['Any','Easy','Moderate','Challenging']),maxAltitude:z.coerce.number().min(500).max(7000),terrain:z.enum(['Mixed','Snow','Forest','Mountain','Valley','Lake','Meadows','Waterfall']),interest:z.enum(['Scenic','Adventure','Photography','Camping','Peaceful','Challenging','Wildlife','Sunrise']),availableOnly:z.boolean()});
export type Preferences=z.infer<typeof profileSchema>;
export const defaults:Preferences={experience:'Beginner',fitness:'Good',age:'18–35',highAltitude:false,altitudeConcerns:false,destination:'',month:12,date:'',days:7,budget:12000,groupSize:1,travelling:'Solo',difficulty:'Any',maxAltitude:4500,terrain:'Mixed',interest:'Scenic',availableOnly:false};
export type CatalogTrek={id:string;slug:string;name:string;state:string;difficulty:string;days:number;altitude:number;distance:number;price:number;image:string;is_sample:boolean;months:number[]};
export type Risk={level:string;altitude:string;fitness:string;technical:string;experience:string;weather:string;advice:string[]};
export type Match={trek:CatalogTrek;score:number;scores:Record<string,number>;reasons:{factor:string;score:number;reason:string}[];excluded:string[];departures:{start_date:string;end_date:string;available_slots:number;price:number}[];risk:Risk;explanation:{why:string;preparation:string}|null};
export type Matches={matches:Match[];alternatives:{name:string;score:number;reasons:string[]}[];aiError:string|null;safety:string;method:string;preferences:Preferences};
export type Plan={trek:CatalogTrek;days:{day:number;activity:string;meals:string;hydration:string;rest:string;preparation:string;safety:string;route:{route:string;distance:number|null;altitude_change:number|null;hours:number|null}|null}[];packing:{id:string;category:string;item:string}[];risk:Risk;weather:{available:boolean;reason?:string;source?:string;date?:string;minC?:number;maxC?:number;rainPercent?:number;windKmh?:number;snowCm?:number;notice?:string};safety:string;preferences:Preferences};
export type ChatReply={answer?:string;error?:string;treks:CatalogTrek[];intent:string;safety:string};
export async function requestAI<T>(body:Record<string,unknown>):Promise<T>{
  const endpoint = new URL('https://xtfwdzajwzxmbtvjrqnz.supabase.co/functions/v1/trek-intelligence');
  const functionName = endpoint.pathname.split('/').pop()!;
  const {data,error}=await supabase.functions.invoke(functionName,{body});
  if(error){
    const response=(error as {context?:unknown}).context;
    if(response instanceof Response){
      let payload: {error?:unknown} = {};
      try { payload = await response.json(); } catch { /* Non-JSON gateway errors use the generic message. */ }
      if(typeof payload.error==='string') throw new Error(payload.error);
    }
    throw new Error('AI service is temporarily unavailable. Check your connection and try again.');
  }
  return data as T;
}
export function exportFile(title:string,content:unknown){const blob=new Blob([typeof content==='string'?content:JSON.stringify(content,null,2)],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=title.replace(/[^a-z0-9-]/gi,'-')+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export async function saveAI(title:string,kind:'itinerary'|'comparison'|'recommendation'|'chat',content:unknown,preferences?:Preferences){const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)throw new Error('Sign in to save your AI history.');const {data,error}=await supabase.from('ai_plans').insert({user_id:user.id,title,kind,content,preferences}).select('id').single();if(error)throw new Error('We could not save your plan. Please try again.');return data.id as string;}

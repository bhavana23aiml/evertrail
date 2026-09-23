import { z } from 'https://esm.sh/zod@3.25.76';

export const preferencesSchema = z.object({
  experience: z.enum(['First trek','Beginner','Intermediate','Advanced']),
  fitness: z.enum(['Low','Moderate','Good','Excellent']),
  age: z.enum(['Under 18','18–35','36–50','51–65','Over 65']),
  highAltitude: z.boolean(), altitudeConcerns: z.boolean(),
  destination: z.string().max(80), month: z.number().int().min(1).max(12),
  date: z.string().regex(/^$|^\d{4}-\d{2}-\d{2}$/),
  days: z.number().int().min(1).max(30), budget: z.number().min(500).max(1000000),
  groupSize: z.number().int().min(1).max(30),
  travelling: z.enum(['Solo','Couple','Friends','Family','Group']),
  difficulty: z.enum(['Any','Easy','Moderate','Challenging']),
  maxAltitude: z.number().min(500).max(7000),
  terrain: z.enum(['Mixed','Snow','Forest','Mountain','Valley','Lake','Meadows','Waterfall']),
  interest: z.enum(['Scenic','Adventure','Photography','Camping','Peaceful','Challenging','Wildlife','Sunrise']),
  availableOnly: z.boolean(),
});
export type Preferences = z.infer<typeof preferencesSchema>;
export type Trek = { id:string; slug:string; name:string; state:string; difficulty:string; days:number; altitude:number; distance:number; price:number; image:string; months:number[]; terrain:string[]; interests:string[]; latitude:number|null; longitude:number|null; is_sample:boolean; itinerary: {day:number; route:string; distance:number|null; altitude_change:number|null; hours:number|null}[] };
export type Departure = {trek_id:string; start_date:string; end_date:string; available_slots:number; price:number};
export function scoreTrek(t:Trek,p:Preferences,departures:Departure[]) {
  const level = ['Easy','Moderate','Challenging'].indexOf(t.difficulty);
  const fitness = ['Low','Moderate','Good','Excellent'].indexOf(p.fitness);
  const experience = ['First trek','Beginner','Intermediate','Advanced'].indexOf(p.experience);
  const departuresForTrek = departures.filter(d => d.trek_id===t.id && d.available_slots>=p.groupSize && d.price<=p.budget && Number(d.start_date.slice(5,7))===p.month && (!p.date || d.start_date===p.date));
  const excluded:string[]=[];
  if(p.destination && !`${t.state} ${t.name}`.toLowerCase().includes(p.destination.toLowerCase())) excluded.push('Outside your destination preference');
  if(t.price>p.budget) excluded.push('Over your per-person trek budget');
  if(t.days>p.days) excluded.push('Longer than your available days');
  if(!t.months.includes(p.month)) excluded.push('Outside the catalog season');
  if(t.altitude>p.maxAltitude) excluded.push('Above your altitude ceiling');
  if(p.altitudeConcerns && t.altitude>=3000) excluded.push('High altitude requires professional suitability advice given your concerns');
  if(level===2 && (experience<2 || fitness<2)) excluded.push('Challenging route exceeds declared experience or fitness');
  if(fitness===0 && level>0) excluded.push('Route requires more fitness preparation');
  if(p.availableOnly && (t.is_sample || !departuresForTrek.length)) excluded.push('No confirmed matching departure with enough slots');
  const scores = {
    fitness: Math.max(0,100-Math.max(0,level+1-fitness)*25),
    experience: Math.max(0,100-Math.max(0,level-experience)*30-(!p.highAltitude&&t.altitude>=3500?15:0)),
    budget: t.price<=p.budget?100:0,
    season: t.months.includes(p.month)?100:0,
    duration: Math.max(0,Math.round(100-Math.abs(p.days-t.days)/p.days*100)),
    difficulty: p.difficulty==='Any'||p.difficulty===t.difficulty?100:50,
    adventure: Math.round(((p.terrain==='Mixed'||t.terrain.includes(p.terrain)?100:30)+(t.interests.includes(p.interest)?100:30))/2),
  };
  const score = Math.round(scores.fitness*.2+scores.experience*.2+scores.budget*.15+scores.season*.15+scores.duration*.1+scores.difficulty*.1+scores.adventure*.1);
  const reasons = Object.entries(scores).map(([factor,value]) => ({factor,score:value,reason:value===100?'Fully matches the recorded preference':factor==='duration'?'Trip length differs from your preferred number of days':factor==='experience'?'Altitude or difficulty calls for additional preparation':factor==='fitness'?'Fitness preparation may be needed':factor==='adventure'?'Some terrain or experience preferences are not listed in the catalog':'Preference is not an exact match'}));
  const challenges = [t.altitude>=3000?'Altitude exposure: discuss acclimatization with a qualified operator.':'Lower altitude does not eliminate weather or trail risk.',level===2?'Sustained fitness and prior trekking experience are important.':'Build walking endurance and test footwear before travel.',p.age==='Under 18'?'Guardian consent and operator age eligibility must be confirmed.':p.age==='Over 65'?'Discuss individual suitability with your clinician and operator.':'Review personal fitness and health with qualified professionals as needed.'];
  return {trek:t, score,scores,reasons,excluded,departures:departuresForTrek,risk:{level:t.altitude>=4000||level===2||p.altitudeConcerns?'HIGH':t.altitude>=3000||level===1?'MODERATE':'LOW',altitude:t.altitude>=3000?'Elevated':'Lower',fitness:t.difficulty,technical:'Not documented; confirm with operator',experience:scores.experience<85?'Additional preparation':'Profile compatible',weather:'Requires date-specific forecast',advice:challenges}};
}
export const safety = 'Informational planning only, not medical advice or an operational route. Consult qualified operators and medical professionals; follow official closures and emergency guidance. Weather is uncertain. Sample treks are not bookable.';

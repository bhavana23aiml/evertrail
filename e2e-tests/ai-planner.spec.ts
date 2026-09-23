import { test, expect } from '@playwright/test';

test.beforeAll(async ({ request }) => {
  const response = await request.fetch('https://xtfwdzajwzxmbtvjrqnz.supabase.co/functions/v1/trek-intelligence', { method: 'OPTIONS' });
  expect(response.status(), await response.text()).toBe(200);
});

test('planner queries Supabase and displays transparent deterministic results', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Plan with AI', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Tell us how you travel' })).toBeVisible();
  await expect(page.getByText('AI planner setup in progress', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Continue to trip preferences' }).click();
  const responsePromise=page.waitForResponse(r=>r.url().includes('/functions/v1/trek-intelligence')&&r.request().method()==='POST');
  await page.getByRole('button', { name: 'Find My Perfect Trek' }).click();
  const response=await responsePromise;
  expect(response.status()).toBe(200);
  const data=await response.json();
  await expect(page.getByRole('heading', { name: 'Your AI Trek Matches' })).toBeVisible();
  expect(Array.isArray(data.matches)).toBe(true);
  for(const match of data.matches){
    const s=match.scores;
    expect(match.score).toBe(Math.round(s.fitness*.2+s.experience*.2+s.budget*.15+s.season*.15+s.duration*.1+s.difficulty*.1+s.adventure*.1));
    const card=page.getByRole('article').filter({has:page.getByRole('heading',{name:match.trek.name,exact:true})});
    await expect(card).toContainText(`${match.score}%`);
    expect(match.excluded).toHaveLength(0);
  }
  if(data.aiError) await expect(page.getByText(/Showing rule-based matches, not AI-generated explanations/)).toBeVisible();
  await page.getByText('Why not the other treks?',{exact:true}).click();
  await expect(page.getByText(/Database filtering first removes candidates/)).toBeVisible();
  await page.getByRole('button',{name:'Modify preferences'}).click();
  await page.getByRole('checkbox',{name:'Only treks with matching live departures'}).check();
  await page.getByRole('button',{name:'Find My Perfect Trek'}).click();
  await expect(page.getByText(/No suitable treks match these constraints/)).toBeVisible();
});

test('TrekAI submits a real request and does not invent a response on failure',async({page})=>{
  await page.goto('/ai-planner');
  await page.getByRole('button',{name:'Open TrekAI assistant'}).click();
  await page.getByRole('textbox',{name:'Your question'}).fill('What is the altitude of Kedarkantha?');
  const responsePromise=page.waitForResponse(r=>r.url().includes('/functions/v1/trek-intelligence')&&r.request().method()==='POST');
  await page.getByRole('button',{name:'Send question'}).click();
  const response=await responsePromise;
  const body=await response.json();
  if(response.ok())await expect(page.getByRole('dialog')).toContainText(body.answer);
  else {expect([429,503]).toContain(response.status());await expect(page.getByRole('dialog')).toContainText(body.error);}
  await page.getByRole('button',{name:'New chat',exact:true}).click();
  await expect(page.getByRole('textbox',{name:'Your question'})).toHaveValue('');
});

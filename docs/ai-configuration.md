# AI configuration and verification

## Provider secrets

In the linked Supabase project's **Edge Functions → Manage Secrets**, configure:

- `OPENAI_API_KEY`: required server-side provider credential.
- `OPENAI_MODEL`: optional; defaults to `gpt-4o-mini`.
- `OPENAI_BASE_URL`: optional HTTPS OpenAI-compatible base URL; defaults to `https://api.openai.com/v1`.

Do not add these secrets to `NEXT_PUBLIC_*` variables or send them in chat. The built-in Supabase URL, anonymous key and service-role key are supplied to the Edge Function environment. Never expose the service-role key in browser code.

Function source edits are deployed by Dyad. There is no manual CLI deployment step. The endpoint is `https://xtfwdzajwzxmbtvjrqnz.supabase.co/functions/v1/trek-intelligence`.

## Supabase Auth

Enable the email sign-in method. Configure the production Site URL and explicitly allow the app's `/login` redirect URL, plus required development preview URLs. Supabase handles signup confirmation and authentication email delivery. Configure SMTP and verify actual receipt before claiming email delivery works. No Google provider is enabled.

Public matching can work without login; saving requires an authenticated user. A basic Supabase Auth UI is present. Full onboarding, dedicated verification pages and booking email-verification enforcement remain separate work.

## Verification checklist

1. Endpoint OPTIONS request returns 200 with appropriate CORS headers, not gateway 404.
2. Submit the default planner profile; verify actual catalog matches and independently recalculate scores.
3. Enable live departures with the sample catalog; verify empty results rather than sample inventory.
4. Without a provider key, verify explicit configuration errors only after requesting AI.
5. With valid credentials, verify explanations reference only returned trek IDs; generate a plan and compare recorded facts against the database.
6. Check unavailable and in-range weather dates without assuming guaranteed forecasts.
7. Sign in and save preferences/plan/checklist; reload and verify persistence.
8. Verify another account cannot read or change those records through the Data API.
9. Exercise history rename, modify, export, regeneration and deletion.
10. Confirm chat failure does not produce invented output.

Existing Playwright coverage is a starting point, not proof of all items above. `e2e-tests/ai-planner.spec.ts` requires the deployed function. Tests must not replace backend failures with success mocks.

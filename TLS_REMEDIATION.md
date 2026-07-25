# TLS certificate remediation — thectomentor.com

**Root cause (ops, not code):** The Vercel-managed certificate for the custom domains expired and was not re-issued, so browsers reject apex and `www` with `NET::ERR_CERT_DATE_INVALID`.

Repo audit (this codebase): no interfering `middleware.ts`; `next.config.mjs` has no custom `domains` / `assetPrefix` / HTTP redirects; the only `http://` hits are SVG XML namespaces (`xmlns="http://www.w3.org/2000/svg"`), which are not navigation URLs. Canonicals and metadata already use `https://thectomentor.com`.

---

## 1. Verify the domain is attached to the correct Vercel project

1. Open [Vercel Dashboard](https://vercel.com) → project that deploys this repo (likely **thectomentor**).
2. **Settings → Domains**.
3. Confirm both are listed and assigned to this project (not another team/project):
   - `thectomentor.com`
   - `www.thectomentor.com`
4. Note the status badge on each (Valid / Invalid Configuration / Certificate Error).
5. CLI check (from a machine with Vercel access):

```bash
npx vercel whoami
npx vercel project ls
npx vercel domains ls
npx vercel domains inspect thectomentor.com
npx vercel domains inspect www.thectomentor.com
```

If the domains point at a different / orphaned project, remove them there and re-add under the live project.

---

## 2. Exact DNS records (apex + www)

Vercel’s current guidance for custom domains:

### Apex (`thectomentor.com`)

Use **A** records to Vercel’s anycast IPs (preferred), **or** an ALIAS/ANAME if your DNS host supports apex CNAME flattening.

| Type | Name / Host | Value | TTL |
|------|-------------|-------|-----|
| A | `@` (or blank) | `76.76.21.21` | Auto / 300 |
| *(optional second A if Vercel UI shows one)* | `@` | *(value shown in Domains UI)* | Auto / 300 |

Do **not** point apex at a random CNAME unless your DNS provider documents apex CNAME flattening and Vercel’s UI explicitly asks for that target.

### www (`www.thectomentor.com`)

| Type | Name / Host | Value | TTL |
|------|-------------|-------|-----|
| CNAME | `www` | `cname.vercel-dns.com` | Auto / 300 |

In Vercel Domains UI, set one hostname as primary and redirect the other (typical: apex primary, `www` → apex, or the reverse — pick one and keep it).

### Verify DNS propagation

```bash
dig +short thectomentor.com A
dig +short www.thectomentor.com CNAME
dig +short www.thectomentor.com A
nslookup thectomentor.com
nslookup www.thectomentor.com
```

Expect apex A → `76.76.21.21` (or the IP(s) Vercel currently shows). Expect `www` CNAME → `cname.vercel-dns.com` (which then resolves to Vercel IPs).

---

## 3. Check for a CAA record blocking Let's Encrypt

Vercel issues via Let's Encrypt. A restrictive CAA can block issuance.

```bash
dig +short thectomentor.com CAA
dig +short www.thectomentor.com CAA
```

**Allowed (examples):**

- No CAA records at all (issuance allowed), **or**
- CAA that permits Let’s Encrypt, e.g.:

```text
0 issue "letsencrypt.org"
0 issuewild "letsencrypt.org"
```

If CAA only lists another CA (e.g. `digicert.com`, `amazonaws.com`) **without** `letsencrypt.org`, add Let’s Encrypt (or temporarily remove CAA), then re-issue.

Also check the parent zone if the domain is a subdomain of a managed zone with inherited CAA.

---

## 4. Force certificate re-issuance on Vercel

1. **Settings → Domains** → click the failing domain.
2. If configuration is Invalid, fix DNS first and wait for Vercel to show DNS as correct.
3. Remove the domain → wait ~30–60s → **Add** it again (this commonly triggers a fresh cert request).
4. Or use CLI:

```bash
npx vercel domains rm thectomentor.com
npx vercel domains add thectomentor.com
npx vercel domains rm www.thectomentor.com
npx vercel domains add www.thectomentor.com
```

5. Trigger a new production deployment after domains show as valid:

```bash
npx vercel --prod
```

6. In the domain detail panel, confirm certificate status becomes **Valid** and shows a future expiry.

If issuance still fails, open Vercel → Project → **Deployments** / domain error text, and check the team’s email for Let’s Encrypt failures. Confirm the project is not paused and the account is in good standing.

---

## 5. Verify the fix from a terminal

```bash
# Should print a future notBefore/notAfter; no "certificate has expired"
echo | openssl s_client -servername thectomentor.com -connect thectomentor.com:443 2>/dev/null | openssl x509 -noout -dates -subject -issuer

echo | openssl s_client -servername www.thectomentor.com -connect www.thectomentor.com:443 2>/dev/null | openssl x509 -noout -dates -subject -issuer

# Full chain / handshake (look for Verify return code: 0)
echo | openssl s_client -servername thectomentor.com -connect thectomentor.com:443 -showcerts 2>&1 | head -40

# HTTP should redirect or 200 over TLS — not a cert error
curl -IIvs https://thectomentor.com/ 2>&1 | head -50
curl -IIvs https://www.thectomentor.com/ 2>&1 | head -50

# Optional: confirm no leftover http:// site URL in redirects
curl -IIs http://thectomentor.com/ 2>&1 | head -30
```

Browser check: open both URLs in a private window; padlock should be valid with no `NET::ERR_CERT_DATE_INVALID`.

---

## 6. If it still fails

- Confirm Cloudflare (or another proxy) is not orange-clouding the record with an expired edge cert — either DNS-only (grey cloud) to Vercel, or renew at the proxy.
- Confirm no leftover A/AAAA records pointing at an old host (Netlify, GitHub Pages, expired VPS).
- Confirm IPv6: `dig +short thectomentor.com AAAA` — stale AAAA to a dead host can break some clients even when A is correct.
- Vercel support with output of `openssl s_client` and `dig` above.

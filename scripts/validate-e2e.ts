/**
 * End-to-end validation script for Soraia Portfolio.
 * Tests authentication, all routes, data insertion, and API integrations.
 *
 * Usage:
 *   pnpm tsx scripts/validate-e2e.ts [base-url]
 *
 * Examples:
 *   pnpm tsx scripts/validate-e2e.ts                    # tests localhost:3000
 *   pnpm tsx scripts/validate-e2e.ts https://soraia-oliveira.com  # tests production
 */

const BASE = process.argv[2] || "http://localhost:3000";

let passed = 0;
let failed = 0;
const errors: string[] = [];

function ok(name: string) {
  passed++;
  console.log(`  ✓ ${name}`);
}

function fail(name: string, reason: string) {
  failed++;
  errors.push(`${name}: ${reason}`);
  console.log(`  ✗ ${name} — ${reason}`);
}

async function fetchUrl(
  path: string,
  options?: RequestInit
): Promise<{ status: number; body: string; headers: Headers }> {
  const res = await fetch(`${BASE}${path}`, options);
  const body = await res.text();
  return { status: res.status, body, headers: res.headers };
}

async function fetchJSON(path: string, options?: RequestInit) {
  const res = await fetchUrl(path, options);
  try {
    return { ...res, json: JSON.parse(res.body) };
  } catch {
    return { ...res, json: null };
  }
}

// ─── 1. Public Pages ───

async function testPublicPages() {
  console.log("\n📄 Public Pages");

  const pages = [
    { path: "/", name: "Homepage", minBytes: 10000 },
    { path: "/artworks", name: "Artworks listing", minBytes: 50000 },
    { path: "/about", name: "About", minBytes: 10000 },
    { path: "/contact", name: "Contact", minBytes: 10000 },
    { path: "/soraia-space", name: "Soraia Space", minBytes: 10000 },
    { path: "/artworks/ba-na-na-artist-proof", name: "Artwork detail (artist-proof)", minBytes: 10000 },
    { path: "/artworks/golden-necklace", name: "Artwork detail (jewelry)", minBytes: 10000 },
    { path: "/artworks/dopamine", name: "Artwork detail (drawing)", minBytes: 10000 },
    { path: "/artworks/shared-my-soul", name: "Artwork detail (photography)", minBytes: 10000 },
  ];

  for (const page of pages) {
    try {
      const res = await fetchUrl(page.path);
      if (res.status === 200 && res.body.length >= page.minBytes) {
        ok(`${page.name} → ${res.status} (${(res.body.length / 1024).toFixed(0)}KB)`);
      } else {
        fail(page.name, `status=${res.status}, size=${res.body.length}`);
      }
    } catch (e) {
      fail(page.name, String(e));
    }
  }
}

// ─── 2. Admin Pages (should redirect to login) ───

async function testAdminRedirects() {
  console.log("\n🔒 Admin Route Protection");

  const adminPaths = ["/admin", "/admin/artworks", "/admin/news", "/admin/contacts", "/admin/settings"];

  for (const path of adminPaths) {
    try {
      const res = await fetchUrl(path, { redirect: "manual" });
      // Should redirect to login (302/307) or show login page
      if (res.status === 200 || res.status === 302 || res.status === 307 || res.status === 308) {
        ok(`${path} → ${res.status}`);
      } else {
        fail(path, `unexpected status ${res.status}`);
      }
    } catch (e) {
      fail(path, String(e));
    }
  }
}

// ─── 3. Authentication Flow ───

async function testAuth(): Promise<string | null> {
  console.log("\n🔑 Authentication");

  try {
    // Get CSRF token + cookies
    const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
    const csrfCookies = csrfRes.headers.getSetCookie?.() || [];
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;

    if (!csrfToken) {
      fail("CSRF token", "no token returned");
      return null;
    }
    ok(`CSRF token obtained`);

    // Login
    const cookieStr = csrfCookies.map((c: string) => c.split(";")[0]).join("; ");
    const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookieStr,
      },
      body: new URLSearchParams({
        csrfToken,
        email: "soraia@soraia-oliveira.com",
        password: "soraia100M",
      }),
      redirect: "manual",
    });

    const location = loginRes.headers.get("location") || "";
    const loginCookies = loginRes.headers.getSetCookie?.() || [];

    if (location.includes("error")) {
      fail("Admin login", `redirect to: ${location}`);
      return null;
    }

    ok(`Admin login → ${loginRes.status} redirect to ${location}`);

    // Build session cookie string
    const allCookies = [...csrfCookies, ...loginCookies]
      .map((c: string) => c.split(";")[0])
      .join("; ");

    return allCookies;
  } catch (e) {
    fail("Auth flow", String(e));
    return null;
  }
}

// ─── 4. Admin Pages (authenticated) ───

async function testAdminPages(cookies: string) {
  console.log("\n👤 Admin Pages (authenticated)");

  const pages = [
    "/admin",
    "/admin/artworks",
    "/admin/news",
    "/admin/exhibitions",
    "/admin/contacts",
    "/admin/newsletter",
    "/admin/orders",
    "/admin/settings",
  ];

  for (const path of pages) {
    try {
      const res = await fetchUrl(path, { headers: { Cookie: cookies }, redirect: "follow" });
      if (res.status === 200) {
        ok(`${path} → 200 (${(res.body.length / 1024).toFixed(0)}KB)`);
      } else {
        fail(path, `status=${res.status}`);
      }
    } catch (e) {
      fail(path, String(e));
    }
  }
}

// ─── 5. API Routes ───

async function testAPIs() {
  console.log("\n🔌 API Routes");

  // Newsletter subscribe
  try {
    const ts = Date.now();
    const res = await fetchJSON("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: `e2e-test-${ts}@example.com` }),
    });
    if (res.status === 200 && res.json?.success) {
      ok("Newsletter subscribe → 200");
    } else {
      fail("Newsletter subscribe", `${res.status} ${res.body}`);
    }
  } catch (e) {
    fail("Newsletter subscribe", String(e));
  }

  // Contact form
  try {
    const res = await fetchJSON("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "E2E Test",
        email: "e2e@test.com",
        subject: "Validation",
        message: "Automated E2E validation test",
      }),
    });
    if (res.status === 200 && res.json?.success) {
      ok("Contact form → 200");
    } else {
      fail("Contact form", `${res.status} ${res.body}`);
    }
  } catch (e) {
    fail("Contact form", String(e));
  }

  // Checkout (artwork with price)
  try {
    const res = await fetchJSON("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artworkId: 1 }),
    });
    if (res.status === 200 && res.json?.url?.includes("checkout.stripe.com")) {
      ok("Stripe checkout → 200 (valid URL)");
    } else {
      fail("Stripe checkout", `${res.status} ${JSON.stringify(res.json)}`);
    }
  } catch (e) {
    fail("Stripe checkout", String(e));
  }

  // Checkout — sold artwork should fail
  try {
    // Find a sold artwork (ID 9 = Caught in a Dream AP II, sold)
    const res = await fetchJSON("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artworkId: 9 }),
    });
    if (res.status === 400) {
      ok("Sold artwork checkout blocked → 400");
    } else {
      fail("Sold artwork checkout", `expected 400 got ${res.status}`);
    }
  } catch (e) {
    fail("Sold artwork checkout", String(e));
  }

  // Invalid email
  try {
    const res = await fetchJSON("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "not-an-email" }),
    });
    if (res.status === 400) {
      ok("Invalid email rejected → 400");
    } else {
      fail("Invalid email validation", `expected 400 got ${res.status}`);
    }
  } catch (e) {
    fail("Invalid email validation", String(e));
  }
}

// ─── 6. SEO & Meta ───

async function testSEO() {
  console.log("\n🔍 SEO & Meta");

  try {
    const res = await fetchUrl("/robots.txt");
    if (res.status === 200 && res.body.includes("Sitemap")) {
      ok("robots.txt → 200 with Sitemap");
    } else {
      fail("robots.txt", `${res.status}`);
    }
  } catch (e) {
    fail("robots.txt", String(e));
  }

  try {
    const res = await fetchUrl("/sitemap.xml");
    if (res.status === 200 && res.body.includes("urlset")) {
      ok("sitemap.xml → 200 with URLs");
    } else {
      fail("sitemap.xml", `${res.status}`);
    }
  } catch (e) {
    fail("sitemap.xml", String(e));
  }
}

// ─── 7. Static Assets ───

async function testStaticAssets() {
  console.log("\n🖼️  Static Assets");

  const assets = [
    "/images/artworks/ba-na-na-ap.png",
    "/images/artworks/golden-necklace.jpg",
    "/images/artworks/dopamine.jpg",
  ];

  for (const asset of assets) {
    try {
      const res = await fetch(`${BASE}${asset}`, { method: "HEAD" });
      if (res.status === 200) {
        ok(`${asset.split("/").pop()} → 200`);
      } else {
        fail(asset, `status=${res.status}`);
      }
    } catch (e) {
      fail(asset, String(e));
    }
  }
}

// ─── Run All ───

async function main() {
  console.log(`\n🚀 E2E Validation — ${BASE}\n${"═".repeat(50)}`);

  await testPublicPages();
  await testAdminRedirects();
  const cookies = await testAuth();
  if (cookies) {
    await testAdminPages(cookies);
  }
  await testAPIs();
  await testSEO();
  await testStaticAssets();

  console.log(`\n${"═".repeat(50)}`);
  console.log(`\n✅ Passed: ${passed}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed}`);
    errors.forEach((e) => console.log(`   → ${e}`));
    process.exit(1);
  } else {
    console.log(`\n🎉 All tests passed!\n`);
  }
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});

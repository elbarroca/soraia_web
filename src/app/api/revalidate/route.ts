import { revalidatePath } from "next/cache";

const ALLOWED_PATHS = [
  "/",
  "/artworks",
  "/about",
  "/soraia-space",
  "/contact",
  "/admin/artworks",
  "/admin/news",
  "/admin/exhibitions",
  "/admin/settings",
];

export async function POST(req: Request) {
  try {
    const { secret, path } = await req.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Allow exact matches or artwork detail paths
    const isAllowed =
      ALLOWED_PATHS.includes(path) ||
      /^\/artworks\/[\w-]+$/.test(path);

    if (!isAllowed) {
      return Response.json({ error: "Path not allowed" }, { status: 400 });
    }

    revalidatePath(path);
    return Response.json({ revalidated: true });
  } catch {
    return Response.json({ error: "Revalidation failed" }, { status: 500 });
  }
}

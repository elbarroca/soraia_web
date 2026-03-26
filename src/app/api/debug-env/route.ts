export async function GET() {
  const hash = process.env.ADMIN_PASSWORD_HASH ?? "NOT_SET";
  const email = process.env.ADMIN_EMAIL ?? "NOT_SET";
  return Response.json({
    hashLength: hash.length,
    hashPrefix: hash.substring(0, 10),
    hashValid: hash.startsWith("$2b$") || hash.startsWith("$2a$"),
    email,
  });
}

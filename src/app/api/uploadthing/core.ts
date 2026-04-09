import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";

const f = createUploadthing();

async function requireAdminSession() {
  // NextAuth v5 beta auth() fails to read JWT in uploadthing's route handler
  // context on Next.js 16. Fall back to verifying the session cookie exists.
  const cookieStore = await cookies();
  const hasToken =
    cookieStore.has("authjs.session-token") ||
    cookieStore.has("__Secure-authjs.session-token");
  if (!hasToken) throw new UploadThingError("Unauthorized");
}

export const ourFileRouter = {
  artworkImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      await requireAdminSession();
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  newsImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      await requireAdminSession();
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

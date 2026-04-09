import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";

const f = createUploadthing();

async function getAuthUser() {
  try {
    const session = await auth();
    if (!session?.user) throw new UploadThingError("Unauthorized");
    return session.user;
  } catch (err) {
    console.error("[uploadthing] auth error:", err);
    throw new UploadThingError("Unauthorized");
  }
}

export const ourFileRouter = {
  artworkImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      const user = await getAuthUser();
      return { userId: user.id ?? "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  newsImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      await getAuthUser();
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import { UploadThingError} from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: '32MB' }})
    .middleware(
        async ({ req }) => {
            // get user info
            const user = await currentUser();

            if (!user) throw new UploadThingError('Unauthorized');

            return { userId: user.id };
        }
    ).onUploadComplete(async ({ metadata, file }) => {
        console.log('Upload completed for user ID', metadata.userId);
        console.log('file url', file.url);

        return { userId: metadata.userId, file: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
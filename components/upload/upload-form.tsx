"use client";

import { z } from 'zod';

import UploadFormInput from "@/components/upload/upload-form-input";
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { generatePdfSummary } from '@/actions/upload-actions';

const schema = z.object({ 
    file: z
        .instanceof(File, {message: 'Invalid file'})
        .refine((file) => file.size <= 20 * 1024 * 1024, 
        'File size must be less than 20MB')
        .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF')
});

const UploadForm = () => {
    const { startUpload, routeConfig } = useUploadThing(
        'pdfUploader', {
            onClientUploadComplete: () => {
                console.log('Upload successfully!');
            },
            onUploadError: (err) => {
                toast('Error occured while uploading.')
            },
            onUploadBegin: ({ file }) => {
                console.log('Upload has began for', file);
            }
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("PDF submitted")
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        // validating the fields
        const validatedFields = schema.safeParse({ file });

        if (!validatedFields.success) {
            console.log(
                validatedFields.error.flatten().fieldErrors.file?.
                [0] ?? 'Invalid file'
            );
            toast('Something went wrong.')
            return;
        }

        toast('Uploading PDF...')

        // upload the file to uploadthing
        const resp = await startUpload([file]);
        if (!resp) {
            toast('Something went wrong, please use a different file.')
            return;
        }

        toast('Processing PDF, Gist AI is reading your document...')

        // parse the pdf using langchain
        const summary = await generatePdfSummary(resp);
        // summarize the PDF using AI
        // save the summary to the database
        // redirect to the [id] summary page
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    )
}

export default UploadForm
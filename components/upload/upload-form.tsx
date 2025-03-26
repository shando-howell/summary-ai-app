"use client";

import { z } from 'zod';

import UploadFormInput from "@/components/upload/upload-form-input";
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { generatePdfSummary } from '@/actions/upload-actions';
import { useRef, useState } from 'react';

const schema = z.object({ 
    file: z
        .instanceof(File, {message: 'Invalid file'})
        .refine((file) => file.size <= 20 * 1024 * 1024, 
        'File size must be less than 20MB')
        .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF')
});

const UploadForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

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

        try {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
            const file = formData.get('file') as File;

            // validating the fields
            const validatedFields = schema.safeParse({ file });

            if (!validatedFields.success) {
                console.log(
                    validatedFields.error.flatten().fieldErrors.file?.
                    [0] ?? 'Invalid file'
                );
                setIsLoading(false);
                return;
            }

            toast('Uploading PDF...')

            // upload the file to uploadthing
            const resp = await startUpload([file]);
            if (!resp) {
                toast('Something went wrong, please use a different file.')
                setIsLoading(false);
                return;
            }

            toast('Processing PDF, Gist AI is reading your document...')

            // parse the pdf using langchain
            const result = await generatePdfSummary(resp);
            console.log({ result });

            const { data = null, message = null } = result || {};

            if (data) {
                toast('Hang tight, we are saving your summary!');
                formRef.current?.reset();
                if (data.summary) {
                    // save the summary to the database
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error occurred", error);
            formRef.current?.reset();
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
        </div>
    )
}

export default UploadForm
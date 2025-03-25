"use client";

import { z } from 'zod';

import UploadFormInput from "@/components/upload/upload-form-input";

const schema = z.object({ 
    file: z
        .instanceof(File, {message: 'Invalid file'})
        .refine((file) => file.size <= 20 * 1024 * 1024, 
        'File size must be less than 20MB')
        .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF')
});

const UploadForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            return;
        }

        // schema with zod
        // upload the file to uploadthing
        // parse the pdf using langchain
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
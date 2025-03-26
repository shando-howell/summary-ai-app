'use client';

import { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

export const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({ onSubmit, isLoading }, ref) => {
    return (
        <div>
            <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex justify-end items-center gap-1.5">
                    <Input 
                        id="file" 
                        type="file" 
                        name="file"
                        accept="application/pdf"
                        required
                        className=""
                    />
                    <Button>Upload your PDF</Button>
                </div>
            </form>
        </div>
    )
});

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
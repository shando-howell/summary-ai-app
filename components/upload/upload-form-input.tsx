'use client';

import { Button } from "@/components/ui/button"

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit}: UploadFormInputProps) => {
  return (
    <div>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <input type="file"/>

            <Button>Upload your PDF</Button>
        </form>
    </div>
  )
}

export default UploadFormInput;
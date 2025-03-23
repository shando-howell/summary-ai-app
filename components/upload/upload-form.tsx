"use client";

import UploadFormInput from "@/components/upload/upload-form-input";

const UploadForm = () => {
    const handleSubmit = () => {
        console.log("PDF submitted")
    }

    return (
        <UploadFormInput onSubmit={handleSubmit} />
    )
}

export default UploadForm
'use server';

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        }
    };
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        };
    }

    const {
        serverData: {
            userId,
            file: { url: pdfUrl, name: fileName },
        },
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        }
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log(pdfText)

        let summary;
        try {
            const summary = await generateSummaryFromOpenAI(pdfText);
            console.log({ summary });
        } catch (error) {
            console.log(error);
            // Call Gemini AI
            if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
                try {
                    summary = await generateSummaryFromGemini(pdfText);
                } catch (geminiError) {
                    console.error(
                        'Gemini API failed after OpenAI quote exceeded',
                        geminiError
                    );
                    throw new Error(
                        'Failed to generate summary with available AI providers'
                    );
                }
            }
        }

        if (!summary) {
            return {
                success: false,
                message: 'Failed to generate summary.',
                data: null,
            };
        }

        return {
            success: true,
            message: 'Summary generated successfully',
            data: {
                summary,
            }
        }
    } catch (err) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        }
    }
}
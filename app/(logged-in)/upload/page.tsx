import BgGradient from "@/components/common/bg-gradient"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

const UploadPage = () => {
  return (
    <section className="min-h-screen">
        <BgGradient />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r
                from-blue-200 via-blue-500 to-blue-800 animate-gradient-x group">
                    <Badge
                        variant={'secondary'}
                        className='relative px-6 py-2 text-base font-medium bg-white rounded-full
                        group-hover:bg-gray-50 transition-colors'
                    >
                        <Sparkles className="h-6 w-6 mr-2 text-blue-600 animate-pulse"/>
                        <p className="text-base text-blue-500">AI-Powered Content Creation</p>
                    </Badge>
                </div>
                <div className="capitalize text-3xl font-bold tracking-tight text-gray-900
                sm:text-4xl">
                    Start Uploading{' '}
                    <span className="relative inline-block">
                        <span className="relative z-10 px-2">Your PDFs</span> 
                        <span className="absolute inset-0 bg-blue-200/50 -rotate-2
                            rounded-lg transform -skew-y-1"
                            aria-hidden="true"
                        ></span>
                    </span>{' '}
                </div>
                <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
                    <p>Upload your PDF and let AI do the magic! 🤖</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default UploadPage
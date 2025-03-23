import BgGradient from '@/components/common/bg-gradient';
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="flex justify-center items-center lg:min-h-[40vh]">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className="from-blue-400 via-blue-300 to-green-300" />
        <SignIn />
      </div>
    </section>
  );
}
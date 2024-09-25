import { Button } from '@/components/ui/button'
import Link from 'next/link'
import '../app/globals.css'
import 'tailwindcss/tailwind.css';

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-hero-pattern bg-cover bg-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Marco Areliano Suteja
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Full-Stack Developer
            </p>
          </div>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            Crafting Digital Experiences with Code and Creativity
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="#projects">View Portfolio</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
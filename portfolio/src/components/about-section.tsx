import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import '../app/globals.css'


export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">About Me</h2>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            alt="Marco Areliano Suteja"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="600"
            src="/placeholder.svg"
            width="600"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl">Marco Areliano Suteja</h3>
              <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                I'm a passionate Full-Stack Developer with expertise in web development and a strong foundation in various technologies. 
                My journey in tech began at Simon Fraser University, where I honed my skills in Java, Python, and ReactJS.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">Shadcn</Badge>
              <Badge variant="secondary">V0</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
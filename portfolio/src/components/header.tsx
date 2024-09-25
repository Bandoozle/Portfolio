import Link from 'next/link'
import { Button } from '@/components/ui/button'
import '../app/globals.css'
import 'tailwindcss/tailwind.css';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Marco Areliano Suteja</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#about">About</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#experience">Experience</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline">Download Resume</Button>
        </div>
      </div>
    </header>
  )
}
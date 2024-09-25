import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Github, Linkedin, Mail } from 'lucide-react'
import '../app/globals.css'
import 'tailwindcss/tailwind.css';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Get in Touch</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p>Feel free to reach out to me through any of the following channels:</p>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>marco.suteja@example.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5" />
              <a href="#" className="hover:underline">LinkedIn Profile</a>
            </div>
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <a href="#" className="hover:underline">GitHub Profile</a>
            </div>
          </div>
          <form className="space-y-4">
            <Input placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Textarea placeholder="Your Message" />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
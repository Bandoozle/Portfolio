import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import '../app/globals.css'
import 'tailwindcss/tailwind.css';

const blogPosts = [
  {
    title: 'Building Responsive Layouts with Tailwind CSS',
    description: 'Learn how to create beautiful, responsive layouts using Tailwind CSS.',
    image: '/placeholder.svg',
    date: 'May 15, 2023',
  },
  {
    title: 'Getting Started with React Hooks',
    description: 'A comprehensive guide to understanding and using React Hooks in your projects.',
    image: '/placeholder.svg',
    date: 'June 2, 2023',
  },
  // Add more blog posts here
]

export default function BlogSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Latest Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-2">{post.date}</p>
                <p className="mt-2">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="#">Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
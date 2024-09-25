import { Button } from '@/components/ui/button'
import '../app/globals.css'
import 'tailwindcss/tailwind.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const projects = [
  {
    title: 'Tokimon Finder',
    description: 'A fun game to find and collect Tokimon creatures.',
    category: 'Web Development',
    image: '/placeholder.svg',
  },
  {
    title: 'Expense Tracker',
    description: 'A ReactJS app to track and manage personal expenses.',
    category: 'Web Development',
    image: '/placeholder.svg',
  },
  // Add more projects here
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">My Projects</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web">Web Development</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
            <TabsTrigger value="open-source">Open Source</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button>Live Demo</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          {/* Add similar TabsContent for other categories */}
        </Tabs>
      </div>
    </section>
  )
}
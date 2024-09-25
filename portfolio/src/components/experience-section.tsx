import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import '../app/globals.css'
import 'tailwindcss/tailwind.css';

const experiences = [
  {
    company: 'GISAU',
    role: 'Software Developer',
    duration: 'Jan 2022 - Present',
    description: 'Developed and maintained web applications using React and Node.js.',
  },
  {
    company: 'WorldFarm',
    role: 'Full-Stack Developer Intern',
    duration: 'May 2021 - Aug 2021',
    description: 'Worked on a farm management system using Python and Django.',
  },
  // Add more experiences here
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Work Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exp.role} at {exp.company}</CardTitle>
                <p className="text-sm text-gray-500">{exp.duration}</p>
              </CardHeader>
              <CardContent>
                <p>{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import '../app/globals.css'
import 'tailwindcss/tailwind.css';

const awards = [
  { name: 'Best Web App - University Hackathon 2022', image: '/placeholder.svg' },
  { name: 'Outstanding CS Graduate - Simon Fraser University', image: '/placeholder.svg' },
  // Add more awards here
]

export default function AwardsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Awards & Recognition</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <Card key={index}>
              <CardHeader>
                <img src={award.image} alt={award.name} className="w-full h-40 object-contain" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center">{award.name}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
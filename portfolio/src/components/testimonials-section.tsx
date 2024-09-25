// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
// import '../app/globals.css'
// import 'tailwindcss/tailwind.css';

// const testimonials = [
//   {
//     name: 'John Doe',
//     role: 'Project Manager at TechCorp',
//     content: 'Marco is an exceptional developer with a keen eye for detail. His work on our project was outstanding.',
//     image: '/placeholder.svg',
//   },
//   {
//     name: 'Jane Smith',
//     role: 'Professor at Simon Fraser University',
//     content: 'Marco was one of our top students. His passion for coding and problem-solving skills are remarkable.',
//     image: '/placeholder.svg',
//   },
//   // Add more testimonials here
// ]

// export default function TestimonialsSection() {
//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32">
//       <div className="container px-4 md:px-6">
//         <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Testimonials</h2>
//         <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
//           <CarouselContent>
//             {testimonials.map((testimonial, index) => (
//               <CarouselItem key={index}>
//                 <Card>
//                   <CardHeader>
//                     <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto" />
//                     <CardTitle className="text-center">{testimonial.name}</CardTitle>
//                     <p className="text-center text-sm text-gray-500">{testimonial.role}</p>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-center italic">&ldquo;{testimonial.content}&rdquo;</p>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//     </section>
//   )
// }
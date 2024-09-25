import HeroSection from '../components/hero-section'
import AboutSection from '../components/about-section'
import ProjectsSection from '../components/projects-section'
import SkillsSection from '../components/skills-section'
import AwardsSection from '../components/awards-section'
import ExperienceSection from '../components/experience-section'
// import TestimonialsSection from '../components/testimonials-section'
import BlogSection from '../components/blog-section'
import ContactSection from '../components/contact-section'
import '../app/globals.css'
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <AwardsSection />
      <ExperienceSection />
      <BlogSection />
      <ContactSection />
    </main>
  )
}
"use client";

import { useState, useEffect } from 'react';  // Import necessary hooks
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import '../app/globals.css';
import 'tailwindcss/tailwind.css';

export default function HeroSection() {
  const [text, setText] = useState<string>('');  // State for the typewriter effect
  const fullText: string = "Hey, I'm Marco Areliano Suteja";  // The full text to type
  const typingSpeed: number = 150;  // Adjust typing speed for better consistency
  const [showCursor, setShowCursor] = useState(true);  // State for the blinking cursor

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => fullText.substring(0, index + 1));  // Update text based on substring
        index++;
      } else {
        clearInterval(timer);  // Stop typing when the entire text is typed
      }
    }, typingSpeed);

    return () => clearInterval(timer);  // Cleanup function to stop the interval
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);  // Toggle cursor visibility
    }, 500);  // Blinking speed

    return () => clearInterval(cursorTimer);  // Cleanup function to stop the interval
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-hero-pattern bg-cover bg-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {text}
              <span className={`cursor ${showCursor ? 'visible' : 'invisible'}`}>
                |
              </span>
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
  );
}

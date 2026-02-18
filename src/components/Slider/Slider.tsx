'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

export default function Slider({ images }: { images: string[] }) {
  return (
    <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i} className="w-full h-[400px] flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={img}
                      alt={`Thumbnail ${i}`}
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </CarouselItem>

                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
  )
}

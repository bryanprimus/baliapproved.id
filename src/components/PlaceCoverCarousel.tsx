import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type PlaceCoverSlide = {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
};

export function PlaceCoverCarousel({
  slides,
  label,
}: {
  slides: PlaceCoverSlide[];
  label: string;
}) {
  const multiple = slides.length > 1;

  return (
    <Carousel
      opts={{ align: "center", loop: multiple }}
      className="w-full"
      aria-label={label}
      tabIndex={0}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={`${slide.src}-${index}`}
            className="min-w-fit basis-auto"
          >
            <img
              src={slide.src}
              srcSet={slide.srcSet || undefined}
              sizes={slide.sizes}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : undefined}
              decoding="async"
              draggable={false}
              className="block aspect-[2/3] h-[min(24rem,50svh)] w-auto bg-muted object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {multiple ? (
        <>
          <CarouselPrevious className="left-3 sm:left-4" />
          <CarouselNext className="right-3 sm:right-4" />
        </>
      ) : null}
    </Carousel>
  );
}

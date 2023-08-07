"use client";

import { KeyboardPlugin, ThumbnailPlugin } from "@shared/lib";
import { CarouselArrow, Gallery, PlayIcon, Skeleton, Title } from "@shared/ui";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

interface GameMediaProps {
  videos: { url: string; name: string }[];
  artworks: string[];
  screenshots: string[];
  isLoading: boolean;
}

export const GameMedia = ({
  artworks,
  screenshots,
  videos,
  isLoading,
}: GameMediaProps) => {
  const [galleryOpen, setGalleryOpen] = useState<false | number>(false);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      created() {
        setLoaded(true);
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details?.rel);
      },
    },
    [KeyboardPlugin]
  );
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      breakpoints: {
        "(min-width: 1px)": {
          slides: {
            perView: 2,
            spacing: 10,
          },
        },
        "(min-width: 479px)": {
          slides: {
            perView: 3,
            spacing: 10,
          },
        },
        "(min-width: 768px)": {
          slides: {
            perView: 4,
            spacing: 10,
          },
        },
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );
  const images = [...artworks, ...screenshots];

  if (isLoading)
    return (
      <div className="my-4 w-[min(100%,80vh)]">
        <Skeleton className="h-9 w-32 lg:mb-3 mb-2" />
        <Skeleton className="aspect-video w-full" />
        <div className="mt-4 h-24 md:h-28 gap-2.5 flex">
          <Skeleton className="flex-1 h-full" />
          <Skeleton className="flex-1 h-full" />
          <Skeleton className="flex-1 h-full hidden xs:block" />
          <Skeleton className="flex-1 h-full hidden md:block" />
        </div>
      </div>
    );

  return (
    <>
      <Gallery
        controlledSlider={instanceRef}
        images={images}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        videos={videos}
      />
      <div className="my-4 w-[min(100%,80vh)]">
        <Title>Media</Title>
        <div className="relative">
          {loaded && instanceRef.current && (
            <>
              <CarouselArrow
                className="md:left-2"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                disabled={currentSlide === 0}
                left
              />
              <CarouselArrow
                className="md:right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                disabled={
                  currentSlide === instanceRef.current.track.details?.maxIdx
                }
              />
            </>
          )}
          <div ref={sliderRef} className="keen-slider">
            {videos.map((video) => (
              <div key={video.url} className="keen-slider__slide aspect-video">
                <ReactPlayer
                  playIcon={
                    <PlayIcon
                      wrapperClassName="w-14 h-10"
                      iconClassName="w-8 h-8"
                    />
                  }
                  width="100%"
                  height="100%"
                  controls
                  light
                  url={`https://www.youtube.com/watch?v=${video.url}`}
                />
              </div>
            ))}
            {images.map((image, idx) => (
              <div
                onClick={() => setGalleryOpen(videos.length + idx)}
                key={image}
                className="keen-slider__slide aspect-video cursor-pointer"
              >
                <Image src={image} fill alt="Image" sizes="min(100%,80vh)" />
              </div>
            ))}
          </div>
        </div>
        <div
          ref={thumbnailRef}
          className="keen-slider thumbnail mt-4 h-24 md:h-28"
        >
          {videos.map((video) => (
            <div
              key={video.url}
              className="keen-slider__slide cursor-pointer [&.active]:border-2 border-secondary border-solid"
            >
              <PlayIcon />
              <Image
                src={`https://i.ytimg.com/vi/${video.url}/hqdefault.jpg`}
                alt={video.name}
                fill
                sizes="(min-width: 768px) 25%, (min-width: 479px) 33%, 50%"
              />
            </div>
          ))}
          {images.map((image) => (
            <div
              key={image}
              className="keen-slider__slide cursor-pointer [&.active]:border-2 border-secondary border-solid"
            >
              <Image
                src={image}
                fill
                alt="Image"
                sizes="(min-width: 768px) 25%, (min-width: 479px) 33%, 50%"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

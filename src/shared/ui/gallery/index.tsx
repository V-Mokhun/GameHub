"use client";

import { KeyboardPlugin, ThumbnailPlugin } from "@shared/lib";
import {
  KeenSliderInstance,
  KeenSliderOptions,
  useKeenSlider,
} from "keen-slider/react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { CarouselArrow } from "../carousel-arrow";
import ReactPlayer from "react-player/lazy";
import { PlayIcon } from "../play-icon";
import Image from "next/image";
import { Dialog, DialogContent } from "../primitives";

interface GalleryProps {
  controlledSlider: MutableRefObject<KeenSliderInstance | null>;
  videos: { url: string; name: string }[];
  images: string[];
  open: false | number;
  onClose: () => void;
}

export const Gallery = ({
  controlledSlider,
  images,
  videos,
  open,
  onClose,
}: GalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const options = useRef<KeenSliderOptions>({
    initial: open || 0,
    disabled: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    options.current,
    [KeyboardPlugin, ThumbnailPlugin(controlledSlider)]
  );

  const onChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  useEffect(() => {
    setTimeout(() => {
      options.current.disabled = open === false;
      open !== false && instanceRef.current?.update(options.current, open);
    }, 0);
  }, [open]);

  return (
    <Dialog open={open !== false} onOpenChange={onChange}>
      <DialogContent
        className="p-0 md:p-0 border-none bg-transparent w-full max-w-full lg:max-w-[90%]"
        overlayClassName="bg-black"
      >
        <div className="min-w-0 relative md:mx-10">
          <>
            <CarouselArrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={currentSlide === 0}
              left
            />
            <CarouselArrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={
                currentSlide === instanceRef.current?.track.details.maxIdx
              }
            />
          </>
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
            {images.map((image) => (
              <div key={image} className="keen-slider__slide aspect-video">
                <Image src={image} fill alt="Image" />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

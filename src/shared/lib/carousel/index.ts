import { KeenSliderInstance, KeenSliderPlugin } from "keen-slider/react";
import { MutableRefObject } from "react";

export function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details?.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export const KeyboardPlugin = (slider: KeenSliderInstance) => {
  let focused = false;

  function eventFocus() {
    focused = true;
  }

  function eventBlur() {
    focused = false;
  }

  function eventKeydown(e: KeyboardEvent) {
    if (!focused) return;
    switch (e.key) {
      default:
        break;
      case "Left":
      case "ArrowLeft":
        slider.prev();
        break;
      case "Right":
      case "ArrowRight":
        slider.next();
        break;
    }
  }

  slider.on("created", () => {
    slider.container.setAttribute("tabindex", "0");
    slider.container.addEventListener("focus", eventFocus);
    slider.container.addEventListener("blur", eventBlur);
    slider.container.addEventListener("keydown", eventKeydown);
  });
};

import { cn } from "@shared/lib";

export const StarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 53.867 53.867"
      className={cn("w-6 h-6 text-secondary", className)}
      fill="currentColor"
      stroke="#000"
      strokeWidth={2}
    >
      <g strokeWidth={1}>
        <polygon
          fill="currentColor"
          points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "
        ></polygon>
      </g>
    </svg>
  );
};

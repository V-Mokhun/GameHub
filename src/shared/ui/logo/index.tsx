import { HOME_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import Link from "next/link";
import { SVGProps } from "react";

interface LogoProps {
  className?: string;
  svgProps?: SVGProps<SVGSVGElement>;
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>;
}

export const Logo = ({ svgProps, titleProps, className }: LogoProps) => {
  const { className: svgClassName, ...restSvgProps } = svgProps || {};
  const { className: titleClassName, ...restTitleProps } = titleProps || {};

  return (
    <Link className={className} href={HOME_ROUTE}>
      <div className="flex items-center gap-1 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
          height="25"
          width="50"
          className={cn(
            "text-secondary w-10 h-5 md:w-12 md:h-6 shrink-0",
            svgClassName
          )}
          {...restSvgProps}
        >
          <g>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 100 59"
            >
              <path
                d="M97.901 18l-0.003 0.001C96.896 7.895 88.372 0 78 0c-3.855 0-7.444 1.11-10.498 3H32.498C29.444 1.11 25.855 0 22 0 11.628 0 3.104 7.895 2.102 18.001L2.099 18C1.751 22.175 0 50.691 0 51c0 4.418 3.581 8 8 8 18.377 0 25.943-15.686 28.666-24h26.668C66.057 43.314 73.623 59 92 59c4.419 0 8-3.582 8-8C100 50.691 98.249 22.175 97.901 18zM22 32c-6.629 0-12-5.373-12-12S15.371 8 22 8s12 5.373 12 12S28.629 32 22 32zM78 32c-6.629 0-12-5.373-12-12S71.371 8 78 8s12 5.373 12 12S84.629 32 78 32z"
                fill="currentColor"
              />
              <polygon
                points="31,17 25,17 25,11 19,11 19,17 13,17 13,23 19,23 19,29 25,29 25,23 31,23 "
                fill="currentColor"
              />
              <path
                d="M78 16c0 2.21-1.79 4-4 4-2.205 0-4-1.79-4-4s1.795-4 4-4C76.21 12 78 13.79 78 16z"
                fill="currentColor"
              />
              <path
                d="M86 24c0 2.21-1.79 4-4 4-2.205 0-4-1.79-4-4s1.795-4 4-4C84.21 20 86 21.79 86 24z"
                fill="currentColor"
              />
            </svg>
          </g>
        </svg>
        <h2
          className={cn("text-xl md:text-2xl font-bold", titleClassName)}
          {...restTitleProps}
        >
          GameHub
        </h2>
      </div>
    </Link>
  );
};

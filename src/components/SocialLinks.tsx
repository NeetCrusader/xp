"use client";

import type { IconLookup } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SOCIALS } from "@/config/socials";
import type { Direction } from "@/types/presence";
import "@/lib/icons";

interface SocialLink {
  name: string;
  icon: IconLookup | "globe";
  url: string;
}

const socialsData: SocialLink[] = [
  {
    name: "Spotify",
    icon: { prefix: "fab", iconName: "spotify" },
    url: SOCIALS.spotify,
  },
  {
    name: "Steam",
    icon: { prefix: "fab", iconName: "steam" },
    url: SOCIALS.steam,
  },
  {
    name: "Discord",
    icon: { prefix: "fab", iconName: "discord" },
    url: SOCIALS.discord,
  },
  {
    name: "Hallaxius",
    icon: "globe",
    url: SOCIALS.hallaxius,
  },
];

export default function SocialLinks() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("top");

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const vertical = y < rect.height / 2 ? "top" : "bottom";
    const horizontal = x < rect.width / 2 ? "left" : "right";

    const dir =
      Math.abs(y - rect.height / 2) > Math.abs(x - rect.width / 2)
        ? vertical
        : horizontal;

    setDirection(dir as Direction);
    setHovered(name);
  };

  const renderIcon = (social: SocialLink) => {
    if (social.icon === "globe") {
      return <Globe className="w-6 h-6" />;
    }
    return <FontAwesomeIcon icon={social.icon} className="text-2xl" />;
  };

  return (
    <div className="flex justify-center gap-6 mt-4">
      {socialsData.map((social) => (
        <div key={social.name} className="relative flex flex-col items-center">
          <Link href={social.url} target="_blank" rel="noopener noreferrer">
            <button
              type="button"
              onMouseEnter={(e) => handleMouseEnter(e, social.name)}
              onMouseLeave={() => setHovered(null)}
              className="relative z-10 text-primary/60 hover:text-primary/90 transition-colors duration-300 cursor-pointer flex items-center justify-center w-10 h-10"
              aria-label={`Visitar ${social.name}`}
            >
              {renderIcon(social)}
            </button>
          </Link>

          <AnimatePresence>
            {hovered === social.name && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className={`
                  absolute px-3 py-1.5 rounded-md bg-background/90 border border-border
                  text-primary text-sm font-medium shadow-lg z-20 whitespace-nowrap
                  ${direction === "top" ? "bottom-full mb-2" : ""}
                  ${direction === "bottom" ? "top-full mt-2" : ""}
                  ${direction === "left" ? "right-full mr-2" : ""}
                  ${direction === "right" ? "left-full ml-2" : ""}
                `}
              >
                {social.name}
                <span
                  className={`
                    absolute w-2 h-2 bg-background/90
                    ${direction === "top" ? "-bottom-1 left-1/2 -translate-x-1/2 rotate-45 border-r border-b border-border" : ""}
                    ${direction === "bottom" ? "-top-1 left-1/2 -translate-x-1/2 rotate-45 border-l border-t border-border" : ""}
                    ${direction === "left" ? "-right-1 top-1/2 -translate-y-1/2 rotate-45 border-t border-r border-border" : ""}
                    ${direction === "right" ? "-left-1 top-1/2 -translate-y-1/2 rotate-45 border-b border-l border-border" : ""}
                  `}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

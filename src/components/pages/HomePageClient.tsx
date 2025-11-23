"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import ProfileCard from "@/components/presence/PresenceCard";
import SocialLinks from "@/components/SocialLinks";
import Loading from "@/components/ui/loading";
import { usePresenceContext } from "@/providers/PresenceProvider";

export default function HomePageClient() {
  const { presence } = usePresenceContext();

  if (!presence) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4 w-full max-w-4xl">
      <Tilt
        className="w-full"
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        glareEnable={false}
      >
        <div className="bg-secondary/20 border border-border rounded-2xl shadow-xl p-8 w-full">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                {presence.pfp ? (
                  <Image
                    src={presence.pfp}
                    alt={`Avatar de ${presence._dn}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : null}
              </div>
            </div>

            <span className="text-2xl font-bold text-primary/75 mt-4 block">
              {presence._dn}
            </span>

            <SocialLinks />
          </div>

          {presence.activities.length > 0 && (
            <div className="border-t border-border pt-4">
              <ProfileCard
                presence={presence}
                date={new Date()}
                direction="top"
                span={1}
                delay={0}
              />
            </div>
          )}
        </div>
      </Tilt>
    </div>
  );
}

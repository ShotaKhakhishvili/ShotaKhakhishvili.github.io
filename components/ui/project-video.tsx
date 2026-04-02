"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface ProjectVideoProps {
  src?: string;
  poster: string;
  title: string;
  priority?: boolean;
  className?: string;
  videoClassName?: string;
}

export function ProjectVideo({ src, poster, title, priority = false, className, videoClassName }: ProjectVideoProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = Boolean(src) && !videoFailed;

  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-line bg-panel shadow-card", className)}>
      {showVideo ? (
        <video
          className={cn(
            "aspect-video w-full object-cover brightness-[0.96] transition duration-500 group-hover:scale-[1.03] group-hover:brightness-[1.04]",
            videoClassName
          )}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={poster}
          aria-label={title}
          onError={() => setVideoFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          className={cn(
            "aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]",
            videoClassName
          )}
          src={poster}
          alt={title}
          loading={priority ? "eager" : "lazy"}
        />
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
    </div>
  );
}

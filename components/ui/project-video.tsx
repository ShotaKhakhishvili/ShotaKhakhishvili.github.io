"use client";

import { useEffect, useState } from "react";

import { BunnyVideo } from "@/components/ui/bunny-video";
import { cn } from "@/lib/utils";

interface ProjectVideoProps {
  src?: string;
  poster: string;
  title: string;
  priority?: boolean;
  className?: string;
  videoClassName?: string;
  enableExpandedView?: boolean;
}

export function ProjectVideo({
  src,
  poster,
  title,
  priority = false,
  className,
  videoClassName,
  enableExpandedView = false
}: ProjectVideoProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const showVideo = Boolean(src) && !videoFailed;
  const canExpand = showVideo && enableExpandedView;

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  return (
    <>
      <div className={cn("group relative overflow-hidden rounded-xl border border-line bg-panel shadow-card", className)}>
        {showVideo ? (
          <BunnyVideo
            src={src}
            poster={poster}
            title={title}
            priority={priority}
            className={cn(
              "aspect-video w-full brightness-[0.96] transition duration-500 group-hover:scale-[1.03] group-hover:brightness-[1.04]",
              videoClassName
            )}
            preload={priority ? "auto" : "metadata"}
            onError={() => setVideoFailed(true)}
          />
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

        {canExpand ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="absolute right-3 top-3 inline-flex select-none items-center rounded-md border border-accent/45 bg-[#08192b]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#d8eeff] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100 hover:border-accent hover:text-white"
          >
            View Media
          </button>
        ) : null}

        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
      </div>

      {canExpand && expanded ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/68 px-5 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative w-[min(1100px,94vw)] overflow-hidden rounded-2xl border border-white/20 bg-[#08111c]/95 shadow-[0_36px_120px_-46px_rgba(0,0,0,0.98)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute right-3 top-3 z-10 inline-flex cursor-pointer select-none rounded-md border border-white/25 bg-black/55 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#d7e9fa] transition hover:border-accent/65 hover:text-white"
            >
              Close
            </button>

            <div className="relative">
              <BunnyVideo
                src={src}
                poster={poster}
                title={`${title} expanded preview`}
                className="aspect-video w-full"
                controls
                loop={false}
                muted={false}
                autoPlay={false}
                preload="metadata"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/76 via-black/18 to-transparent px-5 pb-4 pt-12">
                <p className="select-none text-sm font-semibold uppercase tracking-[0.16em] text-[#deedfb]">{title}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

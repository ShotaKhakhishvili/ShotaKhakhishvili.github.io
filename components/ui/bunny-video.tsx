"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";

import { resolveBunnySource } from "@/lib/bunny";
import { cn } from "@/lib/utils";

interface BunnyVideoProps {
  src?: string;
  poster?: string;
  title: string;
  containerClassName?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  priority?: boolean;
  active?: boolean;
  hoverPreview?: boolean;
  mp4Height?: 480 | 720 | 1080;
  onError?: () => void;
}

const canUseNativeHls = (video: HTMLVideoElement): boolean =>
  video.canPlayType("application/vnd.apple.mpegurl") !== "";

export function BunnyVideo({
  src,
  poster,
  title,
  containerClassName,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  preload = "metadata",
  priority = false,
  active = true,
  hoverPreview = false,
  mp4Height = 720,
  onError
}: BunnyVideoProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(priority);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const source = useMemo(() => resolveBunnySource(src, { mp4Height }), [mp4Height, src]);

  useEffect(() => {
    if (!hostRef.current || priority) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsNearViewport(entry?.isIntersecting ?? false);
      },
      {
        root: null,
        rootMargin: "240px 0px 240px 0px",
        threshold: 0.02
      }
    );

    observer.observe(hostRef.current);
    return () => {
      observer.disconnect();
    };
  }, [priority]);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source || !isNearViewport) {
      return;
    }

    let cancelled = false;

    const attachMp4Fallback = () => {
      if (!video || !source.mp4Url || cancelled) {
        return;
      }

      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      video.src = source.mp4Url;
      video.load();
    };

    if (source.kind === "file") {
      video.src = source.mp4Url ?? "";
      video.load();

      return () => {
        cancelled = true;
      };
    }

    if (canUseNativeHls(video) && source.hlsUrl) {
      video.src = source.hlsUrl;
      video.load();

      return () => {
        cancelled = true;
      };
    }

    if (Hls.isSupported() && source.hlsUrl) {
      const hls = new Hls({
        enableWorker: true
      });

      hlsRef.current = hls;
      hls.loadSource(source.hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) {
          return;
        }

        attachMp4Fallback();
      });

      return () => {
        cancelled = true;
        hls.destroy();
        if (hlsRef.current === hls) {
          hlsRef.current = null;
        }
      };
    }

    attachMp4Fallback();

    return () => {
      cancelled = true;
    };
  }, [isNearViewport, source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const shouldPlay = autoPlay && active && (!hoverPreview || isHovered) && isNearViewport;
    if (shouldPlay) {
      void video.play().catch(() => {
        // Autoplay failures are expected on some platforms.
      });
      return;
    }

    video.pause();
  }, [active, autoPlay, hoverPreview, isHovered, isNearViewport]);

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  if (!src) {
    return poster ? <img src={poster} alt={title} className={className} loading={priority ? "eager" : "lazy"} /> : null;
  }

  if (hasError) {
    return poster ? <img src={poster} alt={title} className={className} loading={priority ? "eager" : "lazy"} /> : null;
  }

  return (
    <div
      ref={hostRef}
      className={cn("relative h-full w-full", containerClassName)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        className={cn("h-full w-full object-cover", className)}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        preload={priority ? "auto" : preload}
        poster={poster}
        aria-label={title}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
      />
    </div>
  );
}
const BUNNY_EMBED_HOST = "player.mediadelivery.net";
const DEFAULT_BUNNY_PULL_ZONE_HOST = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE_HOST ?? "vz-eb6ec855-428.b-cdn.net";

export interface BunnySource {
  kind: "bunny" | "file";
  originalUrl: string;
  libraryId?: string;
  videoId?: string;
  pullZoneHost?: string;
  hlsUrl?: string;
  mp4Url?: string;
}

interface BunnyEmbedParts {
  libraryId: string;
  videoId: string;
}

export const isBunnyEmbedUrl = (value?: string): boolean => {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.hostname === BUNNY_EMBED_HOST && parsed.pathname.startsWith("/embed/");
  } catch {
    return false;
  }
};

const parseBunnyEmbedUrl = (value: string): BunnyEmbedParts | null => {
  if (!isBunnyEmbedUrl(value)) {
    return null;
  }

  const parsed = new URL(value);
  const segments = parsed.pathname.split("/").filter(Boolean);
  if (segments.length < 3) {
    return null;
  }

  const [, libraryId, videoId] = segments;
  if (!libraryId || !videoId) {
    return null;
  }

  return { libraryId, videoId };
};

interface ResolveBunnySourceOptions {
  pullZoneHost?: string;
  mp4Height?: 480 | 720 | 1080;
}

export const resolveBunnySource = (
  value?: string,
  options: ResolveBunnySourceOptions = {}
): BunnySource | null => {
  if (!value) {
    return null;
  }

  const embedParts = parseBunnyEmbedUrl(value);
  if (!embedParts) {
    return {
      kind: "file",
      originalUrl: value,
      mp4Url: value
    };
  }

  const pullZoneHost = (options.pullZoneHost ?? DEFAULT_BUNNY_PULL_ZONE_HOST).trim();
  const mp4Height = options.mp4Height ?? 720;
  const sanitizedHost = pullZoneHost.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  const baseUrl = `https://${sanitizedHost}/${embedParts.videoId}`;

  return {
    kind: "bunny",
    originalUrl: value,
    libraryId: embedParts.libraryId,
    videoId: embedParts.videoId,
    pullZoneHost: sanitizedHost,
    hlsUrl: `${baseUrl}/playlist.m3u8`,
    mp4Url: `${baseUrl}/play_${mp4Height}p.mp4`
  };
};
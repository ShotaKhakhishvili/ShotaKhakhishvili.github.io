import portfolioData from "@/data/portfolio.json";

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  video?: string;
  downloadUrl?: string;
  codeUrl?: string;
}

interface PortfolioSchema {
  profile: {
    email: string;
    social: {
      github: string;
      linkedin: string;
    };
  };
  projects: PortfolioProject[];
}

export interface ProjectLinks {
  repo?: string;
  demo?: string;
}

export type PriorityTier = "hero" | "pinned" | "marquee" | "supporting";

export type LayoutMode = "pinned" | "split" | "offset" | "alternating";

export type EntrySide = "left" | "right";

export type MediaType = "video" | "image";

export interface ProjectPresentation {
  priorityTier: PriorityTier;
  layoutMode: LayoutMode;
  entrySide: EntrySide;
  mediaType: MediaType;
  pinnedStoryEligible: boolean;
  narrativeOrder: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  shortSummary: string;
  compactBullets: string[];
  tags: string[];
  video?: string;
  image: string;
  links: ProjectLinks;
  presentation: ProjectPresentation;
}

export type CinematicProject = Project;

export interface CoreSignal {
  title: string;
  text: string;
}

export interface ContactLink {
  label: "Email" | "GitHub" | "LinkedIn";
  href: string;
}

export interface FloatingProjectCard {
  slug: string;
  title: string;
  video?: string;
  image: string;
}

const portfolio = portfolioData as PortfolioSchema;

const copyOverrides: Record<string, { shortSummary: string; compactBullets?: string[] }> = {
  "Procedural Terrain System": {
    shortSummary: "Multithreaded terrain generation system with chunk-based streaming.",
    compactBullets: [
      "background thread generation",
      "chunk loading/unloading",
      "runtime performance considerations",
      "modular system structure"
    ]
  },
  "UE5 Data Table Query Plugin": {
    shortSummary: "UE5 C++ plugin project for SQL-style querying of gameplay data tables.",
    compactBullets: [
      "schema-aware query API",
      "Blueprint integration layer",
      "decoupled data access logic"
    ]
  },
  "KIU Infinite Runner (Custom Engine)": {
    shortSummary: "Custom C++ and OpenGL runner project with a public Wolf Runner playable release.",
    compactBullets: [
      "separate simulation and rendering loops",
      "instanced rendering pipeline",
      "released demo build"
    ]
  },
  "ISS Cupola Simulator (NASA Space Apps)": {
    shortSummary: "Zero-gravity UE5 simulation project built for NASA Space Apps with Pixel Streaming demo support.",
    compactBullets: [
      "input abstraction system",
      "low-gravity object interaction",
      "Pixel Streaming demo setup"
    ]
  },
  "PropGenie (3D Renovation Simulator)": {
    shortSummary: "UE5 renovation simulator prototype with runtime asset placement and material editing.",
    compactBullets: [
      "UI-driven asset spawning",
      "runtime material swapping",
      "data-bound property controls"
    ]
  },
  "ML Self-Taught Cars": {
    shortSummary: "UE5 machine-learning driving prototype for testing reward shaping and control policies.",
    compactBullets: [
      "sensor-to-control training loop",
      "reward function experimentation",
      "runtime telemetry feedback"
    ]
  },
  "Goat Ate Vineyard (Global Game Jam)": {
    shortSummary: "Game jam prototype built around a transformation state machine and form-based abilities.",
    compactBullets: [
      "form-specific ability rules",
      "state transition logic",
      "progression constraint handling"
    ]
  },
  Trapshooter: {
    shortSummary: "Arcade shooter prototype focused on input timing and combat feedback loops.",
    compactBullets: [
      "low-latency input mapping",
      "hit and recoil feedback",
      "iterative combat loop tuning"
    ]
  },
  "Bending Simulator": {
    shortSummary: "Elemental combat prototype with chained ability states and resource gating.",
    compactBullets: [
      "ability state chaining",
      "resource consumption rules",
      "combat flow testing"
    ]
  },
  "Survival Game": {
    shortSummary: "Survival gameplay prototype with crafting progression and resource management systems.",
    compactBullets: [
      "crafting recipe system",
      "resource collection loop",
      "progression state tracking"
    ]
  },
  "Subway Surfers Remake": {
    shortSummary: "Runner remake prototype with lane switching, obstacle spawning, and movement timing.",
    compactBullets: [
      "lane transition handling",
      "procedural obstacle flow",
      "forward-movement timing control"
    ]
  },
  "Bend It All": {
    shortSummary: "Physics gameplay prototype centered on environmental manipulation and constraint-based interaction.",
    compactBullets: [
      "physics constraint linking",
      "dynamic object interaction",
      "sandbox rule prototyping"
    ]
  }
};

type CurationInput = {
  priorityTier: PriorityTier;
  layoutMode: LayoutMode;
  entrySide: EntrySide;
  pinnedStoryEligible: boolean;
  narrativeOrder: number;
};

const curatedPresentationByTitle: Record<string, CurationInput> = {
  "Procedural Terrain System": {
    priorityTier: "hero",
    layoutMode: "pinned",
    entrySide: "left",
    pinnedStoryEligible: true,
    narrativeOrder: 1
  },
  "KIU Infinite Runner (Custom Engine)": {
    priorityTier: "pinned",
    layoutMode: "pinned",
    entrySide: "right",
    pinnedStoryEligible: true,
    narrativeOrder: 2
  },
  "UE5 Data Table Query Plugin": {
    priorityTier: "pinned",
    layoutMode: "pinned",
    entrySide: "left",
    pinnedStoryEligible: true,
    narrativeOrder: 3
  },
  "PropGenie (3D Renovation Simulator)": {
    priorityTier: "marquee",
    layoutMode: "offset",
    entrySide: "right",
    pinnedStoryEligible: false,
    narrativeOrder: 6
  },
  "ISS Cupola Simulator (NASA Space Apps)": {
    priorityTier: "marquee",
    layoutMode: "split",
    entrySide: "left",
    pinnedStoryEligible: false,
    narrativeOrder: 5
  },
  "ML Self-Taught Cars": {
    priorityTier: "marquee",
    layoutMode: "offset",
    entrySide: "right",
    pinnedStoryEligible: false,
    narrativeOrder: 7
  },
  "Goat Ate Vineyard (Global Game Jam)": {
    priorityTier: "marquee",
    layoutMode: "alternating",
    entrySide: "left",
    pinnedStoryEligible: false,
    narrativeOrder: 8
  },
  Trapshooter: {
    priorityTier: "supporting",
    layoutMode: "alternating",
    entrySide: "right",
    pinnedStoryEligible: false,
    narrativeOrder: 9
  },
  "Bending Simulator": {
    priorityTier: "supporting",
    layoutMode: "offset",
    entrySide: "left",
    pinnedStoryEligible: false,
    narrativeOrder: 10
  },
  "Survival Game": {
    priorityTier: "supporting",
    layoutMode: "alternating",
    entrySide: "right",
    pinnedStoryEligible: false,
    narrativeOrder: 11
  },
  "Subway Surfers Remake": {
    priorityTier: "supporting",
    layoutMode: "alternating",
    entrySide: "left",
    pinnedStoryEligible: false,
    narrativeOrder: 12
  },
  "Bend It All": {
    priorityTier: "supporting",
    layoutMode: "offset",
    entrySide: "left",
    pinnedStoryEligible: false,
    narrativeOrder: 13
  }
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const bunnyEmbedBySlug: Record<string, string> = {
  "bending-simulator": "https://player.mediadelivery.net/embed/630899/42b4a128-290f-446f-918c-c76bbbc1e155?autoplay=true&loop=true&muted=true&preload=true",
  "bend-it-all": "https://player.mediadelivery.net/embed/630899/a7c2e8d3-087c-42e8-8a52-0daed94263e7?autoplay=true&loop=true&muted=true&preload=true",
  "kiu-infinite-runner": "https://player.mediadelivery.net/embed/630899/6571dae3-6292-4931-8cce-e5f0bb1d4de2?autoplay=true&loop=true&muted=true&preload=true",
  "ue5-data-table-query-plugin": "https://player.mediadelivery.net/embed/630899/fb742e61-e5e0-450c-98bc-e43f8fa28aca?autoplay=true&loop=true&muted=true&preload=true",
  trapshooter: "https://player.mediadelivery.net/embed/630899/d656878a-5591-4d10-8eea-d1e9dbf3085c?autoplay=true&loop=true&muted=true&preload=true",
  "survival-game": "https://player.mediadelivery.net/embed/630899/1dd02ed7-cc49-491b-8542-f7588246f301?autoplay=true&loop=true&muted=true&preload=true",
  "subway-surfers-remake": "https://player.mediadelivery.net/embed/630899/26abce00-0c46-4562-a517-eeb22793baf1?autoplay=true&loop=true&muted=true&preload=true",
  "procedural-terrain-system": "https://player.mediadelivery.net/embed/630899/48315161-13fb-45ce-b04f-8419f74532f9?autoplay=true&loop=true&muted=true&preload=true",
  "ml-self-taught-cars": "https://player.mediadelivery.net/embed/630899/d10358a6-36f4-4a2e-a6ab-f07000b336e4?autoplay=true&loop=true&muted=true&preload=true",
  propgenie: "https://player.mediadelivery.net/embed/630899/2193fc56-9546-41e4-815d-98da86e7f06f?autoplay=true&loop=true&muted=true&preload=true",
  "goat-ate-vineyard": "https://player.mediadelivery.net/embed/630899/8307ac58-84ee-4c5f-87a9-c106b021e7ef?autoplay=true&loop=true&muted=true&preload=true",
  "iss-cupola-simulator": "https://player.mediadelivery.net/embed/630899/5edbb804-448e-478c-af11-bdd3530480e8?autoplay=true&loop=true&muted=true&preload=true"
};

const toOneSentence = (value: string): string => {
  const sentence = value.split(/[.!?]/)[0]?.trim() ?? value.trim();
  if (sentence.length <= 96) {
    return sentence;
  }

  return `${sentence.slice(0, 93).trimEnd()}...`;
};

const resolvePresentation = (project: PortfolioProject): ProjectPresentation => {
  const configured = curatedPresentationByTitle[project.title];
  if (configured) {
    return {
      ...configured,
      mediaType: project.video ? "video" : "image"
    };
  }

  return {
    priorityTier: "supporting",
    layoutMode: "alternating",
    entrySide: project.id % 2 === 0 ? "left" : "right",
    mediaType: project.video ? "video" : "image",
    pinnedStoryEligible: false,
    narrativeOrder: 1000 + project.id
  };
};

const normalizeProject = (project: PortfolioProject): Project => {
  const override = copyOverrides[project.title];
  const presentation = resolvePresentation(project);
  const slug = toSlug(project.title);
  const bunnyEmbed = bunnyEmbedBySlug[slug];

  return {
    id: project.id,
    slug,
    title: project.title,
    shortSummary: override?.shortSummary ?? toOneSentence(project.description),
    compactBullets: override?.compactBullets ?? [],
    tags: project.tags,
    video: presentation.mediaType === "video" && project.video ? bunnyEmbed ?? `/videos/${project.video}` : undefined,
    image: `/images/${project.thumbnail}`,
    links: {
      repo: project.codeUrl,
      demo: project.downloadUrl
    },
    presentation
  };
};

export const heroChips: readonly string[] = ["UE5", "C++", "Gameplay Systems", "Plugins", "Multithreading", "Rendering"];

export const heroValueStatement =
  "Building modular gameplay systems, plugins, and runtime features in UE5 and C++.";

export const projects: Project[] = portfolio.projects
  .map(normalizeProject)
  .sort((a, b) => a.presentation.narrativeOrder - b.presentation.narrativeOrder);

export const pinnedStoryProjects: Project[] = projects.filter((project) => project.presentation.pinnedStoryEligible);

export const featuredProject: Project =
  projects.find((project) => project.presentation.priorityTier === "hero") ?? pinnedStoryProjects[0] ?? projects[0];

export const heroProject: Project = featuredProject;

export const heroBackgroundVideo = featuredProject.video;

export const floatingHeroCards: FloatingProjectCard[] = projects
  .filter((project) => project.slug !== featuredProject.slug)
  .slice(0, 5)
  .map((project) => ({
    slug: project.slug,
    title: project.title,
    video: project.video,
    image: project.image
  }));

export const cinematicProjects: CinematicProject[] = projects.filter((project) => !project.presentation.pinnedStoryEligible);

export const marqueeCinematicProjects: CinematicProject[] = cinematicProjects.filter(
  (project) => project.presentation.priorityTier === "marquee"
);

export const supportingCinematicProjects: CinematicProject[] = cinematicProjects.filter(
  (project) => project.presentation.priorityTier === "supporting"
);

export const selectedProjects: Project[] = projects
  .filter((project) => project.slug !== featuredProject.slug);

export const coreSignals: CoreSignal[] = [
  { title: "UE5 Gameplay Systems", text: "Runtime-focused implementation." },
  { title: "C++ Architecture", text: "Modular ownership and extensibility." },
  { title: "Plugins and Tooling", text: "Reusable editor and runtime modules." },
  { title: "Multithreading", text: "Async work for heavy world logic." },
  { title: "Rendering Fundamentals", text: "Engine and OpenGL rendering experiments." }
];

export const contactLinks: ContactLink[] = [
  { label: "Email", href: `mailto:${portfolio.profile.email}` },
  { label: "GitHub", href: portfolio.profile.social.github },
  { label: "LinkedIn", href: portfolio.profile.social.linkedin }
];

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

const portfolio = portfolioData as PortfolioSchema;

const copyOverrides: Record<string, { shortSummary: string; compactBullets?: string[] }> = {
  "Procedural Surface Generation": {
    shortSummary: "Chunked UE5 terrain runtime built for deterministic streaming and stable frame time.",
    compactBullets: [
      "Async generation queues keep heavy mesh work off the game thread.",
      "Spatial partitioning plus LOD policy stabilizes traversal frame time."
    ]
  },
  "UE5 Data Table Query Plugin": {
    shortSummary: "UE5 C++ plugin that adds SQL-style data queries without gameplay-table coupling.",
    compactBullets: [
      "C++ modules preserve Blueprint ergonomics with schema-aware query APIs.",
      "Data abstraction isolates query execution from gameplay systems."
    ]
  },
  "KIU Infinite Runner (Custom Engine)": {
    shortSummary: "Custom C++ and OpenGL runtime tuned for stable spawn, simulation, and render loops.",
    compactBullets: [
      "Module boundaries separate simulation, rendering, and gameplay update paths.",
      "Instanced rendering strategy maintains pacing during continuous spawning."
    ]
  },
  "ISS Cupola Simulator (NASA Space Apps)": {
    shortSummary: "Zero-gravity interaction simulator shipped under strict pixel-streaming constraints.",
    compactBullets: [
      "Input abstraction supports multiple interaction modes without control coupling.",
      "Runtime object interaction loops tuned for stable manipulation behavior."
    ]
  },
  "PropGenie (3D Renovation Simulator)": {
    shortSummary: "Real-time renovation tool with data-bound spawning and live material state updates.",
    compactBullets: [
      "Data-bound controls update object properties in real time.",
      "Dynamic material and asset hooks keep iteration fast for design passes."
    ]
  },
  "ML Self-Taught Cars": {
    shortSummary: "UE5 ML training loop for autonomous driving behavior and reward tuning.",
    compactBullets: ["Runtime feedback loop links sensor state to policy updates."]
  },
  "Goat Ate Vineyard (Global Game Jam)": {
    shortSummary: "Transformation-state gameplay system where each form changes available abilities.",
    compactBullets: ["Counter-progression rules enforce clear system-level interaction logic."]
  },
  Trapshooter: {
    shortSummary: "Arcade shooter prototype focused on input latency, feedback timing, and loop clarity."
  },
  "Bending Simulator": {
    shortSummary: "Elemental combat prototype with chained ability states and controlled resource flow."
  },
  "Survival Game": {
    shortSummary: "UE5 survival systems prototype with crafting, progression, and resource loops."
  },
  "Subway Surfers Remake": {
    shortSummary: "Constant-forward runner remake with tuned lane-switch response and traversal pacing."
  },
  "Bend It All": {
    shortSummary: "Physics-driven environment control sandbox built around dynamic object constraints."
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
  "Procedural Surface Generation": {
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

  return {
    id: project.id,
    slug: toSlug(project.title),
    title: project.title,
    shortSummary: override?.shortSummary ?? toOneSentence(project.description),
    compactBullets: override?.compactBullets ?? [],
    tags: project.tags,
    video: presentation.mediaType === "video" && project.video ? `/videos/${project.video}` : undefined,
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
  "UE5 C++ systems for stable frame time, modular architecture, and fast shipping.";

export const projects: Project[] = portfolio.projects
  .map(normalizeProject)
  .sort((a, b) => a.presentation.narrativeOrder - b.presentation.narrativeOrder);

export const pinnedStoryProjects: Project[] = projects.filter((project) => project.presentation.pinnedStoryEligible);

export const featuredProject: Project =
  projects.find((project) => project.presentation.priorityTier === "hero") ?? pinnedStoryProjects[0] ?? projects[0];

export const heroProject: Project = featuredProject;

export const cinematicProjects: CinematicProject[] = projects.filter((project) => !project.presentation.pinnedStoryEligible);

export const marqueeCinematicProjects: CinematicProject[] = cinematicProjects.filter(
  (project) => project.presentation.priorityTier === "marquee"
);

export const supportingCinematicProjects: CinematicProject[] = cinematicProjects.filter(
  (project) => project.presentation.priorityTier === "supporting"
);

export const coreSignals: CoreSignal[] = [
  { title: "UE5 Systems", text: "Deterministic gameplay frameworks." },
  { title: "C++ Architecture", text: "Clean modules, strong ownership." },
  { title: "Plugins", text: "Reusable engine-side tooling." },
  { title: "Multithreading", text: "Stable frame-time under load." },
  { title: "Rendering", text: "Practical real-time pipeline control." },
  { title: "Shippable Gameplay", text: "Fast iteration to playable builds." }
];

export const contactLinks: ContactLink[] = [
  { label: "Email", href: `mailto:${portfolio.profile.email}` },
  { label: "GitHub", href: portfolio.profile.social.github },
  { label: "LinkedIn", href: portfolio.profile.social.linkedin }
];

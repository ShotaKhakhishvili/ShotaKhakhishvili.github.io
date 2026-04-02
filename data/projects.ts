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

export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  tags: string[];
  video?: string;
  image: string;
  links: ProjectLinks;
}

export interface CinematicProject extends Project {
  entry: "left" | "right";
  width: "narrow" | "wide";
}

export interface CoreSignal {
  title: string;
  text: string;
}

export interface ContactLink {
  label: "Email" | "GitHub" | "LinkedIn";
  href: string;
}

const portfolio = portfolioData as PortfolioSchema;

const copyOverrides: Record<string, { summary: string; bullets?: string[] }> = {
  "Procedural Surface Generation": {
    summary: "Chunked UE5 terrain runtime built for deterministic streaming and stable frame time.",
    bullets: [
      "Async generation queues keep heavy mesh work off the game thread.",
      "Spatial partitioning plus LOD policy stabilizes traversal frame time."
    ]
  },
  "UE5 Data Table Query Plugin": {
    summary: "UE5 C++ plugin that adds SQL-style data queries without gameplay-table coupling.",
    bullets: [
      "C++ modules preserve Blueprint ergonomics with schema-aware query APIs.",
      "Data abstraction isolates query execution from gameplay systems."
    ]
  },
  "KIU Infinite Runner (Custom Engine)": {
    summary: "Custom C++ and OpenGL runtime tuned for stable spawn, simulation, and render loops.",
    bullets: [
      "Module boundaries separate simulation, rendering, and gameplay update paths.",
      "Instanced rendering strategy maintains pacing during continuous spawning."
    ]
  },
  "ISS Cupola Simulator (NASA Space Apps)": {
    summary: "Zero-gravity interaction simulator shipped under strict pixel-streaming constraints.",
    bullets: [
      "Input abstraction supports multiple interaction modes without control coupling.",
      "Runtime object interaction loops tuned for stable manipulation behavior."
    ]
  },
  PropGenie: {
    summary: "Real-time renovation tool with data-bound spawning and live material state updates.",
    bullets: [
      "Data-bound controls update object properties in real time.",
      "Dynamic material and asset hooks keep iteration fast for design passes."
    ]
  },
  "ML Self-Taught Cars": {
    summary: "UE5 ML training loop for autonomous driving behavior and reward tuning.",
    bullets: ["Runtime feedback loop links sensor state to policy updates."]
  },
  "Goat Ate Vineyard (Global Game Jam)": {
    summary: "Transformation-state gameplay system where each form changes available abilities.",
    bullets: ["Counter-progression rules enforce clear system-level interaction logic."]
  },
  Trapshooter: {
    summary: "Arcade shooter prototype focused on input latency, feedback timing, and loop clarity."
  },
  "Bending Simulator": {
    summary: "Elemental combat prototype with chained ability states and controlled resource flow."
  },
  "Survival Game": {
    summary: "UE5 survival systems prototype with crafting, progression, and resource loops."
  },
  "Subway Surfers Remake": {
    summary: "Constant-forward runner remake with tuned lane-switch response and traversal pacing."
  },
  "Bend It All": {
    summary: "Physics-driven environment control sandbox built around dynamic object constraints."
  }
};

const pinnedTitles = new Set([
  "Procedural Surface Generation",
  "KIU Infinite Runner (Custom Engine)",
  "UE5 Data Table Query Plugin",
  "PropGenie"
]);

const pinnedTitleOrder = [
  "Procedural Surface Generation",
  "KIU Infinite Runner (Custom Engine)",
  "UE5 Data Table Query Plugin",
  "PropGenie"
] as const;

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

const normalizeProject = (project: PortfolioProject): Project => {
  const override = copyOverrides[project.title];

  return {
    id: project.id,
    slug: toSlug(project.title),
    title: project.title,
    summary: override?.summary ?? toOneSentence(project.description),
    bullets: override?.bullets ?? [],
    tags: project.tags,
    video: project.video ? `/videos/${project.video}` : undefined,
    image: `/images/${project.thumbnail}`,
    links: {
      repo: project.codeUrl,
      demo: project.downloadUrl
    }
  };
};

export const heroChips: readonly string[] = ["UE5", "C++", "Gameplay Systems", "Plugins", "Multithreading", "Rendering"];

export const heroValueStatement =
  "UE5 C++ systems for stable frame time, modular architecture, and fast shipping.";

export const projects: Project[] = portfolio.projects.map(normalizeProject);

export const pinnedStoryProjects: Project[] = pinnedTitleOrder
  .map((title) => projects.find((project) => project.title === title))
  .filter((project): project is Project => Boolean(project));

export const featuredProject: Project = pinnedStoryProjects[0] ?? projects[0];

export const heroProject: Project = featuredProject;

export const cinematicProjects: CinematicProject[] = projects
  .filter((project) => !pinnedTitles.has(project.title))
  .map((project, index) => ({
    ...project,
    entry: index % 2 === 0 ? "left" : "right",
    width: index % 3 === 0 ? "wide" : "narrow"
  }));

export const coreSignals: CoreSignal[] = [
  { title: "Systems First", text: "Gameplay architecture with deterministic runtime behavior." },
  { title: "C++ Depth", text: "Engine-facing module design with clean ownership boundaries." },
  { title: "Plugin Mindset", text: "Reusable tooling built to scale beyond single prototypes." },
  { title: "Frame-Time Discipline", text: "Threading and rendering decisions measured against stability." }
];

export const contactLinks: ContactLink[] = [
  { label: "Email", href: `mailto:${portfolio.profile.email}` },
  { label: "GitHub", href: portfolio.profile.social.github },
  { label: "LinkedIn", href: portfolio.profile.social.linkedin }
];

export type ProjectTag =
  | "UE5"
  | "C++"
  | "Systems"
  | "Plugin"
  | "Multithreading"
  | "Rendering"
  | "Gameplay"
  | "Simulation"
  | "Performance"
  | "OpenGL";

export interface ProjectLinks {
  repo?: string;
  demo?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  tags: ProjectTag[];
  video?: string;
  image: string;
  featured: boolean;
  links: ProjectLinks;
}

export interface CoreSignal {
  title: string;
  text: string;
}

export interface ContactLink {
  label: "Email" | "GitHub" | "LinkedIn";
  href: string;
}

export const heroChips: readonly string[] = [
  "UE5",
  "C++",
  "Plugins",
  "Systems",
  "Multithreading",
  "Rendering"
];

export const heroValueStatement =
  "Modular, data-driven gameplay architecture with multithreaded runtime systems, plugin tooling, and performance-focused rendering decisions.";

export const projects: Project[] = [
  {
    slug: "procedural-surface-generation",
    title: "Procedural Surface Generation",
    summary:
      "Data-driven procedural terrain runtime engineered for deterministic updates and stable frame time under continuous world streaming.",
    bullets: [
      "Chunk-based terrain architecture with spatial partitioning and predictable region invalidation.",
      "Multithreaded generation queues that offload heavy mesh work from the game thread.",
      "LOD and memory strategy tuned for sustained traversal without hitch-heavy transitions.",
      "Rendering update path designed for consistent mesh/material pass behavior during streaming churn."
    ],
    tags: ["UE5", "C++", "Systems", "Multithreading", "Performance", "Rendering"],
    video: "/videos/ProceduralSurface.mp4",
    image: "/images/pic_ProceduralSurface.png",
    featured: true,
    links: {
      repo: "https://github.com/ShotaKhakhishvili/Procedural-Surface-Terrain-Generation"
    }
  },
  {
    slug: "ue5-data-query-plugin",
    title: "UE5 Data Table Query Plugin",
    summary:
      "UE5 plugin architecture that exposes SQL-like data access while keeping gameplay systems decoupled from table-specific logic.",
    bullets: [
      "C++ plugin modules provide data-query APIs while preserving Blueprint ergonomics.",
      "Data abstraction layer isolates runtime query execution from gameplay systems.",
      "Schema-aware serialization and query routing keep tooling scalable across feature teams."
    ],
    tags: ["UE5", "C++", "Plugin", "Systems"],
    video: "/videos/UE_SQL.mp4",
    image: "/images/pic_UE_SQL.png",
    featured: false,
    links: {
      repo: "https://github.com/ShotaKhakhishvili/UE5-Data-Query-System"
    }
  },
  {
    slug: "kiu-infinite-runner-custom-engine",
    title: "KIU Infinite Runner (Custom Engine)",
    summary:
      "Custom C++/OpenGL runtime with modular gameplay, simulation, and rendering subsystems built for sustained high-frequency update loops.",
    bullets: [
      "Engine-side module boundaries separate render path, simulation update, and gameplay loop logic.",
      "Instanced rendering and draw-call discipline keep frame pacing stable during continuous spawning.",
      "Tooling-oriented asset and scene flow supports rapid iteration without coupling gameplay logic to render internals."
    ],
    tags: ["C++", "OpenGL", "Systems", "Rendering", "Performance"],
    video: "/videos/WolfRunner.mp4",
    image: "/images/pic_WolfRunner.png",
    featured: false,
    links: {
      repo: "https://github.com/ShotaKhakhishvili/KIU_ClubEngine"
    }
  },
  {
    slug: "iss-cupola-simulator",
    title: "ISS Cupola Simulator",
    summary:
      "Simulation-focused interaction runtime with zero-gravity controls and deployment-grade behavior under pixel-streamed constraints.",
    bullets: [
      "Input abstraction supports simulation interactions without coupling to one camera/control mode.",
      "Runtime interaction systems prioritize stable behavior for object manipulation and scanning loops.",
      "Pixel-streamed delivery constraints shaped performance budgets and systems architecture from the first implementation pass."
    ],
    tags: ["UE5", "C++", "Simulation", "Systems"],
    video: "/videos/Cupola.mp4",
    image: "/images/pic_Cupola.png",
    featured: false,
    links: {
      repo: "https://github.com/ShotaKhakhishvili/BeyondTheWindow"
    }
  }
];

export const featuredProject: Project = projects.find((project) => project.featured) ?? projects[0];

export const selectedProjects: Project[] = projects.filter((project) => !project.featured);

export const coreSignals: CoreSignal[] = [
  {
    title: "UE5 Gameplay Systems",
    text: "State-driven gameplay architecture built for deterministic behavior, rapid iteration, and runtime stability."
  },
  {
    title: "C++ Architecture",
    text: "Runtime-first C++ boundaries across gameplay logic, data flow, and engine-facing systems code."
  },
  {
    title: "Plugins & Tooling",
    text: "Reusable UE5 plugin modules and tooling pipelines that reduce duplication and accelerate systems delivery."
  },
  {
    title: "Multithreaded Runtime Work",
    text: "Multithreaded workload pipelines that keep frame pacing predictable under heavy generation and simulation updates."
  },
  {
    title: "Rendering / Engine Fundamentals",
    text: "Practical command of rendering cost, LOD strategy, memory pressure, and GPU-aware runtime tradeoffs."
  },
  {
    title: "Rapid Playable Prototyping",
    text: "Rapid playable prototypes that validate gameplay architecture and systems decisions before full production investment."
  }
];

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:shota.khakhishvili@gmail.com" },
  { label: "GitHub", href: "https://github.com/shotakhakhishvili" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shota-khakhishvili-a544b2325/" }
];

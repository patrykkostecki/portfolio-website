export type SkillCategory = {
  id: "frontend" | "mobile" | "backend" | "tools" | "automation" | "games";
  items: SkillItem[];
};

export type SkillItem = {
  id: SkillId;
  label: string;
};

export type SkillId =
  | "nextjs"
  | "javascript"
  | "htmlcss"
  | "flutter"
  | "dart"
  | "sql"
  | "firebase"
  | "pythonPandas"
  | "git"
  | "github"
  | "linux"
  | "bash"
  | "jupyter"
  | "androidStudio"
  | "bluePrism"
  | "uiPath"
  | "webGames"
  | "mobileGames";

export type ExperienceItem = {
  id: "capgemini" | "alvernia";
  company: string;
  period: string;
};

export const profile = {
  name: "Patryk Kostecki",
  title: "Full-Stack Developer (Next.js) + Flutter",
  location: "Poland",
  email: "patrykkos12@gmail.com",
  github: "https://github.com/patrykkostecki",
  linkedin: "https://www.linkedin.com/in/patryk-kostecki-2031752b3",
  calendly: "",
} as const;

export const skills: SkillCategory[] = [
  {
    id: "frontend",
    items: [
      { id: "nextjs", label: "Next.js" },
      { id: "javascript", label: "JavaScript" },
      { id: "htmlcss", label: "HTML/CSS" },
    ],
  },
  {
    id: "mobile",
    items: [
      { id: "flutter", label: "Flutter" },
      { id: "dart", label: "Dart" },
    ],
  },
  {
    id: "backend",
    items: [
      { id: "sql", label: "SQL" },
      { id: "firebase", label: "Firebase" },
      { id: "pythonPandas", label: "Python (Pandas)" },
    ],
  },
  {
    id: "tools",
    items: [
      { id: "git", label: "Git" },
      { id: "github", label: "GitHub" },
      { id: "linux", label: "Linux" },
      { id: "bash", label: "Bash" },
      { id: "jupyter", label: "Jupyter" },
      { id: "androidStudio", label: "Android Studio" },
    ],
  },
  {
    id: "automation",
    items: [
      { id: "bluePrism", label: "Blue Prism (AD01)" },
      { id: "uiPath", label: "UiPath" },
    ],
  },
  {
    id: "games",
    items: [
      { id: "webGames", label: "Gry Webowe" },
      { id: "mobileGames", label: "Gry Mobilne" },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "capgemini",
    company: "Capgemini",
    period: "06/2024 - 11/2025",
  },
  {
    id: "alvernia",
    company: "Alvernia Planet",
    period: "12/2025 - Present",
  },
];

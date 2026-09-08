import type { Metadata } from "next";

import { ProjectsIndex } from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Realizacje — pk.dev | Patryk Kostecki",
  description: "Zrealizowane projekty: strona Alvernia Planet, aplikacja MarsApp na iOS i gra 2D tadzik28.pl.",
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}

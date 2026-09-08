import type { Metadata } from "next";

import { ProjectDetail } from "@/components/ProjectDetail";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Realizacja — pk.dev" };
  return {
    title: `${project.title} — pk.dev | Patryk Kostecki`,
    description: project.summary.pl,
    openGraph: {
      title: `${project.title} — pk.dev`,
      description: project.summary.pl,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}

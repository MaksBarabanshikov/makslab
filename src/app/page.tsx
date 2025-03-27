import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero-section";
import { ProjectsSection } from "@/widgets/projects-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header/>
      <HeroSection />
      <ProjectsSection />
    </main>
  )
}

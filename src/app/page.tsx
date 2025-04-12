import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero-section";
import { ProjectsSection } from "@/widgets/projects-section";
import FortuneWheel from "@/widgets/wheel/FortuneWheel";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header/>
      <HeroSection />
      <ProjectsSection />
      <FortuneWheel/>
    </main>
  )
}

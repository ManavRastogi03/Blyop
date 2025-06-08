import React, { useEffect, useState } from "react"
import HeroSection from "./HeroSection"
import FeaturesSection from "./FeaturesSection"
import CardBuilderSection from "./CardBuilderSection"
import LivePreviewSection from "./LivePreviewSection"
import ConnectShareSection from "./ConnectShareSection"
import DashboardSection from "./DashboardSection"
import CTASection from "./CTASection"

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0)
  const features = ["Creator", "Entrepreneur", "Student", "Freelancer"]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection activeFeature={activeFeature} features={features} />
        <CardBuilderSection />
        <LivePreviewSection />
        <ConnectShareSection />
        <DashboardSection />
        <CTASection />
      </main>
    </div>
  )
}

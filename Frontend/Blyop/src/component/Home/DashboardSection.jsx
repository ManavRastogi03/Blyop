import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Zap } from "react-feather"  // assume icons are imported like this

function Badge({ filled, children }) {
  return (
    <div
      className={`aspect-square rounded-lg ${
        filled
          ? "bg-gradient-to-br from-neon-green/20 to-futuristic-blue/20 flex items-center justify-center"
          : "bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-white/30"
      }`}
    >
      {filled ? children : <span className="text-xl">?</span>}
    </div>
  )
}

export default function DashboardSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.2 })[0]

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="dashboard" className="py-24 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-6">
            Track Your <span className="text-neon-green">Growth</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/70 text-xl max-w-3xl mx-auto"
          >
            Our gamified dashboard helps you track your progress and unlock rewards as you grow
            your network
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-futuristic-blue/20 rounded-xl blur-md" />
          <div className="relative bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <h3 className="text-2xl font-bold">Dashboard</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Profile Views", value: "1,248", width: "w-3/4" },
                    { label: "Link Clicks", value: "384", width: "w-1/2" },
                    { label: "QR Scans", value: "96", width: "w-1/4" }
                  ].map(({ label, value, width }, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-lg p-6"
                    >
                      <p className="text-white/70 text-lg">{label}</p>
                      <p className="text-3xl font-bold mt-2">{value}</p>
                      <div className="h-2 w-full bg-white/10 rounded-full mt-4">
                        <div
                          className={`h-2 bg-gradient-to-r from-neon-green to-futuristic-blue rounded-full ${width}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                  <h4 className="text-xl font-bold mb-6">Weekly Activity</h4>
                  <div className="h-60 flex items-end gap-3">
                    {[30, 45, 25, 60, 75, 50, 40].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-neon-green/50 to-futuristic-blue/50 rounded-t-sm"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-base text-white/50">
                          {["M", "T", "W", "T", "F", "S", "S"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                  <h4 className="text-xl font-bold mb-6">Top Referrers</h4>
                  <div className="space-y-4">
                    {[
                      { source: "Instagram", percentage: 45 },
                      { source: "LinkedIn", percentage: 30 },
                      { source: "Direct QR", percentage: 15 },
                      { source: "Other", percentage: 10 }
                    ].map(({ source, percentage }, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">{source}</span>
                          <span className="font-bold">{percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full">
                          <div
                            className="h-2 bg-gradient-to-r from-neon-green to-futuristic-blue rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                  <h4 className="text-xl font-bold mb-6">Blyop Score</h4>
                  <div className="relative h-40 w-40 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-8 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-8 border-t-neon-green border-r-futuristic-blue border-b-transparent border-l-transparent animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">78</span>
                    </div>
                  </div>
                  <p className="text-center text-white/70 text-lg">Great progress! Keep going.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                  <h4 className="text-xl font-bold mb-6">Badges</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <Badge filled>
                      <Award size={32} />
                    </Badge>
                    <Badge filled>
                      <Zap size={32} />
                    </Badge>
                    <Badge />
                    <Badge />
                    <Badge />
                    <Badge />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                  <h4 className="text-xl font-bold mb-6">Rewards</h4>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: "Premium Theme", desc: "Unlocked at 100 views", unlocked: true },
                      { id: 2, title: "Custom Animation", desc: "Unlock at 250 views", unlocked: false },
                      { id: 3, title: "Analytics Pro", desc: "Unlock at 500 views", unlocked: false }
                    ].map(({ id, title, desc, unlocked }) => (
                      <div key={id} className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            unlocked
                              ? "bg-gradient-to-r from-neon-green to-futuristic-blue text-black font-bold"
                              : "bg-white/10 text-white/70 font-bold"
                          }`}
                        >
                          <span>{id}</span>
                        </div>
                        <div>
                          <p className="font-bold">{title}</p>
                          <p className="text-white/50 text-sm">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

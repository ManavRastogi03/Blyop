import React, { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Instagram, Linkedin } from "react-feather" // or your icon source
import Button from "./Button" // assuming you have a Button component

function LivePreviewSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-black/90">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-6">
            See Your Card <span className="text-neon-green">Come To Life</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/70 text-xl max-w-3xl mx-auto">
            Watch your digital identity card update in real-time as you build it with our interactive preview
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-futuristic-blue/20 rounded-xl blur-md" />
          <div className="relative bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-12">
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">Card Builder</h3>

                <div>
                  <label className="block text-lg text-white/70 mb-3">Choose Style</label>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-neon-green rounded-lg p-4 text-center">
                      <span className="text-neon-green text-lg">3D</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <span className="text-white/70 text-lg">Minimal</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <span className="text-white/70 text-lg">Neon</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <span className="text-white/70 text-lg">Dark</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg text-white/70 mb-3">Profile Image</label>
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-neon-green to-futuristic-blue" />
                    <Button variant="outline" className="text-base">
                      Change
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-lg text-white/70 mb-3">Background</label>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-neon-green to-futuristic-blue ring-2 ring-white" />
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-lg text-white/70 mb-3">Animation Style</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-neon-green rounded-lg p-4 text-center">
                      <span className="text-neon-green text-lg">Pulse</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <span className="text-white/70 text-lg">Wave</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                      <span className="text-white/70 text-lg">Glow</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-6 -left-6 text-sm bg-neon-green text-black px-3 py-1 rounded-full">
                  Live Preview
                </div>

                <div className="relative h-[600px] w-[300px] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-b from-neon-green/20 to-futuristic-blue/20 rounded-3xl blur-md animate-pulse" />
                  <div className="absolute inset-0.5 bg-black rounded-3xl overflow-hidden border border-white/20">
                    <div className="p-4">
                      <div className="h-1 w-20 bg-white/20 rounded-full mx-auto mb-4" />
                      <div className="aspect-square rounded-2xl bg-gradient-to-br from-neon-green/10 to-futuristic-blue/10 border border-white/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-neon-green to-futuristic-blue mx-auto mb-6" />
                          <h3 className="text-2xl font-bold">Alex Chen</h3>
                          <p className="text-white/70 text-lg">Digital Creator</p>
                          <div className="mt-6 flex justify-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                              <Instagram size={20} />
                            </div>
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                              <Linkedin size={20} />
                            </div>
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="text-sm">+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default LivePreviewSection

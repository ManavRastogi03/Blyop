import { motion } from "framer-motion"
import { ArrowRight } from "react-feather"

// Assume Button is your custom reusable button component
import Button from "./Button"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-futuristic-blue/5" />
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-neon-green/10 blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-futuristic-blue/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-8"
          >
            Ready to <span className="text-neon-green">Express</span> Your Digital Identity?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl text-white/80 mb-12"
          >
            Join thousands of creators, entrepreneurs, and professionals who are sharing their Blyop cards and expanding their digital presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-green to-futuristic-blue text-black text-xl px-10 py-8 rounded-full hover:shadow-glow transition-all duration-300 group"
            >
              Create My Blyop
              <ArrowRight
                className="ml-3 group-hover:translate-x-1 transition-transform"
                size={24}
              />
            </Button>

            <p className="mt-6 text-white/50 text-lg">No credit card required. Free to get started.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

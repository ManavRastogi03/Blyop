import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";
import  Button  from "./Button.jsx"; // adjust import path as per your project

export default function HeroSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-40 w-96 h-96 rounded-full bg-neon-green/20 blur-[120px]" />
        <div className="absolute bottom-20 right-40 w-96 h-96 rounded-full bg-futuristic-blue/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 z-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-futuristic-blue leading-tight"
            >
              Your Identity. One Tap. Infinite Reach.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl mb-10 text-white/80"
            >
              Express your personal brand and vibe through one powerful,
              animated link — your creative business card meets portfolio meets
              social passport.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button className="bg-gradient-to-r from-neon-green to-futuristic-blue text-black text-lg px-8 py-6 rounded-full hover:shadow-glow transition-all duration-300 group">
                Create My Blyop
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/30 to-futuristic-blue/30 rounded-3xl blur-xl transform rotate-6" />
            <div className="relative h-[600px] w-[300px] mx-auto">
              <div className="absolute inset-0.5 bg-black rounded-3xl overflow-hidden border border-white/20 transform -rotate-6 transition-transform hover:rotate-0 duration-500">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";

export default function CardBuilderSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

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

  const steps = [
    {
      title: "Voice or Text Input",
      description:
        "Add your details however you prefer, with smart voice recognition or traditional text input.",
    },
    {
      title: "Multilingual Support",
      description:
        "Switch between languages instantly with our multilingual toggle for global reach.",
    },
    {
      title: "Smart Suggestions",
      description:
        "We'll help you add the right links with intelligent suggestions based on your profile.",
    },
    {
      title: "Guided Experience",
      description:
        "Never wonder what to do next with our intuitive, step-by-step card creation process.",
    },
  ];

  return (
    <section id="builder" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-neon-green/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-8">
              Build Your Digital Identity{" "}
              <span className="text-neon-green">In Minutes</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/70 text-xl mb-10">
              Our step-by-step guided card builder makes it easy to create your
              perfect digital identity card with a seamless, intuitive experience.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-8">
              {steps.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-neon-green/20 to-futuristic-blue/20 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-white/70 text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-futuristic-blue/20 rounded-xl blur-md transform rotate-3" />
            <div className="relative bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-8 transform -rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3">Card Builder</h3>
                <div className="h-1 w-24 bg-gradient-to-r from-neon-green to-futuristic-blue rounded-full" />
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg text-white/70 mb-3">Your Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white text-lg focus:border-neon-green outline-none transition-colors"
                    placeholder="Enter your name"
                    defaultValue="Alex Chen"
                  />
                </div>

                <div>
                  <label className="block text-lg text-white/70 mb-3">Your Role</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white text-lg focus:border-neon-green outline-none transition-colors"
                    placeholder="What do you do?"
                    defaultValue="Digital Creator"
                  />
                </div>

                <div>
                  <label className="block text-lg text-white/70 mb-3">Your Links</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                      <Instagram size={22} />
                      <span className="text-white/70 text-lg">Instagram</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                      <Linkedin size={22} />
                      <span className="text-white/70 text-lg">LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-3 border border-dashed border-white/20 rounded-lg p-4 text-white/50 hover:border-neon-green hover:text-neon-green transition-colors cursor-pointer">
                      <span className="text-lg">+ Add another link</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

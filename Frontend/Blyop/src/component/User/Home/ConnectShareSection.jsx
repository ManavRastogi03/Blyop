import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram, Linkedin, Smartphone, Share2, ChevronRight, QrCode } from "lucide-react";
import  Button  from "./Button"; // Assuming you have a Button component

function ConnectShareSection() {
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

  return (
    <section id="share" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-futuristic-blue/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants}>
            <div className="relative max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-futuristic-blue/20 rounded-xl blur-md" />
              <div className="relative bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-8">Share Your Blyop</h3>

                <div className="mb-10">
                  <div className="aspect-square w-full bg-white p-6 rounded-lg mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-futuristic-blue/10 animate-pulse" />
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <QrCode size={200} className="text-black" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-lg mb-3">Your custom link</p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-neon-green text-lg">blyop.com/alexchen</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-white/70 text-lg mb-3">Quick share</p>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                      <Instagram size={24} />
                    </div>
                    <div className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                      <Linkedin size={24} />
                    </div>
                    <div className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                      <Smartphone size={24} />
                    </div>
                    <div className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                      <Share2 size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-8">
              Share Your Identity <span className="text-neon-green">Everywhere</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/70 text-xl mb-10">
              Your Blyop card is designed to be shared anywhere, with anyone, in seconds. Make connections and expand your network effortlessly.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-8">
              {[
                {
                  title: "Custom QR Code",
                  description:
                    "With unique wave animation that stands out from standard QR codes and catches attention.",
                },
                {
                  title: "Personalized Link",
                  description:
                    "Easy to remember and share with anyone, perfect for adding to your social profiles.",
                },
                {
                  title: "One-Tap Sharing",
                  description:
                    "Share directly to social media or messaging apps with a single tap for maximum convenience.",
                },
                {
                  title: "NFC Compatible",
                  description:
                    "Tap phones to instantly share your Blyop with new connections at events and meetups.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-neon-green/20 to-futuristic-blue/20 flex items-center justify-center shrink-0">
                    <ChevronRight size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-white/70 text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ConnectShareSection;

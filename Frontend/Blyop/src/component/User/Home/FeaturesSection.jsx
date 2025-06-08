import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Smartphone, QrCode, Sparkles, Share2 } from "lucide-react";
import { Card } from "./Card"; // Adjust path as needed

export default function FeaturesSection({ activeFeature, features }) {
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

  const featuresList = [
    {
      icon: <Smartphone size={28} />,
      title: "Mobile-First",
      description:
        "Designed for the way Gen Z connects, with a focus on mobile interactions and sharing.",
    },
    {
      icon: <QrCode size={28} />,
      title: "Custom QR",
      description:
        "Animated QR codes that stand out and make your digital identity instantly accessible.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Express Yourself",
      description:
        "Unlimited customization options to perfectly capture your personal brand and style.",
    },
    {
      icon: <Share2 size={28} />,
      title: "Share Anywhere",
      description:
        "One tap to share across platforms, from social media to messaging apps and NFC.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-6">
            One Link For Every{" "}
            <span className="text-neon-green">{features[activeFeature]}</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/70 text-xl max-w-3xl mx-auto"
          >
            Swipe through to see how Blyop works for different use cases
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Card className="bg-white/5 border-white/10 p-8 h-full hover:border-neon-green/50 transition-colors group">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-neon-green/20 to-futuristic-blue/20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-neon-green group-hover:to-futuristic-blue transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/70 text-lg">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

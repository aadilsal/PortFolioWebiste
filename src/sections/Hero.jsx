import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FlipWords } from "../components/FlipWords";

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const words = ["Full Stack Engineer", "AI & ML Engineer", "Product Builder"];

  return (
    <section id="home" className="section c-space relative overflow-hidden pt-32 md:pt-20">
      {/* Gradient backgrounds - responsive sizes */}
      <div className="absolute -top-20 -right-32 sm:-top-40 sm:-right-40 h-48 sm:h-72 w-48 sm:w-72 rounded-full blur-3xl opacity-20 sm:opacity-30" style={{ background: "rgb(var(--accent))" }} />
      <div className="absolute -bottom-20 -left-32 sm:-bottom-40 sm:-left-40 h-48 sm:h-72 w-48 sm:w-72 rounded-full blur-3xl opacity-15 sm:opacity-20" style={{ background: "rgb(var(--accent))" }} />
      
      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-10 items-start md:items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-xs font-medium glass mb-6">
            <Sparkles size={14} className="flex-shrink-0" />
            <span className="truncate">Building intelligent products</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Hi, I'm Aadil
          </h1>
          
          <div className="text-lg sm:text-xl md:text-2xl mt-3 sm:mt-4 leading-tight">
            <FlipWords words={words} className="font-semibold" />
          </div>
          
          <p className="text-sm sm:text-base text-neutral-300 mt-5 sm:mt-6 max-w-2xl leading-relaxed">
            I design and build modern web platforms and AI-powered products with exceptional user experiences, strong engineering practices, and measurable impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
            <button
              className="btn-primary focus-ring w-full sm:w-auto justify-center sm:justify-start"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects <ArrowUpRight size={16} className="hidden sm:inline" />
            </button>
            <button
              className="btn-secondary focus-ring w-full sm:w-auto justify-center sm:justify-start"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let’s Talk
            </button>
          </div>
        </motion.div>

        <motion.div
          className="card-surface hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Years Experience", value: "4+" },
              { label: "Projects Shipped", value: "20+" },
              { label: "Tech Stack", value: "React • Node • AI" },
              { label: "Availability", value: "Open to Remote" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 p-3 sm:p-4">
                <p className="text-xs font-medium text-neutral-400">{item.label}</p>
                <p className="text-sm sm:text-base font-semibold mt-1 sm:mt-2">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 sm:mt-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent p-3 sm:p-4">
            <p className="text-xs font-medium text-neutral-400">Specialties</p>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
              {[
                "Product Strategy",
                "AI Interfaces",
                "System Design",
                "Performance",
              ].map((tag) => (
                <span key={tag} className="chip text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

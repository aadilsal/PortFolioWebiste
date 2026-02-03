import { motion } from "framer-motion";

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "Node.js / Express", level: 85 },
  { name: "Databases (SQL/NoSQL)", level: 80 },
  { name: "AI/ML (RAG, CV)", level: 75 },
  { name: "DevOps / Cloud", level: 70 },
  { name: "System Design", level: 78 },
];

const About = () => {
  return (
    <section className="section c-space" id="about">
      <div className="max-w-6xl">
        <h2 className="section-title">About</h2>
        <p className="section-subtitle max-w-3xl">
          Full Stack Engineer with a focus on product quality, AI augmentation, and high-performance interfaces.
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
        <div className="card-surface md:col-span-2">
          <p className="text-base sm:text-lg font-bold">What I build</p>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed">
            I ship end-to-end platforms, intelligent dashboards, and AI-powered assistants. I'm obsessed with clarity, performance, and seamless user journeys.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {[
              { label: "Products", value: "20+" },
              { label: "Clients", value: "10+" },
              { label: "Success", value: "98%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 p-3 sm:p-4">
                <p className="text-xs font-medium text-neutral-400">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface">
          <p className="text-base sm:text-lg font-bold">Location</p>
          <p className="text-sm sm:text-base text-neutral-300 mt-3">Lahore, Pakistan · Remote</p>
          <div className="mt-5 sm:mt-6 space-y-2">
            {[
              "Clean architecture",
              "Obsess over UX",
              "Collaborative delivery",
            ].map((item) => (
              <div key={item} className="chip text-xs sm:text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
        <div className="card-surface">
          <p className="text-base sm:text-lg font-bold">Core Skills</p>
          <div className="mt-6 space-y-3 sm:space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-neutral-400 text-xs">{skill.level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5 mt-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ background: "rgb(var(--accent))" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface">
          <p className="text-base sm:text-lg font-bold">Toolbox</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "Node",
              "TypeScript",
              "Tailwind",
              "PostgreSQL",
              "MongoDB",
              "Supabase",
              "Python",
              "OpenAI",
            ].map((tool) => (
              <span key={tool} className="chip text-xs" title={tool}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

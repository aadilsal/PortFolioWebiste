import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllExperiences } from "../constants";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
    const handleUpdate = () => loadExperiences();
    window.addEventListener("experiencesUpdated", handleUpdate);
    return () => window.removeEventListener("experiencesUpdated", handleUpdate);
  }, []);

  const loadExperiences = async () => {
    setLoading(true);
    const data = await getAllExperiences();
    setExperiences(data);
    setLoading(false);
  };

  return (
    <section id="experience" className="section c-space">
      <div>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle max-w-3xl">
          Roles where I delivered product impact and engineering excellence.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading experiences...</div>
      ) : (
        <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.title}-${index}`}
              className="card-surface"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold">{exp.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1">{exp.job}</p>
                </div>
                <span className="text-xs text-neutral-400 whitespace-nowrap">{exp.date}</span>
              </div>
              <ul className="mt-3 sm:mt-4 list-disc list-inside text-xs sm:text-sm text-neutral-300 space-y-1.5 sm:space-y-2">
                {exp.contents?.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Experiences;

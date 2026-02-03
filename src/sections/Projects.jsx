import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "../constants";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    loadProjects();
    const handleUpdate = () => loadProjects();
    window.addEventListener("projectsUpdated", handleUpdate);
    return () => window.removeEventListener("projectsUpdated", handleUpdate);
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getAllProjects();
    setProjects(data);
    setLoading(false);
  };

  const filters = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => p.tags?.forEach((t) => tags.add(t.name)));
    return ["All", ...Array.from(tags)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tags?.some((t) => t.name === activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="work" className="section c-space">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Selected work across full‑stack engineering and AI products.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`chip text-xs sm:text-sm ${
                activeFilter === filter ? "bg-white/15 text-white" : "text-neutral-400 hover:bg-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading projects...</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {filtered.map((project) => (
            <motion.button
              key={project.id}
              type="button"
              className="card-surface group overflow-hidden text-left transition hover:border-white/30"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={reduceMotion ? {} : { y: -4 }}
              onClick={() => setSelected(project)}
              aria-label={`View details for ${project.title}`}
            >
              <div className="overflow-hidden rounded-xl aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm sm:text-lg font-semibold leading-snug">{project.title}</h3>
                  <ArrowUpRight size={16} className="flex-shrink-0 text-neutral-400" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                  {project.tags?.slice(0, 4).map((tag) => (
                    <span key={tag.id} className="chip text-xs sm:text-sm text-neutral-300">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="card-surface max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Project details"
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold leading-tight">{selected.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 sm:mt-3 leading-relaxed">{selected.description}</p>
                </div>
                <button
                  className="chip text-xs min-w-fit"
                  onClick={() => setSelected(null)}
                  type="button"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>
              <div className="mt-5 sm:mt-6 overflow-hidden rounded-xl aspect-video">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <ul className="mt-5 sm:mt-6 list-disc list-inside text-xs sm:text-sm text-neutral-300 space-y-1 sm:space-y-2">
                {selected.subDescription?.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                {selected.tags?.map((tag) => (
                  <span key={tag.id} className="chip text-xs sm:text-sm text-neutral-300">
                    {tag.name}
                  </span>
                ))}
              </div>
              <a
                href={selected.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-5 sm:mt-6 inline-flex w-full sm:w-auto justify-center sm:justify-start"
              >
                View Repository <ArrowUpRight size={16} className="hidden sm:inline" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

import { useState, useEffect } from "react";
import Project from "../components/Project";
import { getAllProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  
  useEffect(() => {
    loadProjects();
    
    // Listen for updates
    const handleUpdate = () => {
      loadProjects();
    };
    
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('projectsUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('projectsUpdated', handleUpdate);
    };
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getAllProjects();
    setProjects(data);
    setLoading(false);
  };
  
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  const [preview, setPreview] = useState(null);
  
  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <h2 className="text-heading">My Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading projects...</div>
      ) : (
        projects.map((project) => (
          <Project key={project.id} {...project} setPreview={setPreview} />
        ))
      )}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default Projects;

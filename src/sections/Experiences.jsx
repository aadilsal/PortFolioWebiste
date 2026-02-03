import { useState, useEffect } from "react";
import { Timeline } from "../components/Timeline";
import { getAllExperiences } from "../constants";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadExperiences();
    
    // Listen for updates
    const handleUpdate = () => {
      loadExperiences();
    };
    
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('experiencesUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('experiencesUpdated', handleUpdate);
    };
  }, []);

  const loadExperiences = async () => {
    setLoading(true);
    const data = await getAllExperiences();
    setExperiences(data);
    setLoading(false);
  };
  
  if (loading) {
    return (
      <div className="w-full text-center py-12 text-gray-400">
        Loading experiences...
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;

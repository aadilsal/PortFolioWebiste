import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { myProjects, experiences } from "../constants";
import { 
  fetchProjects, 
  fetchExperiences, 
  addProject, 
  addExperience, 
  deleteProject as dbDeleteProject,
  deleteExperience as dbDeleteExperience 
} from "../lib/database";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [dynamicExperiences, setDynamicExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    subDescription: [""],
    href: "",
    image: "",
    tags: [{ name: "", path: "" }],
  });
  const [experienceForm, setExperienceForm] = useState({
    title: "",
    job: "",
    date: "",
    contents: [""],
  });

  // Load data from Supabase on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projects, exps] = await Promise.all([
        fetchProjects(),
        fetchExperiences()
      ]);
      setDynamicProjects(projects);
      setDynamicExperiences(exps);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data from database. Check console for details.');
    }
    setLoading(false);
  };

  const handleProjectChange = (field, value) => {
    setProjectForm({ ...projectForm, [field]: value });
  };

  const handleExperienceChange = (field, value) => {
    setExperienceForm({ ...experienceForm, [field]: value });
  };

  const addSubDescription = () => {
    setProjectForm({
      ...projectForm,
      subDescription: [...projectForm.subDescription, ""],
    });
  };

  const updateSubDescription = (index, value) => {
    const updated = [...projectForm.subDescription];
    updated[index] = value;
    setProjectForm({ ...projectForm, subDescription: updated });
  };

  const addTag = () => {
    setProjectForm({
      ...projectForm,
      tags: [...projectForm.tags, { name: "", path: "" }],
    });
  };

  const updateTag = (index, field, value) => {
    const updated = [...projectForm.tags];
    updated[index][field] = value;
    setProjectForm({ ...projectForm, tags: updated });
  };

  const addContent = () => {
    setExperienceForm({
      ...experienceForm,
      contents: [...experienceForm.contents, ""],
    });
  };

  const updateContent = (index, value) => {
    const updated = [...experienceForm.contents];
    updated[index] = value;
    setExperienceForm({ ...experienceForm, contents: updated });
  };

  const saveProject = async () => {
    try {
      const newProject = {
        title: projectForm.title,
        description: projectForm.description,
        subDescription: projectForm.subDescription.filter((desc) => desc.trim()),
        href: projectForm.href,
        logo: "",
        image: projectForm.image,
        tags: projectForm.tags
          .filter((tag) => tag.name && tag.path)
          .map((tag, idx) => ({ id: idx + 1, name: tag.name, path: tag.path })),
      };

      await addProject(newProject);
      await loadData(); // Refresh data from database
      
      // Trigger event for live update on portfolio
      window.dispatchEvent(new Event('projectsUpdated'));

      // Reset form
      setProjectForm({
        title: "",
        description: "",
        subDescription: [""],
        href: "",
        image: "",
        tags: [{ name: "", path: "" }],
      });

      alert("✅ Project saved to database! It will now appear on your portfolio.");
    } catch (error) {
      alert("❌ Error saving project. Check console for details.");
      console.error(error);
    }
  };

  const saveExperience = async () => {
    try {
      const newExperience = {
        title: experienceForm.title,
        job: experienceForm.job,
        date: experienceForm.date,
        contents: experienceForm.contents.filter((content) => content.trim()),
      };

      await addExperience(newExperience);
      await loadData(); // Refresh data from database
      
      // Trigger event for live update
      window.dispatchEvent(new Event('experiencesUpdated'));

      // Reset form
      setExperienceForm({
        title: "",
        job: "",
        date: "",
        contents: [""],
      });

      alert("✅ Experience saved to database! It will now appear on your portfolio.");
    } catch (error) {
      alert("❌ Error saving experience. Check console for details.");
      console.error(error);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await dbDeleteProject(id);
      await loadData();
      window.dispatchEvent(new Event('projectsUpdated'));
      alert("✅ Project deleted successfully!");
    } catch (error) {
      alert("❌ Error deleting project. Check console for details.");
      console.error(error);
    }
  };

  const deleteExperience = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      await dbDeleteExperience(id);
      await loadData();
      window.dispatchEvent(new Event('experiencesUpdated'));
      alert("✅ Experience deleted successfully!");
    } catch (error) {
      alert("❌ Error deleting experience. Check console for details.");
      console.error(error);
    }
  };

  const exportToFile = () => {
    const allProjects = [...myProjects, ...dynamicProjects];
    const allExperiences = [...experiences, ...dynamicExperiences];

    const projectsCode = allProjects
      .map((project) => {
        const tags = project.tags
          .map((tag) => `{ id: ${tag.id}, name: "${tag.name}", path: "${tag.path}" }`)
          .join(",\n      ");

        const subDesc = project.subDescription
          .map((desc) => `"${desc}"`)
          .join(",\n      ");

        return `  {
    id: ${project.id},
    title: "${project.title}",
    description: "${project.description}",
    subDescription: [
      ${subDesc}
    ],
    href: "${project.href}",
    logo: "${project.logo}",
    image: "${project.image}",
    tags: [
      ${tags}
    ],
  }`;
      })
      .join(",\n");

    const experiencesCode = allExperiences
      .map((exp) => {
        const contents = exp.contents
          .map((content) => `"${content}"`)
          .join(",\n      ");

        return `  {
    title: "${exp.title}",
    job: "${exp.job}",
    date: "${exp.date}",
    contents: [
      ${contents}
    ],
  }`;
      })
      .join(",\n");

    const fileContent = `export const myProjects = [
${projectsCode}
];

export const mySocials = [
  {
    name: "WhatsApp",
    href: "",
    icon: "/assets/socials/whatsApp.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aadilsal",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: "/assets/socials/instagram.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/aadilsal",
    icon: "/assets/socials/github.svg",
  },
];

export const experiences = [
${experiencesCode}
];

export const reviews = [];
`;

    const blob = new Blob([fileContent], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("index.js file downloaded! Replace src/constants/index.js with this file.");
  };

  const generateProjectCode = () => {
    const newId = myProjects.length + dynamicProjects.length + 1;
    const tags = projectForm.tags
      .filter((tag) => tag.name && tag.path)
      .map((tag, idx) => `{ id: ${idx + 1}, name: "${tag.name}", path: "${tag.path}" }`)
      .join(",\n      ");

    const subDesc = projectForm.subDescription
      .filter((desc) => desc.trim())
      .map((desc) => `"${desc}"`)
      .join(",\n      ");

    return `{
    id: ${newId},
    title: "${projectForm.title}",
    description: "${projectForm.description}",
    subDescription: [
      ${subDesc}
    ],
    href: "${projectForm.href}",
    logo: "",
    image: "${projectForm.image}",
    tags: [
      ${tags}
    ],
  }`;
  };

  const generateExperienceCode = () => {
    const contents = experienceForm.contents
      .filter((content) => content.trim())
      .map((content) => `"${content}"`)
      .join(",\n      ");

    return `{
    title: "${experienceForm.title}",
    job: "${experienceForm.job}",
    date: "${experienceForm.date}",
    contents: [
      ${contents}
    ],
  }`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Code copied to clipboard! Add it to src/constants/index.js");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </Link>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={exportToFile}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            📥 Export index.js
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Projects</p>
            <p className="text-3xl font-bold">{myProjects.length + dynamicProjects.length}</p>
            <p className="text-xs text-gray-500 mt-1">
              {dynamicProjects.length} dynamic, {myProjects.length} static
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Experiences</p>
            <p className="text-3xl font-bold">{experiences.length + dynamicExperiences.length}</p>
            <p className="text-xs text-gray-500 mt-1">
              {dynamicExperiences.length} dynamic, {experiences.length} static
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            className={`px-6 py-3 font-semibold ${
              activeTab === "projects"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Add Project
          </button>
          <button
            className={`px-6 py-3 font-semibold ${
              activeTab === "experience"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("experience")}
          >
            Add Experience
          </button>
          <button
            className={`px-6 py-3 font-semibold ${
              activeTab === "manage"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Entries
          </button>
        </div>

        {/* Project Form */}
        {activeTab === "projects" && (
          <div className="bg-gray-900 p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

            <div>
              <label className="block mb-2 font-semibold">Title</label>
              <input
                type="text"
                value={projectForm.title}
                onChange={(e) => handleProjectChange("title", e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                placeholder="Project Title"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                value={projectForm.description}
                onChange={(e) =>
                  handleProjectChange("description", e.target.value)
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                rows="3"
                placeholder="Brief description"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Sub Descriptions
              </label>
              {projectForm.subDescription.map((desc, index) => (
                <input
                  key={index}
                  type="text"
                  value={desc}
                  onChange={(e) => updateSubDescription(index, e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-2"
                  placeholder={`Sub description ${index + 1}`}
                />
              ))}
              <button
                onClick={addSubDescription}
                className="text-blue-500 hover:text-blue-400"
              >
                + Add Sub Description
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">GitHub URL</label>
              <input
                type="text"
                value={projectForm.href}
                onChange={(e) => handleProjectChange("href", e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Image Path</label>
              <input
                type="text"
                value={projectForm.image}
                onChange={(e) => handleProjectChange("image", e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                placeholder="/assets/projects/yourimage.png"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Tags</label>
              {projectForm.tags.map((tag, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tag.name}
                    onChange={(e) => updateTag(index, "name", e.target.value)}
                    className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded"
                    placeholder="Tag name (e.g., React)"
                  />
                  <input
                    type="text"
                    value={tag.path}
                    onChange={(e) => updateTag(index, "path", e.target.value)}
                    className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded"
                    placeholder="Icon path (e.g., /assets/logos/react.svg)"
                  />
                </div>
              ))}
              <button onClick={addTag} className="text-blue-500 hover:text-blue-400">
                + Add Tag
              </button>
            </div>

            <button
              onClick={saveProject}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
            >
              💾 Save Project
            </button>
          </div>
        )}

        {/* Experience Form */}
        {activeTab === "experience" && (
          <div className="bg-gray-900 p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold mb-4">Add New Experience</h2>

            <div>
              <label className="block mb-2 font-semibold">Job Title</label>
              <input
                type="text"
                value={experienceForm.title}
                onChange={(e) => handleExperienceChange("title", e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Company</label>
              <input
                type="text"
                value={experienceForm.job}
                onChange={(e) => handleExperienceChange("job", e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Date Range</label>
              <input
                type="text"
                value={experienceForm.date}
                onChange={(e) => handleExperienceChange("date", e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                placeholder="e.g., April 2024 - Present"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Job Responsibilities
              </label>
              {experienceForm.contents.map((content, index) => (
                <textarea
                  key={index}
                  value={content}
                  onChange={(e) => updateContent(index, e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-2"
                  rows="2"
                  placeholder={`Responsibility ${index + 1}`}
                />
              ))}
              <button
                onClick={addContent}
                className="text-blue-500 hover:text-blue-400"
              >
                + Add Responsibility
              </button>
            </div>

            <button
              onClick={saveExperience}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
            >
              💾 Save Experience
            </button>
          </div>
        )}

        {/* Manage Entries */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            {/* Dynamic Projects */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Dynamic Projects ({dynamicProjects.length})</h2>
              {dynamicProjects.length === 0 ? (
                <p className="text-gray-400">No dynamic projects yet. Add one from the "Add Project" tab.</p>
              ) : (
                <div className="space-y-3">
                  {dynamicProjects.map((project) => (
                    <div key={project.id} className="bg-gray-800 p-4 rounded flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                        <div className="flex gap-2 mt-2">
                          {project.tags.map((tag) => (
                            <span key={tag.id} className="text-xs bg-gray-700 px-2 py-1 rounded">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="ml-4 text-red-500 hover:text-red-400"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Experiences */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Dynamic Experiences ({dynamicExperiences.length})</h2>
              {dynamicExperiences.length === 0 ? (
                <p className="text-gray-400">No dynamic experiences yet. Add one from the "Add Experience" tab.</p>
              ) : (
                <div className="space-y-3">
                  {dynamicExperiences.map((exp, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-sm text-gray-300">{exp.job}</p>
                        <p className="text-xs text-gray-500">{exp.date}</p>
                      </div>
                      <button
                        onClick={() => deleteExperience(index)}
                        className="ml-4 text-red-500 hover:text-red-400"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-3">📖 How It Works:</h3>
          <div className="space-y-4 text-gray-300">
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-bold text-white mb-2">☁️ Cloud Database (Supabase)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Fill out the form and click "💾 Save Project" or "💾 Save Experience"</li>
                <li>Data is saved to <strong className="text-green-400">Supabase database</strong></li>
                <li>Changes appear <strong className="text-green-400">instantly</strong> and persist across all devices!</li>
                <li>Go to "Manage Entries" tab to view or delete entries</li>
              </ol>
            </div>
            
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="font-bold text-white mb-2">💾 Export Feature</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click "📥 Export index.js" to download all data as code</li>
                <li>Optional: Replace <code className="bg-gray-700 px-2 py-1 rounded">src/constants/index.js</code></li>
                <li>Useful for backups or migrating to static data</li>
              </ol>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 p-3 rounded mt-4">
              <p className="text-sm text-blue-200">
                <strong>💡 Database Status:</strong> {loading ? '⏳ Loading...' : '✅ Connected to Supabase'}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                {dynamicProjects.length + dynamicExperiences.length} entries in database
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

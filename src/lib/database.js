import { supabase } from './supabase';

// Fetch all projects from Supabase
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  // Transform database format to app format
  return data.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    subDescription: project.sub_description || [],
    href: project.href,
    logo: project.logo || '',
    image: project.image,
    tags: project.tags || [],
  }));
};

// Fetch all experiences from Supabase
export const fetchExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
  
  return data.map(exp => ({
    id: exp.id,
    title: exp.title,
    job: exp.job,
    date: exp.date,
    contents: exp.contents || [],
  }));
};

// Add a new project to Supabase
export const addProject = async (project) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      title: project.title,
      description: project.description,
      sub_description: project.subDescription,
      href: project.href,
      logo: project.logo || '',
      image: project.image,
      tags: project.tags,
    }])
    .select();
  
  if (error) {
    console.error('Error adding project:', error);
    throw error;
  }
  
  return data[0];
};

// Add a new experience to Supabase
export const addExperience = async (experience) => {
  const { data, error } = await supabase
    .from('experiences')
    .insert([{
      title: experience.title,
      job: experience.job,
      date: experience.date,
      contents: experience.contents,
    }])
    .select();
  
  if (error) {
    console.error('Error adding experience:', error);
    throw error;
  }
  
  return data[0];
};

// Delete a project from Supabase
export const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Delete an experience from Supabase
export const deleteExperience = async (id) => {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};

// Update a project in Supabase
export const updateProject = async (id, updates) => {
  const { data, error } = await supabase
    .from('projects')
    .update({
      title: updates.title,
      description: updates.description,
      sub_description: updates.subDescription,
      href: updates.href,
      image: updates.image,
      tags: updates.tags,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }
  
  return data[0];
};

// Update an experience in Supabase
export const updateExperience = async (id, updates) => {
  const { data, error } = await supabase
    .from('experiences')
    .update({
      title: updates.title,
      job: updates.job,
      date: updates.date,
      contents: updates.contents,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating experience:', error);
    throw error;
  }
  
  return data[0];
};

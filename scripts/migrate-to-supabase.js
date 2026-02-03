import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { myProjects, experiences } from "../src/constants/index.js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const mapProject = (project) => ({
  title: project.title,
  description: project.description,
  sub_description: project.subDescription || [],
  href: project.href || "",
  logo: project.logo || "",
  image: project.image || "",
  tags: project.tags || [],
});

const mapExperience = (exp) => ({
  title: exp.title,
  job: exp.job,
  date: exp.date,
  contents: exp.contents || [],
});

const migrate = async () => {
  console.log("Starting migration...");

  const projectPayload = myProjects.map(mapProject);
  const experiencePayload = experiences.map(mapExperience);

  const { error: projectError } = await supabase
    .from("projects")
    .insert(projectPayload);

  if (projectError) {
    console.error("Project migration failed:", projectError);
    process.exit(1);
  }

  const { error: experienceError } = await supabase
    .from("experiences")
    .insert(experiencePayload);

  if (experienceError) {
    console.error("Experience migration failed:", experienceError);
    process.exit(1);
  }

  console.log("Migration completed successfully.");
};

migrate();

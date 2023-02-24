import * as fs from "fs/promises";
import matter from "gray-matter";
import * as path from "path";

const _PROJECT_DIRECTORY = "_projects";

async function getProjects() {
  const files = await fs.readdir(_PROJECT_DIRECTORY);
  const projects = await Promise.all(
    files.map(async (filename) => {
      const fileBuffer = await fs.readFile(
        path.join(_PROJECT_DIRECTORY, filename)
      );
      const { data: meta, content } = matter(fileBuffer);
      return { meta, content, slug: filename.replace(/\.md$/, "") };
    })
  );

  return projects;
}

async function getProject(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fileBuffer = await fs.readFile(
    path.join(_PROJECT_DIRECTORY, `${realSlug}.md`)
  );
  const { data: meta, content } = matter(fileBuffer);
  return { meta, content, slug: realSlug };
}

export { getProject, getProjects };

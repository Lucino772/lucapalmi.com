import * as technologies from "@/lib/technologies.json";

type Technologies = typeof technologies;

type ProjectMeta = {
  title: string;
  thumbnail: any;
  description: string;
  links: {
    [key: string]: string;
  };
  techs: (keyof Technologies)[];
};

export type { ProjectMeta, Technologies };

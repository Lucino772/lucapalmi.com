---
title: "lucapalmi.com website !"
thumbnail: "/images/projects/website.webp"
description: "This project is the website your currently on. It's a simple static website build with Next.js. It's serve as a portfolio to showcase projects I made."
links:
  github: "https://github.com/Lucino772/lucapalmi.com"
  url: "https://lucapalmi.com"
techs:
  - nextjs
  - vercel
  - tailwind
---

### Description
This website is my way of sharing insights with people who, like me, are interested in the power of technology. I often use this site as a learning platform where I can directly experiment with ideas, new technologies and test new skills that I pick up along the way. This is also the place where I will share my knowledge and discuss the approaches taken to transform simple ideas into interesting projects.

### Challenges
Building a website was a real challenge for me and I quickly understood that technology was not the answer. I started writing down my ideas and drawing a few sketches on a piece of paper until I stumbled onto [Figma] which became the main tool for the designing of the website. I found Figma to be a great tool, not only it gives you the possibility to design websites but more than that, it allows you to easily visualise your ideas which I think is the key to a successful project.

### My role
The most difficult aspect of working on a solo, personal project is having to define your own role and the countless responsibilities you have. To better understand this concept let's take a look at what Google gives us if we search "Web development team roles". One of the first articles I found was ["7 essential roles in web development teams"][EssentialRolesInWebDev]. From this rather simple article, based on project complexity, a web development project might require different skills, that, when translated in the real world, often means more resources in terms of head count.

Embarking on this project helped me to develop some of the skills cited in the article as well as gaining a better understanding of roles and responsibilities within a project team and how this can help with task segregation, execution and completion. There is plenty of material out there on the definition of roles and responsibilities and surely I am not qualified to add or comment on what has already been said. Perhaps my contribution, if any, is to highlight that by understanding the concept of roles and how they coexist together helped me to navigate the different aspects of the project itself and to be aware of the contribution that each role must bring to the project.

### Technologies used
The website is built with [Next.js] and [Tailwind CSS][TailwindCSS]. I decided to use Next.js for multiple reasons, one of which was SEO. SEO stands for Search Engine Optimization and is the process of making your site better for search engines. Next.js also offers the ability to use [React][NextVsReact] and its ecosystem which I am very fond of. I have made a deliberate decision not to wander off too much from classic CSS and so choose to use a utility-first library like Tailwind CSS.

Initially the website was hosted on [DigitalOcean][HostWebsiteOnDigitalOcean]. Quite soon I realised that managing an entire server for such a simple website was not sustainable and hence moved to [Vercel][HostWebsiteOnVercel]. Among many benefits that I had with Vercel was not having to manage the server myself anymore. I am aware that this website is rather simple and that I could have considered a more traditional approach, however my goal from the early stage was to build a dynamic website and using a production framework that uses React such as Next.js was the approach that I felt was the most suitable for this project.

Although, if I am not using a server anymore, where are the files stored ? Well, that’s the beauty of Vercel, they handle everything. Every time I update the code on GitHub, Vercel automatically retrieves the files from GitHub, builds the website and serves the static files. Vercel does way more than simply hosting files, you will find everything that you need to know in their [documentation][VercelDocs].

### References
Design being a visual thing (obviously!), a lot of the research that I did led to videos on youtube, here is a list of some youtube channel, that I still follow to this day, which helped me in discovering technologies in the frontend world:
- [Fireship][FireshipYT]
- [DesignCourse][DesignCourseYT]
- [FluxAcademy][FluxAcademyYT]
- [Simonswissdev][SimonswissdevYT]
- [TailwindLabs][TailwindLabsYT]
- [WebDevSimplified][WebDevSimplifiedYT]
- [developedbyed][developedbyedYT]


<!-- links -->
[FireshipYT]: https://www.youtube.com/@Fireship "Fireship Youtube Channel"
[DesignCourseYT]: https://www.youtube.com/@DesignCourse "DesignCourse Youtube Channel"
[FluxAcademyYT]: https://www.youtube.com/@FluxAcademy "FluxAcademy Youtube Channel"
[SimonswissdevYT]: https://www.youtube.com/@Simonswissdev "Simonswissdev Youtube Channel"
[TailwindLabsYT]: https://www.youtube.com/@TailwindLabs "TailwindLabs Youtube Channel"
[WebDevSimplifiedYT]: https://www.youtube.com/@WebDevSimplified "WebDevSimplified Youtube Channel"
[developedbyedYT]: https://www.youtube.com/@developedbyed "developedbyed Youtube Channel"

[Figma]: https://www.figma.com/ "Figma Website"
[Next.js]: https://nextjs.org/ "Next.js Website"
[TailwindCSS]: https://tailwindcss.com/ "Tailwind CSS Website"
[VercelDocs]: https://vercel.com/docs "Vercel Documentation"

[HostWebsiteOnDigitalOcean]: https://docs.digitalocean.com/products/getting-started/host-websites/
[HostWebsiteOnVercel]: https://dev.to/therickedge/how-to-deploy-your-website-using-vercel-4499
[NextVsReact]: https://www.freecodecamp.org/news/next-vs-react/
[EssentialRolesInWebDev]: https://blog.acolad.com/7-essential-roles-in-a-web-development-team
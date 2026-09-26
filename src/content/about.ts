export const about = {
    name: "Luca Palmisano",
    role: "Senior Software Engineer",
    headline:
        "I build well-designed software systems, end to end: from the infrastructure up to the tools people use.",
    focus: [
        "Backend & distributed systems",
        "Infrastructure & internal platforms",
        "Developer tools",
        "Desktop applications",
        "Software architecture",
    ],
    tendencies: [
        "break complex problems down into simpler ones",
        "think beyond the code when making decisions",
        "rely on proven solutions when they do the job",
    ],
    hobbies: {
        intro: "Outside work I still build things, just more hands-on and exploratory.",
        technical: [
            "Hardware, Raspberry Pis & IoT",
            "Radio & LoRaWAN",
            "Home networking",
            "Game servers & Minecraft modding",
            "LEGO projects",
        ],
        personal: ["Cooking", "Travelling", "Improving the things around me"],
    },
    // Home page pointers: the flagship project (projects.json title) and an
    // optional pinned article slug shown instead of the latest one
    flagshipProject: "qtcompose",
    pinnedArticle: undefined as string | undefined,
    links: {
        github: "https://github.com/Lucino772",
        linkedin: "https://www.linkedin.com/in/luca-palmisano-1920aa1b6/",
    },
} as const;

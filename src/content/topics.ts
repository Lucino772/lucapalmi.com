// Topics describe what a piece is about, independently of the technologies
// used. They drive filtering on the Writing page; tags stay descriptive only.
export const topics = [
    { id: "architecture", label: "Architecture" },
    { id: "backend", label: "Backend" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "tooling", label: "Developer tooling" },
    { id: "desktop", label: "Desktop & UI" },
    { id: "web", label: "Web" },
    { id: "ai", label: "AI" },
    { id: "hardware", label: "Hardware & IoT" },
] as const;

export type TopicId = (typeof topics)[number]["id"];

export const topicIds = topics.map((topic) => topic.id) as [
    TopicId,
    ...TopicId[],
];

export function topicLabel(id: TopicId): string {
    return topics.find((topic) => topic.id === id)?.label ?? id;
}

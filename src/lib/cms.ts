import { createClient } from "contentful";

const spaceId: string = process.env.CONTENTFUL_SPACE as string;
const token: string = process.env.CONTENTFUL_TOKEN as string;

function getClient() {
    return createClient({
        space: spaceId,
        accessToken: token
    })
}

export async function getAllProjects() {
    const client = getClient();

    return await client.getEntries({
        content_type: "project"
    });
}
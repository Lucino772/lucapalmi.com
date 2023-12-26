import { createClient, EntryFieldTypes } from "contentful";

const spaceId: string = process.env.CONTENTFUL_SPACE as string;
const token: string = process.env.CONTENTFUL_TOKEN as string;

export type TechnologyEntrySkeleton = {
    contentTypeId: "technology";
    fields: {
        name: EntryFieldTypes.Text;
        slug: EntryFieldTypes.Text;
        icon: EntryFieldTypes.AssetLink;
    };
};

export type ProjectEntrySkeleton = {
    contentTypeId: "project";
    fields: {
        title: EntryFieldTypes.Text;
        slug: EntryFieldTypes.Text;
        thumbnail: EntryFieldTypes.AssetLink;
        description: EntryFieldTypes.Text;
        github: EntryFieldTypes.Text;
        website: EntryFieldTypes.Text;
        technologies: EntryFieldTypes.Array<
            EntryFieldTypes.EntryLink<TechnologyEntrySkeleton>
        >;
        content: EntryFieldTypes.Text;
    };
};

function getClient() {
    return createClient({
        space: spaceId,
        accessToken: token,
    });
}

export async function getAllProjects() {
    const client = getClient();

    return await client.withoutUnresolvableLinks.getEntries<ProjectEntrySkeleton>(
        {
            content_type: "project",
        },
    );
}

export async function getProject(slug: string) {
    const client = getClient();

    const projects =
        await client.withoutUnresolvableLinks.getEntries<ProjectEntrySkeleton>({
            content_type: "project",
            "fields.slug": slug,
        });

    return projects.items.at(0);
}

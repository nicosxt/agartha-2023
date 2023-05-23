import { FeatureCollection } from 'geojson';
import { notion } from './notion';

interface Community {
    title: string;
    slug: string;
    description: string;
    image: string;
    coordinates: [number, number],
    tags: string[],
    url: string,
    country: string,
    toStay: string[],
    toVisit: string[],
}

export function getCommunitySlugFromName(name: string): string {
    return name.trim().replaceAll(' ', '-').toLowerCase();
}

export function parseNotionCommunity(notionCommunity: any): Community {
    // console.log(notionCommunity.properties)
    const coords = notionCommunity?.properties?.Coordinates?.rich_text?.[0]?.plain_text?.split(', ') ?? [0, 0];
    const longitude: number = +coords[1];
    const latitude: number = +coords[0];

    console.log(Object.keys(notionCommunity.properties))

    return {
        coordinates: [longitude, latitude],
        title: notionCommunity?.properties?.Name?.title?.[0]?.plain_text,
        slug: getCommunitySlugFromName(notionCommunity?.properties?.Name?.title?.[0]?.plain_text),
        description: notionCommunity?.properties?.Description?.rich_text?.[0]?.plain_text ?? '',
        image: notionCommunity?.properties?.Logo?.files?.[0]?.file?.url,
        tags: notionCommunity?.properties?.Tags?.multi_select?.map(({ name }) => name),
        url: notionCommunity?.properties?.URL?.url,
        country: notionCommunity?.properties?.Country?.select?.name,
        toStay: notionCommunity?.properties?.['To-Stay']?.multi_select?.map(({ name }) => name),
        toVisit: notionCommunity?.properties?.['To-Visit']?.multi_select?.map(({ name }) => name),
    }
}

export const communitiesToGeoJson = (communities: any): FeatureCollection => {
    const features = communities.map(
        (notionCommunity: any) => {
            const {
                coordinates,
                title,
                slug,
                description,
                image,
            } = parseNotionCommunity(notionCommunity);

            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    coordinates,
                },
                "properties": {
                    title,
                    slug,
                    description,
                    image,
                },
            }
        }

    )
    return {
        "type": "FeatureCollection",
        "features": features
    }
}
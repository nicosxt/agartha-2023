import { FeatureCollection } from 'geojson';

export const communitiesToGeoJson = (communities): FeatureCollection => {
    const features = communities.map(
        (community: any) => {
            const coords = community?.properties?.Coordinates?.rich_text?.[0]?.plain_text?.split(', ') ?? [0, 0];
            const longitude: number = +coords[1];
            const latitude: number = +coords[0];
            console.log(community.properties)

            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                },
                "properties": {
                    "title": community?.properties?.Name?.title?.[0]?.plain_text,
                    "slug": community?.properties?.Name?.title?.[0]?.plain_text.replace(' ', '-').toLowerCase(),
                    "description": community?.properties?.Description?.rich_text?.[0]?.plain_text,
                    "image": community?.properties?.Logo?.files?.[0]?.file?.url,
                }
            }
        }

    )
    return {
        "type": "FeatureCollection",
        "features": features
    }
}
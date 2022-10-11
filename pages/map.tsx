import type { NextPage } from 'next';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import markers from './api/markers.json';
import GeoJSON  from 'geojson';
const Map: NextPage = () => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    useEffect(() => {
 
        mapboxgl.accessToken=process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN??'';
        // if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [0, 0],
            zoom: 1.8,

        });

        console.log(map.current)
        console.log(
            "map container", mapContainer.current
        )

      map.current?.on('load', () => {
    // Add an image to use as a custom marker
    map.current?.loadImage(
        'https://s2.loli.net/2022/10/11/RgPfSKw71WT2dbM.png',
        (error, image) => {
            if (error) throw error;
            map.current?.addImage('flower', image!);
            console.log("image", image)
            // Add a GeoJSON source with 2 points
            map.current?.addSource('points', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features":
                        [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -77.03238901390978
                                    , 38.913188059745586
                                ]
                            },
                            "properties": {
                                "title": "Mapbox DC"
                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-122.414, 37.776]
                            },
                            "properties": {
                                "title": "Mapbox SF"
                            }
                        }
                    ]
                
                
                }
            });

            // Add a symbol layer
            map.current?.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'flower',
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });
        }
    );
    map.current?.loadImage(
        'https://s2.loli.net/2022/10/11/M43uqZgWncsDN5f.png',
        (error, image) => {
            if (error) throw error;
            map.current?.addImage('green', image!);
            console.log("image", image)
            // Add a GeoJSON source with 2 points
            map.current?.addSource('points2', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features":
                        [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -9.136592,
                                    38.707751,
                                    
                                ]
                            },
                            "properties": {
                                "title": "Lisbon"
                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [52.3676, 4.9041]
                            },
                            "properties": {
                                "title": "Mapbox SF"
                            }
                        }
                    ]
                
                
                }
            });

            // Add a symbol layer
            map.current?.addLayer({
                'id': 'points2',
                'type': 'symbol',
                'source': 'points2',
                'layout': {
                    'icon-image': 'green',
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });
        }
    );
});
    }, []);








    return (
        <>
        <main>
        <div style={{width: 2000, height: 700}} ref={mapContainer} />
      </main>
      </>
    );
  };

  export default Map;
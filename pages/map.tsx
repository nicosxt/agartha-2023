import type { NextPage } from 'next';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import markers from './api/markers.json';
import GeoJSON  from 'geojson';
import Router from 'next/router'
import CommunityList from '../components/list';

const Map: NextPage = () => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [isListOpen, setIsListOpen] = useState(false);
    const toggleList = () => {
        const x = !isListOpen
        setIsListOpen(x);

        if(x===false){
        Router.reload()
        }

    } 
    useEffect(() => {
    }, [isListOpen]);


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
        'https://s2.loli.net/2022/10/11/agEyvQIZ942q3zK.png',
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
                                    -115.729622,
                                    33.350616,
                                ]
                            },
                            "properties": {
                                "title": "Mars College"
                                // "title": "Mars College, Bombay Beach, CA"
                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-73.9497211, 40.6526006]
                            },
                            "properties": {
                                "title": "706 NY"
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
        'https://s2.loli.net/2022/10/11/wBgnIM64aebP8rs.png',
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
                                   
                                    -8.5667,
                                    38,
                                ]
                            },
                            "properties": {
                                "title": "Traditional Dream Factory"
                                // "title": "Traditional Dream Factory, Setúbal, Portugal"

                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-97.7431, 30.2672, ]
                            },
                            "properties": {
                                "title": "CabinDAO"
                                // "title": "CabinDAO, Austin, TX"

                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-85.65194, 9.98017 ]
                            },
                            "properties": {
                                "title": "Panchamama"
                                // "title": "CabinDAO, Austin, TX"

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
              
        {!isListOpen && (<>
        <main>
        <div style={{width: 2000, height: 700}} ref={mapContainer} />
      </main>


      </>
    )}
    {isListOpen && (<>  
        <CommunityList />
        </>
    )}

<div className="fixed z-90 bottom-10 right-8 drop-shadow-lg flex justify-center items-center text-white text-4xl">

<label htmlFor="large-toggle" className="inline-flex relative items-center cursor-pointer">
<input type="checkbox" value="" id="large-toggle" className="sr-only peer" onClick={toggleList}/>
<div className="w-14 h-7 bg-[#FFDDED] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0000FF] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
</div>
        </>
    )
    
}

  export default Map;
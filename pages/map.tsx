import type { NextPage } from 'next';
import { collectionGroup,collection, query, where, getDocs, orderBy, limit, startAfter, getDoc} from "firebase/firestore";  
import { firestore } from '../lib/firebaseConfig/init'
import { getUserWithUsername, communityToJSON } from '../lib/firebaseConfig/init';

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import Router from 'next/router'
import CommunityList from '../components/list';
import { FeatureCollection } from 'geojson';
const Map: NextPage = () => {
    //get the list of communities
    const [geoJsonFlower, setGeoJsonFlower] = useState<any>(null);
    const [geoJsonGreen, setGeoJsonGreen] = useState<any>(null);

    const [communities, setcommunities] = useState<any>(null);
    useEffect(() => {
      const getCommunities = async () => {
      const communitiesQuery = query(
        collection(firestore, 'communities'),
        )
      setcommunities((await getDocs(communitiesQuery)).docs.map(communityToJSON));
      console.log("communities", communities);
      // setcommunities(communities);
      }
      getCommunities();
    
    }, []);

    useEffect(() => {
        if(communities){
            const transformedData = transformFlowerCommunities();
            console.log("transformedData Flower", transformedData);
            setGeoJsonFlower(transformedData);
        }
    }, [communities]);


    useEffect(() => {
        if(communities){
            const transformedData = transformGreenCommunities();
            console.log("transformedData Green", transformedData);
            setGeoJsonGreen(transformedData);
        }
    }, [communities]);


    const transformFlowerCommunities = (): FeatureCollection => {
        const flowerCommunities = communities.filter((community:any) => community.label==="flower");
        const features = flowerCommunities.map(
            (community:any) => {
                const longitude: number = +community.longitude;
                const latitude: number = +community.latitude;
                console.log("community Flower");

                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "properties": {
                        "title": community.communityName
                    }
                }
            }
            
        )
        return {
            "type": "FeatureCollection",
            "features": features
        }
    }

    const transformGreenCommunities = (): FeatureCollection => {
        const greenCommunities = communities.filter((community:any) => community.label==="green");
        const features = greenCommunities.map(
            (community:any) => {
                console.log("community Green");
                const longitude: number = +community.longitude;
                const latitude: number = +community.latitude;
                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "properties": {
                        "title": community.communityName
                    }
                }
                
            }
        )
        return {
            "type": "FeatureCollection",
            "features": features
        }
    }



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
            try{
            if (error) throw error;
            }catch(error){
                console.log(error);
            }
            if(map.current?.hasImage("flower")){
                map.current?.removeImage("flower");
            }
            map.current?.addImage('flower', image!);
            console.log("image", image)
            // Add a GeoJSON source with 2 points
            if(map.current?.getLayer('points')){
                map.current?.removeLayer("points");
            }
            if(map.current?.getSource('points')){
                map.current?.removeSource("points");
            }
            if(!map.current?.getSource('points')){
                map.current?.addSource('points', {
                    type: 'geojson',
                    data: geoJsonFlower
                });
            }

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
            try{
                if (error) throw error;
                }catch(error){
                    console.log(error);
                }
            if(map.current?.hasImage("green")){
                map.current?.removeImage("green");
            }
            map.current?.addImage('green', image!);
            console.log("image", image)
            // Add a GeoJSON source with 2 points
            if(map.current?.getLayer('points2')){
                map.current?.removeLayer("points2");
            }
            if(map.current?.getSource('points2')){
                map.current?.removeSource("points2");
            }
            if(!map.current?.getSource('points2')){
                map.current?.addSource('points2', {
                    type: 'geojson',
                    data: geoJsonGreen
                });
            }

            // Add a symbol layer
            if(!map.current?.getLayer('points2')){
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
        }
    )
    ;
});
    }, [geoJsonFlower, geoJsonGreen]);








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
<div className="w-14 h-7 bg-[#FFDDED] ring-4 ring-[#0000FF] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0000FF] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
</div>
        </>
    )
    
}

  export default Map;
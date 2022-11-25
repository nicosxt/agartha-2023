import type { NextPage } from 'next';
import { collectionGroup,collection, query, where, getDocs, orderBy, limit, startAfter, getDoc} from "firebase/firestore";  
import { firestore } from '../lib/firebaseConfig/init'
import { getUserWithUsername, communityToJSON } from '../lib/firebaseConfig/init';

import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
// import "../style/App.css";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import Router from 'next/router'
import CommunityList from '../components/list';
import { FeatureCollection } from 'geojson';
import { useRouter } from 'next/router';
const Map: NextPage = () => {
    const [isOn, setIsOn] = useState<any>(false);
    useEffect(() => {
        // background-color changes every time "isOn" 
        // changes using JavaScript DOM methods
        document.body.style.backgroundColor = 
                  isOn ? "#1c1c1c" : "#ffffff";
      }, [isOn]);
      


    const router = useRouter();
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
        // const flowerCommunities = communities.filter((community:any) => community.label==="flower");
        const flowerCommunities = communities;
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
                        "title": community.communityName,
                        "slug": community.slug

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
                console.log("slug tho", community.slug);
                const longitude: number = +community.longitude;
                const latitude: number = +community.latitude;
                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "properties": {
                        "title": community.communityName,
                        "slug": community.slug
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
    const [isListOpen, setIsListOpen] = useState(true);
    const toggleList = () => {
        const x = !isListOpen
        setIsListOpen(x);
        console.log("yo",x)
        // if(x===false){
        // Router.reload()
        // }

    } 
    useEffect(() => {
        console.log("I'm here", isListOpen);
        console.log("container", mapContainer.current);
    }, [isListOpen]);

    
    useEffect(() => {

        if(isListOpen===false){
        mapboxgl.accessToken=process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN??'';
        // if (map.current) return; // initialize map only once
        
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-39.4629, 35.7465],
            zoom: 2.8,

        });

        console.log(map.current)
        console.log(
            "map container", mapContainer.current
        )

      map.current?.on('load', () => {
    // Add an image to use as a custom marker



    map.current?.loadImage(
        'https://s2.loli.net/2022/10/25/fbt6uYgSUCTdGK4.png',
        (error, image) => {
            try{
            if (error) throw error;
            }catch(error){
                console.log(error);
                router.reload();
            }
            try{
                if(map.current?.hasImage("flower")){
                    map.current?.removeImage("flower");
                }
                if(map.current){
                    map.current?.addImage('flower', image!);

                }
            }catch(error){
                console.log(error);
                router.reload();
            }

         
            // Add a GeoJSON source with 2 points
            if(map.current?.getLayer('points')){
                map.current?.removeLayer("points");
            }
            if(map.current?.getSource('points')){
                map.current?.removeSource("points");
            }
            try{
                if(!map.current?.getSource('points')){
                    map.current?.addSource('points', {
                        type: 'geojson',
                        data: geoJsonFlower,
                        // cluster: true,
                        // clusterMaxZoom: 14, 
                        // clusterRadius: 50 
                    });
                }
            }catch(error){
                console.log(error);
                router.reload();
            }

            // Add a symbol layer
            try{
            
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
                        'text-anchor': 'top',
                       
                    }
                });
            }catch(error){
                console.log(error);
                router.reload();
            }

        }
    );
    map.current?.on('mouseenter', 'points', () => {
        map.current!.getCanvas().style.cursor = 'pointer'
      })
    map.current?.on('mouseleave', 'points', () => {
        map.current!.getCanvas().style.cursor = ''
      })
    map.current?.on('click', 'points', (e:any) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.slug;
        const slug = e.features[0].properties.slug;
        router.push(`/community/${slug}`);
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         

        });
    
    ;
});
}}, [geoJsonFlower, geoJsonGreen, isListOpen]);

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

<div onClick={toggleList} className="fixed z-90 bottom-10 right-8 drop-shadow-lg flex justify-center items-center text-white text-4xl">

<motion.div animate className=
          { `toggleSwitch ${isListOpen? "on " : "off"} `} >
        <motion.div animate>
            <div className="bg-[#0000FF] ">
            <div className='toggleImg'>

          <img className=
          {isListOpen ?
        
          "ml-6 py-3.5 "
          :
            "mx-5 py-2.5"
          }
          src={isListOpen
      ? 
      "https://s2.loli.net/2022/11/01/dYSHOGi8PcfyklQ.png"
      : 
"https://s2.loli.net/2022/11/01/RFmEylD2h7dAa3x.png"

  } />
</div>

  </div>
        </motion.div>
      </motion.div>
      <div className='toggleImg'>
      <img className= 
          {isListOpen ?
        
          "absolute bottom-3.5 right-20 "
          :
            "absolute bottom-4 right-6"
          }
          src={isListOpen
      ? 
      "https://s2.loli.net/2022/11/01/wYF7zAv6J3bHQLD.png"

      : 
      "https://s2.loli.net/2022/11/01/ZaAnoLSQXl14zpf.png"

  } />
  </div>
</div>

        </>
    )
    
}

  export default Map;

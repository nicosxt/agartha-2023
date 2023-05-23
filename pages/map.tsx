import type { NextPage } from 'next';
import { getCommunities, communitiesToGeoJson } from '../lib/community.ts';

import React from "react";
import { motion } from "framer-motion";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import CommunityList from '../components/list';
import { FeatureCollection } from 'geojson';
import { useRouter } from 'next/router';
import { fetchPages } from '../lib/notion';

const Map: NextPage = ({
  communities
}) => {
  const geo = communitiesToGeoJson(communities);
  const [isOn, setIsOn] = useState<any>(false);
  useEffect(() => {
    // background-color changes every time "isOn" 
    // changes using JavaScript DOM methods
    document.body.style.backgroundColor =
      isOn ? "#1c1c1c" : "#ffffff";
  }, [isOn]);

  const router = useRouter();

  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = () => {
    const x = !isListOpen
    setIsListOpen(x);
  }


  useEffect(() => {
    if (isListOpen === false) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-39.4629, 35.7465],
        zoom: .5,

      });
      map.current?.on('load', () => {
        // Add an image to use as a custom marker
        map.current?.loadImage(
          'https://s2.loli.net/2022/10/25/fbt6uYgSUCTdGK4.png',
          (error, image) => {
            try {
              if (error) throw error;
            } catch (error) {
              console.log(error);
            }

            try {
              if (!map.current?.getSource('points')) {
                map.current?.addSource('points', {
                  type: 'geojson',
                  data: communitiesToGeoJson(communities),
                  cluster: true,
                  clusterMaxZoom: 14, // Max zoom to cluster points on
                  clusterRadius: 50
                  // todo: 
                });

                map.current.addLayer({
                  id: 'clusters',
                  type: 'circle',
                  source: 'points',
                  filter: ['has', 'point_count'],
                  paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                      'step',
                      ['get', 'point_count'],
                      '#51bbd6',
                      2,
                      '#f1f075',
                      5,
                      '#f28cb1'
                    ],
                    'circle-radius': [
                      'step',
                      ['get', 'point_count'],
                      20,
                      2,
                      30,
                      5,
                      40
                    ]
                  }
                });


                map.current.addLayer({
                  id: 'cluster-count',
                  type: 'symbol',
                  source: 'points',
                  filter: ['has', 'point_count'],
                  layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                  }
                });

                map.current.addLayer({
                  id: 'unclustered-point',
                  type: 'circle',
                  source: 'points',
                  filter: ['!', ['has', 'point_count']],
                  paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                  }
                });

                map.current.on('click', 'clusters', (e) => {
                  const features = map.current.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                  });
                  const clusterId = features[0].properties.cluster_id;
                  map.current.getSource('points').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                      if (err) return;

                      map.current.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                      });
                    }
                  );
                });

                console.log(map.current?.getSource('points'))
              }
            } catch (error) {
              console.log(error);
              router.reload();
            }

            // Add a symbol layer
            try {
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
            } catch (error) {
              console.log(error);
              router.reload();
            }

          }
        );

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.current.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const title = e.features[0].properties.title;
          const slug = e.features[0].properties.slug;
          const description = e.features[0].properties.description;
          const image = e.features[0].properties.image;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `<h2><a href="/communities/${slug}">${title}</a></h2><p>${description.slice(0, 50)}...</p><img style="aspect-ratio: 1/1; width: 100%;"src="${image}"/>`
            )
            .addTo(map.current);
        });
        map.current?.on('mouseenter', 'points', () => {
          map.current!.getCanvas().style.cursor = 'pointer'
        })
        map.current?.on('mouseleave', 'points', () => {
          map.current!.getCanvas().style.cursor = ''
        })
      });
    }
  }, [communities, isListOpen, map]);

  return (
    <>

      {!isListOpen && (<>
        <main>
          <div style={{ width: 2000, height: 700, maxWidth: '100%' }} ref={mapContainer} />
        </main>


      </>
      )}
      {isListOpen && (<>
        <CommunityList />
      </>
      )}

      <div onClick={toggleList} className="fixed z-90 bottom-10 right-8 drop-shadow-lg flex justify-center items-center text-white text-4xl">

        <motion.div animate className=
          {`toggleSwitch ${isListOpen ? "on " : "off"} `} >
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
};


export default Map;

export async function getServerSideProps(context) {

  //https://www.notion.so/agarthamap/446c0e9d7937439ca478aa84e1ea9f15

  const response = await fetchPages('446c0e9d7937439ca478aa84e1ea9f15');

  const communities = response.results.map((c) => {
    return {
      id: c.id,
      last_edited_time: c.last_edited_time,
      created_time: c.created_time,
      properties: c.properties,
    };
  })

  return {
    props: {
      communities
    }, // will be passed to the page component as props
  };
}
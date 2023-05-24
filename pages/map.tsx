// @ts-nocheck

import type { NextPage } from 'next';
import { communitiesToGeoJson, parseNotionCommunity, Community } from '../lib/community';

import React from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import CommunityList from '../components/list';
import { useRouter } from 'next/router';
import { fetchPages } from '../lib/notion';

const Map: NextPage = ({
  communities,
}: any) => {
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
        style: 'mapbox://styles/syntonikka/cli1b7iw6005i01rb5rt30qxy',
        center: [-39.4629, 35.7465],
        zoom: 1.5,


      });
      map.current?.on('load', () => {
        // Add an image to use as a custom marker
        map.current?.loadImage(
          '/flower.png',
          (error, image) => {
            try {
              if (error) throw error;
            } catch (error) {
              console.log(error);
            }
            if (image) {

              map?.current?.addImage('flower', image);
            }

            try {
              if (!map.current?.getSource('points')) {
                map.current?.addSource('points', {
                  type: 'geojson',
                  data: communitiesToGeoJson(communities),
                  cluster: true,
                  clusterMaxZoom: 14, // Max zoom to cluster points on
                  clusterRadius: 50
                });

                // Add a symbol layer
                try {
                  map.current?.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    "filter": ["!has", "point_count"],
                    'layout': {
                      'icon-allow-overlap': true,
                      'icon-image': 'flower',
                      // get the title name from the source's "title" property
                      'text-field': ['get', 'title'],
                      'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                      ],
                      'text-size': 12,
                      'text-offset': [0, 1],
                      'text-anchor': 'top',
                    },
                    "paint": {
                      "text-color": "#0000FF"
                    }
                  });
                } catch (error) {
                  console.log(error);
                  router.reload();
                }

                map?.current?.addLayer({
                  id: 'clusters',
                  type: 'circle',
                  source: 'points',
                  filter: ['has', 'point_count'],
                  paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    'circle-color': [
                      'step',
                      ['get', 'point_count'],
                      '#FFDDED',
                      2,
                      '#FFDDED',
                    ],
                    'circle-radius': [
                      'step',
                      ['get', 'point_count'],
                      10,
                      2,
                      20,
                      5,
                      30
                    ]
                  }
                });


                map?.current?.addLayer({
                  id: 'cluster-count',
                  type: 'symbol',
                  source: 'points',
                  filter: ['has', 'point_count'],
                  layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                    'icon-image': '',
                  },
                  paint: {
                    "text-color": "#0000FF"
                  }
                });

                /**
                 * Clusters callback - zoom in
                 */
                map?.current?.on('click', 'clusters', (e) => {
                  const features = map?.current?.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                  });
                  const clusterId = features?.[0]?.properties?.cluster_id;
                  // @ts-nocheck

                  map?.current?.getSource('points')?.getClusterExpansionZoom(
                    clusterId,
                    (err: any, zoom: number) => {
                      if (err) return;

                      map?.current?.easeTo({
                        center: features?.[0]?.geometry?.coordinates,
                        zoom: zoom,
                        duration: 200,
                      });
                    }
                  );
                });
              }
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
        map.current.on('click', 'points', (e) => {

          /**
           * TODO:
           *  - when a point is clicked, have a centered modal appear.x
           */



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
            .setMaxWidth("350px")
            .setHTML(
              // todo: make this open CommunityProfile component in React tree
              // similar to instagram website when clicking a post from a profile
              `
              <div class='map-popup'>
              <h2>
              <a href="/community/${slug}"> ${title}</a>
              </h2>
              <p>${description.slice(0, 100)}...</p>
              <a href="/community/${slug}">Read more</a>
              <img style="aspect-ratio: 1/1; width: 100%;"src="${image}"/>
              </div>
              `
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
          <div style={{ height: 'calc(100vh - 4.75rem)', maxWidth: '100%' }} ref={mapContainer} />
        </main>
      </>
      )}
      {isListOpen && (<>
        <CommunityList communities={communities} />
      </>
      )}
      <label className="toggleListButton" htmlFor="mapListToggle">
        <input onClick={toggleList} type="checkbox" id="mapListToggle" />
          
        <div className="toggleTrack">
          <div className='toggleIndicator'></div>
          {/* Flower */}
          <svg className='flower' width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.48 7.05153C14.48 10.9097 9.39724 22.15 7.42482 22.15C5.4524 22.15 0.369629 10.9097 0.369629 7.05153C0.369629 3.19335 3.52835 0.0656738 7.42482 0.0656738C11.3213 0.0656738 14.48 3.19335 14.48 7.05153Z" fill={isListOpen ? '#0000FF' : '#FFDDED'} />
            <ellipse cx="7.42492" cy="7.69486" rx="5.03942" ry="4.8184" fill={isListOpen ? '#FFDDED' : '#0000FF'} />
          </svg>

          {/* hamburgher */}
          <svg className="burger" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2.12866" y1="9.04932" x2="18.0573" y2="9.04932" stroke={isListOpen ? '#FFDDED' : '#0000FF'} stroke-width="3" stroke-linecap="round" />
            <line x1="2.12866" y1="2.09009" x2="18.0573" y2="2.09009" stroke={isListOpen ? '#FFDDED' : '#0000FF'} stroke-width="3" stroke-linecap="round" />
            <line x1="2.12866" y1="16.418" x2="18.0573" y2="16.418" stroke={isListOpen ? '#FFDDED' : '#0000FF'} stroke-width="3" stroke-linecap="round" />
          </svg>
          </div>
      </label>
    </>
  )
};


export default Map;

export async function getServerSideProps(context) {
  //https://www.notion.so/agarthamap/446c0e9d7937439ca478aa84e1ea9f15
  const response = await fetchPages('446c0e9d7937439ca478aa84e1ea9f15');
  const communities = response.results.map(parseNotionCommunity);

  return {
    props: {
      communities
    }, // will be passed to the page component as props
  };
}
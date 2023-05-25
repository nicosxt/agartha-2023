import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useRef } from "react";
import { communitiesToGeoJson } from "../../lib/community";

export default function Map(props: any) {
  const { communities } = props;

  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/syntonikka/cli1b7iw6005i01rb5rt30qxy",
      center: [-39.4629, 35.7465],
      zoom: 1.5,
    });
    map.current?.on("load", () => {
      // Add an image to use as a custom marker
      map.current?.loadImage("/flower.png", (error, image) => {
        try {
          if (error) throw error;
        } catch (error) {
          console.log(error);
        }
        if (image) {
          map?.current?.addImage("flower", image);
        }

        try {
          if (!map.current?.getSource("points")) {
            map.current?.addSource("points", {
              type: "geojson",
              data: communitiesToGeoJson(communities),
              cluster: true,
              clusterMaxZoom: 14, // Max zoom to cluster points on
              clusterRadius: 50,
            });

            // Add a symbol layer
            try {
              map.current?.addLayer({
                id: "points",
                type: "symbol",
                source: "points",
                filter: ["!has", "point_count"],
                layout: {
                  "icon-allow-overlap": true,
                  "icon-image": "flower",
                  // get the title name from the source's "title" property
                  "text-field": ["get", "title"],
                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                  "text-size": 12,
                  "text-offset": [0, 1],
                  "text-anchor": "top",
                },
                paint: {
                  "text-color": "#0000FF",
                },
              });
            } catch (error) {
              console.log(error);
            }

            map?.current?.addLayer({
              id: "clusters",
              type: "circle",
              source: "points",
              filter: ["has", "point_count"],
              paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                "circle-color": [
                  "step",
                  ["get", "point_count"],
                  "#FFDDED",
                  2,
                  "#FFDDED",
                ],
                "circle-radius": [
                  "step",
                  ["get", "point_count"],
                  10,
                  2,
                  20,
                  5,
                  30,
                ],
              },
            });

            map?.current?.addLayer({
              id: "cluster-count",
              type: "symbol",
              source: "points",
              filter: ["has", "point_count"],
              layout: {
                "text-field": ["get", "point_count_abbreviated"],
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12,
                "icon-image": "",
              },
              paint: {
                "text-color": "#0000FF",
              },
            });

            /**
             * Clusters callback - zoom in
             */
            map?.current?.on("click", "clusters", (e) => {
              const features = map?.current?.queryRenderedFeatures(e.point, {
                layers: ["clusters"],
              });
              const clusterId = features?.[0]?.properties?.cluster_id;
              // @ts-nocheck

              map?.current
                ?.getSource("points")
                ?.getClusterExpansionZoom(
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
        }
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.current.on("click", "points", (e) => {
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
      map.current?.on("mouseenter", "points", () => {
        map.current!.getCanvas().style.cursor = "pointer";
      });
      map.current?.on("mouseleave", "points", () => {
        map.current!.getCanvas().style.cursor = "";
      });
    });
  }, [communities, map]);

  return (
    <main>
      <div
        style={{ height: "calc(100vh - 4.75rem)", maxWidth: "100%" }}
        ref={mapContainer}
      />
    </main>
  );
}

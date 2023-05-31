// @ts-nocheck
import type { NextPage } from "next";
import {
  parseNotionCommunity,
} from "../lib/community";

import React from "react";
import { useState } from "react";
import CommunityList from "../components/list";
import Map from "../components/map/map";
import MapStyles from '../components/map/map.module.css';
import { fetchPages } from "../lib/notion";
import Flower from "../components/svgs/flower";
import Hamburger from "../components/svgs/hamburger";
import ToggleButton from "../components/map/toggleButton";

const MapPage: NextPage = ({ communities, isListView, isBackground }: any) => {
  const [isListOpen, setIsListOpen] = useState(isListView);

  const toggleList = () => {
    const x = !isListOpen;
    setIsListOpen(x);
  };

  return (
    <>
      <div className={`${MapStyles.listToggleWrapper} ${isListOpen ? MapStyles.hide : ''}`} >
        <Map communities={communities} isBackground={isBackground} />
      </div>
      <div className={`${MapStyles.listToggleWrapper} ${isListOpen ? '' : MapStyles.hide}`}>
        <CommunityList communities={communities} />
      </div>
      <ToggleButton className={isBackground ? MapStyles.hide : ''} onClick={toggleList} open={isListOpen} />
    </>
  );
};

export default MapPage;

export async function getServerSideProps(context) {
  //https://www.notion.so/agarthamap/446c0e9d7937439ca478aa84e1ea9f15
  const response = await fetchPages("446c0e9d7937439ca478aa84e1ea9f15");
  const communities = response.results.map(parseNotionCommunity);

  const isListView = context?.query?.list ?? false;
  return {
    props: {
      communities,
      isListView,
    }, // will be passed to the page component as props
  };
}

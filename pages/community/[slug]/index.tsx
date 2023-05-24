import CommunityProfilePage from '../../../components/communities/CommunityProfilePage';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPages } from '../../../lib/notion';
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from 'next';
import { parseNotionCommunity } from '../../../lib/community';

export async function getServerSideProps(context: GetServerSideProps) {

    //https://www.notion.so/agarthamap/446c0e9d7937439ca478aa84e1ea9f15
  
    const response = await fetchPages('446c0e9d7937439ca478aa84e1ea9f15');
  
    const communities = response.results.map(parseNotionCommunity);
    const community = communities.find(({ slug }) => {
      return slug === context.query.slug
    })
    if (!community) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        community: community ?? {}
      },
    };
  }


export default function Community(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const community = props.community;
    const [isMobile, setIsMobile] = useState(false)
    const handleResize = () => {
        if (window.innerWidth < 640) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return community ? <CommunityProfilePage community={community}  /> : null;
}
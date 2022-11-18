
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
export default function EmailList(){
    const [emails, setEmails] = useState<any>(null);
    const [size, setSize] = useState(0);
    let  emailListQuery=null;
    useEffect(() => {
      const getCommunities = async () => {
       emailListQuery = query(
        collection(firestore, 'subscriptions'),
        )
      setEmails((await getDocs(emailListQuery)).docs.map(communityToJSON));
        setSize((await getDocs(emailListQuery)).size);
      console.log("emails", emails );
      // setcommunities(communities);
      }
      getCommunities();
    
    }, []);
    return (
        <div>
            <h1>Email List</h1>
            <h1>TotalNumber {size-3}</h1>
            <ul>
                {emails && emails.map((email: any) => (
                    <li key={email.email}>
                        <span>{email.email}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    
}
import Head from 'next/head'
import Link from 'next/link'
import { useAuth, signOut } from '../lib/authContext'
import { useRouter } from 'next/router';
import ParticlesCustom from '../components/layout/particles'
import { motion } from "framer-motion"
import { Banner, Container, Body } from '../components/styles/styles';
import Subscription from '../components/button/subscription';


import Map, {getServerSideProps as mapGetServerSideProps} from './map';

export default Map;
export const getServerSideProps = mapGetServerSideProps;
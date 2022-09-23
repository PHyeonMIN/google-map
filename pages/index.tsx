import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MapComponent from "../component/GoogleMap";
import Script from "next/script";

const Home: NextPage = () => {
  return (
        <MapComponent />
  );
}

export default Home

import type {NextPage} from 'next'
import GoogleMap2 from "../component/GoogleMap2";
import MapTab2 from "../component/MapTab2";
import MapTab1 from "../component/MapTab1";
import {useState} from "react";
import {useJsApiLoader} from "@react-google-maps/api";
import classes from "../styles/mapMain.module.scss";


const Home: NextPage = () => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
        libraries:['places'],
    });
  const [tab, setTab] = useState(1);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [mapState, setMapState] = useState<any>({
      address:"164-42 Mareuk-dong, Seo-gu, Kwangju, South Korea",
      city:"",
      area:"",
      state:"Gwangju",
      zoom:15,
      height: 400,
      mapPosition: {
          lat:35.1466323,
          lng:126.8473066,
      },
      markerPosition: {
          lat:35.1466323,
          lng:126.8473066
      }
  });

  const tabChage1 = () => {
      setTab(1);
  }
  const tabChage2 = () => {
      setTab(2);
  }

  const directionInfo = (info:any) => {
      setDirectionsResponse(info);
  }

    return (
      <>
          <div className={classes.wrapper}>
              <div className={classes.tabSpace}>
                  <div className={`${classes.tab} ${tab===1 && classes.active}`} onClick={tabChage1}>Basic</div>
                  <div className={`${classes.tab} ${tab===2 && classes.active}`} onClick={tabChage2}>Direction</div>
              </div>
              {tab===1 && <MapTab1 mapState={mapState}/>}
              {tab===2 && <MapTab2 directionInfo={directionInfo}/>}
          </div>
        <GoogleMap2 isLoaded={isLoaded} directionsResponse={directionsResponse} tab={tab} setMapState={setMapState} mapState={mapState}/>
      </>
  );
}

export default Home

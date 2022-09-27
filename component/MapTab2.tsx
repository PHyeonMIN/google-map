import classes from '../styles/mapTab2.module.scss';
import {Autocomplete} from "@react-google-maps/api";
import {useEffect, useRef, useState} from "react";

const MapTab2 = (props: {directionInfo:any,  map:any}) => {
    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);
    const [originPlace, setOriginPlace] = useState<any>(null);
    const [destinationPlace, setDestinationPlace] = useState<any>(null);

    const [distance, setDistance] = useState<any>('');
    const [duration, setDuration] = useState<any>('');


    useEffect(() => {
        if(props.map !== null ){
                setupPlaceChangedListener2();
        }
    },[originRef, destinationRef]);

    const setupPlaceChangedListener2 = async () => {
        // console.log(originRef.current);
        // console.log(destinationRef.current);

        const originAutoComplete = await new google.maps.places.Autocomplete(originRef.current!, { fields: ["place_id"]});
        const destinationAutoComplete = await new google.maps.places.Autocomplete(destinationRef.current!, { fields: ["place_id"]});
        // console.log("1.",originAutoComplete);
        // console.log("2.",destinationAutoComplete);
        originAutoComplete.bindTo("bounds",props.map);
        originAutoComplete.addListener("place_changed", () => {
            const originPlace = originAutoComplete.getPlace();
            console.log("222:",originPlace);
            if(!originPlace.place_id){
                alert("값 없음");
                return;
            }
            setOriginPlace(originPlace.place_id);
        });

        destinationAutoComplete.bindTo("bounds",props.map);
        destinationAutoComplete.addListener("place_changed", () => {
            const destinationPlace = destinationAutoComplete.getPlace();
            console.log("3333:",destinationPlace);

            if(!destinationPlace.place_id){
                alert("값 없음");
                return;
            }

            setDestinationPlace(destinationPlace.place_id);
        })

        // console.log(originPlace);
        // console.log(destinationPlace);
    }

    const calculateRoute =  async () => {
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin : {placeId:originPlace},
            destination: {placeId:destinationPlace},
            travelMode: google.maps.TravelMode.TRANSIT
        });
        console.log(results);
        props.directionInfo(results);
        // @ts-ignore
        setDistance(results.routes[0].legs[0].distance.text);
        // @ts-ignore
        setDuration(results.routes[0].legs[0].duration.text);
    }

    const clearRoute = () => {
        props.directionInfo('');
        setDistance('');
        setDuration('');
        // @ts-ignore
        originRef.current.value = '';
        // @ts-ignore
        destinationRef.current.value ='';
    }

    return (
           <div className={classes.content}>
               <div className={classes.searchBox}>
                   <Autocomplete>
                    <input className={classes.mapInput} placeholder="Origin" ref={originRef}/>
                   </Autocomplete>
                   <Autocomplete>
                     <input className={classes.mapInput} placeholder="Destination" ref={destinationRef}/>
                   </Autocomplete>
                   <button className={classes.calButton} onClick={calculateRoute}>Calculate Route</button>
                   <button className={classes.resetButton} onClick={clearRoute}>X</button>
               </div>
               <div className={classes.searchResult}>
                   <div>Distance: {distance}</div>
                   <div>Duration: {duration}</div>
                   <button className={classes.goCenter}></button>
               </div>
           </div>
    );
}

export default MapTab2;
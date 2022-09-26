import classes from '../styles/mapTab2.module.scss';
import {Autocomplete} from "@react-google-maps/api";
import {useRef, useState} from "react";

const MapTab2 = (props: {directionInfo:any}) => {
    const originRef = useRef<any>();
    const destinationRef = useRef<any>();
    const [distance, setDistance] = useState<any>('');
    const [duration, setDuration] = useState<any>('');

    const calculateRoute =  async () => {
        if(originRef.current.value === '' || destinationRef.current.value === ''){
            return;
        }
        console.log(originRef.current);
        console.log(destinationRef.current);

        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        });
        console.log(results);
        props.directionInfo(results);
        // @ts-ignore
        setDistance(results.routes[0].legs[0].distance.text);
        // @ts-ignore
        setDuration(results.routes[0].legs[0].duraiton.text);
    }

    const clearRoute = () => {
        props.directionInfo('');
        setDistance('');
        setDuration('');
        originRef.current.value = '';
        destinationRef.current.value='';
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
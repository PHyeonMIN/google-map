import {useRef} from "react";
import classes from "../styles/mapTab1.module.scss";
import {Autocomplete} from "react-google-autocomplete";

const MapTab3 = (props) => {
    const testRef = useRef();

    return (
        <div className={classes.content}>
            <div className={classes.searchBox}>
                {/*<input className={classes.mapInput} placeholder="test" ref={testRef}/>*/}
                {/*<Autocomplete*/}
                {/*    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}*/}
                {/*    onPlaceSelected={(place) => console.log(place)}*/}
                {/*/>*/}
            </div>
            <div className={classes.searchResult}>
                <div>City: {props.mapState && props.mapState.city}</div>
                <div>Area: {props.mapState && props.mapState.area}</div>
                <div>State: {props.mapState && props.mapState.state}</div>
                <div>Address: {props.mapState && props.mapState.address}</div>
                <button className={classes.goCenter}></button>
            </div>
        </div>
    )
}

export default MapTab3;
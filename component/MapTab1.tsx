import {useRef} from "react";
import classes from "../styles/mapTab1.module.scss";
// import {Autocomplete} from "react-google-autocomplete";
import {Autocomplete} from "@react-google-maps/api";

const MapTab1 = (props: {mapState:any}) => {
    const testRef = useRef<any>();

    return (
            <div className={classes.content}>
                <div className={classes.searchBox}>
                    {/*<Autocomplete>*/}
                        <input className={classes.mapInput} placeholder="test" ref={testRef}/>
                    {/*</Autocomplete>*/}
                    {/*<Autocomplete*/}
                    {/*    style={{width:"100%",height:'40px',paddingLeft:16, marginTop:2}}*/}
                    {/*    types*/}
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
    );
}

export default MapTab1;
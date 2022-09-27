import React, {useEffect, useRef, useState} from "react";
import classes from "../styles/mapTab1.module.scss";
import {Autocomplete} from "@react-google-maps/api";

const MapTab1 = (props: {mapState:any, map:any}) => {
    const testRef = useRef<HTMLInputElement>(null);

    // const testAutoComplete = new google.maps.places.Autocomplete(
    //     testRef.current!,
    //     {fields: ["place_id"]}
    // );
    useEffect(() => {
        if(props.map !== null ){
        setTimeout(() => {
            console.log(google);
            setupPlaceChangedListener();
        },1000);
        }
    },[testRef,props.map]);

    const setupPlaceChangedListener = async () => {
        const autocomplete = await new google.maps.places.Autocomplete(
            testRef.current!,
            {fields: ["place_id"]}
        )
        autocomplete.bindTo("bounds", props.map);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }
            console.log("박현민 : ",place.place_id);

        });
    }



    return (
            <div className={classes.content}>
                <div className={classes.searchBox}>
                    <input className={classes.mapInput} placeholder="test" ref={testRef as React.RefObject<HTMLInputElement>}/>
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
import {DirectionsRenderer, GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import {useMemo, useState} from "react";
import Geocode from "react-geocode";
import MapMouseEvent = google.maps.MapMouseEvent;

Geocode.setApiKey(`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`)

const GoogleMap2 = (props: { isLoaded: boolean, directionsResponse: any, tab: any, setMapState:any, mapState:any,setMap:any }) => {
    const center = useMemo(() => ({lat: 35.1466323, lng: 126.8473066}), [])

    // const [mapState, setMapState] = useState<any>({
    //     address:"",
    //     city:"",
    //     area:"",
    //     state:"",
    //     zoom:15,
    //     height: 400,
    //     mapPosition: {
    //         lat:0,
    //         lng:0,
    //     },
    //     markerPosition: {
    //         lat:0,
    //         lng:0
    //     }
    // });


    if (!props.isLoaded) {
        return <div>로딩 중...</div>
    }

    const getCity = (addressArray:any) => {
        let city = '';
        for (let index =0; index < addressArray.length; index++){
            if(addressArray[index].types[0] === "administrative_area_level_2"){
                city = addressArray[index].long_name;
                return city
            }
        }
    }

    const getArea = (addressArray:any) => {
        let area ='';
        for (let index=0; index<addressArray.length; index++) {
            if (addressArray[index].types[0]){
                for(let j =0; j<addressArray.length; j++){
                    if ('sublocality_level1' === addressArray[index].types[j] || 'locality' === addressArray[index].types[j]){
                        area = addressArray[index].long_name;
                        return area;
                    }
                }
            }
        }
    }

    const getState = (addressArray:any) => {
        let state = '';
        for (let index=0; index < addressArray.length; index++){
            if(addressArray[index].types[0] && "administrative_area_level_1" === addressArray[index].types[0]){
                state = addressArray[index].long_name;
                return state;
            }
        }
    }

    const onMarkerDragEnd = (event: MapMouseEvent) => {
        // @ts-ignore
        let newLat:any = event.latLng.lat();
        // @ts-ignore
        let newLng:any = event.latLng.lng();

        Geocode.fromLatLng(newLat , newLng)
            .then(response => {
                console.log("박현민 : ",response);
                const address = response.results[0].formatted_address;
                const addressArray = response.results[0].address_components;
                const city = getCity(addressArray);
                const area = getArea(addressArray);
                const state = getState(addressArray);
                props.setMapState({
                    address:(address) ? address:"",
                    area:(area) ? area:"",
                    city:(city) ? city:"",
                    state:(state) ? state:"",
                    mapPosition : {
                        lat: newLat,
                        lng: newLng
                    },
                    markerPosition : {
                        lat: newLat,
                        lng: newLng
                    },
                })
            })
    }


    return (
        <>
            <div style={{width: '100vw', height: '100vh'}}>
                <GoogleMap
                    center={{lat:props.mapState.mapPosition.lat, lng:props.mapState.mapPosition.lng}}
                    zoom={15}
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    options={{
                        zoomControl: true,
                        // streetViewControl: true,
                        // mapTypeControl : true,
                        // fullscreenControl: true
                    }}
                    onLoad={(map) => props.setMap(map)}
                >
                    <Marker
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        position={{lat:props.mapState.markerPosition.lat, lng:props.mapState.markerPosition.lng}}>
                        <InfoWindow>
                            <div>{props.mapState.address}</div>
                        </InfoWindow>
                    </Marker>
                    {props.directionsResponse && <DirectionsRenderer directions={props.directionsResponse}/>}
                </GoogleMap>
            </div>
            {/*<button onClick={() => map.panTo(center)}>중앙으로</button>*/}
        </>
    );
}

export default GoogleMap2;
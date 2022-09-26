import {GoogleMap, LoadScriptNext, MarkerF, useLoadScript} from '@react-google-maps/api'
import {useMemo} from 'react'

function GoogleMap1() {
    const center = useMemo(() => ({lat: 35.1466323, lng: 126.8473066}), [])

    return (
        <>
            <div style={{width:'800px', height:'800px'}}>
                <LoadScriptNext googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}>
                    <GoogleMap zoom={16} center={center} mapContainerClassName="map-container">
                        <MarkerF position={center} />
                    </GoogleMap>
                </LoadScriptNext>
            </div>
            <div style={{width:'800px', height:'800px'}}>

            </div>
        </>
    )
}
export default GoogleMap1


// 김대중컨벤션센터 : 126.8409538,35.1468849
// 여보야 : 126.8473066,35.1466323
// 유스퀘어 : 126.8798817,35.1612826
// 문화의 전당 : 126.9202542,35.1467193
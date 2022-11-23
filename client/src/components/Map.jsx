import {React} from 'react'
import {GoogleMap, LoadScript, Marker, useJsApiLoader, Autocomplete} from '@react-google-maps/api'


// function Maps() {
//     const {isLoaded} = useJsApiLoader({
//         googleMapsApiKey: "AIzaSyBsNsm6Q2ff_kE871Cs5oKr8fGdt66vXUY"
//     })
//     if (!isLoaded) {
//         return <h1>loading....</h1>
//     }
//     const marker = {lat: -33.6916153, lng: 150.9038549}
//     return (
//         <GoogleMap
//                 mapContainerStyle = {{width: '100%',height: '400px'}}
//                 center = {marker}
//                 zoom = {10}
//                 options = {{
//                     streetViewControl: false,
//                     fullscreenControl: false
//                 }}
//         ></GoogleMap>
//     )
// }


function Maps() {

    const marker = {lat: -33.6916153, lng: 150.9038549}

    const onLoad = () => {
        console.log('marker: ', marker)
    }

    return (
        <>
            <LoadScript 
                googleMapsApiKey = "AIzaSyBsNsm6Q2ff_kE871Cs5oKr8fGdt66vXUY"
            >
                <GoogleMap
                    mapContainerStyle = {{width: '100%',height: '400px'}}
                    center = {marker}
                    zoom = {10}
                    options = {{
                        streetViewControl: false,
                        fullscreenControl: false
                    }}
                >
                    <Marker className='tallawong_station_cp'
                        onLoad = {onLoad}
                        position = {{lat: -33.6916153, lng: 150.9038549}}
                    />

                    <Marker className='kellyville_station_cp'
                        position = {{lat: -33.713514, lng: 150.935304}}
                    />

                    <Marker className='revesby_car_park'
                        position = {{lat: -33.95246, lng: 151.014838}}
                    />

                    <Marker className='ashfield_cp'
                        position = {{lat: -33.8875506079, lng: 151.125504163}}
                    />

                    <Marker className='manly_vale_cp'
                        position = {{lat: -33.786247, lng: 151.26671}}
                    />

                    <Marker className='leppington_cp'
                        position = {{lat: -33.9544, lng: 150.8081}}
                    />

                </GoogleMap>
            </LoadScript>

                <form>
                        <input type='text' placeholder='origin' />



                        <input type='text' placeholder='destination' />

                    <input type='submit' value='calculate route' />
                </form>


        </>
    )
}


export default Maps











<Marker className='tallawong_station_cp'
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



import {React} from 'react'
import {
    GoogleMap, 
    LoadScript, 
    Marker, 
    Autocomplete,
    DirectionsService,
    DirectionsRenderer 
} from '@react-google-maps/api'

window.google = window.google ? window.google : {}
const { Component } = require('react')



const mapContainerStyle = {
  height: "400px",
  width: "800px"
}
const center = {lat: -33.6916153, lng: 150.9038549}


class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
        response: null,
        travelMode: 'DRIVING',
        origin: '',
        destination: ''
    }
    this.directionsCallback = this.directionsCallback.bind(this)
    this.checkDriving = this.checkDriving.bind(this)
    this.getOrigin = this.getOrigin.bind(this)
    this.getDestination = this.getDestination.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onMapClick = this.onMapClick.bind(this)

    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  checkDriving ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'DRIVING'
        })
      )
  }

  getOrigin (ref) {
    this.origin = ref
  }

  getDestination (ref) {
    this.destination = ref
  }

  onClick () {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(
        () => ({
          origin: this.origin.value,
          destination: this.destination.value
        })
      )
    }
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }


  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }


  onPlaceChanged () {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }


  render () {
    return (
        <>
            <LoadScript 
                googleMapsApiKey = "AIzaSyBsNsm6Q2ff_kE871Cs5oKr8fGdt66vXUY"
                libraries = {["places"]}
            >
                <GoogleMap
                id="searchbox-example"
                mapContainerStyle={mapContainerStyle}
                zoom={9.5}
                center={center}
                >
                    {
                        (
                            this.state.destination !== '' &&
                            this.state.origin !== ''
                        ) && (
                            <DirectionsService
                            // required
                                options={{ 
                                    destination: this.state.destination,
                                    origin: this.state.origin,
                                    travelMode: this.state.travelMode
                                }}
                                // required
                                callback={this.directionsCallback}
                            />
                        )
                    }
                    {
                        this.state.response !== null && (
                            <DirectionsRenderer
                            // required
                            options={{ 
                                directions: this.state.response
                            }}
                            />
                        )
                    }





                    <Autocomplete
                        onLoad={this.onLoad}
                        onPlaceChanged={this.onPlaceChanged}
                    >
                        <input
                        type="text"
                        placeholder="destination"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "25%",
                            marginLeft: "-120px"
                        }}
                        id = "ORIGIN"
                        className = 'form-control'
                        ref={this.getOrigin}
                        />
                    </Autocomplete>
                    <Autocomplete
                        onLoad={this.onLoad}
                        onPlaceChanged={this.onPlaceChanged}
                    >
                        <input
                        type="text"
                        placeholder="destination"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "75%",
                            marginLeft: "-120px"
                        }}
                        id = "DESTINATION"
                        className = 'form-control'
                        ref={this.getDestination}
                        />                    
                    </Autocomplete>
                </GoogleMap>
            </LoadScript>
            <button className='btn btn-primary' type='button' onClick={this.onClick}>
                Build Route
            </button>

            {/* <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} placeholder='origin' />
            <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} placeholder='destination'/> */}
        </>
    )
  }
}


export default Map

// export default Maps












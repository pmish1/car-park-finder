import {useRef, useState} from 'react'
import {
    GoogleMap, 
    LoadScript, 
    Marker, 
    Autocomplete,
    DirectionsService,
    DirectionsRenderer 
} from '@react-google-maps/api'

// window.google = window.google ? window.google : {}
const { Component } = require('react')



const mapContainerStyle = {
  height: "700px",
  width: "100%"
}
const center = {lat: -33.6916153, lng: 150.9038549}



// actualy displays the map from here
class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
        origin: '', //Chicago, IL
        destination: '', //Los Angeles, CA
        travelMode: 'DRIVING',
        results: null
    }

    // this.results = null

    this.autocompleteOrigin = null
    this.autocompleteDestination = null
    this.onLoadOrigin = this.onLoadOrigin.bind(this)
    this.onLoadDestination = this.onLoadDestination.bind(this)
    this.onPlaceChangedOrigin = this.onPlaceChangedOrigin.bind(this)
    this.onPlaceChangedDestination = this.onPlaceChangedDestination.bind(this)
  }
  
// --------------------------------------------------------------------
   calculateRoute = async () => {
    if (this.state.origin === '' || this.state.destination === '') {
        return 
    }
    console.log('got past if ')
    const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: this.state.origin.formatted_address,
        destination: this.state.destination.formatted_address,
        travelMode: 'DRIVING',
    })
    this.setState({...this.state, results: results})
    console.log('results check', this.state.results)
  }

// --------------------------------------------------------------------  
  onLoadOrigin (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocompleteOrigin = autocomplete
  }
  onLoadDestination (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocompleteDestination = autocomplete
  }

  // --------------------------------------------------------------------

  onPlaceChangedOrigin () {
    console.log('onplacechangedorigin ran')
    if (this.autocompleteOrigin !== null) {
      console.log(this.autocompleteOrigin.getPlace())
      this.state.origin = this.autocompleteOrigin.getPlace()
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }
  onPlaceChangedDestination () {
    console.log('onplacechangedestination ran')
    if (this.autocompleteDestination !== null) {
      this.state.destination = this.autocompleteDestination.getPlace()
    } else {
      console.log('Autocomplete is not loaded yet!')
    }

    
  }

// --------------------------------------------------------------------

  render () {
    return (
        <>
            <LoadScript 
                googleMapsApiKey = "AIzaSyBsNsm6Q2ff_kE871Cs5oKr8fGdt66vXUY"
                libraries = {["places", "directions"]}
            >
                <GoogleMap
                id="searchbox-example"
                mapContainerStyle={mapContainerStyle}
                zoom={9.5}
                center={center}
                >
      
                    <Autocomplete
                        onLoad={this.onLoadOrigin}
                        onPlaceChanged={this.onPlaceChangedOrigin}
                    >
                        <input
                            type="text"
                            placeholder="origin"
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
                            onChange = {(e) => {this.setState({origin: e.target.value})}}
                        />
                    </Autocomplete>
                    <Autocomplete
                            onLoad={this.onLoadDestination}
                            onPlaceChanged={this.onPlaceChangedDestination}
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
                                onChange = {(e) => {this.setState({destination: e.target.value})}}

                        />            
                    </Autocomplete>

                    {this.state.results && <DirectionsRenderer directions={this.state.results} />}

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

                </GoogleMap>
            </LoadScript>

            <button className='btn btn-primary' type='button' onClick={this.calculateRoute}>
                Build Route
            </button>


        </>
    )
  }
}


export default Map

// export default Maps












import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const Marker = ({ text }) => <div>{text}</div>;
const libraries = ['places'];

function Map({ onLocationSelect }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    rua: "",
    numero: "",
    freguesia: "",
    concelho: "",
    distrito: "",
    pais: "",
    codigo_postal: "",
    coordenadas: ""
  });
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  const handlePlaceSelect = (place) => {
    if (!place || !place.geometry || !place.geometry.location || !place.formatted_address) {
      alert("Morada inválida!");
      return;
    }

    setSearchAddress(place.formatted_address);

    const addressComponents = place.address_components;
    const geometryLocation = place.geometry.location;

    setFormData({
      rua: addressComponents.find(comp => comp.types.includes("route"))?.long_name || "",
      numero: addressComponents.find(comp => comp.types.includes("street_number"))?.long_name || "",
      freguesia: addressComponents.find(comp => comp.types.includes("sublocality_level_1"))?.long_name || "",
      concelho: addressComponents.find(comp => comp.types.includes("locality"))?.long_name || "",
      distrito: addressComponents.find(comp => comp.types.includes("administrative_area_level_1"))?.long_name || "",
      pais: addressComponents.find(comp => comp.types.includes("country"))?.long_name || "",
      codigo_postal: addressComponents.find(comp => comp.types.includes("postal_code"))?.long_name || "",
      coordenadas: `${geometryLocation.lat()}, ${geometryLocation.lng()}`
    });

    onLocationSelect({
      rua: addressComponents.find(comp => comp.types.includes("route"))?.long_name || "",
      numero: addressComponents.find(comp => comp.types.includes("street_number"))?.long_name || "",
      freguesia: addressComponents.find(comp => comp.types.includes("sublocality_level_1"))?.long_name || "",
      concelho: addressComponents.find(comp => comp.types.includes("locality"))?.long_name || "",
      distrito: addressComponents.find(comp => comp.types.includes("administrative_area_level_1"))?.long_name || "",
      pais: addressComponents.find(comp => comp.types.includes("country"))?.long_name || "",
      codigo_postal: addressComponents.find(comp => comp.types.includes("postal_code"))?.long_name || "",
      coordenadas: `${geometryLocation.lat()}, ${geometryLocation.lng()}`
    });
  };

  

  const defaultCenter = currentLocation || {
    lat: 41.17641365403422,
    lng: -8.647265045998875
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="AIzaSyBsR-z_AEG3wh1jiSYKsyeaK1b2u0egTlI"
        libraries={libraries}
      >
        <Autocomplete
          onLoad={(autocomplete) => {
            console.log(autocomplete);
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={() => {
            const place = autocompleteRef.current.getPlace();
            handlePlaceSelect(place);
          }}
        >
          <input
            type="text"
            placeholder="Pesquisar localização..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={defaultCenter}
          zoom={15}
        >
          <Marker
            lat={defaultCenter.lat}
            lng={defaultCenter.lng}
            text="My Marker"
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;

"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  StandaloneSearchBox,
  Autocomplete,
} from "@react-google-maps/api";

// const locations = [
//   { lat: 11.2588, lng: 75.7804, name: "Kozhikode" },
//   { lat: 27.672932021393862, lng: 85.31184012689732, name: "Kathmandu" },
//   { lat: 35.8799866, lng: 76.5048004, name: "K2" },
//   { lat: 9.4981, lng: 76.3388, name: "Alappuzha" },
//   // Add more locations as needed
// ];
interface Props {
  locations: any;
  className: string;
  height: any;
  width: any;
}

const Map: React.FC<Props> = ({ locations, className, height, width }) => {
  const libraries = useMemo(() => ["places"], []);
  const mapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 11.2588, lng: 75.7804 });

  // const locations = unitDetails.locations || [];

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as any,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new google.maps.LatLngBounds();
    locations?.forEach((location: any) => {
      bounds.extend(new google.maps.LatLng(location.lat, location.lng));
    });
    map.fitBounds(bounds);
  }, []);

  const onSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current?.getPlaces();

    if (places && places.length > 0) {
      const place = places[0];
      const location = {
        lat: place.geometry?.location?.lat() ?? 0,
        lng: place.geometry?.location?.lng() ?? 0,
      };
      setMapCenter(location);
      mapRef.current?.panTo(location);
      mapRef.current?.setZoom(10);
    }
  }, []);

  const handleMarkerClick = useCallback(
    (location: { lat: number; lng: number }) => {
      setMapCenter(location);
      mapRef.current?.panTo(location);
      mapRef.current?.setZoom(10);
    },
    []
  );

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new google.maps.LatLngBounds();
      locations?.forEach((location: any) => {
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [locations]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <GoogleMap
        options={mapOptions}
        onLoad={onMapLoad}
        center={mapCenter}
        zoom={10}
        mapContainerStyle={{ width: width, height: height, margin: 0 }}
        mapContainerClassName={className}
      //  className="md:w-[1007px] md:h-[700px] w-[300px] h-[400px]"
      >
        {locations?.map((location: any, index: number) => (
          <MarkerF
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() =>
              handleMarkerClick({
                lat: location.lat,
                lng: location.lng,
              })
            }
          />
        ))}
      </GoogleMap>
    </>
  );
};
export default Map;

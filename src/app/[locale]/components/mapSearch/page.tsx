"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";

const locations = [
  { lat: 11.2588, lng: 75.7804, name: "Kozhikode" },
  { lat: 27.672932021393862, lng: 85.31184012689732, name: "Kathmandu" },
  { lat: 35.8799866, lng: 76.5048004, name: "K2" },
  { lat: 9.4981, lng: 76.3388, name: "Alappuzha" },
  // Add more locations as needed
];
interface InputProps {
  name: string;
  label: string;
  register: any;
  type?: string;
  errors?: Record<string, any>; // Marking errors as optional
  mandatory?: Boolean;
}

const SearchBox: React.FC<InputProps> = ({
  label,
  register,
  errors,
  type,
  mandatory,
  name,
}) => {
  const libraries = useMemo(() => ["places"], []);
  const mapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 11.2588, lng: 75.7804 });

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
    locations.forEach((location) => {
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
      locations.forEach((location) => {
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
      <div className="flex items-center my-5 justify-between w-[460px]">
        <label className="block mb-2 text-base font-medium text-black">
          {label}
          {mandatory && <span className="text-red-500"> *</span>}
        </label>
        <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            className="bg-white border md:w-[412px] sm:w-[410px] w-full border-[#C5C7CD] placeholder:text-gray-500 text-black text-sm focus:ring-blue-500 focus:border-gray-500 block ps-3 p-2.5"
            type="text"
            placeholder="Search for places..."
            {...register(name)}
          />
        </StandaloneSearchBox>
      </div>
    </>
  );
};
export default SearchBox;

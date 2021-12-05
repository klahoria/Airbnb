import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

function Map(props) {
  const [selectedLocatoin, setselectedLocatoin] = useState({});
  const coordinates = props.searchResult.map((items) => {
    return { longitude: items.long, latitude: items.lat };
  });

  const center = getCenter(coordinates);

  const [viewport, setviewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/lahoria/ckws3mnwkbl9s15nvdoze0dsn"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      width="100%"
      height="100%"
      onViewStateChange={(nextViewport) => {
        setviewport(nextViewport);
      }}
    >
      {props.searchResult.map((items) => (
        <div className="" key={items.long}>
          <Marker
            longitude={items.long}
            latitude={items.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              aria-label="push-pin"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => {
                setselectedLocatoin(items);
              }}
            >
              📌
            </p>
          </Marker>

          {/* The popup thst show if we click on a Marker */}
          {selectedLocatoin?.long === items.long ? (
            <Popup
              onClose={() => {
                setselectedLocatoin({});
              }}
              closeOnClick={true}
              latitude={items.lat}
            >
              {items.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;

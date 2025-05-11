import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import {  useParams } from "react-router";


function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
        .then((res) => res.json())
        .then((data) => setEvent(data))
        .catch((err) => console.error(err));
    }, [id]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Event Details Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {event && (
        <div className="card bg-base-100 shadow-md">
            <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <h3 className="card-des">{event.description}</h3>
            <p>{new Date(event.date).toISOString().split("T")[0]}</p>

            <MapContainer
                center={[event.latitude, event.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-64 w-full rounded"
            >
                <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />      
                <CircleMarker
                center={[event.latitude, event.longitude]}
                radius={8}
                pathOptions={{
                    fillColor: '#3388ff',
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                }}
                >
                <Popup>
                    {event.title}<br />{event.location}
                </Popup>
                </CircleMarker>
            </MapContainer>
            </div>
        </div>
        )}

    </div>
    </div>
  );
}

export default EventDetails;
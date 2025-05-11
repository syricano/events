import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { useParams } from "react-router";

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">Event Details</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {event && (
          <>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{event.title}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>

            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Location:</span> {event.location}</p>
              <p><span className="font-medium">Date:</span> {new Date(event.date).toISOString().split("T")[0]}</p>
              <p><span className="font-medium">Created At:</span> {new Date(event.createdAt).toISOString().split("T")[0]}</p>
              <p><span className="font-medium">Updated At:</span> {new Date(event.updatedAt).toISOString().split("T")[0]}</p>
            </div>

            <div className="mt-6">
              <MapContainer
                center={[event.latitude, event.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-64 w-full rounded-lg z-0"
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
          </>
        )}
      </div>
    </div>
  );
}

export default EventDetails;

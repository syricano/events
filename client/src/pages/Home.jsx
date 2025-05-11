import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { Link } from "react-router";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{event.title}</h2>
            <p className="text-gray-600 mb-2"><span className="font-medium">Description:</span> {event.description}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium">Location:</span> {event.location}</p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Date:</span> {new Date(event.date).toISOString().split("T")[0]}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Created At:</span> {new Date(event.createdAt).toISOString().split("T")[0]}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Updated At:</span> {new Date(event.updatedAt).toISOString().split("T")[0]}
            </p>
            <div className="mb-4">
              <MapContainer
                center={[event.latitude, event.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-64 w-full rounded-lg"
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
            <div className="flex justify-end">
              <Link to={`/events/${event.id}`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm">
                Event Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

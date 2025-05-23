import {  useNavigate } from "react-router";
import { useState, useEffect } from "react";
import LocationSelectorMap from "../components/LocationSelectorMap";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

function CreateEvent() {
  
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");  
  const token = localStorage.getItem("token"); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { isLoggedIn } = useAuth();
  

  // Fetch users for dropdown
 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users");
      const data = await response.json();

    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  fetchUsers();
}, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      location,
      date: new Date().toISOString(),
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      organizerId: parseInt(userId),
    };

    try {
      const res = await fetch('http://localhost:3001/api/events', {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      console.log("Event created successfully:", data);
      navigate ('/')
    } catch (err) {
      console.error("Error creating event:", err);
    }
    
  };
  

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/signin" replace='true' />
      ) : (
      
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">Create a new Event</h1> 
  
        <form onSubmit={submitHandler} className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
          
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mt-1 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded mt-1 text-black"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded mt-1 text-black"
            />       
            <label className="block text-gray-700 font-medium mb-2">Pick a location on the map</label>
            <LocationSelectorMap
              onLocationChange={({ lat, lng }) => {
                setLatitude(lat.toFixed(8));
                setLongitude(lng.toFixed(8));
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Latitude</label>
              <input
                type="number"
                step="0.00000001"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full p-2 border rounded mt-1 text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Longitude</label>
              <input
                type="number"
                step="0.00000001"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full p-2 border rounded mt-1 text-black"
              />
            </div>
          </div>

          

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Event
          </button>
        </form>
      </div>)}
    </>
  );
}

export default CreateEvent;

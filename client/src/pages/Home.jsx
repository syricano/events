import { useState, useEffect } from "react";
import { Link } from "react-router";


function Home() {
    const [events, setevents] = useState([]);
    useEffect(() => {
      fetch('http://localhost:3001/api/events')
      .then( (res) => res.json() )
      .then( (data) => setevents(data.results))
      .catch( (err)=> console.error(err));     
    
    }, [])
    
  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((event) => (
            <div key={event.id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h2 className="card-title">{event.title}</h2>
                    <p>{new Date(event.date).toISOString().split("T")[0]}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">Event Details</Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
}

export default Home;

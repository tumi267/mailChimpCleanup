'use client'

import { useState } from "react";

function GetAudience() {
  // State to store the list of audiences
  const [lists, setLists] = useState([]);

  const getAudience = async () => {
    try {
      // Make a POST request to the API route
      const res = await fetch(`/api/getAudiance`, {
        method: "POST",                       // HTTP method
        headers: {
          "Content-Type": "application/json", // Content type header
        },
        cache: "no-store",                    // Prevents caching of the response
      });

      // Parse the JSON response
      const data = await res.json();

      // Check if the response contains data and lists
      if (data && data.data && data.data.lists) {
        setLists(data.data.lists);
      } else {
        console.error('Unexpected response format:', data);
      }

    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={getAudience}>Get Audience</button>
      {lists.length > 0 && (
        <div>
          {lists.map((e, i) => (
            <div key={i}>{e.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAudience;

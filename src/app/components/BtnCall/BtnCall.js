"use client"

import { useState } from "react";

function BtnCall({ call, name ,data}) {


  // Function to call the API route and create an audience
  const getAudience = async () => {
    try {
      // Make a POST request to the API route
      const res = await fetch(`/api/${call}`, {
        method: "POST",                       // HTTP method
        headers: {
          "Content-Type": "application/json", // Content type header
        },
        // body: JSON.stringify({ data}), // Send the data as JSON
        cache: "no-store",                    // Prevents caching of the response
      });

      // Parse the JSON response
      const data = await res.json();
      console.log(data); // Log the response data to the console

    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching data:', error);
    }
  };

  // Return a button that triggers the getAudience function when clicked
  return (
    <button onClick={getAudience}>{name}</button>
  );
}

export default BtnCall;
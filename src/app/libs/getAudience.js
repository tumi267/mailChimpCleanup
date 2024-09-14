const getAudience = async (setLists) => {
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

export default getAudience 
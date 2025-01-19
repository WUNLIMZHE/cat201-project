const handleApiCall = async (
  url,
  method = "GET",
  body = null,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const queryString =
      (method === "GET" || method === "DELETE") && body
        ? `?${new URLSearchParams(body).toString()}`
        : "";
    const response = await fetch(
      "http://localhost:9090/api/" + url + queryString,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body:
          method !== "GET" && method !== "DELETE" && body
            ? JSON.stringify(body)
            : null,
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("API call result: " + JSON.stringify(result));

      // Handle the result (storing userID and userRole in localStorage)
      if (result.loginStatus) {
        const user = JSON.parse(result.user); // Parse the user object from the response
        const userId = parseInt(user.userid, 10); // Convert userID to an integer
        const userRole = user.role; // Store the role as a string
        const address = user.address;

        // Store in localStorage
        localStorage.setItem("userID", userId);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("address", String(address));  // Ensure it's a string

        console.log("User ID stored:", userId);
        console.log("User Role stored:", userRole);
        console.log("User address stored:", address);
      }

      // Call onSuccess callback with the result
      onSuccess(result);
    } else {
      console.error("HTTP error", response.status, response.statusText);
      onError(response.statusText);
    }
  } catch (err) {
    console.error("Network error", err);
    onError(err.message);
  }
};

export default handleApiCall;

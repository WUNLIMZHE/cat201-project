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
      "http://localhost:9000/api/" + url + queryString,
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
      onSuccess(result);
      const user = result.user; // The user is already an object, so no need to parse
      const userId = parseInt(user.userid, 10); // Convert userID to an integer
      const userRole = user.role; // Store the role as a string
      const address = user.address; // Extract the address

      // Store in localStorage
      localStorage.setItem("userID", userId);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("address", address);

      console.log("User ID stored:", userId);
      console.log("User Role stored:", userRole);
      console.log("User address stored:", address);

      // Perform redirection based on role
      if (userRole === "admin") {
        window.location.href = "/"; // Redirect admins to "/"
      } else if (userRole === "user") {
        window.location.href = "/"; // Redirect regular users to "/"
      } else {
        console.error("Unknown role:", userRole);
      }
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

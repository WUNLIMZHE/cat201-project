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
      // const user = result.user; // The user is already an object, so no need to parse
      // const userId = parseInt(user.userid, 10); // Convert userID to an integer
      // const userRole = user.role; // Store the role as a string
      // const address = user.address; // Extract the address

      // // Store in localStorage
      // try {
      //   localStorage.setItem("userID", userId);
      //   console.log("User ID stored:", userId);
      // } catch (error) {
      //   console.error("Error storing user ID in localStorage:", error);
      // }

      // localStorage.setItem("userRole", userRole);
      // localStorage.setItem("address", address);

      // console.log("User ID stored:", userId, typeof userId);
      // console.log("User Role stored:", userRole);
      // console.log("User address stored:", address);
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

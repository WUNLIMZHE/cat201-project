const handleApiCall = async (
  url,
  method = "GET",
  body = null,
  onSuccess = () => {},
  onError = () => {}
) => {
  try {
    const queryString = (method === "GET" || method === "DELETE") && body ? `?${new URLSearchParams(body).toString()}` : "";
    const response = await fetch("http://localhost:9090/api/" + url + queryString, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" && method !== "DELETE" && body ? JSON.stringify(body) : null,
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      console.log("API call result: " + JSON.stringify(result));
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
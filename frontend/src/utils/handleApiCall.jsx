const BASE_URL = "http://localhost:9090/api/";

const handleApiCall = async (
  url,
  method,
  body,
  onSuccess,
  onError
) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      console.log("API call result: " + JSON.stringify(result));
      onSuccess(result);
    } else {
      console.error(
        "HTTP error",
        response.status,
        response.statusText
      );
      onError(response.statusText);
    }
  } catch (err) {
    onError(err.message);
  }
};

export default handleApiCall;
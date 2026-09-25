export const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(endpoint, options = {}) {
  let accessToken = localStorage.getItem("access");

  // 1. Original API request
  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 2. Access token expired
  if (response.status === 401) {
    console.log("Access token expired. Trying to refresh...");

    const refreshToken = localStorage.getItem("refresh");

    // Refresh token छैन
    if (!refreshToken) {
      console.log("No refresh token found.");
      return response;
    }

    // 3. Refresh token API
    const refreshResponse = await fetch(
      `${API_BASE_URL}/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    // 4. Refresh failed
    if (!refreshResponse.ok) {
      console.log("Refresh token expired or invalid.");
      return response;
    }

    // 5. Get new access token
    const refreshData = await refreshResponse.json();

    accessToken = refreshData.access;

    console.log("New access token received.");

    // 6. Save new access token
    localStorage.setItem("access", accessToken);

    // 7. Retry original request
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return response;
}
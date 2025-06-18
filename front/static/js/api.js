export const API_BASE_URL = "http://localhost:8000/api/";

export async function apiRequest(path, method, body = null) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null
    });
    return await response.json();
  } catch (error) {
    console.error("API Request failed:", error);
    return {};
  }
}

export async function get_transfer_list() {
  return await apiRequest('transfer/', 'GET');
}

export async function get_filter_list() {
  return {
    type: await apiRequest('type/', 'GET'),
    category: await apiRequest('category/', 'GET'),
    subcategory: await apiRequest('subcategory/', 'GET'),
    status: await apiRequest('status/', 'GET')
  };
}

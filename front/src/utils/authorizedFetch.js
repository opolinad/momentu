async function authorizedFetch(url, options = {}) {
  const token = localStorage.getItem('token'); 

  if (token) {
    if (!options.headers) {
      options.headers = {};
    }

    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export default authorizedFetch;

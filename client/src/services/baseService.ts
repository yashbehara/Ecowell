const baseURL = "http://localhost:5000";

/* base service to fetch data */
export const getData = async <T>(path: string, params: any): Promise<T> => {
  const query: URLSearchParams = new URLSearchParams(params);
  const response = await fetch(baseURL + path + query, {
    method: "GET",
  });

  const data: T = await response.json();
  return data;
};


/* base service to fetch data by id */
export const getDataById = async <T>(
  path: string,
  id: string,
  params: any
): Promise<T> => {
  const query: URLSearchParams = new URLSearchParams(params);
  const response = await fetch(baseURL + `${path}`, {
    method: "GET",
  });
  const data: T = await response.json();
  return data;
};


/* base service to post data */
export const postData = async <T>(path: string, body: any): Promise<T> => {
  const response = await fetch(baseURL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: T = await response.json();
  return data;
};


/* base service to update data */
export const updateData = async <T>(path: string, body: any): Promise<T> => {
  const response = await fetch(baseURL + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: T = await response.json();
  return data;
};


/* base service to delete data */
export const deleteData = async <T>(path: string): Promise<T> => {
  const response = await fetch(baseURL + path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: T = await response.json();
  return data;
};


/* base service to delete data */
export const deleteDataByJSON = async <T>(
  path: string,
  body: any
): Promise<T | null> => {
  try {
    const response = await fetch(baseURL + path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    // Check if the response is empty
    if (response.status === 200) {
      return null; // Return null for empty responses (HTTP 200 No Content)
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

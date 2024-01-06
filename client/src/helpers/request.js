import axios from "axios";

// Error handling function
const handleError = (error, { errorMessage: message = "" } = {}) => {
  throw new Error(error);
};

// GET request method
const get = (url, params, headers = {}, customErrorObject) => {
  return axios
    .get(url, { params, headers: { ...headers, Pragma: "no-cache" } })
    .then((response) => response)
    .catch((error) => {
      handleError(error, customErrorObject);
    });
};

// POST request method
const post = (url, data, headers, customErrorObject) => {
  return axios
    .post(url, data, { headers: { ...headers, Pragma: "no-cache" } })
    .then((response) => response)
    .catch((error) => {
      handleError(error, customErrorObject);
    });
};

// PUT request method
const put = (url, data, headers) => {
  return axios
    .put(url, data, { headers })
    .then((response) => response)
    .catch((error) => {
      handleError(error);
    });
};

// DELETE request method
const remove = (url, headers) => {
  return axios
    .delete(url, { headers })
    .then((response) => response)
    .catch((error) => {
      handleError(error);
    });
};

// PATCH request method
const patch = (url, data, headers, customErrorObject) => {
  return axios
    .patch(url, data, { headers })
    .then((response) => response)
    .catch((error) => {
      handleError(error, customErrorObject);
    });
};

export default { get, post, put, remove, patch, handleError };

export const setResponse = (data, response) => {
  response.status(200).json(data);
};

export const setErrorResponse  = (err, response) => {
  response.status(500).json({
    console: console.log(err),
    code: "Internal Server Error",
    message: "Error occured while processing your request",
  });
};

export const notFoundResponse = (response) => {
  response.status(404).json({
    code: "Resource not found",
    message:
      "The requested resource is not found while processing your request",
  });
};

export const invalidRequestFromClient = (response) => {
  response.status(400).json({
    code: "Bad request",
    message:
      "The server will not process the request due to invalid request from the client",
  });
};

export const resourceAlreadyExists = (response) => {
  response.status(409).json({
    code: "Resourse already exists",
    message:
      "The server will not process the request as the resource already exists",
  });
};

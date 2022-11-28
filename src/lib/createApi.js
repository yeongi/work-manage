export const CREATE_API = (route) => {
  return `http://${process.env.REACT_APP_HOST_IP}:${process.env.REACT_APP_SERVER_PORT}/${route}`;
};

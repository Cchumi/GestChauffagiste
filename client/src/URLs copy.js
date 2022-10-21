let URLs = {};

if (process.env.NODE_ENV === "production") {
  URLs = {
    baseURL: "/api",
    socketURL: "https://gestbouhet.herokuapp.com/api",
  };
} else {
  URLs = {
    baseURL: "http://localhost:3000/api",
    socketURL: "http://localhost:3000/api",
  };
}

export default URLs;
let URLs = {};

if (process.env.NODE_ENV === "production") {
  URLs = {
    baseURL: "/gestapi",
    socketURL: "https://prod.pierregagliardi.com/gestapi",
  };
} else {
  URLs = {
    baseURL: "http://localhost:3000/gestapi",
    socketURL: "http://localhost:3000/gestapi",
  };
}

export default URLs;
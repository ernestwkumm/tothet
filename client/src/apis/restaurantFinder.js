import axios from "axios";

// NODE_ENV = "development"
// NODE_ENV = "production"

// if we are in production besURL = /api/v1/restaurants
// else besURL = http://localhost:3006/api/v1/restaurants

// const baseURL = "http://localhost:3006/api/v1/restaurants";

const baseURL = process.env.NODE_ENV === "production" ? "api/v1/restaurants" : "http://localhost:3006/api/v1/restaurants";

export default axios.create({
  baseURL,
});

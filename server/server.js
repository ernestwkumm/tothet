require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());

app.use(express.json());

// Get all restaurants

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("select * from restaurants");

    const results = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { restaurants: results.rows },
    });
    // console.log(results);
  } catch (err) {
    console.log(err);
  }
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id where id=$1;", [req.params.id]);
    const reviews = await db.query("select * from reviews where restaurant_id=$1", [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a Restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query("INSERT INTO restaurants (name,location,priceRange) values ($1,$2,$3) returning *", [req.body.name, req.body.location, req.body.priceRange]);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
    // console.log(results);
  } catch (err) {
    console.log(err);
  }
});

// UPdate Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const results = await db.query("UPDATE restaurants SET name=$1,location=$2,priceRange=$3 where id=$4 returning *", [req.body.name, req.body.location, req.body.priceRange, req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id=$1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query("INSERT INTO reviews(restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating]);
    res.status(201).json({
      status: "sucess",
      data: { review: newReview.rows[0] },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

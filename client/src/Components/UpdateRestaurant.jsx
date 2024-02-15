import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import restaurantFinder from "../apis/restaurantFinder";
import { useNavigate } from "react-router-dom";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await restaurantFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.pricerange);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await restaurantFinder.put(`/${id}`, {
      name,
      location,
      priceRange,
    });
    navigate(`/`);
  };

  console.log(id);
  return (
    <div>
      <form action="">
        <div className="from-group">
          <label htmlFor="name">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} id="name" className="form-control" type="text" />
        </div>
        <div className="from-group">
          <label htmlFor="location">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} id="location" className="form-control" type="text" />
        </div>
        <div className="from-group">
          <label htmlFor="priceRange">Price Range</label>
          <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id="priceRange" className="form-control" type="number" />
        </div>
        <button type="Submit" onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;

import React from "react";
import Header from "../Components/Header";
import AddRestaurant from "../Components/AddRestaurant";
import RestauranList from "../Components/RestauranList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestauranList />
    </div>
  );
};

export default Home;

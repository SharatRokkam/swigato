import { Restaurant } from "../models/Restaurant";

export const createRestaurant = async (req, res) => {
  // create
  try {
    const restaurant = Restaurant.create(req.body);
    res.status(201).json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// read all
export const getRestaurants = async (req, res) => {
  const restaurants = Restaurant.find();

  res.json({ success: true, restaurants });
};

// Read one
export const getRestaurant = async (req, res) => {
  const restaurant = Restaurant.findById(req.params.id);

  res.json({ success: true, restaurant });
};


//update
export const updateRestaurant = async (req, res) => {
  const restaurant = Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ success: true, restaurant });
};


//delete
export const deleteRestaurant = async (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: "Restaurant Deleted" });
};

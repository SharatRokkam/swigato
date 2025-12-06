import MenuItem from "../models/MenuItem.js";

export const addMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create({
      restaurant: req.params.restaurantId,
      ...req.body,
    });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getMenu = async (req, res) => {
  const items = await MenuItem.find({ restaurant: req.params.restaurantId });
  res.json({ success: true, items });
};


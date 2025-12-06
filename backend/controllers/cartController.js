import Cart from "../models/Cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItem, qty } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ menuItem, qty }]
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.menuItem.toString() === menuItem
      );

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cart.items.push({ menuItem, qty });
      }
    }

    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.menuItem");
  res.json({ success: true, cart });
};

// Clear cart
export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user.id });
  res.json({ success: true, message: "Cart cleared" });
};

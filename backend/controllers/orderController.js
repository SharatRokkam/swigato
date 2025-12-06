import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurant, address } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(400).json({ message: "Cart is empty" });

    let total = 0;
    for (const item of cart.items) {
      const menu = await MenuItem.findById(item.menuItem);
      total += menu.price * item.qty;
    }

    const newOrder = await Order.create({
      user: userId,
      restaurant,
      items: cart.items,
      totalPrice: total,
      address
    });

    await Cart.findOneAndDelete({ user: userId });

    res.json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get orders of logged in user
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("items.menuItem")
    .populate("restaurant");

  res.json({ success: true, orders });
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    { status },
    { new: true }
  );

  res.json({ success: true, order });
};

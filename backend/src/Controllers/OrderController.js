import { processCheckout } from "../Models/OrderModel.js";

export const checkout = async (req, res) => {
  const userId = req.user.id;
  const { addressId, cardNumber } = req.body;

  // Basic validation
  if (!addressId || !cardNumber) {
    return res.status(400).json({
      success: false,
      message: "Address and card details are required"
    });
  }

  try {
    const orderId = await processCheckout(
      userId,
      addressId,
      cardNumber
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId
    });

  } catch (error) {
    console.error("Checkout Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Checkout failed"
    });
  }
};

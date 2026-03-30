import * as Address from "../Models/AddressModel.js";

// GET
export const getAddresses = async (req, res) => {
  try {
    const data = await Address.getAddressesByUser(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
export const addAddress = async (req, res) => {
  try {
    const result = await Address.createAddress({
      ...req.body,
      UserID: req.user.id
    });

    res.status(201).json({
      message: "Address added successfully",
      id: result.insertId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT
export const updateAddress = async (req, res) => {
  try {
    await Address.updateAddress(req.params.id, req.user.id, req.body);
    res.json({ message: "Address updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteAddress = async (req, res) => {
  try {
    await Address.deleteAddress(req.params.id, req.user.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
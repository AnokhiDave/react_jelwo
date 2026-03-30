import * as Reels from "../Models/ReelsModel.js";

/* GET */
export const getReels = async (req, res) => {
  try {
    const data = await Reels.getAllReels();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* POST */
export const createReel = async (req, res) => {
  try {
    const { ReelTitle, ReelVideo, ReelThumb, ProductID } = req.body;

    if (!ReelTitle || !ReelVideo || !ReelThumb || !ProductID) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const result = await Reels.addReel({
      ReelTitle,
      ReelVideo,
      ReelThumb,
      ProductID
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const removeReel = async (req, res) => {
  try {
    const result = await Reels.deleteReel(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
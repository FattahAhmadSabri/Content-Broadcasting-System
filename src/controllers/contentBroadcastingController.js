const { getLiveContentService } = require("../services/broadcastService");

const getLiveContent = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const data = await getLiveContentService(teacherId);

    if (!data) {
      return res.json({ message: "No content available" });
    }

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLiveContent };

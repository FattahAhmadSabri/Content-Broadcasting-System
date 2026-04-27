const { ContentSlot, Content } = require("../models");

const createSlot = async (req, res) => {
  try {
    const { subject } = req.body;

    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }
    const approvedContent = await Content.findOne({
      where: {
        subject,
        status: "approved",
      },
    });

    if (!approvedContent) {
      return res.status(400).json({
        message: "Cannot create slot: No approved content for this subject",
      });
    }

    const existingSlot = await ContentSlot.findOne({
      where: { subject },
    });

    if (existingSlot) {
      return res.status(400).json({
        message: "Slot already exists for this subject",
      });
    }

    const slot = await ContentSlot.create({ subject });

    res.status(201).json({
      status: "success",
      data: slot,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSlots = async (req, res) => {
  try {
    const slots = await ContentSlot.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({
      status: "success",
      data: slots,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSlotById = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await ContentSlot.findByPk(id, {
      where: { subject },
      include: [
        {
          model: Content,
          required: true,
          where: { status: "approved" },
        },
      ],
    });

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.json({
      status: "success",
      data: slot,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await ContentSlot.findByPk(id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    await slot.destroy();

    res.json({ message: "Slot deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSlotBySubject = async (req, res) => {
  try {
    const { subject } = req.params;

    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }

    const slot = await ContentSlot.findOne({
      where: { subject },
    });

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found for this subject",
      });
    }

    res.json({
      status: "success",
      data: slot,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSlot,
  getSlots,
  getSlotById,
  getSlotBySubject,
  deleteSlot,
};

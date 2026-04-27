const { ContentSchedule, Content, ContentSlot } = require("../models");

const createSchedule = async (req, res) => {
  try {
    const { content_id, slot_id, rotation_order, duration } = req.body;

    if (!content_id || !slot_id || !rotation_order || !duration) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const content = await Content.findByPk(content_id);

    if (!content || content.status !== "approved") {
      return res.status(400).json({
        message: "Content must be approved",
      });
    }

    const slot = await ContentSlot.findByPk(slot_id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    const existingOrder = await ContentSchedule.findOne({
      where: { slot_id, rotation_order },
    });

    if (existingOrder) {
      return res.status(400).json({
        message: "Rotation order already exists in this slot",
      });
    }

    const existingContent = await ContentSchedule.findOne({
      where: { slot_id, content_id },
    });

    if (existingContent) {
      return res.status(400).json({
        message: "Content already scheduled in this slot",
      });
    }

    const schedule = await ContentSchedule.create({
      content_id,
      slot_id,
      rotation_order,
      duration,
    });

    res.status(201).json({
      status: "success",
      data: schedule,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSchedulesBySlot = async (req, res) => {
  try {
    const { slotId } = req.params;

    const schedules = await ContentSchedule.findAll({
      where: { slot_id: slotId },
      include: [
        {
          model: Content,
          as: "content",
        },
      ],
      order: [["rotation_order", "ASC"]],
    });

    if (!schedules.length) {
      return res.json({
        message: "No schedules found for this slot",
      });
    }

    res.json({
      status: "success",
      data: schedules,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await ContentSchedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    await schedule.destroy();

    res.json({
      message: "Schedule deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createSchedule, getSchedulesBySlot, deleteSchedule };

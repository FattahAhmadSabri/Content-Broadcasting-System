const { ContentSchedule, Content, ContentSlot } = require("../models");

const getLiveContent = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const schedules = await ContentSchedule.findAll({
      include: [
        {
          model: Content,
          as: "content",
          where: {
            uploaded_by: teacherId,
            status: "approved",
          },
        },
        {
          model: ContentSlot,
          as: "slot",
        },
      ],
      order: [["rotation_order", "ASC"]],
    });

    if (!schedules.length) {
      return res.json({ message: "No content available" });
    }

    const slotMap = {};
    schedules.forEach((s) => {
      if (!slotMap[s.slot_id]) {
        slotMap[s.slot_id] = [];
      }
      slotMap[s.slot_id].push(s);
    });

    const result = [];

    for (let slotId in slotMap) {
      const items = slotMap[slotId];

      const totalCycle = items.reduce(
        (sum, i) => sum + i.duration * 60 * 1000,
        0,
      );

      const now = Date.now();
      const baseTime = new Date(items[0].created_at).getTime();
      const elapsed = (now - baseTime) % totalCycle;

      let accumulated = 0;
      let active = null;

      for (let i of items) {
        accumulated += i.duration * 60 * 1000;

        if (elapsed < accumulated) {
          active = i.content;
          break;
        }
      }

      if (active) {
        result.push({
          subject: items[0].slot.subject,
          content: active,
        });
      }
    }

    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLiveContent };

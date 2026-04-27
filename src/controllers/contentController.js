const { Content } = require("../models")


const createContent = async (req, res) => {
  try {
    const { title, description, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const contentUpload = await Content.create({
      title,
      description,
      subject,

      file_url: `http://localhost:4000/uploads/${req.file.filename}`,
      file_path: req.file.path,
      file_type: req.file.mimetype,
      file_size: req.file.size,

      uploaded_by: req.user.id,

      status: "pending",
    });

    res.status(201).json({
      status: "success",
      data: contentUpload,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContentDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const contentData = await Content.findByPk(id);

    if (!contentData) {
      return res.status(404).json({ message: "Content not found" });
    }

    const { status, approved_by, approved_at, ...rest } = req.body;

    await contentData.update({
      ...rest,

      file_url: req.file
        ? `http://localhost:4000/uploads/${req.file.filename}`
        : contentData.file_url,
    });

    res.status(200).json({
      status: "success",
      data: contentData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContentStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, rejection_reason } = req.body;

    // ✅ Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const contentData = await Content.findByPk(id);

    if (!contentData) {
      return res.status(404).json({ message: "Content not found" });
    }


    if (status === "rejected" && !rejection_reason) {
      return res.status(400).json({
        message: "Rejection reason is required when status is rejected",
      });
    }

    
    if (status === "approved") {
      await contentData.update({
        status,
        approved_by: req.user.id,
        approved_at: new Date(),
        rejection_reason: null,
      });
    } else {
      await contentData.update({
        status,
        rejection_reason,
        approved_by: null,
        approved_at: null,
      });
    }

    res.status(200).json({
      status: "success",
      data: contentData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContent = async (req, res) => {
  try {
    const getAllContent = await Content.findAll();

    res.status(200).json({
      status: "success",
      data: getAllContent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getApprovedContent = async (req, res) => {
  try {
    const getAllContent = await Content.findAll({
      where: {
        status: "approved"
      },
    });

    res.status(200).json({
      status: "success",
      data: getAllContent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {createContent, updateContentDetails,updateContentStatus,getContent, getApprovedContent}
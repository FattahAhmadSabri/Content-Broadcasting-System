"use strict";

module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "Content",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      subject: {
        type: DataTypes.ENUM("maths", "science", "english", "history", "other"),
        allowNull: false,
      },
      file_url: {
        type: DataTypes.STRING,
      },
      file_path: {
        type: DataTypes.STRING,
      },
      file_type: {
        type: DataTypes.STRING,
      },
      file_size: {
        type: DataTypes.INTEGER,
      },
      uploaded_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      rejection_reason: {
        type: DataTypes.TEXT,
      },
      approved_by: {
        type: DataTypes.UUID,
      },
      approved_at: {
        type: DataTypes.DATE,
      },
      start_time: {
        type: DataTypes.DATE,
      },
      end_time: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "Contents",
      timestamps: true,
    },
  );
  Content.associate = (models) => {
    Content.hasMany(models.ContentSchedule, {
      foreignKey: "content_id",
      as: "schedules",
    });
  };

  return Content;
};

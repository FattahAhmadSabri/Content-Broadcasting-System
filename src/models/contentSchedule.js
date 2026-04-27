"use strict";

module.exports = (sequelize, DataTypes) => {
  const ContentSchedule = sequelize.define(
    "ContentSchedule",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      content_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      slot_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      rotation_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "content_schedules",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  ContentSchedule.associate = (models) => {
    ContentSchedule.belongsTo(models.Content, {
      foreignKey: "content_id",
      as: "content",
    });

    ContentSchedule.belongsTo(models.ContentSlot, {
      foreignKey: "slot_id",
      as: "slot",
    });
  };

  return ContentSchedule;
};
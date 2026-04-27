"use strict";

module.exports = (sequelize, DataTypes) => {
  const ContentSlot = sequelize.define(
    "ContentSlot",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      subject: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
    },
    {
      tableName: "content_slots",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return ContentSlot;
};
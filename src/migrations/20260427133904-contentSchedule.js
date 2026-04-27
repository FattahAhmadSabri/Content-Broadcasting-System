"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("content_schedules", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      content_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Contents", 
          key: "id",
        },
        onDelete: "CASCADE",
      },

      slot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "content_slots",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      rotation_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("content_schedules");
  },
};
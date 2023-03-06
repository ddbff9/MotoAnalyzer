'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Riders', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Event_Soils', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Venue_Types', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Venues', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      type_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Venue_Types',
          key: 'id',
        },
      },
      open_air: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      state: {
        type: Sequelize.CHAR(2),
        allowNull: false,
      },
      zipcode: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Event_Classes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(2),
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      displacement: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Event_Sessions', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      abbreviation: {
        type: Sequelize.CHAR(2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Events', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      ama_id: {
        type: Sequelize.STRING(45),
      },
      type: {
        type: Sequelize.CHAR(2),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING(3),
      },
      venue_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Venues',
          key: 'id',
        },
      },
      round_number: {
        type: Sequelize.INTEGER(11),
      },
      triple_crown: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      gate_drop: {
        type: Sequelize.DATE,
      },
      whoop_section: {
        type: Sequelize.INTEGER(11),
      },
      sand_section: {
        type: Sequelize.INTEGER(11),
      },
      soil_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Event_Soils',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Event_Results', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      event_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id',
        },
      },
      class_id: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        references: {
          model: 'Event_Classes',
          key: 'id',
        },
      },
      session_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Event_Sessions',
          key: 'id',
        },
      },
      rider_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Riders',
          key: 'id',
        },
      },
      position: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  },
};

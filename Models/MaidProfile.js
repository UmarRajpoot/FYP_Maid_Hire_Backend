import { Sequelize } from "sequelize";
import sequelize from "../Config/ModelConfig.js";

const MaidProfile = sequelize.define("MaidProfile", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  servicename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  location: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  workinghours: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  workingDays: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  charges: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  IDCardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photoURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default MaidProfile;

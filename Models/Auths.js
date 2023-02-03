import { Sequelize } from "sequelize";
import sequelize from "../Config/ModelConfig.js";

const Auth = sequelize.define("Auths", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  emailVerified: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: false,
  },
  photoURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Auth;

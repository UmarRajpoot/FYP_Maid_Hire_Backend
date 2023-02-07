import { Sequelize } from "sequelize";
import sequelize from "../Config/ModelConfig.js";

const AuthProfile = sequelize.define("AuthProfile", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photoURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default AuthProfile;

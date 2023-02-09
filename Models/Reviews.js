import { Sequelize } from "sequelize";
import sequelize from "../Config/ModelConfig.js";

const Reviews = sequelize.define("Reviews", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  customerId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maidId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reviewstar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reviewtext: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Reviews;

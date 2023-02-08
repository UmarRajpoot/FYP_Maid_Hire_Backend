import { Sequelize } from "sequelize";
import sequelize from "../Config/ModelConfig.js";

const Perposal = sequelize.define("Perposal", {
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
  isaccpted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Perposal;

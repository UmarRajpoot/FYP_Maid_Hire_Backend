import sequelize from "./ModelConfig.js";
import Auths from "../Models/Auths.js";
import MaidProfile from "../Models/MaidProfile.js";

MaidProfile.hasOne(Auths, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Success!");
  })
  .catch((err) => {
    console.log(err);
  });

// Add all data and Sync

sequelize.sync({ alter: true }).then(() => {
  console.log("Sync Done.");
});

export default sequelize;

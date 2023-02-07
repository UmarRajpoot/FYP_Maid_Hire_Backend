import sequelize from "./ModelConfig.js";
// For Authentication
import Auths from "../Models/Auths.js";
// For Maid Profile for Listing
import MaidProfile from "../Models/MaidProfile.js";
// For Auth Profile for image and username
import AuthProfile from "../Models/AuthProfile.js";

MaidProfile.hasOne(Auths, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

AuthProfile.hasOne(Auths, {
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

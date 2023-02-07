import createHttpError from "http-errors";
import Joi from "joi";
import AuthProfile from "../Models/AuthProfile.js";

export default {
  addProfile: async (req, res, next) => {
    try {
      const auth_profile_schema = Joi.object({
        username: Joi.string().required().trim(),
        photoURL: Joi.string(),
      });

      const validatesResult = await auth_profile_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );

      const add_profile = await AuthProfile.create({
        username: validatesResult.value.username,
        photoURL: validatesResult.value.photoURL,
      })
        .then((resp) => {
          return res.status(201).send({
            success: true,
            message: resp.dataValues,
          });
        })
        .catch((error) => {
          return next(
            createHttpError(406, {
              success: false,
              message: error.message && error.errors,
            })
          );
        });
    } catch (error) {
      console.log(error);
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },
};

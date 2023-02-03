import createHttpError from "http-errors";
import Auth from "../Models/Auths.js";
import Joi from "joi";
import Bcrypt from "bcrypt";

export default {
  Register: async (req, res, next) => {
    try {
      const register_joi_schema = Joi.object({
        email: Joi.string().email().lowercase().required().trim(),
        password: Joi.string().min(6).required().trim(),
      });
      const validatesResult = await register_joi_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );
      const check_user = await Auth.findOne({
        where: {
          email: validatesResult.value.email,
        },
      });

      if (check_user) {
        return next(
          createHttpError(406, {
            success: false,
            message: "User Already Exists. Need to Login.",
          })
        );
      } else {
        const hash_password = await Bcrypt.hash(
          validatesResult.value.password,
          10
        ).then((res) => res);
        const addUser = await Auth.create({
          email: validatesResult.value.email,
          password: hash_password,
        })
          .then((resp) => {
            return res.status(201).send({
              success: true,
              message: "Registeration Succeed.",
              response: resp,
            });
          })
          .catch((error) => {
            return next(
              createHttpError(406, { success: false, message: error.message })
            );
          });
      }
    } catch (error) {
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },
  Login: async (req, res, next) => {
    try {
      const login_schema = Joi.object({
        email: Joi.string().email().lowercase().required().trim(),
        password: Joi.string().min(6).required().trim(),
      });

      const validatesResult = await login_schema.validateAsync(req.body, {
        errors: true,
        warnings: true,
      });
      const check_user = await Auth.findOne({
        where: {
          email: validatesResult.value.email,
        },
      });
      if (!check_user) {
        return next(
          createHttpError(406, {
            success: false,
            message: "User is not Exists. Register Please.",
          })
        );
      } else {
        // User Existed
        const Compared_password = await Bcrypt.compare(
          validatesResult.value.password,
          check_user.dataValues.password
        ).then((res) => res);

        if (Compared_password) {
          return res.send({
            success: true,
            message: "Login Successfully.",
            response: check_user,
          });
        } else {
          return res
            .status(406)
            .send({ success: false, message: "Password is Incorrect" });
        }
      }
    } catch (error) {
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },
  updateMaidID: async (req, res, next) => {
    try {
      const maidProfileUpdate_schema = Joi.object({
        authID: Joi.string().required(),
        MaidProfileId: Joi.string().required(),
      });

      const validatesResult = await maidProfileUpdate_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );

      const check_user = await Auth.findOne({
        where: {
          id: validatesResult.value.authID,
        },
      });

      if (!check_user) {
        return next(
          createHttpError(406, {
            success: false,
            message: "User is not Exists.",
          })
        );
      } else {
        console.log("Into Update");
        const AuthUpdate = await Auth.update(
          {
            MaidProfileId: validatesResult.value.MaidProfileId,
          },
          {
            where: {
              id: validatesResult.value.authID,
            },
          }
        )
          .then(() => {
            return res.status(201).send({
              success: true,
              message: "Updated Successfully.",
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
      }
    } catch (error) {
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },
};

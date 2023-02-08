import createHttpError from "http-errors";
import Joi from "joi";
import MaidProfile from "../Models/MaidProfile.js";
import Auth from "../Models/Auths.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

export default {
  createProfile: async (req, res, next) => {
    try {
      const maid_profile_schema = Joi.object({
        fullname: Joi.string().required().trim(),
        servicename: Joi.string().required().trim(),
        email: Joi.string().email().lowercase().required().trim(),
        location: Joi.required(),
        workinghours: Joi.required(),
        workingDays: Joi.required(),
        charges: Joi.required(),
        IDCardNumber: Joi.string().required().trim(),
        authId: Joi.string().required().trim(),
      });
      const validatesResult = await maid_profile_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );

      const create_profile = await MaidProfile.create({
        fullname: validatesResult.value.fullname,
        servicename: validatesResult.value.servicename,
        email: validatesResult.value.email,
        location: validatesResult.value.location,
        workinghours: validatesResult.value.workinghours,
        workingDays: validatesResult.value.workingDays,
        charges: validatesResult.value.charges,
        IDCardNumber: validatesResult.value.IDCardNumber,
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
  updateProfile: async (req, res, next) => {
    try {
      const maid_profile_schema = Joi.object({
        fullname: Joi.string().required().trim(),
        servicename: Joi.string().required().trim(),
        email: Joi.string().email().lowercase().required().trim(),
        location: Joi.required(),
        workinghours: Joi.required(),
        workingDays: Joi.required(),
        charges: Joi.required(),
        IDCardNumber: Joi.string().required().trim(),
        profileID: Joi.string().required(), // which you want to update
      });
      const validatesResult = await maid_profile_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );
      const {
        fullname,
        servicename,
        email,
        location,
        workinghours,
        workingDays,
        charges,
        IDCardNumber,
        profileID,
      } = validatesResult.value;

      let single_profile_data = {};

      const update_profile = await MaidProfile.findOne({
        where: {
          id: profileID,
        },
      }).then((resp) => {
        return Object.assign(single_profile_data, resp.dataValues);
      });

      const update_data = {
        fullname: fullname ? fullname : single_profile_data.fullname,
        servicename: servicename
          ? servicename
          : single_profile_data.servicename,
        email: email ? email : single_profile_data.email,
        location: location ? location : single_profile_data.location,
        workinghours: workinghours
          ? workinghours
          : single_profile_data.workinghours,
        workingDays: workingDays
          ? workingDays
          : single_profile_data.workingDays,
        charges: charges ? charges : single_profile_data.charges,
        IDCardNumber: IDCardNumber
          ? IDCardNumber
          : single_profile_data.IDCardNumber,
      };

      const update_restaurnat = await MaidProfile.update(update_data, {
        where: {
          id: profileID,
        },
      })
        .then((resp) => {
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
    } catch (error) {
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },
  get_maid_profile: async (req, res, next) => {
    try {
      const get_maid_schema = Joi.object({
        MaidProfileId: Joi.string().required(),
      });

      const validatesResult = await get_maid_schema.validateAsync(req.body, {
        errors: true,
        warnings: true,
      });

      const check_user = await MaidProfile.findOne({
        where: {
          id: validatesResult.value.MaidProfileId,
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
        const get_profile = await MaidProfile.findOne({
          where: {
            id: validatesResult.value.MaidProfileId,
          },
        })
          .then((resp) => {
            return res.status(201).send({
              success: true,
              message: resp,
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
  get_all_profile: async (req, res, next) => {
    try {
      const get_profile = await MaidProfile.findAll({})
        .then((resp) => {
          return res.status(201).send({
            response: resp,
          });
        })
        .catch((error) => {
          return next(
            createHttpError(406, { success: false, message: error.message })
          );
        });
    } catch (error) {
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },

  profile_photo: async (req, res, next) => {
    try {
      const get_maid_schema = Joi.object({
        MaidProfileId: Joi.string().required(),
        photoURL: Joi.string().required(),
      });

      const validatesResult = await get_maid_schema.validateAsync(req.body, {
        errors: true,
        warnings: true,
      });

      const check_user = await MaidProfile.findOne({
        where: {
          id: validatesResult.value.MaidProfileId,
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
        const get_profile = await MaidProfile.update(
          {
            photoURL: validatesResult.value.photoURL,
          },
          {
            where: {
              id: validatesResult.value.MaidProfileId,
            },
          }
        )
          .then((resp) => {
            return res.status(201).send({
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

  deleteProfile: async (req, res, next) => {
    try {
      const { authId } = req.body;
      const delete_Profile = await MaidProfile.destroy({
        where: {
          id: authId,
        },
      }).then((resp) => {
        return res.send({
          success: true,
          message: "Deleted",
        });
      });
    } catch (error) {
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },
};

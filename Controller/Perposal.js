import createHttpError from "http-errors";
import Joi from "joi";
import Perposal from "../Models/Perposal.js";

export default {
  createPerposal: async (req, res, next) => {
    try {
      const register_joi_schema = Joi.object({
        customerId: Joi.string().required().trim(),
        maidId: Joi.string().required().trim(),
      });
      const validatesResult = await register_joi_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );

      const createPerposal = await Perposal.create({
        customerId: validatesResult.value.customerId,
        maidId: validatesResult.value.maidId,
      })
        .then((resp) => {
          return res.status(201).send({
            success: true,
            message: "Perposal Send.",
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

  getperposal: async (req, res, next) => {
    try {
      const register_joi_schema = Joi.object({
        maidId: Joi.string().required().trim(),
      });
      const validatesResult = await register_joi_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );
      const createPerposal = await Perposal.findOne({
        where: {
          maidId: validatesResult.value.maidId,
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
    } catch (error) {
      return next(
        createHttpError(406, { success: false, message: error.message })
      );
    }
  },
  acceptPerposal: async (req, res, next) => {
    try {
      //  MAid will accept the perposal
      // isaccept true
      const register_joi_schema = Joi.object({
        perposalID: Joi.string().required().trim(),
      });
      const validatesResult = await register_joi_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );

      const findPerposal = await Perposal.findOne({
        where: {
          id: validatesResult.value.perposalID,
        },
      });

      if (!findPerposal) {
        return next(
          createHttpError(406, {
            success: false,
            message: "Perposal Not Found.",
          })
        );
      } else {
        // Update perposal for accepted
        const updatePerposal = await Perposal.update(
          {
            isaccpted: true,
          },
          {
            where: {
              id: validatesResult.value.perposalID,
            },
          }
        )
          .then((resp) => {
            return res.status(201).send({
              success: true,
              message: "Perposal Accepted.",
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
};

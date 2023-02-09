import createHttpError from "http-errors";
import Joi from "joi";
import Reviews from "../Models/Reviews";

export default {
  createReview: async (req, res, next) => {
    try {
      const create_review_schema = Joi.object({
        customerId: Joi.string().required().trim(),
        maidId: Joi.string().required().trim(),
        reviewstar: Joi.string().required().trim(),
        reviewtext: Joi.string().required().trim(),
      });
      const validatesResult = await create_review_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );
      const createPerposal = await Reviews.create({
        customerId: validatesResult.value.customerId,
        maidId: validatesResult.value.maidId,
        reviewstar: validatesResult.value.reviewstar,
        reviewtext: validatesResult.value.reviewtext,
      })
        .then((resp) => {
          return res.status(201).send({
            success: true,
            message: "Review Submitted.",
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
  getMaidReviews: async (req, res, next) => {
    try {
      const get_maid_review_schema = Joi.object({
        maidId: Joi.string().required().trim(),
      });
      const validatesResult = await get_maid_review_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );
      const getMaidReview = await Reviews.findOne({
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
  getCustomerReviews: async (req, res, next) => {
    try {
      const get_customer_reviews_schema = Joi.object({
        customerId: Joi.string().required().trim(),
      });
      const validatesResult = await get_customer_reviews_schema.validateAsync(
        req.body,
        {
          errors: true,
          warnings: true,
        }
      );
      const getCustomerReview = await Reviews.findOne({
        where: {
          customerId: validatesResult.value.customerId,
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
};

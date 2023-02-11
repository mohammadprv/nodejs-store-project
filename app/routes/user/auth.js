const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();


/**
 * @swagger
 * tags:
 *  name: User-Authorization
 *  description: User authorization sections
 */
/**
 * @swagger
 * /user/get-otp:
 *      post:
 *          summary: User login with phone number
 *          tags: [User-Authorization]
 *          description: One Time Password (OTP)
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal server error
 */

router.post("/get-otp", UserAuthController.getOtp);


/**
 * @swagger
 * /user/check-otp:
 *      post:
 *          summary: check otp value
 *          tags: [User-Authorization]
 *          description: Check Otp with mobile and code and expire date
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal server error
 */
router.post("/check-otp", UserAuthController.checkOTP);

module.exports = {
    UserAuthRoutes: router
}
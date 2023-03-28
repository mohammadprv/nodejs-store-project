const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOtp:
 *              type: object
 *              required: 
 *                  -   phone
 *              properties:
 *                  phone: 
 *                      type: string
 *                      description: user mobile for get OTP
 *          CheckOtp:
 *              type: object
 *              required: 
 *                  -   phone
 *                  -   code
 *              properties:
 *                  phone: 
 *                      type: string
 *                      description: user mobile for get OTP
 *                  code: 
 *                      type: string
 *                      description: received Code from getOtp
 *          RefreshToken:
 *              type: object
 *              required: 
 *                  -   refreshToken
 *              properties:
 *                  refreshToken: 
 *                      type: string
 *                      description: get RefreshToken To generate new refresh and access token
 */

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
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOtp"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/GetOtp"
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: "#/components/schemas/CheckOtp"
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

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authorization]
 *          summary: send refreshToken fot get new accessToken and new refreshToken
 *          description: freshToken
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/RefreshToken"
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: not found
 *              401:
 *                  description: authorization
 */
router.post("/refresh-token", UserAuthController.refreshToken);



module.exports = {
    UserAuthRoutes: router
}
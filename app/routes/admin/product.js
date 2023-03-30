const { ProductController } = require('../../http/controllers/admin/product.controller');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

/**
 * @swagger
 *  components: 
 *      schemas: 
 *          Product:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Product title
 *                  short_text: 
 *                      type: string
 *                      description: Product main text 
 *                  text: 
 *                      type: string
 *                      description: Product title  
 *                  tags: 
 *                      type: array
 *                      description: List of tags  
 *                  category: 
 *                      type: string
 *                      description: Category Of Product                 
 *                  price: 
 *                      type: string
 *                      description: Product price  
 *                  count: 
 *                      type: string
 *                      description: Product count
 *                  discount: 
 *                      type: string
 *                      description: Product discount
 *                  height: 
 *                      type: string
 *                      description: Product packet height 
 *                  width: 
 *                      type: string
 *                      description: Product packet width
 *                  weight: 
 *                      type: string
 *                      description: Product packet weight
 *                  length: 
 *                      type: string
 *                      description: Product packet length
 *                  image: 
 *                      type: file
 *                      description: Product Image  
 * 
 */

/**
 * @swagger
 *  /admin/product/add:
 *      post:
 *          tags: [Product(Admin-Panel)]
 *          summary: create and save products
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          responses:
 *              201:
 *                  description: Created
 */
router.post("/add", uploadFile.single("image"), ProductController.addProduct);

/**
 * @swagger
 *  /admin/product/list:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: Get products list
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/list", ProductController.getAllProducts);

// router.patch();
// router.delete();

module.exports = {
    AdminApiProductRouter: router
}

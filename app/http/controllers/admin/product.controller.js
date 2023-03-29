const { addProductSchema } = require("../../validators/admin/product.schema");
const createError = require('http-errors');
const path = require('path');
const Controller = require("../controller");
const { ProductModel } = require("../../../model/products");

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const productBody = await addProductSchema.validateAsync(req.body);
            const { title, text, short_text, tags, category, count, discount, width, height, weight, length } = productBody;
            req.body.image = path.join(productBody.fileUploadPath, productBody.filename).replace(/\\/g, "/");
            const image = `${req.protocol}://${req.get("host")}/${req.body.image}`;
            const supplier = req.user._id;

            let feature = {}, type = "physical";
            if(width || height || weight || length) {
                if (!width) feature.width = 0;
                else feature.width = width;
                if (!height) feature.height = 0;
                else feature.height = height;
                if (!weight) feature.weight = 0;
                else feature.weight = weight;
                if (!length) feature.length = 0;
                else feature.length = length;
            } else type = "virtual";

            const product = await ProductModel.create({ title, text, short_text, tags, category, count, discount, image, feature, supplier, type });
            if(!product) throw createError.InternalServerError("خطای داخلی");

            return res.status(201).json({
                statusCode: 201,
                data: {
                    message: "محصول جدید با موفقیت اضافه شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    editProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    
    removeProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    getAllProducts(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    
    getOneProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}


module.exports = {
    ProductController: new ProductController()
}
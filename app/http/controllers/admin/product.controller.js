const { addProductSchema } = require("../../validators/admin/product.schema");
const createError = require('http-errors');
const path = require('path');
const Controller = require("../controller");
const { ProductModel } = require("../../../model/products");
const { listOfImagesFromRequest } = require("../../../utils/functions");
const { mongoIDValidator } = require("../../validators/public.validator");
const { StatusCodes } = require('http-status-codes');

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            const productBody = await addProductSchema.validateAsync(req.body);
            const { title, text, short_text, tags, category, count, discount, width, height, weight, length } = productBody;
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

            const product = await ProductModel.create({ title, text, short_text, tags, category, count, discount, images, feature, supplier, type });
            if(!product) throw createError.InternalServerError("خطای داخلی");

            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "محصول جدید با موفقیت اضافه شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }


    async getAllProducts(req, res, next) {
        try {
            const products = await ProductModel.aggregate([
                {
                    $match: {}
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $project: {
                        "category.__v": 0
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "supplier",
                        foreignField: "_id",
                        as: "supplier"
                    }
                },
                {
                    $project: {
                        "supplier.otp": 0,
                        "supplier.bills": 0,
                        "supplier.discount": 0,
                        "supplier.Roles": 0,
                        "supplier.__v": 0,
                    }
                },
                {
                    $unwind: "$supplier"
                },
            ])
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    products
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
    
    getOneProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    
    async findProductByID(productID) {
        const { id } = await mongoIDValidator.validateAsync({ id: productID });
        const product = await ProductModel.findById(id);
        if(!product) throw createError.NotFound("محصولی یافت نشد");
        return product;
    }
}


module.exports = {
    ProductController: new ProductController()
}
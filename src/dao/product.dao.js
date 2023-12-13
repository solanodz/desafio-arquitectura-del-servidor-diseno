import ProductModel from "../models/product.model.js";

export default class ProductDao {
    static create(data) {
        return ProductModel.create(data);
    }

    static get(criteria = {}) {
        return ProductModel.find(criteria)
    }

    static getById(pid) {
        return ProductModel.findById(pid)
    }

    static updateById(pid, data) {
        return ProductModel.updateOne({ _id: pid }, { $set: data })
    }

    static deleteById(pid) {
        return ProductModel.deleteOne({ _id: pid })
    }
}
import ProductsService from "../service/products.services.js";

export default class ProductsController {
    static async create(data) {
        console.log('Creando nuevo producto 🔃');
        const newProduct = await ProductsService.create(data)
        console.log('Producto creado correctamente ✅');
        return newProduct;
    }

    static async get(query = {}) {
        const products = await ProductsService.findAll(query);
        return products;
    }

    static async getById(pid) {
        const product = await ProductsService.findById(pid);
        if (!product) {
            throw new Error(`El producto con el ID ${pid} no se ha encontrado ❌`)
        }
        return product;
    }

    static async updateById(pid, data) {
        await ProductsController.getById(pid)
        console.log('Actualizando producto 🔃');
        await ProductsService.updateById({ _id: pid }, { $set: data })
        console.log('Producto actualizado correctamente ✅');
    }

    static async deleteById(pid) {
        await ProductsController.getById(pid)
        console.log('Eliminando producto.');
        await ProductsService.deleteById({ _id: pid })
        console.log('producto eliminado exitosamente');
    }
}
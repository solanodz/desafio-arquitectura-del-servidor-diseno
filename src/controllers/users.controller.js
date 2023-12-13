import UsersService from "../service/users.services.js";

export default class ProductsController {
    static async create(data) {
        console.log('Creando nuevo Usuario 🔃');
        const newUser = await UsersService.create(data)
        console.log('Usuario creado correctamente ✅');
        return newUser;
    }

    static async get(query = {}) {
        const products = await UsersService.findAll(query);
        return products;
    }

    static async getById(pid) {
        const product = await UsersService.findById(pid);
        if (!product) {
            throw new Error(`El usuario con el ID ${pid} no se ha encontrado ❌`)
        }
        return product;
    }

    static async updateById(pid, data) {
        await UsersService.getById(pid)
        console.log('Actualizando los datos del usuario 🔃');
        await UsersService.updateById({ _id: pid }, { $set: data })
        console.log('Usuario actualizado correctamente ✅');
    }

    static async deleteById(pid) {
        await UsersService.getById(pid)
        console.log('Eliminando Usuario.');
        await UsersService.deleteById({ _id: pid })
        console.log('Usuario eliminado exitosamente');
    }
}
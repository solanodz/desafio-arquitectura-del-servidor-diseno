import UserModel from "../models/user.model.js";

export default class UserDao {
    static create(data) {
        return UserModel.create(data);
    }

    static get(criteria = {}) {
        return UserModel.find(criteria)
    }

    static getById(uid) {
        return UserModel.findById(uid)
    }

    static updateById(uid, data) {
        return UserModel.updateOne({ _id: uid }, { $set: data })
    }

    static deleteById(uid) {
        return UserModel.deleteOne({ _id: uid })
    }
}
import { UserModel } from "../models/User.js";

export async function create(body){
    return await UserModel.create(body);
};

export async function getById(id){
    return await UserModel.findById(id);
}

export async function find(filters){
    return await UserModel.find(filters);
};
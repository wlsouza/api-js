import { UserModel } from "../models/User.js";
import mongoose from "mongoose";

export async function create(body){
    return await UserModel.create(body);
};

export async function getById(id){
    if (!mongoose.Types.ObjectId.isValid(id)){
        return;
    };
    return await UserModel.findById(id);
}

export async function find(filters){
    return await UserModel.find(filters);
};
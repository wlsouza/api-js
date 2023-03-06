import { UserModel } from "../models/User.js";
import {UserNotFoundError, InvalidIdError, UserConflictError} from "../exceptions/user.exceptions.js"
import mongoose from "mongoose";



export async function create(body){
    try{
        return await UserModel.create(body);
    }
    catch (err){
        if (err.code == 11000){
            throw new UserConflictError("User already exists");
        }
    };
};

export async function getById(id){
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw new InvalidIdError("Invalid id");
    };
    const result = await UserModel.findById(id);

    if(!result){
        throw new UserNotFoundError("User not found");
    }
    return result;
}

export async function find(filters){
    const result = await UserModel.find(filters);

    if (result.length === 0){
        throw new UserNotFoundError("User not found");
    }

    return result
};

export async function updateOne(filters, body){
    if ("_id" in filters && !mongoose.Types.ObjectId.isValid(filters._id)){
        throw new InvalidIdError("Invalid id");
    };
    
    const result = await UserModel.updateOne(filters, body);

    if (result.n === 0){
        throw new UserNotFoundError("User not found");
    };
    return result;
}
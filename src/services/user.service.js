import { UserModel } from "../models/User.js";

export async function create(body){
    return await UserModel.create(body);
};

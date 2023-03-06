import * as userService from "../services/user.service.js";
import {InvalidIdError, UserNotFoundError, UserConflictError} from "../exceptions/user.exceptions.js"

export async function create(req, res){

    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background){
        res.status(422).send({message:"Please send all required fields"});
    };

    try{
        const createdUser = await userService.create(req.body);

        res.status(201).send({
            massage: "User created",
            user: {
                id: createdUser._id,
                name,
                username,
                email,
                avatar,
                background
            }
        });
    }
    catch (err){
        if (err instanceof UserConflictError){
            res.status(409).send({message:"User already exists"});
        }else{
            res.status(500).send({message:"Unexpected error occurred"});
        };
    }   

};

export async function getAll(req, res){
    try{
        const dbUsers = await userService.find();
        
        res.status(200).send({
            message: "Users found",
            users: dbUsers.map((user)=>{
                return {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar, 
                    background: user.background
                };
            })
        });
    }
    catch (err){
        if (err instanceof UserNotFoundError){
            res.status(200).send({message: "Users not found", users: []})
        }else{
            res.status(500).send({message: "Unexpected error occurred"});
        }
    };
};

export async function getById(req, res){
    const {id} = req.params;
    try{
        const dbUser = await userService.getById(id);

        res.status(200).send({
            message: "User found",
            user: {
                id: dbUser._id,
                name: dbUser.name,
                username: dbUser.username,
                email: dbUser.email,
                avatar: dbUser.avatar,
                background: dbUser.background
            }
        });
    }
    catch (err){
        if (err instanceof UserNotFoundError || err instanceof InvalidIdError){
            res.status(404).send({message: "User not found"});
        }else{
            res.status(500).send({message: "Unexpected error occurred"});
        }
    }
};

export async function putUpdate(req, res){
    const {id} = req.params;
    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background){
        res.status(422).send({message:"Please send all required fields"});
    };

    try{
        await userService.updateOne({_id:id}, {name, username, email, password, avatar, background});

        res.status(200).send({
            message: "User updated",
            user: {
                id,
                name,
                username,
                email,
                avatar, 
                background
            }
        });
    }
    catch (err){
        if (err instanceof UserNotFoundError || err instanceof InvalidIdError){
            res.status(404).send({message: "User not found"});
        }else{
            res.status(500).send({message: "Unexpected error occurred"});
        }
    };
};
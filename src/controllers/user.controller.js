import * as userService from "../services/user.service.js";

export async function create(req, res){

    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background){
        res.status(422).send({message:"send all required fields"});
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
        if (err.code == 11000){
            res.status(409).send({message:"User already exist"});
        }else{
            res.status(500).send({message:"Unexpected error occurred"});
        };
    }   

};

export async function getAll(req, res){
    try{
        const dbUsers = await userService.find();

        if(dbUsers.length > 0){
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
        }else{
            res.status(200).send({message: "Users not found", users: []})
        };
    }
    catch (err){
        res.status(500).send({message: "Unexpected error occurred"});
    };
};

export async function getById(req, res){
    const {id} = req.params;
    try{
        const dbUser = await userService.getById(id);

        if (dbUser){
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
        }else{
            res.status(404).send({message: "User not found"});
        };
    }
    catch (err){
        res.status(500).send({message: "Unexpected error occurred"});
    }
};

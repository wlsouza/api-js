import * as userService from "../services/user.service.js";

export async function create(req, res){

    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background){
        res.status(422).send({message:"send all required fields"});
    };

    try{
        const created_user = await userService.create(req.body);

        res.status(201).send({
            massage: "user created",
            user: {
                id: created_user._id,
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
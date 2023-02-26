import * as userService from "../services/user.service.js";

export async function create(req, res){

    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background){
        res.status(422).send({message:"send all required fields"});
    };

    const created_user = await userService.create(req.body);

    if (!created_user){
        res.status(500).send("Unexpected error occurred")
    }

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

};
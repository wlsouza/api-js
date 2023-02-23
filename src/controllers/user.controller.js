export function create(req, res){

    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background){
        res.status(422).send({message:"send all required fields"});
    };

    res.status(201).send({
        massage: "user created",
        user: { 
            name,
            username,
            email,
            avatar,
            background
        }
    });

};
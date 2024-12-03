import User from "../models/user.model.js"


export const addUsers = async (req, res) => {
    try {
        const {name, email, age, gender} = req.body
        if(!name || !email || !age || !gender) {
            res.status(403).json({message : "All fields are compulsory"})
        }
        const user = await User.findOne({email})
        if(user)
        {
            res.status(402).json({message : "User Already exists"})
        }
        const newUser = new User({name, email, age, gender})
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log("Error while registering", error.message)
        res.status(500).json({message : "Invalid user credentials"})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.error("Error fetching users", error)
        res.status(500).send({message : "Failed to fetch Users"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const deletedUser = await User.findByIdAndDelete(id)
        if(!deletedUser) {
            return res.status(404).send({message : "User is not found"})
        }
        res.status(200).send({
            message : "suer deleted Suucessfully",
            user : deleteUser
        })
    } catch (error) {
        console.error("Error deleting user", error)
        res.status(500).send({message : "Failed to delete a User"})
    }
}

export const updateUser = async (req, res) => {
    try {
        console.log(req.body)
        const {id} = req.params
        const {age, email, gender, name} = req.body
        
        const user = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                age,
                gender
            },
            {new : true, runValidators: true}
        )
        return res.status(200).json(user)
    } catch (error) {
        console.error("error while updating the user")
        res.status(500).json({message : "Failed to update the user"})
    }
}

export const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) {
            res.status(404).json({message : "Not Found"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.error("Error while getting user details")
        res.status(500).json({message : "Internal server error"})
    }
}

export const searchUsers = async (req, res) => {
    try {
        const {query} = req.query
        const users = await User.find({
            $or : [
                {name : {$regex : query, $options : 'i'}},
                {email : {$regex : query, $options : 'i'}},
            ]

        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }

}
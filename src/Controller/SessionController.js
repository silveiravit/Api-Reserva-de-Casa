const User = require('../Models/User')

class SessionController{
    async index(req, res){
        const users = await User.find()
        return res.json(users)
    }
    async store(req, res){
        const { email } = req.body
        let user = await User.findOne({ email })
        if(!user){
            user = await User.create({ email })
        }
        return res.json(user)
    }
}

module.exports = new SessionController()
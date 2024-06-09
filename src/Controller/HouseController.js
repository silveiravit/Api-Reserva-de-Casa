const House = require('../Models/House')
const User = require('../Models/User')

class HouseController{
    async index(req, res){
        const { status } = req.query
        const houses = await House.find({status})
        return res.json(houses)
    }
    async store(req, res){
        //const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers
        const houses = await House.create({
            user: user_id,
            description,
            price,
            location,
            status
        })
        return res.json(houses)
    }
    async update(req, res){
        const { house_id } = req.params
        const { description, price, location, status } = req.body
        const { user_id } = req.headers
        const user = await User.findById(user_id)
        const house = await House.findById(house_id) 
        if(String(user._id) !== String(house.user)){
            return res.status(401).json({error: "Não autorizado!"})
        }
        await House.updateOne({_id: house_id},{
            user: user_id,
            description,
            price,
            location,
            status
        })
        return res.send("Atualizado com sucesso!")
    }
    async destroy(req, res){
        const { house_id } = req.body
        const { user_id } = req.headers
        const user = await User.findById(user_id)
        const house = await House.findById(house_id)
        if(String(user._id) !== String(house.user)){
            return res.status(401).json({error: "Não autorizado!"})
        }
        await House.findByIdAndDelete({_id: house_id})
        return res.json({message: "Anúncio excluído!"})
    }
}

module.exports = new HouseController()
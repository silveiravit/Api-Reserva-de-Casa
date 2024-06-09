const Reserve = require('../Models/Reserve')
const User = require('../Models/User')
const House = require('../Models/House')

class ReserveController{
    async index(req, res){
        const { user_id } = req.headers
        const reserves = await Reserve.find({user: user_id}).populate('house')
        return res.json(reserves)
    }
    async store(req, res){
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body
        const user = await User.findById(user_id)
        const house = await House.findById(house_id)
        if(!house){
            return res.status(400).json({message:"Casa não encontrada!"})
        }
        if(house.status != true){
            return res.status(400).json({message:"Solicitação indisponível!"})
        }
        if(String(user._id) != String(house.user)){
            return res.status(401).json({message:"Reserva não permitida!"})
        }
        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        })
        await reserve.populate(['user','house'])
        return res.json(reserve)
    }
    async destroy(req, res){
        const { reserve_id } = req.headers
        await Reserve.findByIdAndDelete({_id: reserve_id})
        return res.json({message:"Reserva excluída!"})
    }
}

module.exports = new ReserveController()
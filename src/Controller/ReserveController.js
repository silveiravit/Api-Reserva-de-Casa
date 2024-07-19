const Reserve = require('../Models/Reserve')
const User = require('../Models/User')
const House = require('../Models/House')

class ReserveController{

    async index(req, res){
        const { user_id } = req.headers 
        const reserves = await Reserve.find({ user: user_id }).populate('house')
        return res.json(reserves)
    }

    async store(req, res){
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body
        const house = await House.findById(house_id)
        const user = await User.findById(user_id)
        if(!house){
            return res.status(400).json({ error: "Essa casa não existe" })
        }
        if(house.status != true){
            return res.status(400).json({ error: "Solicitação indisponível" })
        }
        if(String(user._id) === String(house.user)){
            return res.json(401).json({ error: "Reserva não permitida!" })
        }
        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        })
        await reserve.populate(['user', 'house'])
        return res.json(reserve)
    }

    async destroy(req, res){
        const { reserve_id } = req.body
        await Reserve.findByIdAndDelete({ _id: reserve_id })
        return res.json({ message: "Reseva excluída com sucesso!" })
    }

}

module.exports = new ReserveController()
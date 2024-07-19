/* métodos: index, show, update, store, destroy

index: listagem de sessões
show: listar uma ÚNICA sessão
update: Atualizar uma sessão
store: Criar uma sessão
destroy: Deletar uma sessão
*/

const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const Yup = require('yup')

class SessionController{
    
    async index(req, res){
        const users = await User.find()
        return res.json(users)
    }

    async store(req,res){
        const { email, password } = req.body
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Falha na validação."})
        }

        let user = await User.findOne({ email })
        
        if( !user ){
            user = await User.create({ email, password })
            jwt.sign({id: user.id, email: user.email}, "apidevhouse", {expiresIn: "1h"}, (err, token) => {
                if(err){
                    res.status(400).json({error: "Falha interna!"})
                }else{
                    res.status(200).json({user, token})
                }
            })
        }
    }

}

module.exports = new SessionController()
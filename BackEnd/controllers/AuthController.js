import Person from '../models/Person.js'
import User from '../models/User.js';
import Intern from '../models/Interns.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

export let register =  (req, res, next)=>{
// console.log("🚀 ~ file: AuthController.js ~ line 9 ~ register ~ req", req.body)
User.findOne({username: req.body.username}, async (err, result)=>{
    if (err) return res.status(500).send('Error on the server.');
    if (result) return res.status(404).send('No user found.');
    const personInfo = await Person.findById(req.body.personId)
    if(!personInfo) return res.status(401).send('No person found.');
    const body = {status : !personInfo.status};
    await Person.findByIdAndUpdate(personInfo._id,{$set: body},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
            if(err){
                res.json({error: err})
            }else{
                const user = new User(req.body);
                user.password =hashedPass; 
                user.save()
                .then(user =>{
                    res.json({
                        message: 'User added Successfully!',
                        user: user
                    })
                })
                .catch(error =>{
                    res.json({
                        message: 'An error occured!'
                    })
                })  
            }
        })
    })  
})
}


export const login = async (req,res,next)=>{
    console.log("🚀 ~ file: AuthController.js ~ line 51 ~ login ~ req", req.body)
    await User.findOne({username: req.body.username})
    .populate({
         path: 'personId',
     })
    .exec((err,result)=>{
        if(err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        if(!result.personId.status) return res.status(401).send('account has been locked ');
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({_id: result.personId}, 'verySecretValue',{expiresIn: '1h'})
        res.status(200).json({
            message: 'Login successful!',
            user: result,
            token: token,
        })
    })  
    
}

export const activeUser = async (req,res,next)=>{
    const id = req.body._id;
    await Intern.findById(id)
    .exec(async(err, result)=>{
        if(err) return res.status(501).json({message: "khong tim ra nguoi"});
        const personInf = await Person.findById(result.personId)
            if(!personInf) return res.status(501).json({message: "khong tim ra user"});
        const body = {status : !personInf.status};
        Person.findByIdAndUpdate(personInf._id,{$set: body},{new: true, runValidators: true},(err,doc)=>{
            if(err) return res.status(501).json({message: err.message})
            res.status(200).json({newPerson: doc})
        })
    }) 
}

export const findPersonalInfo = async (req,res,next)=>{
    const id = req.params.personId;
    await User.findById(id)
    .populate({
        path: 'personId',
    })
    .exec((error, result)=>{
        if(error) return res.status(500).json("Do not Join in")
        return res.status(200).json(result);
    })
}

export const updatePersonalInfo= async (req,res,next)=>{
    const id = req.body.personInf._id;
    Person.findByIdAndUpdate(id,{$set: req.body.personInf},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newPerson: doc})
    })
}

export const updateUserName = async (req,res, next)=>{
    const id = req.body.userId
    console.log("🚀 ~ file: AuthController.js ~ line 96 ~ updateUserName ~ id", req.body.newPassword)
    User.findById(id)
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).json("mat khau ko dung");
        bcrypt.hash(req.body.newPassword,10,(err,hashedPass)=>{
            if(err){
                res.json({error: err})
            }else{
                const userBody = {password: hashedPass } 
                User.findByIdAndUpdate(id,{$set: userBody},{new: true, runValidators: true},(err,doc)=>{
                    if(err) return res.status(501).json({message: err.message})
                    res.status(200).json({newPerson: doc})
                })
            }
        })
    })
}
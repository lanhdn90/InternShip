import Person from '../models/Person.js'

export let findWithRoleId = {

}

export let createPerson = (req,res) =>{
    Person.findOne({email: req.email},(err,per)=>{
        if(per === null){
            const person = new Person(req)
            person.save((error,result)=>{
                if(error) return res.status(500).json({error})
                    res.status(201).json({person: result})  
            }) 
        }else{
            res.status(501).json({err: 'Email has been used'})
        }
    })
}

export let UpdatePerson = (req, res, next) =>{
    Person.findOneAndUpdate({_id: req.body._id})
    ,{$set: req.body},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    }
}

import Person from '../models/Person.js'
import UserName from '../models/User.js'
import Course from '../models/Course.js'
import Task from '../models/Task.js';

export const findLeaderList = async (req,res, next)=>{
    const com = req.query.company;
    const regex = new RegExp(req.query.keySearch, 'i');
    await Person.find({$and: [{
        roleId: "6045cf1c83a38015cc63ccc3"},
        {companyId:com},
        {$or:[
            {fullName: regex},
            {address: regex},
            {phone: regex},
            {email: regex},  
        ]}
    ]})
    .populate([{  path: 'companyId'}, { path: 'userId'},])
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        const count = result.length;
        const list = result.slice((page*number),(page*number)+number);
        res.status(200).json({list,count})
    })
}

export const selectLeaderList = async (req,res, next)=>{
    const com = req.query.companyId;
    const person = req.query.personId;
    await Person.find({$and: [{
        roleId: "6045cf1c83a38015cc63ccc3"},
        {companyId:com},
    ]})
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const list = result.filter(item => item._id.toString() !== person);
        res.status(200).json(list)
    })
}


export const createLeader = async (req, res, next)=>{
// console.log("🚀 ~ file: LeaderController.js ~ line 16 ~ createLeader ~ req", req.body)
    try {
        const person = await Person.findOne({email: req.body.email});
        if(person){
            return res.status(400).json({
                message: "email da duoc su dung"
            })
        }
        const newPerson = new Person(req.body);
        const newPer = await newPerson.save();
        res.status(200).json(newPer);
        // if(newPer){
        //     const newUser = new UserName({personId: newPer._id});
        //     const newUserName = await newUser.save();
        //     if(newUserName){
        //         newPerson.userId = newUserName._id;
        //         // console.log("🚀 ~ file: LeaderController.js ~ line 32 ~ createLeader ~ newUser", newPerson)
        //         await newPerson.save();
        //         return res.status(200).json(newPer);
        //     }
        //     // return res.status(200).json(newPer);
        // }
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    }
    

}


export const activeLeader = async (req,res,next)=>{
    const id = req.body._id;
    const user = await Person.findById(id);
    if(!user) return res.status(501).json({message: "khong tim ra"});
    req.body.status = !user.status;
    Person.findByIdAndUpdate( id,{$set: req.body},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    })
}

export const updateLeader = async (req,res,next)=>{
    const id = req.body._id;
    const personInf = await Person.findById(id);
    if(!personInf) return res.status(501).json({message: "khong tim ra"});
    Person.findByIdAndUpdate(id,{$set: req.body},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newPerson: doc})
    })
}

export const deleteLeader = async (req,res, next)=>{
    try{
       const pastPersonId = req.query.pastLeader;
        const newPersonId = req.query.newLeader;
        await UserName.findOneAndDelete({personId: pastPersonId})
        //xoa manager
        await Person.findByIdAndDelete(pastPersonId);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 114 ~ deleteOrganization ~ person", person)
        // chua xoa lead, course, task,

        //xoa company
        await Task.updateMany({personId: pastPersonId },{$set: {personId: newPersonId}},{new: true, runValidators: true},(err,doc)=>{
            if(err) return res.status(501).json({message: err.message})
        })
        await Course.updateMany({personId: pastPersonId },{$set: {personId: newPersonId}},{new: true, runValidators: true},(err,doc)=>{
            if(err) return res.status(501).json({message: err.message})
        })
        res.status(201).json({message: "OK"})
    }catch(err){
        res.status(500).json({message: "Not delete Organization!"})
    }
}

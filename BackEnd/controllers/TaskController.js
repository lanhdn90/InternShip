import Person from '../models/Person.js'
import Task from '../models/Task.js'
import mongoose from 'mongoose'

export const findTaskList = async (req,res, next)=>{
    const com = req.query.company;
    const per = req.query.person;
    console.log("🚀 ~ file: TaskController.js ~ line 8 ~ findLeaderList ~ per", req.query)
    const regex = new RegExp(req.query.keySearch, 'i');
    console.log("🚀 ~ file: LeaderController.js ~ line 5 ~ findLeaderList ~ companyId", regex)
    await Task.find(com !== undefined ? {taskName: regex} : {$and:[
        {personId: per},
        {taskName: regex},
    ]})
    .populate({
        path: 'personId',
        match:com !== undefined ? {$or:[
                {companyId: com},
        ]} : {}
    })
    .exec((err,result)=>{
        // console.log("🚀 ~ file: TaskController.js ~ line 23 ~ .exec ~ result", result)
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ current", page)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 129 ~ .exec ~ pageSize", number)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ page", (page*number)+number)
        const count = result.filter(item => item.personId !== null).length;
        const list = result.filter(item => item.personId !== null).slice((page*number),(page*number)+number);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 57 ~ .exec ~ list", list)
        res.status(200).json({list,count})
        // res.status(200).json(result)
    })
}

export const createTask = async (req, res, next)=>{
    console.log("🚀 ~ file: LeaderController.js ~ line 16 ~ createLeader ~ req", req.body)
        try {
            const newTask = new Task(req.body);
            const task = await newTask.save();
            if(task){
                return res.status(200).json(task);
            }
        } catch (error) {
            res.status(501).json({
                message: error.message
            })
        } 
}

export const updateTask = async (req,res,next)=>{
    const id = req.body._id;
    Task.findByIdAndUpdate(id,{$set: req.body.taskInfo},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    })
}

export const deleteTask = async (req,res, next)=>{
    try{
        const id = req.params.taskId;
        console.log("🚀 ~ file: TaskController.js ~ line 55 ~ deleteTask ~ id", id)
        const task = await Task.findByIdAndDelete(id);
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message: "Not delete Organization!"})
    }
}

export const selectTaskList = async (req,res, next)=>{
    // const com = req.body.company;
    // const per = req.body.person;
    // const regex = new RegExp(req.body.keySearch, 'i');
    const com = req.query.company;
    console.log("🚀 ~ file: TaskController.js ~ line 71 ~ selectTaskList ~ com", com)
    const per = req.query.person;
    console.log("🚀 ~ file: TaskController.js ~ line 8 ~ findLeaderList ~ per", per)
    const regex = new RegExp(req.query.keySearch, 'i');
    console.log("🚀 ~ file: LeaderController.js ~ line 5 ~ findLeaderList ~ companyId", regex)
    await Task.find(com !== undefined ? {taskName: regex} : {$and:[
        {personId: per},
        {taskName: regex},
    ]})
    .populate({
        path: 'personId',
        match:com !== undefined ? {$or:[
                {companyId: com},
        ]} : {}
    })
    .exec((err,result)=>{
        // console.log("🚀 ~ file: TaskController.js ~ line 23 ~ .exec ~ result", result)
        if(err) return res.status(500).json("Do not Join in")
        res.status(200).json(result)
    })
}
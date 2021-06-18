import Question from '../models/Question.js'
import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const findQuestionList = async (req,res, next)=>{
    const com = req.query.company;
    const per = req.query.person;
    const task = req.query.selectTaskId;
    const regex = new RegExp(req.query.keySearch, 'i');
    await Question.find(task === undefined ? {content: regex}
        :{$and:[{taskId: task},{content: regex}]})
    .populate({
        path: 'taskId',
        populate: {
            path: 'personId',
            match: com !== undefined ? {$or:[
                {companyId: com},
            ]} : {_id: per}
        }
    })
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        const count = result.filter(item => item.taskId.personId !== null).length;
        const list = result.filter(item => item.taskId.personId !== null).slice((page*number),(page*number)+number);
        res.status(200).json({list,count})
    })
}

export const createQuestion = async (req, res, next)=>{
    // console.log("🚀 ~ file: LeaderController.js ~ line 16 ~ createLeader ~ req", req.body)
    try {
        const newQuestion = new Question(req.body);
        const question = await newQuestion.save();
        if(question){
            const number = (await Question.find({taskId: question.taskId})).length;
            await Task.findByIdAndUpdate(question.taskId,{$set: {count: number}})
            return res.status(200).json(question);
        }
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    } 
}

export const updateQuestion = async (req,res,next)=>{
    const id = req.body._id;
    Question.findByIdAndUpdate(id,{$set: req.body.questionInfo},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    })
}

export const deleteQuestion = async (req,res, next)=>{
    try{
        const id = req.params.questionId;
        console.log("🚀 ~ file: QuestionController.js ~ line 55 ~ deleteQuestion ~ id", id)
        const question = await Question.findByIdAndDelete(id);
        if(question){
            const number = (await Question.find({taskId: question.taskId})).length;
            await Task.findByIdAndUpdate(question.taskId,{$set: {count: number}})
            return res.status(200).json(question);
        }
    }catch(err){
        res.status(500).json({message: "Not delete Organization!"})
    }
}

export const searchQuestionList = async (req,res, next)=>{
    const per = req.body.person;
    const regex = new RegExp(req.body.keySearch, 'i');
    const task = req.body.selectTaskId;
    // const per = req.query.person;
    // const task = req.query.selectTaskId;
    // const regex = new RegExp(req.query.keySearch, 'i');
    console.log("🚀 ~ file: QuestionController.js ~ line 11 ~ findQuestionList ~ task", task)
    console.log("🚀 ~ file: QuestionController.js ~ line 8 ~ findLeaderList ~ per", req.body)
    console.log("🚀 ~ file: LeaderController.js ~ line 5 ~ findLeaderList ~ companyId", regex)
    await Question.find({$and:[
        {taskId: task},
        {content: regex}
    ]})
    .populate({
        path: 'taskId',
        populate: {
            path: 'personId',
            match: {_id: per}
        }
    })
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        // const number = parseInt(req.query.pageSize);
        // const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        const number = parseInt(req.body.pageSize);
        const page = parseInt(req.body.current) === 1  ? 0 : (parseInt(req.body.current) - 1);
        const count = result.filter(item => item.taskId.personId !== null).length;
        const list = result.filter(item => item.taskId.personId !== null).slice((page*number),(page*number)+number);
        res.status(200).json({list,count})
        // res.status(200).json(result)
    })
}

export const findRadomQuestionList = async (req,res, next)=>{
    const task =  req.query.taskId
    const number = parseInt(req.query.size)
    await Question.aggregate([
        { $match: { taskId : new mongoose.Types.ObjectId(task)} },
        { $sample: { size: number } },] )
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        res.status(200).json(result)
    })
}

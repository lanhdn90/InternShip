import Course from '../models/Course.js'
import Task from '../models/Task.js';
import CourseWithTask from '../models/CoursewithTask.js';

export const findCourseList = async (req,res, next)=>{
    console.log("🚀 ~ file: CourseController.js ~ line 6 ~ findCourseList ~ req.query", req.query)
    const com = req.query.company;
    const per = req.query.person;
    await Course.find(com !== undefined ?  {companyId: com}: {personId: per})
    .populate({
        path: 'personId',
        match: com !== undefined ? {$or:[
            {companyId: com},
        ]} : {_id: per}
    })
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        const count = result.filter(item => item.personId !== null).length;
        const list = result.filter(item => item.personId !== null).slice((page*number),(page*number)+number)
        res.status(200).json({list,count})
    })
}

export const findCourseLeaderList = async (req,res, next)=>{
    const id = req.params.personId;
    console.log("🚀 ~ file: CourseController.js ~ line 27 ~ findCourseLeaderList ~ req", id)
    await Course.find({personId: id})
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        res.status(200).json(result.sort((a,b)=>a.startDay - b.startDay))
    })
}

export const findCourses = async (req,res, next)=>{
    await Course.find().limit(4)
    .populate([{path: 'personId'}, {path: 'companyId'}])
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        res.status(200).json(result.sort((a,b)=>b.startDay - a.startDay))
    })
}

export const createCourse = async (req, res, next)=>{
    try {
        const newCourse = new Course(req.body);
        const course = await newCourse.save();
        if(course){
            return res.status(200).json(course);
        }
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    } 
}

export const activeCourse = async (req,res,next)=>{
    const id = req.body._id;
    console.log("🚀 ~ file: CourseController.js ~ line 42 ~ activeCourse ~ id", id)
    const courseInf = await Course.findById(id);
    if(!courseInf) return res.status(501).json({message: "khong tim ra"});
    req.body.status = !courseInf.status;
    Course.findOneAndUpdate({ 
        _id: id
    },{$set: req.body},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    })
}

export const updateCourse = async (req,res,next)=>{
    const id = req.body.courseId;
    Course.findByIdAndUpdate(id,{$set: req.body.courseInf},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    })
}

export const deleteCourse = async (req,res, next)=>{
    try{
        const id = req.params.courseId;
        console.log("🚀 ~ file: QuestionController.js ~ line 55 ~ deleteQuestion ~ id", id)
        const course = await Course.findByIdAndDelete(id);
        if(course){
            await CourseWithTask.deleteMany({ courseId: id })
            return res.status(200).json(course);
        }
    }catch(err){
        res.status(500).json({message: "Not delete Organization!"})
    }
}

export const searchCourseList = async (req,res, next)=>{
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

export const findCourseWithTask = async (req,res,next)=>{
    try{
        const id = req.params.courseId;
        await CourseWithTask.find({courseId: id})
        .populate(
            {path: 'taskId'}
        )
        .exec((error, result)=>{
            if(error) return res.status(500).json("Do not Join in")
            return res.status(200).json(result.sort((a,b)=>a.sort - b.sort));
        })
    }catch(err){
        res.status(500).json({message: "Not Course!"})
    }
}

export const createCourseWithTask = async (req, res, next)=>{
    try {
        const newList = new CourseWithTask(req.body);
        const newTaskList = await newList.save();
        if(newTaskList){
            return res.status(200).json(newTaskList);
        }
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    } 
}

export const findTasksList = async (req,res, next)=>{
    try{
    const course = req.query.courseId;
    const per = req.query.person;
    const taskList = await Task.find({personId: per});
    const courseWithTask = await CourseWithTask.find({courseId: course});
    let newList=  checkId(taskList, courseWithTask)
    res.status(200).json(newList)
    }catch(err){
        res.status(500).json({message: err})
    }
    
}

function checkId(arr1, arr2){
    let newList=[];
    arr1.map(async(itemTask)=>{
        let number = 0;
        arr2.map((itemCourse)=>{
            const val = itemTask._id.equals(itemCourse.taskId)
            if(val){
                number = number + 1;
            }
        })
        if(number === 0){
            newList = [...newList, itemTask];
        }
        
    })
    return newList;
}

export const updateCourseWithTasksList = async (req,res, next)=>{
    try{
    const course = req.body.courseId;
    const list = req.body.newCourseWithTasks;
    await CourseWithTask.deleteMany({courseId: course})
    .exec( async (result)=>{
        const newList = [];
        let number = 1;
        await list.map(itemList=>{
            const itemCourse = {
                courseId: course,
                taskId: itemList._id,
                sort: number++,
            };
            newList.push(itemCourse)
        })
        CourseWithTask.insertMany(newList);
    })

    res.status(200).json()
    }catch(err){
        res.status(500).json({message: err})
    }
    
}


export const newFindCourseList = async (req,res, next)=>{
    const com = req.query.company;
    console.log("🚀 ~ file: CourseController.js ~ line 201 ~ newFindCourseList ~ req.query", req.query)
    const per = req.query.person;
    await Course.find(com !== undefined ?  {companyId: com}: {personId: per})
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        result.sort((a,b)=>{a.startDay - b.startDay})
        res.status(200).json(result)
    })
}

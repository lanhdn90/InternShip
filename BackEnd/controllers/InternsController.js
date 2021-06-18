import Person from '../models/Person.js'
import Intern from '../models/Interns.js';
import UserName from '../models/User.js';

export const findIntern = async (req,res,next)=>{
    const id = req.params.internId;
    await Intern.findOne({personId: id})
    .exec((err,result)=>{
        if(err) return res.status(500).json({message: "No Interns!"})
        res.status(200).json(result);
    })
}

export const findInternList = async (req,res, next)=>{
    const companyId = req.query.company;
    console.log("🚀 ~ file: InternsController.js ~ line 16 ~ findInternList ~ req.query", req.query)
    const faculty = req.query.faculty;
    const courseId = req.query.course;
    const valCourse = req.query.courseVal;
    await Intern.find(courseId !== undefined ? {courseId: courseId} :{})
    .populate({
        path: 'personId',
        match: companyId === undefined ?
                {schoolId: faculty} :
                faculty === undefined ?
                 {companyId: companyId} :
                 {$and: [{companyId: companyId},{schoolId: faculty}]}
    })
    .exec((err,result)=>{
        // console.log("🚀 ~ file: InternsController.js ~ line 30 ~ .exec ~ result", result)
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        const count = result.filter(valCourse? filterTrue : filterFalse ).length;
        const list = result.filter(valCourse? filterTrue : filterFalse).slice((page*number),(page*number)+number)
        res.status(200).json({list,count})
    })
}

export const findInternOfSchoolList = async (req,res, next)=>{
    console.log("🚀 ~ file: InternsController.js ~ line 31 ~ findInternOfSchoolList ~ req.body", req.query)
    const companyId = req.query.company;
    const valCourse = req.query.courseVal;
    Person.find({$and:[{roleId: "6045cf1c83a38015cc63ccc5"},{companyId: companyId}]})
    .exec(async (err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const queryObject= [];
        result.map((itemPerson)=>{
            queryObject.push({schoolId: itemPerson.schoolId})
        })
        const newList = await Intern.find()
        .populate({
            path: "personId",
            match: {$and:[{roleId: "6045cf1c83a38015cc63ccc6"},{$or:queryObject}]},
            sort: { "schoolId": "descending" }, 
        })
        .exec((error,resultList)=>{
            if(err) return res.status(500).json("Do not Join in")
            const number = parseInt(req.query.pageSize);
            const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
            const count = resultList.filter(valCourse? filterTrue : filterFalse ).length
            const list = resultList.filter(valCourse? filterTrue : filterFalse ).slice((page*number),(page*number)+number)
            res.status(200).json({list,count})
        })
    })
}


export const getCompanyOrSchool = async (req, res, next)=>{
    const companyId = req.query.company;
    const schoolId = req.query.school;
    await Person.find({$and:[{roleId: "6045cf1c83a38015cc63ccc6"},
    companyId === undefined ? {schoolId: schoolId}:{companyId: companyId}]})
    .populate({
        path: companyId === undefined ?  'companyId' :'schoolId',
    })
    .exec(async(err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const newList = [];
        await result.map(item =>{
            newList.push(companyId === undefined ? item.companyId : item.schoolId)
        })
        const uniqueSet = newList.filter((item, index) => newList.indexOf(item) === index);
        res.status(200).json(uniqueSet)
    })
}

export const getFacultyOfSchool = async (req, res, next)=>{
    const companyId = req.query.company;
    await Person.find({$and:[{roleId: "6045cf1c83a38015cc63ccc5"},{companyId: companyId}]})
    .populate({
        path: 'schoolId',
    })
    .exec(async(err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const newList = [];
        await result.map(item =>{
            newList.push(item.schoolId)
        })
    
        const uniqueSet = newList.filter((item, index) => newList.indexOf(item) === index);
        res.status(200).json(uniqueSet)
    })
}

const  filterFalse = (item) =>{
    if(item.personId !== null && item.courseId !== undefined){
        return true
    }
    return false;
}

const filterTrue = (item) =>{
    if(item.personId !== null && item.courseId === undefined){
        return true
    }
    return false;
}

export const createIntern= async (req, res, next)=>{    
    try {
        const newPerson = new Person(req.body);
        const person = await newPerson.save();
        if(!person){
            return res.status(500).json({message: "err"});
        }
        const intern = Intern({
            personId: person._id,
        })
        await intern.save();
        // const user = UserName({
        //     personId: person._id,
        // })
        // await user.save();
        // console.log("🚀 ~ file: InternsController.js ~ line 35 ~ createIntern ~ intern", intern)
        res.status(200).json(intern);

    } catch (error) {
            res.status(501).json({
                message: error.message
        })
    } 
}

export const updateIntern = async (req,res,next)=>{
    const id = req.body.internId;
    console.log("🚀 ~ file: InternsController.js ~ line 117 ~ updateIntern ~ id", req.body)
    Intern.findByIdAndUpdate(id,{$set: req.body.internInf},{new: true, runValidators: true}, async (err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        const findUser = await UserName.findOne({personId: doc.personId})
        if(!findUser){
            const user = {
                personId: doc.personId,
                status: true,
            }
            await UserName(user).save();
        }
        await UserName.findOneAndUpdate({personId: doc.personId},{$set: {status: true}},{new: true, runValidators: true})
        res.status(200).json({newIntern: doc})
    })
}

export const updateInternList = async (req,res,next)=>{
    try {
        const list = req.body.selectedRowKeys
        const courseId = req.body.courseId
        const reqBody = {
            courseId: courseId
        }
        list.map((item)=>{
            Intern.findByIdAndUpdate(item,{$set: reqBody},{new: true, runValidators: true}, async (err,doc)=>{
                const findUser = await UserName.findOne({personId: doc.personId})
                if(!findUser){
                    const user = {
                        personId: doc.personId,
                        status: true,
                    }
                    await UserName(user).save();
                }
                await UserName.findOneAndUpdate({personId: doc.personId},{$set: {status: true}},{new: true, runValidators: true})
            })
        })
        res.status(200).json({values: "true"})
    } catch (error) {
        return res.status(501).json({message: error.message})
    }

}

export const deleteIntern = async (req,res, next)=>{
    try{
        const id = req.params.internId;
        console.log("🚀 ~ file: QuestionController.js ~ line 55 ~ deleteQuestion ~ id", id)
        const intern = await Intern.findByIdAndDelete(id);
        if(intern){
            console.log("🚀 ~ file: InternsController.js ~ line 181 ~ deleteIntern ~ intern", intern)
            const person = await Person.findOneAndDelete({_id: intern.personId})
            return res.status(200).json(person);
        }
    }catch(err){
        res.status(500).json({message: "Not delete Interns!"})
    }
}

export const getCompanyOrFaculty = async (req, res, next)=>{
    const organizationVal = req.query.organizationVal;
    await Person.find(organizationVal? {roleId: "6045cf1c83a38015cc63ccc5"} : {roleId: "6045cf1c83a38015cc63ccc2"})
    .populate({
        path: organizationVal?  'schoolId': 'companyId',
    })
    .exec(async(err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const newList = [];
        await result.map(item =>{
            newList.push(organizationVal ?  item.schoolId :item.companyId )
        })
        res.status(200).json(newList)
    })
}

export const deleteInternList = async (req,res, next)=>{
    try{
        const internList = req.params.internList;
        await internList.map(async (itemIntern)=>{
            const intern = await Intern.findByIdAndDelete(itemIntern);
            if(intern){
                console.log("🚀 ~ file: InternsController.js ~ line 181 ~ deleteIntern ~ intern", intern)
                const user = await UserName.findOneAndDelete({personId: intern.personId})
                const person = await Person.findByIdAndDelete(intern.PersonId);
            }
        })
        return res.status(200).json({message: "Ok"});
    }catch(err){
        res.status(500).json({message: "Not delete Interns!"})
    }
}


// export const searchCourseList = async (req,res, next)=>{
//     const per = req.body.person;
//     const regex = new RegExp(req.body.keySearch, 'i');
//     const task = req.body.selectTaskId;
//     // const per = req.query.person;
//     // const task = req.query.selectTaskId;
//     // const regex = new RegExp(req.query.keySearch, 'i');
//     console.log("🚀 ~ file: QuestionController.js ~ line 11 ~ findQuestionList ~ task", task)
//     console.log("🚀 ~ file: QuestionController.js ~ line 8 ~ findLeaderList ~ per", req.body)
//     console.log("🚀 ~ file: LeaderController.js ~ line 5 ~ findLeaderList ~ companyId", regex)
//     await Question.find({$and:[
//         {taskId: task},
//         {content: regex}
//     ]})
//     .populate({
//         path: 'taskId',
//         populate: {
//             path: 'personId',
//             match: {_id: per}
//         }
//     })
//     .exec((err,result)=>{
//         if(err) return res.status(500).json("Do not Join in")
//         // const number = parseInt(req.query.pageSize);
//         // const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
//         const number = parseInt(req.body.pageSize);
//         const page = parseInt(req.body.current) === 1  ? 0 : (parseInt(req.body.current) - 1);
//         const count = result.filter(item => item.taskId.personId !== null).length;
//         const list = result.filter(item => item.taskId.personId !== null).slice((page*number),(page*number)+number);
//         res.status(200).json({list,count})
//         // res.status(200).json(result)
//     })
// }



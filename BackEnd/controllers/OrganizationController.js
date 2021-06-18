import Organization from '../models/Organization.js'
import Person from '../models/Person.js'
import mongoose from 'mongoose';


export const findCompanyList = async (req,res,next)=>{
console.log("🚀 ~ file: OrganizationController.js ~ line 32 ~ findCompanyList ~ req", req.query)
    const regex = new RegExp(req.query.keySearch, 'i');
    await Person.find({roleId: "6045cf1c83a38015cc63ccc2"})
    .populate({
        path: 'companyId',
        match: {$or:[
                {name: regex},
                {address: regex},
                {phone: regex},
                {email: regex},  
                {website: regex},
        ]}
    })
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ current", page)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 129 ~ .exec ~ pageSize", number)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ page", (page*number)+number)
        const count = result.filter(item => item.companyId !== null).length;
        const list = result.filter(item => item.companyId !== null).slice((page*number),(page*number)+number);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 57 ~ .exec ~ list", list)
        res.status(200).json({list,count})
    })
}

export const findListSchool = async (req,res,next)=>{
console.log("🚀 ~ file: OrganizationController.js ~ line 60 ~ findListSchool ~ req", req.query)
    const regex = new RegExp(req.query.keySearch, 'i');
    await Person.find({roleId: "6045cf1c83a38015cc63ccc4"})
    .populate({
        path: 'companyId',
        match: {$or:[
                {name: regex},
                {address: regex},
                {phone: regex},
                {email: regex},  
                {website: regex},
        ]}
    })
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ current", page)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 129 ~ .exec ~ pageSize", number)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ page", (page*number)+number)
        const count = result.filter(item => item.companyId !== null).length;
        const list = result.filter(item => item.companyId !== null).slice((page*number),(page*number)+number);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 57 ~ .exec ~ list", list)
        res.status(200).json({list,count})
    })
}

export const findFacultyList = async (req,res,next)=>{
    console.log("🚀 ~ file: OrganizationController.js ~ line 64 ~ findFacultyList ~ req.query", req.query)
    const com = req.query.company
    const regex = new RegExp(req.query.keySearch, 'i');
    await Person.find({$and:[{roleId: "6045cf1c83a38015cc63ccc5"},{companyId: com}]})
    .populate({
        path: 'schoolId',
        match: {$or:[
                {name: regex},
                {address: regex},
                {phone: regex},
                {email: regex},  
                {website: regex},
        ]}
    })
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        const count = result.filter(item => item.schoolId !== null).length;
        const list = result.filter(item => item.schoolId !== null).slice((page*number),(page*number)+number);
        res.status(200).json({list,count})
    })
}



export const findOrganization = (req,res,next)=>{
    const id = req.params.companyId;
    // console.log("🚀 ~ file: OrganizationController.js ~ line 25 ~ findOrganization ~ id", id)
    Organization.findById(id)
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(501).json({error: err.message})
    })
}

export const createCompany = async (req,res, next)=>{
    try {
        const organ = req.body
        console.log("🚀 ~ file: OrganizationController.js ~ line 52 ~ createCompany ~ organ", organ)
        const newOrgan = new Organization(organ);
        const newOrg = await newOrgan.save();
        if(!newOrg) return res.status(500).json({err: 'Tao cong ty that bai'});
        const newPerson = new Person({
            email: newOrg.email,
            roleId: '6045cf1c83a38015cc63ccc2',
            companyId: newOrg._id,
            // _personId: new mongoose.Types.ObjectId,
        });
        const newPer = await newPerson.save();
        console.log("🚀 ~ file: OrganizationController.js ~ line 86 ~ createCompany ~ newPer", newPer)
        if(newPer){
           return res.status(200).json(newOrgan);
        }
        return res.status(502).json({
            message: error.message
        })
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    }
}

export const createSchool = async (req,res, next)=>{
    try {
        const organ = req.body
        // console.log("🚀 ~ file: OrganizationController.js ~ line 52 ~ createCompany ~ organ", organ)
        const newOrgan = new Organization(organ);
        const newOrg = await newOrgan.save();
        if(!newOrg) return res.status(500).json({err: 'Tao cong ty that bai'});
        const newPerson = new Person({
            email: newOrg.email,
            roleId: '6045cf1c83a38015cc63ccc4',
            companyId: newOrg._id,
            // _personId: new mongoose.Types.ObjectId,
        });
        const newPer = await newPerson.save();
        if(newPer){
           return res.status(200).json(newOrgan);
        }
        return res.status(502).json({
            message: error.message
        })
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    }
}

export const createFaculty = async (req,res, next)=>{
    try {
        const organ = req.body.FacultyInfo
        const newOrgan = new Organization(organ);
        const newOrg = await newOrgan.save();
        if(!newOrg) return res.status(500).json({err: 'Tao Khoa that bai'});
        const newPerson = new Person({
            email: newOrg.email,
            roleId: '6045cf1c83a38015cc63ccc5',
            schoolId: newOrg._id,
            companyId: req.body.companyId
        });
        const newPer = await newPerson.save();
        if(newPer){
           return res.status(200).json(newOrgan);
        }
        return res.status(502).json({
            message: error.message
        })
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    }
}

export const updateOrganization = async (req,res,next)=>{
    console.log("🚀 ~ file: OrganizationController.js ~ line 185 ~ updateOrganization ~ req.body", req.body)
    const id = req.body._id;
    const organInf = await Organization.findOne({_id: id});
    if(!organInf) return res.status(501).json({message: "khong tim ra"});
    if(req.body.expiryDate !== undefined){
        const number = req.body.expiryDate;
        req.body.expiryDate = organInf.expiryDate + number;
    }
    // console.log("🚀 ~ file: OrganizationController.js ~ line 94 ~ updateOrganization ~ req", req.body)
    Organization.findByIdAndUpdate(id,{$set: req.body.organInfo},{new: true, runValidators: true},(err,doc)=>{
        // console.log("🚀 ~ file: OrganizationController.js ~ line 103 ~ Organization.findByIdAndUpdate ~ doc", doc)
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    })
}

export const extendOrganization = async (req,res,next)=>{
    const id = req.body._id;
    const organInf = await Organization.findOne({_id: id});
    if(!organInf) return res.status(501).json({message: "khong tim ra"});
    if(req.body.expiryDate !== undefined){
        const number = req.body.expiryDate;
        req.body.expiryDate = organInf.expiryDate + number;
    }
    Organization.findByIdAndUpdate(id,{$set: req.body},{new: true, runValidators: true},(err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        res.status(200).json({newOrg: doc})
    })
}

export const searchOrganization  = async (req, res, next)=>{
    const regex = new RegExp(req.query.keySearch, 'i');
    await Person.find({roleId: "6045cf1c83a38015cc63ccc2"})
    .populate({
        path: 'companyId',
        match: {$or:[
                {name: regex},
                {address: regex},
                {phone: regex},
                {email: regex},  
                {website: regex},
        ]}
    })
    .exec((err,result)=>{
        if(err) return res.status(500).json("Do not Join in")
        const number = parseInt(req.query.pageSize);
        const page = parseInt(req.query.current) === 1  ? 0 : (parseInt(req.query.current) - 1);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ current", page)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 129 ~ .exec ~ pageSize", number)
        // console.log("🚀 ~ file: OrganizationController.js ~ line 130 ~ .exec ~ page", (page*number)+number)
        const count = result.filter(item => item.companyId !== null).length;
        const list = result.filter(item => item.companyId !== null).slice((page*number),(page*number)+number);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 57 ~ .exec ~ list", list)
        res.status(200).json({list,count})
    })

}

export const deleteOrganization = async (req,res, next)=>{
    try{
        console.log("🚀 ~ file: OrganizationController.js ~ line 244 ~ deleteOrganization ~ req.params", req.params)
        const id = req.params;
        // console.log("🚀 ~ file: OrganizationController.js ~ line 111 ~ deleteOrganization ~ id", id)
        //xoa manager
        const person = await Person.findOneAndDelete(id);
        // console.log("🚀 ~ file: OrganizationController.js ~ line 114 ~ deleteOrganization ~ person", person)
        // chua xoa lead, course, task,

        //xoa company
        const organ = await Organization.findByIdAndDelete(req.params.companyId);
        res.status(200).json(organ);
    }catch(err){
        res.status(500).json({message: "Not delete Organization!"})
    }
}

export const deleteFaculty = async (req,res, next)=>{
    try{
        const id = req.params;
        //xoa manager
        const person = await Person.findOneAndDelete({$and: [ {roleId: "6045cf1c83a38015cc63ccc5"},id]});
        // chua xoa lead, course, task,

        //xoa company
        const organ = await Organization.findByIdAndDelete(req.params.schoolId);
        res.status(200).json(organ);
    }catch(err){
        res.status(500).json({message: "Not delete Organization!"})
    }
}

export const activeOrganization = async (req,res,next)=>{
    const id = req.body._id;
    const organInf = await Organization.findOne({_id: id});
    if(!organInf) return res.status(501).json({message: "khong tim ra"});
    req.body.status = !organInf.status;
    Organization.findOneAndUpdate({ 
        _id: id
    },{$set: req.body},{new: true, runValidators: true}, async (err,doc)=>{
        if(err) return res.status(501).json({message: err.message})
        await Person.findOneAndUpdate({$and: [{roleId : "6045cf1c83a38015cc63ccc2"},{companyId: organInf._id}]},{$set: {status: req.body.status }})
        res.status(200).json({newOrg: doc})
    })
}



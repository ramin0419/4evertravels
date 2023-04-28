import User from '../models/User.js'

//create new User

export const createUser = async (req,res) => {
     const newUser = new User(req.body)
     try {
          const savedUser = await newUser.save()
          
          res
          .status(200)
          .json({
               sucess:true,
               message:'Successfully created',
               data:savedUser
          });
     } catch (error) {
          res
          .status(500)
          .json({
               sucess:false,
               message:'Faild to create. Try again',
          });
     }
}

//update User
export const updateUser = async(req,res) => {
     const id = req.params.id
     try {
          const updatedUser = await User.findByIdAndUpdate(id,{
               $set: req.body
          },{new:true})

          res.status(200).json({
               sucess:true,
               message:'Successfully updated',
               data:updatedUser
          });
     } catch (error) {
          res.status(500).json({
               sucess:false,
               message:'Failed to update',
          });
}
}

//delete User
export const deleteUser = async(req,res) => {
     const id = req.params.id
     try {
          await User.findByIdAndDelete(id)

          res.status(200).json({
               sucess:true,
               message:'Successfully deleted'
          });
     } catch (error) {
          res.status(500).json({
               sucess:false,
               message:'Failed to delete',
          });
}
}
//getSingle User
export const getSingleUser = async(req,res) => {
     const id = req.params.id
     try {
          const user = await User.findById(id)

          res.status(200).json({
               sucess:true,
               message:'User found',
               data:user
          });
     } catch (error) {
          res.status(404).json({
               sucess:false,
               message:'not found',
          });
}
}
//getAll User
export const getAllUser = async(req,res) => {

     try {
          const users = await User.find({});

          res.status(200).json({
               sucess:true,
               message:'All User found',
               data:users
          });
     } catch (error) {
          res.status(404).json({
               sucess:false,
               message:'Users not found',
          });
}
}
import Tour from '../models/Tour.js'

//create new tour

export const createTour = async (req,res) => {
     const newTour = new Tour(req.body)
     try {
          const savedTour = await newTour.save()
          
          res
          .status(200)
          .json({
               sucess:true,
               message:'Successfully created',
               data:savedTour
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

//update tour
export const updateTour = async(req,res) => {
     const id = req.params.id
     try {
          const updatedTour = await Tour.findByIdAndUpdate(id,{
               $set: req.body
          },{new:true})

          res.status(200).json({
               sucess:true,
               message:'Successfully updated',
               data:updatedTour
          });
     } catch (error) {
          res.status(500).json({
               sucess:false,
               message:'Failed to update',
          });
}
}

//delete tour
export const deleteTour = async(req,res) => {
     const id = req.params.id
     try {
          await Tour.findByIdAndDelete(id)

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
//getSingle tour
export const getSingleTour = async(req,res) => {
     const id = req.params.id
     try {
          const tour = await Tour.findById(id).populate('reviews')

          res.status(200).json({
               sucess:true,
               message:'tour found',
               data:tour
          });
     } catch (error) {
          res.status(404).json({
               sucess:false,
               message:'not found',
          });
}
}
//getAll tour
export const getAllTour = async(req,res) => {

     //for pagination
     const page = parseInt(req.query.page);

     try {
          const tours = await Tour.find({}).populate('reviews')
          .skip(page * 8)
          .limit(8);

          res.status(200).json({
               sucess:true,
               count: tours.length,
               message:'All tour found',
               data:tours
          });
     } catch (error) {
          res.status(404).json({
               sucess:false,
               message:'tours not found',
          });
}
}

//get tour by search
export const getTourBySearch = async(req,res) => {

     //here 'i' means case sensitive
     const city = new RegExp(req.query.city, 'i')
     const distance = parseInt(req.query.distance)
     const maxGroupSize = parseInt(req.query.maxGroupSize)

     try {
          //gte means greater than equal
          const tours = await Tour.find({
               city,
               distance:{$gte: distance},
               maxGroupSize:{$gte: maxGroupSize} 
          }).populate('reviews')

          res.status(200).json({
               sucess:true,
               count: tours.length,
               message:'sucess',
               data:tours
          });
     } catch (error) {
          res.status(404).json({
               sucess:false,
               message:'not found',
          });
     }

}

//get featured tour
export const getFeaturedTour = async(req,res) => {

     try {
          const tours = await Tour.find({featured:true}).populate('reviews').limit(8);

          res.status(200).json({
               sucess:true,
               count: tours.length,
               message:'Sucessful',
               data:tours
          });
     } catch (error) {
          res.status(404).json({
               sucess:false,
               message:'not found',
          });
}
}

//get tour counts
export const getTourCount = async(req,res) => {
     try {
          const tourCount = await Tour.estimatedDocumentCount();
          res.status(200).json({sucess:true, data: tourCount});
     } catch (error) {
          res.status(500).json({sucess:false, message: "failed to fetch"});
     }
}
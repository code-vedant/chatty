import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUserfromSideBar = async (req,res) => {
    try {
        const userId = req.user._id;
        const user = await User.find({_id: { $ne:userId}}).sort({createdAt : -1}).select("-password");   
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            user
        });    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params;
        const myId = req.user._id

        const messages = await Message.find({$or: [
            {senderId : myId, receiverId: userToChatId},
            {senderId : userToChatId, receiverId: myId}
        ]})

        res.status(200).json(messages)
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
}

export const sendMessage = async (req,res) => {
    try{
      const {text,image} = req.body;

        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if(image){
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            newMessage
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "SEND MESSAGE Internal server error"
        });
    }
}
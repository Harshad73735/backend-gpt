import express from "express";
import Thread from "../models/thread.js";
const router =express.Router();
import getGeminiResponse from "../utils/gemini.js";
import { get } from "mongoose";

router.post("/test",async(req,res)=>{
    try{
       const thread=new Thread({
        threadId: "12345abcde",
        title: "Sample Thread",
       });
      const result= await thread.save();
      res.send(result);
    }
    catch(error){
        console.error("Error in /test route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//get all threads

router.get("/thread",async(req,res)=>{
    try{
        const threads = await Thread.find().sort({ updatedAt: -1 });  //descending order by updatedAt
        res.json(threads);

    }catch(error){
        console.error("Error in /thread route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/thread/:threadId", async (req, res) => {
    try{
        const { threadId } = req.params;
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread.messages);

    }catch(error){
        console.error("Error in /thread/:threadId route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/thread/:threadId", async (req, res) => {
         try{
            const { threadId } = req.params;
            const result = await Thread.deleteOne({ threadId });
            if (!result) {
                return res.status(404).json({ error: "Thread not found" });
            }
            res.status(200).json({ success: "Thread deleted successfully" });
         }catch(error){
            console.error("Error in /thread/:threadId route:", error);
            res.status(500).json({ error: "Internal Server Error" });
         }
});

const middleware = (req, res, next) => {
    console.log("Middleware executed");

    if (req.body && typeof req.body.message === 'string') {
        const userMessage = req.body.message.toLowerCase();

        if (userMessage.includes("how to hack web")) {
            return res.status(400).json({ reply: "I can't do that" });
        }
    }

    next();
};


router.post("/chat",middleware,async(req,res)=>{
    const {threadId,message}=req.body;
    if(!threadId || !message){
        res.status(400).json({ error: "Thread ID and message are required." });
    }
    try{
         let thread=await Thread.findOne({ threadId });
         if(!thread){
        thread=new Thread({
            threadId,
            title:message,
            messages:[{role:"user", content: message}]
        });
         }else{
            thread.messages.push({ role: "user", content: message });
         }
        const assistantResponse= await getGeminiResponse(message);
        thread.messages.push({ role: "assistant", content: assistantResponse });
        thread.updatedAt = new Date();
        await thread.save();
        res.json({ reply:assistantResponse});

    }catch(error){
        console.error("Error in /chat route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
import { Response, Request } from "express";
import { createConversation , saveMessage, getConversation, getMessages} from "../services/conversation.service";
import { generateReply } from "../services/llm.service";

export async function sendMessage(
    req: Request, 
    res: Response
) {
    try{
        const { message, sessionId} = req.body;

        if(!message?.trim()){
            return res.status(400).json({
                error: "message cannot be empty!"
            })
        }

        // const conversation = await createConversation(); 
        let conversation; 
        if(sessionId){
            conversation = await getConversation(sessionId);
        }

        if(!conversation){
            conversation = await createConversation()
        }; 

        await saveMessage(
            conversation.id,
            "user",
            message
        );

const previousMessages = await getMessages(
  conversation.id
);

const recentMessages = previousMessages.slice(-10);
const history = recentMessages
  .map(
    (msg) =>
      `${msg.sender}: ${msg.text}`
  )
  .join("\n");

const reply = await generateReply(
  history,
  message
);

await saveMessage(
    conversation.id,
    "ai",
    reply
);

        return res.json({
    conversationId: conversation.id,
    reply,
});
    }catch(err){
        console.log("open ai error", err)
        return res.status(500).json({
            error : "something went wrong"
        })
    }
    
}

export async function getChatHistory(
    req: Request, 
    res: Response
) {
    try{
        const sessionId = req.params.sessionId as string;
        const messages = await getMessages(sessionId); 
        return res.json(messages);
    }catch(err){
        console.log(err); 
        return res.status(500).json({
            error: "Something went wrong!"
        })
    }
    
}
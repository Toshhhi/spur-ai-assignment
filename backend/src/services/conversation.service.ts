import {prisma} from "../prisma"

export async function createConversation() {
    return prisma.conversation.create({
        data : {}, 
    })
}

export async function saveMessage(conversationId : string, 
    sender : string, 
    text: string){
        return prisma.message.create({
            data: {
                conversationId, sender, text
            }
        })
    }
    
    export async function getConversation(
        conversationId: string){
            return prisma.conversation.findUnique(
                {
                    where:{
                        id: conversationId,
                    }
                }
            )
    }

    export async function getMessages(conversationId : string) {
        return prisma.message.findMany({
            where: {
                conversationId,
            }, 
            orderBy: {
                createdAt: "asc"
            }
        })
    }

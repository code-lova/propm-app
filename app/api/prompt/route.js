import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req, res) => {

    try{
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store'
            }
        });

    }catch(error){
        return new Response("failed to fetch prompt feeds", {
            status: 500
        })
    }
}
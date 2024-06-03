import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        // Extracting the user ID from the request URL path
        const urlParts = req.url.split('/');
        const userId = urlParts[urlParts.length - 2]; // Adjust this index based on your URL structure
        
        await connectToDB();
        const prompts = await Prompt.find({ creator: userId }).populate('creator');
    
        return new Response(JSON.stringify(prompts), {
            status: 200,
        });

    } catch (error) {
      console.error('Failed to fetch user prompts:', error); // Debugging line
      return new Response("Failed to fetch user prompts", {
        status: 500,
      });
    }
};
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {

            await connectToDB();

            const sessionUser = await User.findOne({ email: session.user.email });
           

            if (sessionUser) {
                session.user.id = sessionUser._id.toString(); // Add user ID to the session
            }
            return session;
        },
    
        async signIn({ profile }){
            try{
                //Serverless i.e call once when need not to keep the server running constantly
                await connectToDB();
    
                //fist check if a user already exists
                const userExists = await User.findOne({ email: profile.email });
    
                //create a new user and save it to database
                 if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s+/g, "").toLowerCase(), //make sure there are no spaces and convert to lowercase
                        image: profile.picture
                    });
                 }
    
                return true;
            }catch(error){
                console.log("Error in signIn callback:", error);
                return false;
            }
        }
    }

   
});

export {handler as GET, handler as POST};

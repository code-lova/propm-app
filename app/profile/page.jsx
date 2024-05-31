"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

import Loading from "./loading";

const MyProfile = () => {

    const router = useRouter()
    const {data: session} = useSession();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPost = async() => {
          try {
              const response = await fetch(`/api/users/${session?.user.id}/post`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setPost(data);
          }catch (error) {
              console.error('Failed to fetch user posts:', error);
          }
        }
        
        
        if(session?.user.id){
            fetchPost();
        }else{
            router.push('/')
        }
      }, [session?.user.id, router])

      


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async(post) => {
        const confirmMessage = confirm("Are you sure about deleting this data?");

        if(confirmMessage){
            try {
                const response = await fetch(`/api/prompt/${post._id}`, {
                  method: 'DELETE',
                });
        
                if (response.ok) {
                  setPost((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
                } else {
                  console.error('Failed to delete prompt:', await response.text());
                }
            } catch (error) {
                console.error('Failed to delete prompt:', error);
            }
        }
    }

    if (!session) {
        return <Loading />;
        
    }




  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile"
        data={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile
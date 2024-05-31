"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

import Loading from "../loading";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  console.log(userPosts)

  useEffect(() => {
    const fetchPosts = async () => {
        if(params?.id){
            try{
                const response = await fetch(`/api/users/${params?.id}/post`);
                if(response.ok){
                    const data = await response.json();
                    setUserPosts(data);
                }else{
                    console.error('Failed to fetch prompt details');
                }
            }catch(error){
                console.error('Error fetching user prompt:', error);
            }
        }

    };

   
    fetchPosts();
     
  }, [params?.id]);

  if (!userName || !userPosts) {
    return (
        <Loading />
    );
  }

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

const UserProfileComponent = ({params}) => {
    return (
        <Suspense fallback={<Loading />}>
            <UserProfile params={params}/>
        </Suspense>
    );
};

export default UserProfileComponent;
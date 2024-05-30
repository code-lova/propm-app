"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    console.log(promptId);

    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getPromptDetails = async() => {
            if (promptId) {
                try {
                  const response = await fetch(`/api/prompt/${promptId}`);
                  if (response.ok) {
                    const data = await response.json();
                    setPost({
                      prompt: data.prompt,
                      tag: data.tag,
                    });
                  } else {
                    console.error('Failed to fetch prompt details');
                  }
                } catch (error) {
                  console.error('Error fetching prompt details:', error);
                }
            }
        }

        
        getPromptDetails();
    }, [promptId]);


    //Updating the prompt
    const updatePrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId){
            alert("Prompt Id not fou nd")
        }

        try{
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(response.ok){
                router.push("/")
            }
         }catch(error){
            console.error("Problem creating post", error)
        }finally{
            setSubmitting(false);
        }
    }


  return (
    
    <Form 
        type="Udpate"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  );
};

const EditPromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default EditPromptPage
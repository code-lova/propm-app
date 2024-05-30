"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const page = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);

    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });


    useEffect(() => {
        if (!session?.user.id) {
          router.push("/");
        }
    }, [session?.user.id, router]);

    const createPrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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

    if (!session) {
        return <p>Loading...</p>;
    }

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default page
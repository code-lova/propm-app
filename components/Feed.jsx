"use client";
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';
import Loading from '@app/profile/loading';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  )
}

const Feed = () => {
   
  const [post, setPost] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);



  const fetchPost = async() => {
    try{
      const response = await fetch('/api/prompt');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPost(data)
    }catch(error){
      console.error('Failed to fetch feeds:', error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);


  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return post.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }


  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  if(!post){
    return (
      <Loading />
    )
  }
  

  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input type="text"
          placeholder='search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? 
        (
          <PromptCardList 
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
              <PromptCardList 
                data={post}
                handleTagClick={handleTagClick}
              />
            )
    
      }
    </section>
  )
}

export default Feed
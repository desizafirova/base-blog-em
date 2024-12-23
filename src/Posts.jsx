import { useState } from 'react';

import { fetchPosts, deletePost, updatePost } from './api';
import { PostDetail } from './PostDetail';
import { useQuery } from '@tanstack/react-query';
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery({
    //  We add some options to the useQuery in order to let the query knows which data to fetch. useQuery takes an object of options. The order of the options doesn't matter
    // The queryKey is what defines this data within the query cache and it is always an array
    queryKey: ['posts'],
    // this is the function that we are going to run when we fetch the data
    queryFn: fetchPosts,
    //  staleTime is in ms
    staleTime: 2000,
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}

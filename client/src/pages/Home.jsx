import { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const displayURL = `${import.meta.env.VITE_REACT_POST_URL}/post`
  useEffect(() => {
    fetch(displayURL).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Post {...post} key={index} />
        ))}
    </>
  );
};

export default Home;

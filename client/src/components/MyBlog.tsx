import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from "../Post";

interface MyBlogProps {
    onPosts: (data: Post[]) => void;
}

const MyBlog: React.FC<MyBlogProps> = ({onPosts}) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/posts")
            .then(res => {
                setPosts(res.data.posts);
                onPosts(res.data.posts);
            })
            .catch(err => console.log(err));
    }, [onPosts]);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <div>
                        {post.tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBlog;

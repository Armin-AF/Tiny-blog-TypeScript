import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
}

const MyBlog: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('https://dummyjson.com/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <div>
                        {post.tags.map(tag => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBlog;

import React, { useState } from 'react';
import Post from "../Post";

interface SectionProps {
    tag: string;
    posts: Post[];
}

const Section: React.FC<SectionProps> = ({ tag, posts }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="section" key={tag}>
            <h3>
                {tag}
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "Hide" : "Show"}
                </button>
            </h3>
            {isOpen && (
                <div className="section-content">
                    {posts
                        .filter(post => post.tags.includes(tag))
                        .map(post => (
                            <div className="post-card" key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                                <div className="tags">
                                    {post.tags.map((tag, index) => (
                                        <span key={index}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Section;

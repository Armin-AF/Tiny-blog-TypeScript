import React, { useState } from 'react';
import MyBlog from "./components/MyBlog";
import Post from "./Post";
import Section from "./components/Section";

const App: React.FC = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    const handlePosts = (data: Post[]) => {
        setPosts(data);
        let tags: string[] = [];
        data.forEach(post => {
            tags = [...tags, ...post.tags.filter(tag => !tags.includes(tag))];
        });

        const tagCount = tags.reduce((allTags: { [key: string]: number }, tag) => {
            if (tag in allTags) {
                allTags[tag]++;
            } else {
                allTags[tag] = 1;
            }
            return allTags;
        }, {});

        const topFiveTags = Object.keys(tagCount)
            .sort((a, b) => tagCount[b] - tagCount[a])
            .slice(0, 5)
            .map(tag => ({ tag, count: tagCount[tag] }))
            .map(tagObject => tagObject.tag);
        setTags(topFiveTags);
    };


    return (
        <div>
            <MyBlog onPosts={handlePosts} />
            {tags.map(tag => (
                <Section key={tag} tag={tag} posts={posts} />
            ))}
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import MyBlog from "./components/MyBlog";
import Post from "./Post";

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
                <section key={tag}>
                    <h3>{tag}</h3>
                    <select>
                        <option value="show">Show</option>
                        <option value="hide">Hide</option>
                    </select>
                    {posts.filter(post => post.tags.includes(tag)).map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default App;

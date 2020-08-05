import React from 'react';

type propsType = {
    post: string
}

const Post = (props: propsType) => {
    return (
        <div className="post">
            <p className="post__text">{props.post}</p>
        </div>
    );
}

export default Post;
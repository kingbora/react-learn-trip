import React from "react";

function PhotoStory(props) {
    return <p>img: {props.story}</p>;
}

function VideoStory(props) {
    return <p>video: {props.story}</p>;
}

const components = {
    photo: PhotoStory,
    video: VideoStory
};


function Story(props) {
    // 若存在变量形式的组件，需要通过以下方式进行声明
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
}

export default function ChangeableComponent() {
    return (
        <div>
            <Story storyType={'photo'} story={'this is a img'} />
            <Story storyType={'video'} story={'this is a video'} />
        </div>
    );
}
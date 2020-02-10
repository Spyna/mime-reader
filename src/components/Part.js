import React from 'react';
import attachmentIcon from './attachment.png';
import inlineIcon from './inline.png';
import multipartIcon from './multipart.png';
import randomColor from 'randomcolor';

function Part({ type, disposition, children }) {
    const isLeaf = children.length === 0,
        isAttachment = isLeaf && disposition && disposition.value === 'attachment',
        icon = isAttachment ? attachmentIcon : (isLeaf ? inlineIcon : multipartIcon),
        color = randomColor({luminosity: "light", alpha: 0.5, format: "rgba"});

    return (
        <div className="part" style={{backgroundColor: color}}>
            <span>
                <img
                    src={icon}
                    alt="Type of this part"
                />
            </span>
            <span>
                {type}
                {isAttachment && ' (' + disposition.params.filename + ')'}
            </span>
            {children.map((part, key) => (
                <Part
                    key={key}
                    type={part.contentType.value}
                    disposition={part.headers['content-disposition'] && part.headers['content-disposition'][0]}
                    children={part.childNodes}
                />
            ))}
        </div>
    );
}

export default Part;
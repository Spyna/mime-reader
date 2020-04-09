import React from 'react';
import attachmentIcon from './attachment.png';
import inlineIcon from './inline.png';
import multipartIcon from './multipart.png';
import { getColorByDepth } from '../util/color';


function Part({ type, disposition, children, depth }) {
    const isLeaf = children.length === 0,
        isAttachment = isLeaf && disposition && disposition.value === 'attachment',
        icon = isAttachment ? attachmentIcon : (isLeaf ? inlineIcon : multipartIcon),
        color = getColorByDepth(depth);

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
                {disposition && disposition.params && disposition.params.filename && ' (' + disposition.params.filename + ')'}
            </span>
            {children.map((part, key) => (
                <Part
                    key={key}
                    type={part.contentType.value}
                    disposition={part.headers['content-disposition'] && part.headers['content-disposition'][0]}
                    children={part.childNodes}
                    depth={depth+1}
                />
            ))}
        </div>
    );
}

export default Part;
import React from 'react';
import attachmentIcon from './attachment.png';
import inlineIcon from './inline.png';

function Part({ type, disposition, children }) {
    const isLeaf = children.length === 0,
        isAttachment = isLeaf && disposition && disposition.value === 'attachment';
        
    return (
            <div className={`part ${type.replace('/', '_')}`}>
                <span>
                    {isLeaf && (
                        <img
                            src={isAttachment ? attachmentIcon : inlineIcon}
                            alt="Content-Disposition"
                        />
                    )}
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
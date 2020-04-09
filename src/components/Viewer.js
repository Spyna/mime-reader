import React from 'react';
import Part from './Part';

function Viewer({ file }) {
    if (!file) {
        return null;
    }

    return (
        <div id="viewer">
            <Part 
                type={file.contentType.value} 
                disposition={file.headers['content-disposition'] && file.headers['content-disposition'][0]} 
                children={file.childNodes}
                depth={0}
            />
        </div>
    );
}

export default Viewer;
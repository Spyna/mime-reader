import React, { useState } from 'react';

function FileSelector({ onUpload }) {
    const [filename, setFilename] = useState();

    function onFileChange(e) {
        setFilename(e.target.files[0].name);
        onUpload(e);
    }

    return (
        <label className="file-selector">
            <input type="file" accept=".eml" onChange={onFileChange} />
            <span>{filename ? filename : "Click to select an .eml file"}</span>
        </label>
    );
}

export default FileSelector;
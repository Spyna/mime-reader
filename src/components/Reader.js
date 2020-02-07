import React, { useState } from 'react';
import Viewer from './Viewer';
import parse from 'emailjs-mime-parser';

function Reader() {
    const [file, setFile] = useState();

    function onUpload(e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            setFile(parse(event.target.result));
        };
        reader.readAsBinaryString(e.target.files[0]);
    }

    return (
        <section>
            <div id="file-selector">
                <input type="file" onChange={onUpload} />
            </div>
            <Viewer file={file} />
        </section>
    );
}

export default Reader;
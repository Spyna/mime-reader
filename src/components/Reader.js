import React, { useState } from 'react';
import Viewer from './Viewer';
import parse from 'emailjs-mime-parser';

function Reader({comparing = false}) {
    const [file, setFile] = useState();

    function onUpload(e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            setFile(parse(event.target.result));
        };
        reader.readAsBinaryString(e.target.files[0]);
    }

    return (
        <>
            <section className="reader">
                <p>{comparing ? "Compare with" : "Please choose an .eml file containing a MIME message"}</p>
                <div id="file-selector">
                    <input type="file" accept=".eml" onChange={onUpload} />
                </div>
                <Viewer file={file} />
            </section>
            {file && <Reader comparing={file!==undefined}/>}
        </>

    );
}

export default Reader;
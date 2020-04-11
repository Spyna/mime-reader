import React, { useState } from 'react';
import Viewer from './Viewer';
import parse from 'emailjs-mime-parser';
import compareIcon from './imgs/compare.png';

function Reader({comparing = false}) {
    const [file, setFile] = useState();
    const [compare, setCompare] = useState(false);

    function onUpload(e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            setFile(parse(event.target.result));
        };
        reader.readAsBinaryString(e.target.files[0]);
    }

    function toggleCompare() {
        setCompare(!compare);
    }

    return (
        <>
            <section className="reader">
                <p>{comparing ? "Compare with" : "Please choose an .eml file containing a MIME message"}</p>
                <div class="file-selector">
                    <input type="file" accept=".eml" onChange={onUpload} />
                </div>
                <Viewer file={file} />
                {file && !compare && <div class="compare-action" onClick={toggleCompare}>
                    <img src={compareIcon} alt="Click to compare with another file"/>
                    <p>Compare</p>
                </div>}
            </section>
            {compare && <Reader comparing={true}/>}
        </>
    );
}

export default Reader;
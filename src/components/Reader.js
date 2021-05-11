import React, { useState } from "react"
import FileSelector from "./FileSelector"
import Viewer from "./Viewer"
import parse from "emailjs-mime-parser"
import compareIcon from "./imgs/compare.png"

function Reader() {
  const [file, setFile] = useState()
  const [compare, setCompare] = useState(false)

  function onUpload(file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      setFile(parse(event.target.result))
    }
    reader.readAsBinaryString(file)
  }

  function toggleCompare() {
    setCompare(!compare)
  }

  return (
    <>
      <section className="reader">
        <FileSelector onUpload={onUpload} />
        <Viewer file={file} />
        {file && !compare && (
          <div className="compare-action" onClick={toggleCompare}>
            <img src={compareIcon} alt="Click to compare with another file" />
            <p>Compare</p>
          </div>
        )}
      </section>
      {compare && <Reader />}
    </>
  )
}

export default Reader

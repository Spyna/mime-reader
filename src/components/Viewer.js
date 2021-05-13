import React from "react"
import Part from "./Part/Part"

function Viewer({ file }) {
  if (!file) {
    return null
  }

  return (
    <div id="viewer">
      <Part mimeNode={file} depth={0} />
    </div>
  )
}

export default Viewer

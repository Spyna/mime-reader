import React, { useState, useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"

function FileSelector({ onUpload }) {
  const [filename, setFilename] = useState()

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setFilename(file.name)
        onUpload(file)
      })
    },
    [onUpload]
  )
  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({ onDrop, maxFiles: 1 })

  const classes = useMemo(
    () =>
      [
        "dropzone",
        isDragActive ? "dropzone-active" : null,
        isDragAccept ? "dropzone-accept" : null
      ]
        .filter(Boolean)
        .join(" "),
    [isDragActive, isDragAccept]
  )

  return (
    <div>
      <div className={[classes]} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          {filename && (
            <span>
              Viewing <strong>{filename}</strong>
              <br />
            </span>
          )}
          <span>Drop file here, or click to select an .eml file</span>
        </p>
      </div>
    </div>
  )
}

export default FileSelector

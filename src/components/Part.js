import React, { useEffect, useRef, useState } from "react"
import attachmentIcon from "./imgs/attachment.png"
import inlineIcon from "./imgs/inline.png"
import multipartIcon from "./imgs/multipart.png"

function Part({ mimeNode, depth }) {
  const type = mimeNode.contentType.value
  const disposition =
    mimeNode.headers["content-disposition"] &&
    mimeNode.headers["content-disposition"][0]
  const children = mimeNode.childNodes

  const { raw, header: headers } = mimeNode

  const isLeaf = children.length === 0
  const isAttachment =
    isLeaf && disposition && disposition.value === "attachment"
  const icon = isAttachment
    ? attachmentIcon
    : isLeaf
    ? inlineIcon
    : multipartIcon

  const rawcontent = useRef()

  function toggleRawContent(event) {
    event.stopPropagation()
    if (rawcontent.current.style.display === "flex") {
      rawcontent.current.style.display = "none"
      return
    }
    rawcontent.current.style.display = "flex"
  }
  return (
    <>
      <div className="part" onClick={toggleRawContent}>
        <span>
          <img src={icon} alt="Type of this part" />
        </span>
        <span>
          {type}
          {disposition &&
            disposition.params &&
            disposition.params.filename &&
            " (" + disposition.params.filename + ")"}
        </span>
        {children.map((part, key) => (
          <Part key={key} depth={depth + 1} mimeNode={part} />
        ))}
      </div>
      <div className="rawcontent" ref={rawcontent}>
        <div>
          <button onClick={toggleRawContent}>close</button>
        </div>
        <div>
          <h2>Headers</h2>
          <ul>
            {headers.map((header) => (
              <li key={`header-${header}`}>
                <em>{header.substring(0, header.indexOf(":"))}</em>:
                {header.substring(header.indexOf(":") + 1)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Raw content</h2>
        </div>
        <pre>{raw}</pre>
      </div>
    </>
  )
}

export default Part

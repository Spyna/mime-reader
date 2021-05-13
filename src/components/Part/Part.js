import React from "react"
import attachmentIcon from "../imgs/attachment.png"
import inlineIcon from "../imgs/inline.png"
import multipartIcon from "../imgs/multipart.png"
import PartDetail from "./PartDetail"

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

  return (
    <>
      <div className="part">
        <span>
          <img src={icon} alt="Type of this part" />
        </span>
       
        <PartDetail
        headers={headers}
        raw={raw}
        text={ <span>
          {type}
          {disposition &&
            disposition.params &&
            disposition.params.filename &&
            " (" + disposition.params.filename + ")"}
        </span>}
      />
        {children.map((part, key) => (
          <Part key={key} depth={depth + 1} mimeNode={part} />
        ))}
      </div>
    </>
  )
}

export default Part

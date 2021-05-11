import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import "@testing-library/jest-dom/extend-expect"
import Viewer from "./Viewer"

jest.mock("./Part", () => {
  return function MockPart(props) {
    return (
      <div className="mockPart">
        <span>{props.type}</span>
        <span>{props.disposition}</span>
        <span>{props.children}</span>
      </div>
    )
  }
})

let container = null
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it("shows nothing when no file is given", () => {
  act(() => {
    render(<Viewer />, container)
  })

  expect(container).toBeEmpty()
})

it("shows the Part component when a file is given", () => {
  const file = {
    contentType: { value: "CONTENT-TYPE" },
    headers: {
      "content-disposition": ["DISPOSITION"]
    },
    childNodes: "CHILDREN"
  }

  act(() => {
    render(<Viewer file={file} />, container)
  })

  expect(container.querySelector(".mockPart").textContent).toContain(
    file.contentType.value
  )
  expect(container.querySelector(".mockPart").textContent).toContain(
    file.headers["content-disposition"][0]
  )
  expect(container.querySelector(".mockPart").textContent).toContain(
    file.childNodes
  )
})

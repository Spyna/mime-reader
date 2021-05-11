import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import App from "./App"

jest.mock("./components/Reader", () => {
  return function MockReader(props) {
    return <div>Mock Reader Rendered</div>
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

it("renders a header, a footer and the Reader component", () => {
  act(() => {
    render(<App />, container)
  })

  expect(container.querySelector("header").textContent).toContain("MIME Reader")
  expect(container.querySelector("footer").textContent).toContain("pixel13")
  expect(container.textContent).toContain("Mock Reader Rendered")
})

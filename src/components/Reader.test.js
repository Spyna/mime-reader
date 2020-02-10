import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Reader from './Reader';
import { fireEvent, waitForDomChange } from '@testing-library/react';

jest.mock("./Viewer", () => {
  return function MockViewer(props) {
    return <div className="mockViewer">{props.file}</div>;
  };
});

jest.mock("emailjs-mime-parser", () => {
  return function mockParse() {
    return "MOCK_PARSED";
  };
})

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("when loaded, shows a file input and an empty Viewer component", () => {
  act(() => {
    render(<Reader />, container);
  });

  expect(container.querySelectorAll("input[type='file']").length).toBe(1);
  expect(container.querySelector(".mockViewer")).toBeEmpty();
});

it("when a file is uploaded, pass the uploaded file to the Viewer component", async () => {
  act(() => {
    render(<Reader />, container);
  });

  const file = new File(["file_content"], 'message.eml', { type: 'message/rfc822' });
  const event = {
    target: {
      files: [
        file
      ]
    }
  };
  
  await act(async () => {
    fireEvent.change(container.querySelector("input[type='file']"), event);
  });

  await waitForDomChange({container});

  expect(container.querySelector(".mockViewer").textContent).toBe("MOCK_PARSED");
});
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

jest.mock("./FileSelector", () => {
  return function MockFileSelector(props) {
    return (
      <div className="mockFileSelector">
        <input type="file" onChange={e => props.onUpload(e)} />
      </div>
    );
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

it("when loaded, shows the FileSelector and an empty Viewer component", () => {
  act(() => {
    render(<Reader />, container);
  });

  expect(container.querySelectorAll(".mockFileSelector input[type='file']").length).toBe(1);
  expect(container.querySelectorAll(".compare-action").length).toBe(0);
  expect(container.querySelector(".mockViewer")).toBeEmpty();
  expect(container.querySelectorAll(".reader").length).toBe(1);
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
    fireEvent.change(container.querySelector(".mockFileSelector input[type='file']"), event);
  });

  await waitForDomChange({ container });

  expect(container.querySelector(".mockViewer").textContent).toBe("MOCK_PARSED");
  expect(container.querySelectorAll(".compare-action").length).toBe(1);
});

it("shows another reader when the compare link is clicked", async () => {
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
    fireEvent.change(container.querySelector(".mockFileSelector input[type='file']"), event);
  });

  await waitForDomChange({ container });

  await act(async () => {
    fireEvent.click(container.querySelector(".compare-action"), {});
  });

  expect(container.querySelectorAll(".reader").length).toBe(2);
});
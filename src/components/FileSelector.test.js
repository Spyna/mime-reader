import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import FileSelector from './FileSelector';
import { fireEvent } from '@testing-library/react';

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

it('renders the empty file selector with a label', () => {
  act(() => {
    render(<FileSelector onUpload={() => {}} />, container);
  });

  expect(container.querySelectorAll("input[type='file']").length).toBe(1);
  expect(container.textContent).toContain("Drop file here, or click to select an .eml file");
});

it('shows the filename and invoke the callback when a file is selected', async () => {
  
  let invoked = false;
  const callback = () => {
    invoked = true;
  }
  
  act(() => {
    render(<FileSelector onUpload={callback} />, container);
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

  expect(container.textContent).toContain("Viewing message.emlDrop file here, or click to select an .eml file");
  expect(container.textContent).toContain("message.eml");
  expect(invoked).toBe(true);
});

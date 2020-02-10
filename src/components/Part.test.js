import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import Part from './Part';

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

it('renders an attachment leaf showing the content-type and the filename', () => {
  let contentType = "application/pdf";
  let disposition = { value: "attachment", params: { filename: "test.pdf" }};
  act(() => {
    render(<Part type={contentType} disposition={disposition} children={[]} />, container);
  });

  expect(container.textContent).toContain(contentType);
  expect(container.textContent).toContain(disposition.params.filename);
  expect(container.querySelectorAll(".part").length).toBe(1);

  contentType = "application/xml";
  disposition = { value: "attachment", params: { filename: "test.xml" }};
  act(() => {
    render(<Part type={contentType} disposition={disposition} children={[]} />, container);
  });

  expect(container.textContent).toContain(contentType);
  expect(container.textContent).toContain(disposition.params.filename);
  expect(container.querySelectorAll(".part").length).toBe(1);
});

it('renders an inline leaf showing the content-type', () => {
  let contentType = "text/plain";
  let disposition = { value: "inline" };
  act(() => {
    render(<Part type={contentType} disposition={disposition} children={[]} />, container);
  });

  expect(container.textContent).toContain(contentType);
  expect(container.querySelectorAll(".part").length).toBe(1);

  contentType = "text/html";
  act(() => {
    render(<Part type={contentType} children={[]} />, container);
  });

  expect(container.textContent).toContain(contentType);
  expect(container.querySelectorAll(".part").length).toBe(1);
});

it('renders a multipart element recursively calling itself for every child', () => {
  const contentType = "multipart/mixed";
  const children = [
    {
      contentType: { value: "application/pdf" },
      headers: {
        'content-disposition': [
          { value: "attachment", params: { filename: "test.pdf" }}
        ]
      },
      childNodes: []
    },
    {
      contentType: { value: "text/plain" },
      headers: {},
      childNodes: []
    }
  ];
  act(() => {
    render(<Part type={contentType} children={children} />, container);
  });

  expect(container.textContent).toContain(contentType);
  expect(container.textContent).toContain(children[0].contentType.value);
  expect(container.textContent).toContain(children[0].headers['content-disposition'][0].params.filename);
  expect(container.textContent).toContain(children[1].contentType.value);
  expect(container.querySelectorAll(".part").length).toBe(3);
});

it('renders a multipart element recursively calling itself for nested multiparts', () => {
  const contentType = "multipart/mixed";
  const children = [
    {
      contentType: { value: "multipart/alternative" },
      headers: {},
      childNodes: [
        {
          contentType: { value: "text/plain" },
          headers: {},
          childNodes: []
        },
        {
          contentType: { value: "text/html" },
          headers: {},
          childNodes: []
        }
      ]
    },
    {
      contentType: { value: "application/pdf" },
      headers: {
        'content-disposition': [
          { value: "attachment", params: { filename: "test.pdf" }}
        ]
      },
      childNodes: []
    }
  ];
  act(() => {
    render(<Part type={contentType} children={children} />, container);
  });

  expect(container.textContent).toContain(contentType);
  expect(container.textContent).toContain(children[0].contentType.value);
  expect(container.textContent).toContain(children[0].childNodes[0].contentType.value);
  expect(container.textContent).toContain(children[0].childNodes[1].contentType.value);
  expect(container.textContent).toContain(children[1].contentType.value);
  expect(container.textContent).toContain(children[1].headers['content-disposition'][0].params.filename);
  expect(container.querySelectorAll(".part").length).toBe(5);
});

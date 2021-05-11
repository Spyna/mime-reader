import React from "react"
import "./App.css"
import Reader from "./components/Reader"

function App() {
  return (
    <div className="App">
      <header>
        <h1>EML MIME Reader</h1>
      </header>

      <section className="reader-container">
        <Reader />
      </section>

      <footer>
        <small>
          &copy; 2020{" "}
          <a
            href="https://github.com/pixel13"
            target="_blank"
            rel="noopener noreferrer"
          >
            pixel13
          </a>
        </small>
      </footer>
    </div>
  )
}

export default App

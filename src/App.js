import { CssBaseline } from "@material-ui/core"
import React from "react"
import "./App.css"
import AppHeader from "./components/AppHeader"
import Reader from "./components/Reader"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"

function App() {
  const classes = useStyles()
  return (
    <CssBaseline>
      <AppHeader />
      <Container className={classes.container} maxWidth="md" component="main">
        <section className="reader-container">
          <Reader />
        </section>
      </Container>
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
    </CssBaseline>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    margin: "auto"
  }
}))

export default App

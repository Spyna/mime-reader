import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Button from "@material-ui/core/Button"
import PartDetailContent from "./PartDetailContent"

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: { textTransform: "none", padding: 0 }
})

export default function PartDetail({ headers, raw, text }) {
  const classes = useStyles()
  const [visible, setVisible] = React.useState(false)

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setVisible((open) => !open)
  }

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer} className={classes.button}>
        {text}
      </Button>
      <Drawer anchor={"top"} open={visible} onClose={toggleDrawer}>
        <div
          className={clsx(classes.list, classes.fullList)}
          role="presentation"
        >
          <PartDetailContent
            raw={raw}
            headers={headers}
            onClose={toggleDrawer}
          />
        </div>
      </Drawer>
    </React.Fragment>
  )
}

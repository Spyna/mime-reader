import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}))
function alphabeticalSort(a, b) {
  if (a > b) {
    return 1
  }
  if (b > a) {
    return -1
  }
  return 0
}

export default function HeaderList({ headers }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="ul" aria-label="Part headers">
        {headers.sort(alphabeticalSort).map((header) => (
          <React.Fragment key={`header-${header}`}>
            <ListItem>
              <ListItemText
                primary={
                  <span>
                    <em>{header.substring(0, header.indexOf(":"))}</em>:
                    {header.substring(header.indexOf(":") + 1)}
                  </span>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

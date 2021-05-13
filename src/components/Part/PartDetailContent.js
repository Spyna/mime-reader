import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import HeaderList from "./HeaderList"
import { Button, Toolbar } from "@material-ui/core"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    flexGrow: 1
  }
}))

export default function PartDetailContent({ raw, headers, onClose }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={classes.tabs}
          >
            <Tab label="Headers" {...a11yProps(0)} />
            <Tab label="Raw Content" {...a11yProps(1)} />
          </Tabs>
          <Button color="primary" variant="contained" onClick={onClose} aria-label="Close">
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0} component="div">
        <HeaderList headers={headers} />
      </TabPanel>
      <TabPanel value={value} index={1} component="div">
        <pre>{raw}</pre>
      </TabPanel>
    </div>
  )
}

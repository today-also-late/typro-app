import { Divider } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolBar: theme.mixins.toolbar,
  drawerPaper: {
    wieth: 256,
  },
  seachField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32,
  },
}));

const ClosableDrawer = (props: any) => {
  const classes = useStyles();
  const { container } = props;

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const selectMenu = (event: any, path: string) => {
    Router.push(path);
    props.onClose(event);
  };

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: "python",
      id: "python",
      value: "/ranking/?language=python",
    },
    {
      func: selectMenu,
      label: "javascript",
      id: "javascript",
      value: "/ranking/?language=javascript",
    },
  ]);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="top"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div
          onClick={(e: any) => props.onClose(e)}
          // onKeyDown={(e) => props.onClose(e)}
        >
          <List>
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};
export default ClosableDrawer;

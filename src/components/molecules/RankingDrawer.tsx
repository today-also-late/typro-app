import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import Router from "next/router";

const RankingDrawer = (props: any) => {
  const selectMenu = (event: any, path: string) => {
    Router.push(path);
    props.onClose();
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
    {
      func: selectMenu,
      label: "C",
      id: "c",
      value: "/ranking/?language=c",
    },
    {
      func: selectMenu,
      label: "Go",
      id: "go",
      value: "/ranking/?language=go",
    },
  ]);

  return (
    <div>
      <Menu
        anchorEl={props.anchorEl}
        keepMounted
        open={props.open}
        onClose={props.onClose}
      >
        {filters.map((filter) => (
          <MenuItem
            button
            key={filter.id}
            onClick={(e) => filter.func(e, filter.value)}
          >
            {filter.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default RankingDrawer;

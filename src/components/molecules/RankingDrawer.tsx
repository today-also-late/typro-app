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
  ]);

  return (
    <div>
      <Menu anchorEl={props.anchorEl} keepMounted open={props.open}>
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

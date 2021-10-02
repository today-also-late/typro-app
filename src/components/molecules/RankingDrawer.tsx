import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import Router from "next/router";

const RankingDrawer = (props: any) => {
  const selectMenu = (id: string) => {
    Router.push({
      pathname: "ranking",
      query: {
        language: id,
      },
    });
    props.onClose();
  };

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: "python",
      id: "python",
    },
    {
      func: selectMenu,
      label: "javascript",
      id: "javascript",
    },
    {
      func: selectMenu,
      label: "C",
      id: "c",
    },
    {
      func: selectMenu,
      label: "Go",
      id: "go",
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
            onClick={() => filter.func(filter.id)}
          >
            {filter.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default RankingDrawer;

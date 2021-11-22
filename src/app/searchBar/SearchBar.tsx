import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import React, { ChangeEvent, forwardRef } from "react";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const styles = {
  paper: {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: ["100%", 400],
    border: "1px solid #E0E2EA",
    borderRadius: "8px",
    marginRight: "10px",
  },
  inputBase: {
    flex: 1 
  }
};

const SearchBar = (props: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setSearchValue(event.target.value);
  };

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{
        ...styles.paper,
      }}
    >
      <InputBase
        type="text"
        placeholder="Search"
        value={props.searchValue}
        onChange={handleChange}
        sx={{ ...styles.inputBase }}
      />
      <SearchIcon />
    </Paper>
  );
};

export default forwardRef(SearchBar);

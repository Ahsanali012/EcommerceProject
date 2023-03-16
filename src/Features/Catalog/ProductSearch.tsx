import { TextField } from "@material-ui/core";
import { debounce } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/ConfigureStore";
import { setProductParams } from "./CatalogSlice";

export default function ProductSearch() {
  const dispatch = useAppDispatch();

  const { productParams } = useAppSelector((state) => state.catalog);

  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

  const debounceSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 2000);


  return (
    <TextField
      label="Search Products"
      variant="outlined"
      focused
      fullWidth
      value={searchTerm || ""}
      onChange={(event:any) =>{
      setSearchTerm(event.target.value);
      debounceSearch(event)
      }}

    />
  );
}

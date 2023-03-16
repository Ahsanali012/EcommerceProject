import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,

  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,

  Typography,
} from "@material-ui/core";
import { useState, useEffect } from "react";

import LoadingComponent from "../../Layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../Store/ConfigureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "./CatalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [Loading, setLoading] = useState(true);

  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status, filtersLoaded, brands, types } =
    useAppSelector((state) => state.catalog);

  const sortOptions = [
    { value: "name", label: "Alphabetical" },
    { value: "priceDesc", label: "Price-High to low" },
    { value: "price", label: "Price - Low to high" },
  ];

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading Product" />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch/>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
                  key={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                control={<Checkbox />}
                label={brand}
                key={brand}
              />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((types) => (
              <FormControlLabel
                control={<Checkbox />}
                label={types}
                key={types}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}/>

      <Grid item xs={9}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Typography>
        Displaying 1-6 of 20 items
      </Typography>
      <Pagination
      color='secondary'
      size='large'
      count={10}
      page={2}
      />
      </Box>
      </Grid>
    </Grid>
  );
}

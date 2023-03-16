import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../Models/product";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import agent from "../../ApiMiddleWare/Agent";
import NotFound from "../../Errors/NotFound";
import LoadingComponent from "../../Layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../Store/ConfigureStore";
import { fetchProductAsync, productSelectors } from "./CatalogSlice";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  // const [Product, setProduct] = useState<Product | null>(null);
  const Product = useAppSelector(state=>productSelectors.selectById(state,id))
 
  const {status:ProductStatus}  = useAppSelector(state=>state.catalog)
  const {basket,status}  = useAppSelector(state=>state.basket)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!Product) dispatch(fetchProductAsync(parseInt(id)))
  }, [id,dispatch,Product]);

  if (ProductStatus.includes('pending')) return <LoadingComponent message="Loading Product ..." />;

  if (!Product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={Product?.pictureUrl}
          alt={Product?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{Product?.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(Product?.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{Product?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{Product?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{Product?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{Product?.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{Product?.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <TextField 
                    variant='outlined'
                    type='number'
                    label='Quantity in Cart'
                    fullWidth
                    value={quantity}
                    onChange={handleInputChange}
                /> */}
          </Grid>
          <Grid item xs={6}>
            {/* <LoadingButton
                    disabled={item?.quantity === quantity}
                    loading={status.includes('pending')}
                    onClick={handleUpdateCart}
                    sx={{height: '55px'}}
                    color='primary'
                    size='large'
                    variant='contained'
                    fullWidth
                >
                    {item ? 'Update Quantity' : 'Add to Cart'}
                </LoadingButton> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

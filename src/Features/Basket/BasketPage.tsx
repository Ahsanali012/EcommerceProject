import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../ApiMiddleWare/Agent";
import LoadingComponent from "../../Layout/LoadingComponent";
import { Basket } from "../../Models/basket";
import { useAppDispatch, useAppSelector } from "../../Store/ConfigureStore";
import {
  addBasketItemAsync,
  fetchBasket,
  removeBasketItemAsync,
  setBasket,
} from "./BasketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const { basket, status,  } = useAppSelector(
    (state) => state.basket
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!basket)dispatch(fetchBasket());
  }, []);

  // const [status, setStatus] = useState({
  //   loading: false,
  //   name: "",
  // });

  // function handleAddItem(productId: number, name: string) {
  //   setStatus({ loading: true, name });
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: false, name: "" }));
  // }

  // function handleRemoveItem(productId: number, quantity = 1, name: string) {
  //   setStatus({ loading: true, name });
  //   agent.Basket.deleteItem(productId, quantity)
  //     .then(() => dispatch(removeItem({ productId, quantity })))
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: false, name: "" }));
  // }

  // if (status.includes('pendingAddItem')) return <LoadingComponent message="Loading Basket ...." />;

  if (!basket)
    return <Typography variant="h3"> Your Basket is Empty </Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product </TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    // loading={
                    //   status.loading && status.name === "rem" + item.productId
                    // }
                    loading={
                      status === "pendingRemoveItem" + item.productId + "rem"
                    }
                    onClick={() =>
                      // handleRemoveItem(item.productId,1,"rem" + item.productId)
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    // loading={
                    //   status.loading && status.name === "add" + item.productId
                    // }
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      // handleAddItem(item.productId, "add" + item.productId)
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      // status.loading && status.name === "del" + item.productId
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={
                      () =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: item.quantity,
                            name: "del",
                          })
                        )
                      // handleRemoveItem(
                      //   item.productId,
                      //   item.quantity,
                      //   "del" + item.productId
                      // )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>

        <Button
          component={Link}
          to="/checkOut"
          variant="contained"
          size="large"
          fullWidth
        >
          CheckOut
        </Button>
      </Grid>
    </>
  );
}

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import { Product } from "../../Models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../ApiMiddleWare/Agent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../Store/ConfigureStore";
import { addBasketItemAsync, setBasket } from "../Basket/BasketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const {status}= useAppSelector(state=>state.basket);
  const dispatch = useAppDispatch();

  // function handleAddItem(productId: number) {
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }

  return (
    <Card>
      <CardActionArea
        {...{ component: Link, to: `/catalog/${product.id}` }}
        LinkComponent={Link}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {product.name.charAt(0).toLocaleUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.light",
          }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <LoadingButton
          loading={status.includes('pendingAddItem'+product.id)}
          // onClick={() => handleAddItem(product.id)}
          onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))}
          size="small"
        >
          {" "}
          Add to cart
        </LoadingButton>
      </CardActions>
    </Card>
  );
}

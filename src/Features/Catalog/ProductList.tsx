import { Grid } from "@material-ui/core";
import { Product } from "../../Models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../Store/ConfigureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} item xs={4}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard key={product.id} product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

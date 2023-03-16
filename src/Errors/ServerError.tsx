import { Button, Container, Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ServerError() {
  let navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h3" color='error' gutterBottom>
           {state.error.Title}
          </Typography>
          <Typography>
            {state.error.Detail || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}

      <Button onClick={() => navigate("/catalog")}>Go back to the store</Button>
    </Container>
  );
}

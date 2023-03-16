import { Button, Container, Divider, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function NotFound(){
return(
    <Container component={Paper} sx={{height:400}}>
        <Typography gutterBottom variant="h3">
            Oops- we could not find what you're searching
        </Typography>
        <Divider/>
        <Button fullWidth component={Link} to ='/catalog'>
            Go Back To Shop
        </Button>
    </Container>
)
}
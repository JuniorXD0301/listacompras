// src/components/Cart.js
import React, { useContext } from "react";
import { AppContext } from "../Appcontext.js";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    setCart([]);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <IconButton aria-label="back" onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom align="center">
        Carrito
      </Typography>
    <Grid container justifyContent="center">
        {cart.map((post) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {post.title}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default Cart;

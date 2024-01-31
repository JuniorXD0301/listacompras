import React, { useContext, useState } from "react";
import { AppContext } from "../Appcontext.js";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);

  const handleDelete = (id) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => item.id === id);
    if (itemInCart.quantity > 1) {
      itemInCart.quantity--;
    } else {
      newCart = newCart.filter((item) => item.id !== id);
    }
    setCart(newCart);
  };

  const handleConfirmDeleteAll = () => {
    setCart([]);
    setOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = (post) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => item.id === post.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...post,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
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
                <Typography variant="body1" gutterBottom>
                  Cantidad: {post.quantity}
                </Typography>
                <Button onClick={() => handleAddToCart(post)}>Agregar al carrito</Button>
                <Button onClick={() => handleDelete(post.id)}>Eliminar del carrito</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <IconButton aria-label="delete" onClick={() => {setOpen(true); setDeleteAll(true);}}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar productos"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteAll ? "¿Desea eliminar todos los productos del carrito?" : "¿Desea eliminar este producto del carrito?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={deleteAll ? handleConfirmDeleteAll : handleDelete} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;

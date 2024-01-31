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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [modalText, setModalText] = useState("");

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

  const handlePurchase = () => {
    setOpen(true);
    setModalText("¿Desea comprar estos productos?");
  };

  const handleConfirmPurchase = () => {
    setCart([]);
    setOpen(false);
    setPurchase(false);
    alert("Compra exitosa ✔️");
  };

  return (
    <div style={{ backgroundColor: "#DCF2F1", minHeight: "100vh" }}>
      <IconButton
        aria-label="back"
        onClick={handleBack}
        style={{ color: "#365486" }}
      >
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
                <IconButton
                  color="primary"
                  onClick={() => handleAddToCart(post)}
                  style={{ color: "#365486" }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleDelete(post.id)}
                  style={{ color: "#365486" }}
                >
                  <RemoveIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center" }}>
        <IconButton
          aria-label="delete"
          onClick={() => {
            setModalText("¿Desea eliminar estos productos?");
            setOpen(true);
            setDeleteAll(true);
          }}
          title="Eliminar todos los productos"
          style={{ color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="purchase"
          onClick={handlePurchase}
          title="Confirmar compra"
          style={{ color: "#365486" }}
        >
          <CheckIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={deleteAll ? handleConfirmDeleteAll : handleConfirmPurchase}
            color="primary"
            autoFocus
          >
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;

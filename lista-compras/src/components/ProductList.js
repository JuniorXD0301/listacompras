import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Appcontext.js";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { cart, setCart } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  /*paginador*/
  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
    navigate("/cart");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: "#DCF2F1", minHeight: "100vh" }}>
      <Typography variant="h4" style={{ margin: "20px 20px" }}>
        List of Posts
      </Typography>

      <Grid container spacing={3} style={{ margin: "0 1px" }}>
        {currentPosts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <b>Titulo: </b>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <b>Contenido: </b>
                  {post.body}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={() => handleAddToCart(post)}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: currentPage === 1 ? "#7FC7D9" : "#0F1035",
            color: "white",
            marginRight: "10px",
          }}
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous Page
        </Button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <Button
          variant="contained"
          style={{
            backgroundColor:
              currentPosts.length < postsPerPage ? "#7FC7D9" : "#0F1035",
            color: "white",
          }}
          disabled={currentPosts.length < postsPerPage}
          onClick={() => paginate(currentPage + 1)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default ProductList;

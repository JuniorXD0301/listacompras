// src/components/ProductList.js
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Appcontext.js";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';

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
  const postsPerPage = 10;
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
    navigate('/cart');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Typography variant="h4" style={{ margin: "20px 20px" }}>
        List of Posts
      </Typography>

      <Grid container spacing={3} style={{margin: "0 1px"}}>
        {currentPosts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.body}
                </Typography>
                <Button color="primary" onClick={() => handleAddToCart(post)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          style={{ marginRight: "10px" }}
        >
          Previous Page
        </Button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <Button
          variant="contained"
          color="primary"
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

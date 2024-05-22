import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../Cart/cartSlice';
import DATA from './DogDATA';
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Grid,
    Container,
    TextField,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from '@mui/material';

// Define a custom MUI theme with bright and colorful colors
const petTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2979ff', // Bright blue
        },
        secondary: {
            main: '#00e676', // Vibrant green
        },
        background: {
            default: '#303030', // Dark gray
            paper: '#424242', // Medium gray
        },
        text: {
            primary: '#ffffff', // White
            secondary: '#ffcc80', // Light orange
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            color: '#ff8f00', // Orange
        },
        h5: {
            fontFamily: 'Roboto, Arial, sans-serif',
            color: '#ff8f00', // Orange
        },
        body2: {
            color: '#b0bec5', // Light gray
        },
    },
});

const Dog = () => {
    const dispatch = useDispatch(); // Initializing useDispatch hook
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const handleAddToCart = (item) => {
        dispatch(addItemToCart(item)); // Dispatching addItemToCart action with the selected item
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };

    const filteredItems = DATA.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ); // Filter items based on search query

    const cardItem = (item) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="300" // Increased height for the image
                        image={item.img}
                        alt={item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ${item.price}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => handleAddToCart(item)}>Buy Now</Button>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <ThemeProvider theme={petTheme}>
            <CssBaseline />
            <Container>
                <div className="py-5 text-center">
                    <Typography variant="h4">Dog Products</Typography>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        sx={{ marginTop: '10px', marginBottom: '10px' }}
                    /> {/* Search bar */}
                    <hr />
                </div>
                <Grid container spacing={3} justifyContent="center">
                    {filteredItems.map(cardItem)} {/* Render filtered items */}
                </Grid>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button component={Link} to="/cart" variant="contained" color="primary">
                        Go to Cart
                    </Button>
                </div>
            </Container>
        </ThemeProvider>
    );
};

export default Dog;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, removeItemFromCart, decreaseQuantity, increaseQuantity } from './cartSlice';
import { selectCheckoutStatus, checkoutPending, setCartItems } from './cartSlice';
import { selectLogged } from '../loginSlice'; // Import selectLogged selector from loginSlice
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Typography,
    IconButton,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import { Pets as PetsIcon, Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const petTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff4081', // A playful pink color
        },
        secondary: {
            main: '#c6ff00', // A playful green color
        },
        background: {
            default: '#303030', // Dark background
            paper: '#424242', // Dark paper background
        },
        text: {
            primary: '#ffffff', // White text
            secondary: '#c6ff00', // Playful green text
        },
    },
    typography: {
        fontFamily: 'Comic Sans MS, cursive, sans-serif', // Playful font
        h5: {
            fontFamily: 'Papyrus, fantasy, serif', // Even more playful for headings
        },
    },
});

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCart);
    const checkoutStatus = useSelector(selectCheckoutStatus);
    const isAuthenticated = useSelector(selectLogged); // Retrieve authentication status

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            dispatch(setCartItems(JSON.parse(storedCartItems)));
        }
    }, [dispatch]);
    
    // Update localStorage when cartItems state changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleRemoveItem = (itemId) => {
        dispatch(removeItemFromCart(itemId));
        toast.success('Item removed from cart');
    };

    const handleDecreaseQuantity = (itemId) => {
        dispatch(decreaseQuantity(itemId));
        toast.info('Item quantity decreased');
    };

    const handleIncreaseQuantity = (itemId) => {
        dispatch(increaseQuantity(itemId));
        toast.info('Item quantity increased');
    };

    // Calculate total price for each product and overall total
    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    const handleCheckout = () => {
        // If not authenticated, redirect to login page
        if (!isAuthenticated) {
            return <Link to="/login" />;
        } else {
            return <Link to="/checkout" />; // Redirect to checkout page
        }
    };

    const overallTotalPrice = cartItems.reduce((acc, item) => {
        return acc + calculateTotalPrice(item);
    }, 0);

    return (
        <ThemeProvider theme={petTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <PetsIcon fontSize="large" sx={{ color: 'secondary.main' }} />
                    <Typography variant="h2">Cart</Typography>
                </Box>
                <hr />
                {cartItems.length === 0 ? (
                    <Typography variant="h6">Your cart is empty.</Typography>
                ) : (
                    <div>
                        {cartItems.map((item, index) => (
                            <Box className="list-group-item" key={item.id} sx={{ mb: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 2 }}>
                                <Box className="row align-items-center" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box className="col-md-6">
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography>{item.description}</Typography>
                                        <Typography>Individual Price: ${item.price}</Typography>
                                        {item.reviews && ( // Render reviews if they exist
                                            <>
                                                <Typography>Rating: {item.rating}</Typography>
                                                <ul>
                                                    {item.reviews.map((review, reviewIndex) => (
                                                        <li key={reviewIndex}>
                                                            <strong>Rating:</strong> {review.rating}, <strong>Comment:</strong> {review.comment}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </Box>
                                    <Box className="col-md-3">
                                        <Typography>Quantity: {item.quantity}</Typography>
                                        <Typography>Total Price: ${item.price * item.quantity}</Typography>
                                    </Box>
                                    <Box className="col-md-3" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDecreaseQuantity(item.id)} color="secondary">
                                            <RemoveIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleIncreaseQuantity(item.id)} color="primary">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                {index !== cartItems.length - 1 && <hr />}
                            </Box>
                        ))}
                        <hr />
                        <Typography variant="h5">Overall Total: ${overallTotalPrice.toFixed(2)}</Typography>
                        <Link to={isAuthenticated ? '/checkout' : '/login'} style={{ textDecoration: 'none' }}> {/* Use Link to navigate */}
                            <Button variant="contained" color="primary" fullWidth disabled={checkoutStatus === 'pending'}>
                                {checkoutStatus === 'pending' ? 'Processing...' : 'Proceed to Checkout'}
                            </Button>
                        </Link>
                    </div>
                )}
            </Container>
        </ThemeProvider>
    );
};

export default Cart;

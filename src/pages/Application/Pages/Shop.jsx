import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Avatar, Grid, Tabs, Tab, Button, TextField, Modal, FormControl, InputLabel, Select, MenuItem, DialogActions } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';
import { getToken } from '../../../Cookies';
import { Add } from '@mui/icons-material';
import ItemCard from '../Components/ItemCard';

const MyShop = () => {
    const [pageType, setPageType] = useState('items');
    const [loading, setLoading] = useState(true)// Set initial state to 'items'
    const [shopDetails, setShopDetails] = React.useState({
        name: '',
        street: '',
        profile: '',
        city: '',
        state: '',
        openingTime: '',
        closingTime: '',
        mobile: '',
        address: null
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const fetchMyShop = async () => {

        try {

            setLoading(true)
            var token = getToken()
            var response = await axios.get("http://localhost:8080/Shop", { headers: { "Authorization": `Bearer ${token}` } })
            console.log(response.data)
            setShopDetails(response.data)
            setLoading(false)
        } catch (e) {

            setLoading(true)
            console.log(e)
        }
    }

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            fetchMyShop();
            hasFetched.current = true; // Set the flag to true after fetching
        }
    }, [])
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={2}
                sx={{
                    backgroundImage: `url('/images/LoginFormBackgroundImage.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '350px',
                    width: 'match-parent',
                    color: 'white',
                    position: 'relative',
                }}
            >
                <Avatar
                    alt="Shop Profile Picture"
                    src={!loading ? shopDetails.profile : "/path-to-your-image.jpg"}
                    sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        border: '4px solid white',
                    }}
                />
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                >
                    {!loading ? shopDetails.name : "My Shop Name"}
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                        <Typography variant="subtitle1" component="p" sx={{ fontSize: '1.2rem' }}>
                            Rating
                        </Typography>
                        <Typography variant="h6" component="p" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {!loading ? shopDetails.rating : "0"}{'/10'}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="p" sx={{ fontSize: '1.2rem' }}>
                            Reputation
                        </Typography>
                        <Typography variant="h6" component="p" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {!loading ? shopDetails.reputation : "0"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="p" sx={{ fontSize: '1.2rem' }}>
                            Total Items Sold
                        </Typography>
                        <Typography variant="h6" component="p" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {!loading ? shopDetails.itemSold : "0"}
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Tabs
                        value={pageType}
                        centered
                        TabIndicatorProps={{
                            sx: { backgroundColor: 'white', height: 5, border: 2, borderRadius: 20, borderColor: 'maroon' },
                        }}
                        sx={{
                            display: 'flex',  // Use flexbox
                            '.MuiTab-root': {
                                flex: 1,  // Make each tab take half of the width
                                fontSize: '1.1rem',  // Larger font size
                            },
                            '.MuiTab-root.Mui-selected': {
                                color: 'white',   // Active tab text color
                            },
                            '.MuiTab-root:not(.Mui-selected)': {
                                color: 'yellow',  // Inactive tab text color
                            },
                        }}
                    >
                        <Tab
                            value="items"
                            label="My Items"
                            icon={<ShoppingCartIcon />}
                            iconPosition="start"
                            onClick={() => setPageType('items')}
                        />
                        <Tab
                            value="deals"
                            label="Deals"
                            icon={<LocalOfferIcon />}
                            iconPosition="start"
                            onClick={() => setPageType('deals')}
                        />
                    </Tabs>
                </Box>
            </Box>

            {/* Render content based on the selected tab */}
            <Page type={pageType} />
            <Button
                variant="contained"
                onClick={handleOpenModal}
                style={{
                    position: "fixed",
                    bottom: "40px", /* Distance from the bottom */
                    right: "40px",  /* Distance from the right */
                    zIndex: "1000",
                    border: "2px dashed grey",
                    background: "white",
                    color: "gray",
                    boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.2)"
                }}>
                <Add />
            </Button>
            <>
                <ItemModal isOpen={isModalOpen} handleClose={handleCloseModal} />
            </>
        </>
    );
};

const Page = ({ type }) => {

    const [items, setItems] = useState([]);
    const fetchItem = async () => {

        try {

            var token = getToken()
            var response = await axios.get(`http://localhost:8080/Shop/get-${type}`, { headers: { "Authorization": `Bearer ${token}` } })
            console.log(response.data)
            setItems(response.data)
        } catch (e) {

            console.log(e)
        }
    }
    useEffect(() => {

        fetchItem()
    }, [type])
    return (
        <Box
            display="flex"
            justifyContent="center"
            backgroundColor="#e0e0e0"
            alignItems="center"
            height="100%"
            flexGrow={1}>
            <Grid container spacing={2} marginLeft={2}>
                {items.map((item, index) => {
                    return (

                        <Grid item xs={10} sm={6} md={4} lg={3} key={index} marginTop={2}>
                            <ItemCard
                                index={index}
                                name={item.name}
                                discription={item.description}
                                price={item.price}
                                photo={item.photo}
                                type='Shop'
                                upvote={item.upVotes}
                                downvote={item.downVotes}
                                profile={item.shop.profile}
                                shopName={item.shop.name}
                                open={item.shop.openingTime}
                                close={item.shop.closingTime}
                            />
                        </Grid>)
                })}
                {type}
            </Grid>
        </Box>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};


const ItemModal = ({ isOpen, handleClose }) => {
    // Form state
    const [formData, setFormData] = useState({
        photo: null, // To store the file
        name: '',
        price: '',
        description: '',
        itemType: 'Resource', // Default item type
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0], // Store the selected file
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = new FormData();
            data.append("photo", formData.photo);
            data.append("item.name", formData.name);
            data.append("item.description", formData.description);
            data.append("item.itemType", formData.itemType);
            data.append("item.price", formData.price);
            var response = await axios.post("http://localhost:8080/Item", data, { headers: { "Authorization": `Bearer ${getToken()}` } })
            handleClose(); // Close modal after submitting
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="item-modal-title"
            aria-describedby="item-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="item-modal-title" variant="h6" component="h2" gutterBottom>
                    Add New Item
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* Custom File Upload Button */}
                        <label style={{ flex: 1, display: 'block' }}>
                            <input
                                type="file"
                                accept="image/*" // Accept only image files
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            // Hide the default input
                            />
                            <Button variant="outlined" component="span" style={{ width: '100%', color: 'black', height: "55px" }}>
                                Pick Photo
                            </Button>
                        </label>
                        <FormControl fullWidth sx={{ width: '50%' }}>
                            <Select
                                name="itemType"
                                value={formData.itemType}
                                onChange={handleInputChange}
                                displayEmpty
                                sx={{ border: '1px solid #ccc', borderRadius: '4px', background: 'transparent', width: '100%' }} // Remove background
                            >
                                <MenuItem value="Resource">Resource</MenuItem>
                                <MenuItem value="Service">Service</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined" // Use outlined variant for better aesthetics
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined" // Use outlined variant for better aesthetics
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined" // Use outlined variant for better aesthetics
                    />
                    <DialogActions>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                        <Button color="primary" onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </form>
            </Box>
        </Modal>
    );
};

export default MyShop;


//Grid Under Page


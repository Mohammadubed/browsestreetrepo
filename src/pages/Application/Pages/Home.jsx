import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, TextField, InputAdornment, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ItemCard from '../Components/ItemCard'; // Assuming the ItemCard component is already created
import { MoreHoriz } from '@mui/icons-material';
import { getToken } from '../../../Cookies';
import axios from 'axios';

const returnURL = async ({ title = null, distance = null, search = null, deal = null, sort = null }) => {
  const baseURL = "http://localhost:8080/Item/search?";
  const params = new URLSearchParams();

  // Set default or provided values for distance and other query parameters
  params.append("d", distance || "20000");
  if (search) params.append("s", search);
  if (title) {
    title === 'Deals' ? params.append("dl", "true") : params.append("srt", "true");
  }
  if (deal) params.append("dl", deal);
  if (sort) params.append("srt", sort);

  // Get the location asynchronously
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    params.append("lng", latitude);
    params.append("lat", longitude);
  } catch (error) {
    console.error("Geolocation error:", error);
  }

  return baseURL + params.toString();
};


const SearchBar = ({ clicked, item }) => {
  const [value, setValue] = useState("")

  const handleOnClick = async () => {

    try {

      var token = getToken()
      var response = await axios.get(await returnURL({ search: value }), { headers: { "Authorization": `Bearer ${token}` } })
      console.log(response.data)
      item(response.data.Data)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Box
      height="80px" // Reduced height
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderBottom={2}
      padding={2}
      sx={{
        borderColor: 'maroon',
      }} // White background from the theme// Margin bottom for spacing from FrameWithTitle
    >
      <Box
        display="flex"
        justifyContent="center"
        height="80px"
        alignItems="center"
        width={350}
        bgcolor="maroon"
        mb={2}
        mt={2}
        borderRadius={5}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileFocus={{ scale: 1.05 }}
        >
          <TextField
            onClick={() => { clicked(true) }}
            onBlur={() => { if (value === "") { clicked(false); item([]) } }}
            value={value}
            variant="outlined"
            placeholder="Search..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleOnClick() }}
            onChange={(e) => { setValue(e.target.value) }}
            sx={{
              input: {
                color: 'maroon', // Maroon text color from the theme
              },
              width: '300px', // Slightly reduced width
              bgcolor: 'white', // Background color for the input
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'maroon', // Maroon border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 223, 0, 0.5)', // Yellowish-white border on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 223, 0, 0.5)', // Yellowish-white on focus
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'maroon' }} />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

const MainLayout = () => {
  const titles = ['Deals', 'Most Rated', 'Recently Viewed'];
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [location, setLocation] = useState([51.505, -0.09]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  return (
    <Box overflow='hidden'>
      <SearchBar clicked={setSearchClicked} item={setSearchedItems} location={location} />
      {searchedItems.length!=0? (
        <Box bgcolor="#e0e0e0" minHeight='80vw' marginTop={'20px'}>
          <Grid container spacing={2} marginLeft={2}>
            {searchedItems.length > 0 ? (
              searchedItems.map((item) => (
                <Grid item xs={10} sm={6} md={4} lg={2.5} marginTop={2} key={item.id}>
                  <ItemCard
                    index={item.id}
                    name={item.name}
                    description={item.description} // Fixed typo here
                    price={item.price}
                    photo={item.photo}
                    upvote={item.upVotes}
                    downvote={item.downVotes}
                    profile={item.shop.profile}
                    address={item.shop.address}
                    shopName={item.shop.name}
                    open={item.shop.openingTime}
                    close={item.shop.closingTime}
                  />
                </Grid>
              ))
            ) : (
              <Typography>No items found</Typography>
            )}
          </Grid>
        </Box>
      ) : (
        <Box
          overflow='hidden'
          sx={{
            padding: '20px',
            bgcolor: 'white',
            backgroundImage: `url('/images/LoginFormBackgroundImage.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Titles and ItemCards */}
          {titles.map((title, index) => (
            <Box key={index} mb={4} position={'relative'}> {/* Add margin bottom between sections */}
              <Typography
                variant="h6"
                sx={{
                  color: '#800000', // Maroon text color for titles
                  marginBottom: 2,
                  fontWeight: 'bold',
                  zIndex: 1,
                  position: 'relative',
                }}
              >
                {title}
              </Typography>
              <Divider sx={{ marginBottom: 1, thickness: 2 }} /> {/* Thicker horizontal line after title */}
              <Box
                overflow='hidden'
                sx={{
                  minHeight: 275,
                  bgcolor: 'rgba(0, 0, 0,0.6)',
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={2}>
                  {title != 'Recently Viewed' ?
                    <PageGrid title={title} />:<Typography> No {title} Exist</Typography>}
                </Grid>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default MainLayout;


const PageGrid = ({ title }) => {
  const [items, setItems] = useState([]);

  const handleOnClick = async () => {
    const getURL = title === 'Deals' ? await returnURL({ deal: true }) : await returnURL({ sort: true });
    console.log(getURL); // Logging the URL for debugging
    try {
      const token = getToken();
      const response = await axios.get(getURL, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(response.data); // Logging the response data
      setItems(response.data.Data || []); // Correctly set items; default to empty array if undefined
    } catch (e) {
      console.error("Error fetching data:", e); // Improved error logging
    }
  };

  useEffect(() => {
    handleOnClick(); // Fetch items on component mount
  }, []);

  return (
    <>
      <Grid container spacing={2} margin={1} >
        {items.slice(0, 3).map((item, index) => ( // Display only the first three items
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              type="Home"
              index={index}
              name={item.name}
              description={item.description} // Corrected 'discription' to 'description'
              price={item.price}
              photo={item.photo}
              upvote={item.upVotes}
              downvote={item.downVotes}
              profile={item.shop.profile}
              shopName={item.shop.name}
              address={item.shop.address}
              open={item.shop.openingTime}
              close={item.shop.closingTime}
            />
          </Grid>
        ))}

        {items.length > 3 && ( // Show 'More' button if there are more than 3 items
          <Grid>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" height="100%">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={handleOnClick} // Trigger fetch on button click
                  sx={{
                    display: "flex",
                    flexFlow: "column",
                    backgroundColor: "rgba(255, 223, 0, 0.5)", // Button background color
                    color: "white",
                    height: 266,
                    width: 265,
                    marginLeft:2
                  }}
                >
                  <MoreHoriz />
                  More
                </Button>
              </motion.div>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};
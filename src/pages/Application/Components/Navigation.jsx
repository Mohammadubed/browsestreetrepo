import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AddLocationAlt, Chat, Store, AccountCircle, LocationOn, Create } from '@mui/icons-material';
import { } from '@mui/material';
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import { getIsShopExist, getToken } from '../../../Cookies';

export default function Navigation({ open, onClose, setMassage, setType, setOpen }) {
  const [shopCreated, setShopCreated] = React.useState(() => getIsShopExist());
  const pos  = React.useRef();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [shopDetails, setShopDetails] = React.useState({
    profile:null,
    name: '',
    street: '',
    city: '',
    state: '',
    openingTime: '',
    closingTime: '',
    category: "all",
    mobile: '',
    address: null
  });
  const [preview, setPreview] = React.useState(null);

  // Handle opening/closing modal
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  var profileFile
  const [errors, setErrors] = React.useState({
    profile: null,
    name: '',
    street: '',
    city: '',
    state: '',
    openingTime: '',
    closingTime: '',
    mobile: '',
    category: "",
    cord: null
  });
  // Handle form submission
  const handleFormSubmit = async () => {
    setErrors({ name: '', street: '', city: '', state: '', openingTime: '', closingTime: '', mobile: '' });

    let hasError = false;

    // Validate fields
    if (!shopDetails.profile) {

      setMassage("Upload A profile");
      setType("Error");
      setOpen(true);
      hasError = true;
    }

    if (!shopDetails.name) {
      setErrors(prev => ({ ...prev, name: 'Shop name is required.' }));
      console.log("has error1");
      hasError = true;
    }

    // Validate individual address fields
    if (!shopDetails.street) {
      setErrors(prev => ({ ...prev, street: 'Street is required.' }));
      console.log("has error2");
      hasError = true;
    }
    if (!shopDetails.category) {

      setMassage("press Get Location");
      setType("Error");
      setOpen(true);
      hasError = true;
    }
    if (!shopDetails.city) {
      setErrors(prev => ({ ...prev, city: 'City is required.' }));
      console.log("has error3");
      hasError = true;
    }
    if (!shopDetails.state) {
      setErrors(prev => ({ ...prev, state: 'State is required.' }));
      console.log("has error4");
      hasError = true;
    }

    if (!shopDetails.openingTime) {
      setErrors(prev => ({ ...prev, openingTime: 'Opening time is required.' }));
      console.log("has error5");
      hasError = true;
    }
    if (!shopDetails.closingTime) {
      setErrors(prev => ({ ...prev, closingTime: 'Closing time is required.' }));
      console.log("has error6");
      hasError = true;
    }
    if (!shopDetails.mobile) {
      setErrors(prev => ({ ...prev, mobile: 'Mobile number is required.' }));
      console.log("has error7");
      hasError = true;
    }

    if (!pos.current) {


      setMassage("press Get Location");
      setType("Error");
      setOpen(true);
      hasError = true;
    }

    if (hasError) {
      console.log("has error");
      return;
    }

    try {
      // Combine street, city, and state into a full address string
      const fullAddress = `${shopDetails.street}, ${shopDetails.city}, ${shopDetails.state}`;
      const finalShopDetails = { ...shopDetails, address: fullAddress };

      if (shopDetails.profile) {
        const options = {
          maxSizeMB: 0.25,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(shopDetails.profile, options);
        profileFile = new File([compressedFile], shopDetails.profile.name, {
          type: compressedFile.type,
          lastModified: Date.now(),
      });
      }

      console.log('Final Shop Details for submission:', finalShopDetails);
      const token = getToken()
      const details = {
        profile : profileFile,
        shop : finalShopDetails
      }
      const formData = new FormData();
      formData.append("profile",profileFile);
      formData.append("shop.name",finalShopDetails.name)
      formData.append("shop.category",finalShopDetails.category)
      formData.append("shop.address",finalShopDetails.address)
      formData.append("shop.mobile",finalShopDetails.mobile)
      formData.append("shop.closingTime",finalShopDetails.closingTime)
      formData.append("shop.openingTime",finalShopDetails.openingTime)
      console.log(details)
      const response = await axios.post(`http://localhost:8080/User/Shop?lng=${pos.current[0]}&lat=${pos.current[1]}`, formData, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(response.data);
      setShopCreated(true);
      handleModalClose();

    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  // Convert file to base64

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopDetails({ ...shopDetails, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setShopDetails({ ...shopDetails, profile: file });
    setPreview(URL.createObjectURL(file));
  };

  // Handle user location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          pos.current = [latitude,longitude];
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              alert("Please enable location services for this application.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              alert("Location information is unavailable. Please try again later.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              alert("Request timed out. Please try again.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              alert("An unknown error occurred. Please try again.");
              break;
            default:
              console.error("An unexpected error occurred.");
              alert("An unexpected error occurred. Please try again.");
              break;
          }
        }, {
        enableHighAccuracy: true
      }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleDrawerClick = (event) => {
    const targetTag = event.target.tagName.toLowerCase();
    // Prevent closing if the clicked element is an input, textarea, button, or select
    if (['input', 'textarea', 'button', 'select'].includes(targetTag)) {
      return;
    }
    onClose();
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'white',
        color: 'black',
      }}
      role="presentation"
      onClick={handleDrawerClick}
      onKeyDown={handleDrawerClick}
    >
      <List>
        {[
          { text: 'Home', icon: <HomeIcon /> },
          { text: 'Map', icon: <AddLocationAlt /> },
          { text: 'Chat', icon: <Chat /> },
          { text: 'Cart', icon: <ShoppingCartIcon /> },
        ].map(({ text, icon }) => (
          <Link
            to={`/Application/${text}`}
            key={text}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 0, 0.1)',
                    transition: 'background-color 0.3s',
                  },
                  '&.Mui-selected, &:focus': {
                    backgroundColor: 'transparent',
                    color: 'maroon',
                    boxShadow: 'none',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'maroon' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'black' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider sx={{ backgroundColor: 'maroon' }} />
      <Container style={{ display: 'flex', flexFlow: 'row', gap: '8px' }}>
        <Store sx={{ width: '30px', height: '40px', marginTop: '-4px' }} />
        <Typography variant="h5" component="h5" gutterBottom>
          {shopCreated ? 'My Shop' : 'Create Shop'}
        </Typography>
      </Container>
      <List>
        {!shopCreated ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleModalOpen}>
              <Create /> <ListItemText primary="Create Shop" sx={{ color: 'black' }} />
            </ListItemButton>
          </ListItem>
        ) : (
          <Link to={`/Application/Shop`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: 'maroon' }}>
                  <Store />
                </ListItemIcon>
                <ListItemText primary="My Shop" sx={{ color: 'black' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
      <Divider sx={{ backgroundColor: 'maroon' }} />

      {/* Add current city text field below */}
      <Container sx={{ marginTop: '130%' }}>
        <TextField
          id="filled-hidden-label-small"
          defaultValue="asda"
          variant="filled"
          size="small"
          label="current city"
          fullWidth
          sx={{
            backgroundColor: '#f5f5f5',
            '& .MuiInputBase-root': {
              borderRadius: '5px',
            },
          }}
        />
      </Container>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={open} onClose={onClose}>
        {list()}
      </Drawer>

      {/* Modal for creating shop */}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Create Your Shop
        </DialogTitle>
        <DialogContent>
          {/* Circle profile image selection button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            <IconButton component="label" sx={{ position: 'relative' }}>
              {preview ? (
                <Avatar
                  src={preview}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    color: '#800000',
                  }}
                >
                  <AccountCircle sx={{ fontSize: 60 }} />
                </Avatar>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </IconButton>
          </Box>

          {/* Shop Name Field */}
          <TextField
            name="name"
            label="Shop Name"
            fullWidth
            margin="dense"
            value={shopDetails.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'maroon', // Default border color
                  boxShadow: 'none', // Default shadow
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color (yellow with low opacity)
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color (slightly more intense yellow)
                  transform: 'scale(1.05)', // Grow effect on focus
                },
              },
              '& .MuiInputBase-input': {
                color: 'maroon', // Text color
              },
              '& .MuiInputLabel-root': {
                color: 'maroon', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgba(255, 255, 0, 0.6)', // Focused label color
              },
            }}
          />

          {/* Address Field */}
          <TextField
            name="street"
            label="Street"
            fullWidth
            margin="dense"
            value={shopDetails.street}
            onChange={handleInputChange}
            error={!!errors.street}
            helperText={errors.street}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'maroon', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color
                  transform: 'scale(1.05)', // Grow effect on focus
                },
              },
              '& .MuiInputBase-input': {
                color: 'maroon', // Text color
              },
              '& .MuiInputLabel-root': {
                color: 'maroon', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgba(255, 255, 0, 0.6)', // Focused label color
              },
            }}
          />

          {/* City Field */}
          <TextField
            name="city"
            label="City"
            fullWidth
            margin="dense"
            value={shopDetails.city}
            onChange={handleInputChange}
            error={!!errors.city}
            helperText={errors.city}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'maroon', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color
                  transform: 'scale(1.05)', // Grow effect on focus
                },
              },
              '& .MuiInputBase-input': {
                color: 'maroon', // Text color
              },
              '& .MuiInputLabel-root': {
                color: 'maroon', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgba(255, 255, 0, 0.6)', // Focused label color
              },
            }}
          />

          {/* State Field */}
          <TextField
            name="state"
            label="State"
            fullWidth
            margin="dense"
            value={shopDetails.state}
            onChange={handleInputChange}
            error={!!errors.state}
            helperText={errors.state}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'maroon', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color
                  transform: 'scale(1.05)', // Grow effect on focus
                },
              },
              '& .MuiInputBase-input': {
                color: 'maroon', // Text color
              },
              '& .MuiInputLabel-root': {
                color: 'maroon', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgba(255, 255, 0, 0.6)', // Focused label color
              },
            }}
          />

          {/* Mobile Number Field */}
          <TextField
            name="mobile"
            label="Mobile Number"
            fullWidth
            margin="dense"
            value={shopDetails.mobile}
            onChange={handleInputChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'maroon', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color
                  transform: 'scale(1.05)', // Grow effect on focus
                },
              },
              '& .MuiInputBase-input': {
                color: 'maroon', // Text color
              },
              '& .MuiInputLabel-root': {
                color: 'maroon', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgba(255, 255, 0, 0.6)', // Focused label color
              },
            }}
          />

          {/* Opening and Closing Time Fields */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="openingTime"
                label="Opening Time"
                type="time"
                error={!!errors.openingTime}
                fullWidth
                margin="dense"
                value={shopDetails.openingTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'maroon', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color
                      transform: 'scale(1.05)', // Grow effect on focus
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'maroon', // Text color
                  },
                  '& .MuiInputLabel-root': {
                    color: 'maroon', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'rgba(255, 255, 0, 0.6)', // Focused label color
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="closingTime"
                label="Closing Time"
                type="time"
                error={!!errors.closingTime}
                fullWidth
                margin="dense"
                value={shopDetails.closingTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'maroon', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color
                      transform: 'scale(1.05)', // Grow effect on focus
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'maroon', // Text color
                  },
                  '& .MuiInputLabel-root': {
                    color: 'maroon', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'rgba(255, 255, 0, 0.6)', // Focused label color
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Get Location Button */}
          <Grid container spacing={2} mt={-0.5}>
            <Grid item xs={12} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleGetLocation}
                sx={{
                  borderColor: 'maroon',
                  color: 'maroon',
                  width: 200,  // Increase width of the button
                  height: '56px',  // Set a consistent height
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  padding: '6px 16px', // Adjust padding as needed
                }}
              >
                Get Location
              </Button>
              <CategoryDropdown
                name="category" // Assign a name for identification
                value={shopDetails.category} // Use the category from shopDetails
                onChange={handleInputChange} // Use the input change handler
                sx={{
                  height: '56px', // Match the height of the button
                  minWidth: 200,  // Adjust width as needed
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const CategoryDropdown = ({ value, onChange }) => {
  // Hard-coded list of shop categories
  const allCategories = [
    "Grocery",
    "Electronics",
    "Clothing",
    "Furniture",
    "Books",
    "Pharmacy",
    "Jewelry",
    "Toys",
    "Sporting Goods",
    "Beauty",
    "Home Appliances"
  ];

  return (
    <FormControl fullWidth variant="outlined" sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'maroon', // Default border color
        },
        '&:hover fieldset': {
          borderColor: 'rgba(255, 255, 0, 0.4)', // Hover border color
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(255, 255, 0, 0.6)', // Focus border color
          transform: 'scale(1.05)', // Grow effect on focus
        },
      },
      '& .MuiInputBase-input': {
        color: 'maroon', // Text color
      },
      '& .MuiInputLabel-root': {
        color: 'maroon', // Label color
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'rgba(255, 255, 0, 0.6)', // Focused label color
      },
    }} >
      <InputLabel
      >Category</InputLabel>
      <Select
        name='category'
        value={value}
        onChange={onChange}
        label="Category"
        
      >
        <MenuItem value="all">All Categories</MenuItem> {/* 'All' option */}
        {allCategories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
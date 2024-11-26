import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion'; // Import Framer Motion
import Navigation from './Navigation'; // Import your AnchorTemporaryDrawer component

export default function Bar(props) {
  const [isNavOpen, setIsNavOpen] = React.useState(false); // State to manage navigation drawer

  const toggleNavigation = () => {
    setIsNavOpen(!isNavOpen); // Toggle navigation open/close
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Wrapping the AppBar with motion */}
      <motion.div
        initial={{ y: -100 }} // Start off-screen
        animate={{ y: 0 }} // Slide down to original position
        transition={{ type: 'spring', stiffness: 100, damping: 12 }} // Smoother spring animation
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'white',
            borderBottom: '4px solid maroon',
            color: 'black',
            transition: 'background-color 0.3s, border-color 0.3s',
            '&:hover': {
              backgroundColor: '#FFFAF3',
              borderBottom: '4px solid #FFC371',
            },
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between', // Distributes space between sections
              alignItems: 'center',
              minHeight: '64px',
            }}
          >
            {/* Left Section - Icon Button */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
              <motion.div
                whileHover={{ scale: 1.1 }} // Subtle grow effect on hover
                whileTap={{ scale: 0.95 }} // Slight press on tap
                transition={{ type: 'spring', stiffness: 200, damping: 10 }} // Smooth spring
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleNavigation} // Toggle navigation drawer on click
                  sx={{
                    '&:hover': {
                      color: 'maroon',
                      transition: 'color 0.2s',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </motion.div>
            </Box>

            {/* Center Section - Logo and Title */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center the content
              }}
            >
              <img
                src="/images/Logo.jpg" // Path to the logo image
                alt="Logo"
                style={{ height: '60px', marginRight: '8px' }} // Increased logo height
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }} // Slide up from below with fade-in
                animate={{ opacity: 1, y: 0 }} // Fade in and slide to position
                exit={{ opacity: 0, y: -10 }} // Slide up with fade-out
                transition={{ duration: 0.6, ease: 'easeInOut' }} // Smooth easing
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                  }}
                >
                  Shop & Service
                </Typography>
              </motion.div>
            </Box>

            {/* Right Section - Notification Icon */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <motion.div
                whileHover={{ scale: 1.2, y: -3 }} // Subtle bounce effect on hover
                whileTap={{ scale: 0.95 }} // Press down on tap
                transition={{ type: 'spring', stiffness: 300, damping: 15 }} // Bouncy spring effect
              >
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  sx={{
                    '&:hover': {
                      color: 'maroon',
                    },
                  }}
                >
                  <Badge
                    badgeContent={17}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        minWidth: '20px',
                        height: '20px',
                        fontSize: '0.75rem',
                        right: 0,
                        top: 5,
                        borderRadius: '50%',
                      },
                    }}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </motion.div>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>
      {/* Render Navigation component based on isNavOpen state */}
      <Navigation setMassage = {props.setMassage} setOpen = {props.setOpen} setType = {props.setType} open={isNavOpen} onClose={toggleNavigation} /> {/* Use the drawer */}
    </Box>
  );
}


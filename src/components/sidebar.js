import * as React from 'react';
import {
    useNavigate
} from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import avatar from '../assets/avatar.png'


const drawerWidth = 240;
const selectedColor = '#1250B9'; // Replace this with your desired blue color
const selectedBackgroundColor = '#1250B9'; // Replace this with your desired darker blue color for selected item
const hoverBackgroundColor = '#0A3B88';
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: '#1250B9',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),

    }),
);

const FirstListContainer = styled('div')({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
});

const SecondListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export default function MiniDrawer({ onLogout }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Get the current URL path directly from window.location
    const currentPath = window.location.pathname;

    const CustomListItem = styled(ListItemButton)(({ theme, selected }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 30,
        height: 30,
        margin: '8px',
        padding: theme.spacing(2),
        borderRadius: 20, // Change this value to adjust the border radius of the rounded box
        backgroundColor: selected ? selectedBackgroundColor : 'transparent',
        color: selected ? 'white' : 'inherit',
        "&:hover": {
            backgroundColor: selected ? selectedColor + '20' : 'transparent',
        },
        // Override MUI styles for the selected and hovered selected items
        "&.Mui-selected": {
            backgroundColor: selectedBackgroundColor,
            "&:hover": {
                backgroundColor: selectedColor + '80',
            },
        },
    }));

    const CustomListItemIcon = styled(ListItemIcon)(({ selected }) => ({
        color: selected ? 'white' : 'inherit',
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="white"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />
                    {/* <Avatar alt="Remy Sharp" src={avatar} /> */}
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {/* <img
                        className='mx-6'
                        src={logo} alt="Logo" style={{ width: '80px' }}
                    /> */}

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <FirstListContainer>
                    <List>
                        {/* <ListItem key="Home" disablePadding sx={{ display: 'block', backgroundColor: 'transparent' }}> */}
                        <CustomListItem
                            onClick={() => navigate("/")}
                            selected={currentPath === "/"} // Check if the item is selected based on the current URL
                        >
                            <CustomListItemIcon selected={currentPath === "/"}>
                                <HomeIcon />
                            </CustomListItemIcon>
                            <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                        </CustomListItem>
                        {/* </ListItem> */}

                        {/* <ListItem key="Files" disablePadding sx={{ display: 'block' }}> */}
                        <CustomListItem
                            onClick={() => navigate("/letters")}
                            selected={currentPath === "/letters"} // Check if the item is selected based on the current URL
                        >
                            <CustomListItemIcon selected={currentPath === "/letters"}>
                                <Inventory2OutlinedIcon />
                            </CustomListItemIcon>
                            <ListItemText primary="Letters" sx={{ opacity: open ? 1 : 0 }} />
                        </CustomListItem>

                        {/* Repeat the same pattern for other pages */}
                    </List>
                </FirstListContainer>
                <SecondListContainer>
                    <List>
                        <Divider />
                        {/* <ListItem key="Home" disablePadding sx={{ display: 'block', backgroundColor: 'transparent' }}> */}
                        <CustomListItem
                            onClick={() => navigate("/settings")}
                            selected={currentPath === "/settings"} // Check if the item is selected based on the current URL
                        >
                            <CustomListItemIcon selected={currentPath === "/settings"}>
                                <SettingsOutlinedIcon />
                            </CustomListItemIcon>
                            <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
                        </CustomListItem>
                        {/* </ListItem> */}

                        {/* <ListItem key="Files" disablePadding sx={{ display: 'block' }}> */}

                        <CustomListItem
                            onClick={() => navigate("/support")}
                            selected={currentPath === "/support"} // Check if the item is selected based on the current URL
                        >
                            <CustomListItemIcon selected={currentPath === "/support"}>
                                <LocalPhoneOutlinedIcon />
                            </CustomListItemIcon>
                            <ListItemText primary="Support" sx={{ opacity: open ? 1 : 0 }} />
                        </CustomListItem>
                        {/* </ListItem> */}

                        <CustomListItem
                            onClick={onLogout}
                            selected={currentPath === "/logout"} // Check if the item is selected based on the current URL
                        >
                            <CustomListItemIcon selected={currentPath === "/logout"}>
                                <LogoutOutlinedIcon />
                            </CustomListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                        </CustomListItem>

                    </List>
                </SecondListContainer>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
            </Box>
        </Box>
    );
}

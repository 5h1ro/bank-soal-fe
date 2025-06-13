import React, { memo, MouseEvent, useState } from 'react';

//Components
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

//Dependencies
import { Avatar, Collapse, Grid, ListSubheader } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { RiBankCardLine, RiBarChart2Line, RiFileEditLine, RiFileHistoryLine, RiGroupLine, RiHome5Line, RiListCheck2, RiListUnordered, RiLogoutCircleRLine, RiMenuFoldLine, RiMenuUnfoldLine, RiShoppingCart2Line, RiShoppingCartLine, RiStarLine, RiUserLine, RiUserSettingsLine } from '@remixicon/react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/auth.hook';
import { logOut } from '../slices/auth.slice';
import { getCookie } from '../utils/cookies';
import { DashboardOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';
import { props } from '../interface/props.interface';

const Layout = (props: props) => {
    const navigate = useNavigate();
    const [sidebarCollapse, setSidebarCollapse] = useState(false);
    const drawerWidth = sidebarCollapse ? 85 : 320;
    const { window: windowsPros } = props;
    const fullpath = window.location.pathname.split('/');
    const currentLocation = window.location.pathname.split('/')[1];
    const container = windowsPros !== undefined ? () => windowsPros().document.body : undefined;
    const dispatch = useDispatch();
    const auth = useAuth();

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openManajemenTesMenu, setOpenManajemenTesMenu] = useState(false);
    const [openContactMenu, setOpenContactMenu] = useState(false);

    const openProfile = Boolean(anchorEl);

    const account_data = localStorage.getItem('account_name');

    const handleClickProfile = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseProfile = () => {
        setAnchorEl(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleContactMenu = () => {
        setSidebarCollapse(false)
        setOpenContactMenu(!openContactMenu);
    };
    const handleManajemenTesMenu = () => {
        setSidebarCollapse(false)
        setOpenManajemenTesMenu(!openManajemenTesMenu);
    };
    const email = getCookie('email') ?? 'admin@admin.com';
    const name = getCookie('name') ?? 'Admin';
    const avatar = getCookie('avatar');
    const drawer = (
        <>
            <Grid className='px-4 pt-2' container justifyContent={'space-between'}>
                <IconButton hidden={!sidebarCollapse}
                    onClick={() => {
                        setSidebarCollapse(!sidebarCollapse)
                    }}
                >
                    <RiMenuUnfoldLine></RiMenuUnfoldLine>
                </IconButton>
                <img
                    src={`/images/${!sidebarCollapse ? 'logo' : 'icon'}.png`}
                    alt="Psitkotest"
                    loading="lazy"
                    className='h-[60px] cursor-pointer'
                    onClick={() => navigate('/')}
                />
                <IconButton hidden={sidebarCollapse}
                    onClick={() => {
                        setSidebarCollapse(!sidebarCollapse)
                    }}
                >
                    <RiMenuFoldLine></RiMenuFoldLine>
                </IconButton>
            </Grid>
            <List
                sx={{
                    '&& .Mui-selected, & .MuiListItemButton-root:hover': {
                        bgcolor: '#008FD7',
                        borderRadius: '0.375rem',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        '&, & .MuiListItemIcon-root': {
                            color: 'white',
                        },
                    },
                    '.MuiListItemButton-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                    },
                    '& .Mui-selected:hover': {
                        bgcolor: 'white',
                        borderRadius: '0.375rem',
                        '&, & .MuiListItemIcon-root': {
                            color: '#008FD7',
                        },
                    },
                }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        UTAMA
                    </ListSubheader>
                }>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/dashboard"
                        selected={currentLocation === 'dashboard' || currentLocation === 'detail-alat-tes' || currentLocation === 'detail-dokumen' || currentLocation === 'update-pertanyaan' || currentLocation === 'update-alat-tes'}
                    >
                        <ListItemIcon>
                            <DashboardOutlined className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/mitra"
                        selected={currentLocation === 'mitra'}
                    >
                        <ListItemIcon>
                            <RiGroupLine className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Mitra' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/order"
                        selected={currentLocation === 'order'}
                    >
                        <ListItemIcon>
                            <RiShoppingCart2Line className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Order' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/riwayat-order"
                        selected={currentLocation === 'riwayat-order'}
                    >
                        <ListItemIcon>
                            <RiFileHistoryLine className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Riwayat Order' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/riwayat-tes"
                        selected={currentLocation === 'riwayat-tes'}
                    >
                        <ListItemIcon>
                            <RiListCheck2 className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Riwayat Tes' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/riwayat"
                        selected={currentLocation === 'riwayat'}
                    >
                        <ListItemIcon>
                            <RiListCheck2 className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Hasil Tes' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
            </List>
            <List
                sx={{
                    '&& .Mui-selected, & .MuiListItemButton-root:hover': {
                        bgcolor: '#008FD7',
                        borderRadius: '0.375rem',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        '&, & .MuiListItemIcon-root': {
                            color: 'white',
                        },
                    },
                    '.MuiListItemButton-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                    },
                    '& .Mui-selected:hover': {
                        bgcolor: 'white',
                        borderRadius: '0.375rem',
                        '&, & .MuiListItemIcon-root': {
                            color: '#008FD7',
                        },
                    },
                }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        KEUANGAN
                    </ListSubheader>
                }>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/transaksi-user"
                        selected={currentLocation === 'transaksi-user'}
                    >
                        <ListItemIcon>
                            <RiListUnordered className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Transaksi' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/transaksi"
                        selected={currentLocation === 'transaksi'}
                    >
                        <ListItemIcon>
                            <RiShoppingCartLine className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Transaksi' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/deposit"
                        selected={currentLocation === 'deposit'}
                    >
                        <ListItemIcon>
                            <RiBankCardLine className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Deposit' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/riwayat-mutasi"
                        selected={currentLocation === 'riwayat-mutasi'}
                    >
                        <ListItemIcon>
                            <RiBarChart2Line className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Riwayat Mutasi' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        component={NavLink} to="/referral"
                        selected={currentLocation === 'referral'}
                    >
                        <ListItemIcon>
                            <RiStarLine className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Referral' hidden={sidebarCollapse} />
                    </ListItemButton>
                </ListItem>
            </List>
            <List
                sx={{
                    '&& .Mui-selected, & .MuiListItemButton-root:hover': {
                        bgcolor: '#008FD7',
                        borderRadius: '0.375rem',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        '&, & .MuiListItemIcon-root': {
                            color: 'white',
                        },
                    },
                    '.MuiListItemButton-root': {
                        paddingLeft: '12px',
                        paddingRight: '12px',
                    },
                    '& .Mui-selected:hover': {
                        bgcolor: 'white',
                        borderRadius: '0.375rem',
                        '&, & .MuiListItemIcon-root': {
                            color: '#008FD7',
                        },
                    },
                }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        PENGATURAN
                    </ListSubheader>
                }>
                <ListItem>
                    <ListItemButton onClick={handleManajemenTesMenu} selected={currentLocation === 'manajemen-tes'}>
                        <ListItemIcon>
                            <RiFileEditLine className="ml-[2px]" />
                        </ListItemIcon>
                        <ListItemText primary='Manajemen Tes' hidden={sidebarCollapse} />
                        {!sidebarCollapse ? openContactMenu || `${fullpath[1]}` === 'manajemen-tes' ? <ExpandLess /> : <ExpandMore /> : ''}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openManajemenTesMenu || `${fullpath[1]}` === 'manajemen-tes'} timeout="auto" unmountOnExit>
                    <List component="div"
                        sx={{
                            '&& .Mui-selected, & .MuiListItemButton-root:hover': {
                                bgcolor: 'white',
                                borderRadius: '0.375rem',
                                paddingLeft: '12px',
                                paddingRight: '12px',
                                '&, & .MuiListItemIcon-root': {
                                    color: '#01B3C1',
                                },
                            },
                            '.MuiListItemButton-root': {
                                paddingLeft: '12px',
                                paddingRight: '12px',
                            },
                            '& .Mui-selected:hover': {
                                bgcolor: 'white',
                                borderRadius: '0.375rem',
                                '&, & .MuiListItemIcon-root': {
                                    color: '#01B3C1',
                                },
                            },
                        }}>
                        <ListItem>
                            <ListItemButton className='ml-16'
                                component={NavLink} onClick={() => { window.location.href = `/manajemen-tes/list-tes` }} to="/manajemen-tes/list-tes" selected={`${fullpath[1]}/${fullpath[2]}/${fullpath[3]}` === 'manajemen-tes/list-tes'}
                            >
                                <ListItemText className={`${fullpath[2] == 'list-tes' ? 'text-primary-500' : ''}`} primary='List Tes' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton className='ml-16'
                                component={NavLink} onClick={() => { window.location.href = `/manajemen-tes/alat-tes` }} to="/manajemen-tes/alat-tes" selected={`${fullpath[1]}/${fullpath[2]}/${fullpath[3]}` === 'manajemen-tes/alat-tes'}
                            >
                                <ListItemText className={`${fullpath[2] == 'alat-tes' ? 'text-primary-500' : ''}`} primary='Alat Tes' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </>
    );

    return (
        <>
            <Box sx={{ display: { sm: 'flex' } }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth + 40}px)` }
                    }}
                    className="bg-base-white shadow-none md:rounded-2xl transition-transform md:mr-5 md:mt-5"
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ ml: 'auto' }}>
                            <Grid2 container gap={2}>
                                {avatar
                                    ? <img src={avatar} className='font-semibold w-[48px] h-[48px] text-xl rounded-full' />
                                    : <Avatar sx={{ bgcolor: '#EBFDFF', color: '#008FD7' }} className='font-semibold w-[48px] h-[48px] text-xl'>{name!.split(' ').map((val, index) => { if (index < 2) return val.charAt(0).toUpperCase() })}</Avatar>
                                }
                                <Button color="inherit" onClick={handleClickProfile} className='text-general-500'>{auth.user_payload.name ?? 'username'} <ArrowDropDownIcon /></Button>
                            </Grid2>
                        </Box>
                        <Menu
                            elevation={0}
                            className='mt-5'
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openProfile}
                            onClose={handleCloseProfile}
                            onClick={handleCloseProfile}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem className='w-[300px] px-4 py-5' >
                                <Grid2 container xs={12}>
                                    <Grid2 xs={3}>
                                        {avatar
                                            ? <Grid2 className="relative rounded-full h-[48px] w-[48px] overflow-hidden">
                                                <img
                                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                                                    src={avatar}
                                                />
                                            </Grid2>
                                            : <Avatar sx={{ bgcolor: '#EBFDFF', color: '#008FD7' }} className='font-semibold w-[48px] h-[48px] text-xl'>{name!.split(' ').map((val, index) => { if (index < 2) return val.charAt(0).toUpperCase() })}</Avatar>
                                        }
                                    </Grid2>
                                    <Grid2 xs={9} className=''>
                                        <Typography className='text-primary-500 text-md'>{name}</Typography>
                                        <Typography className='text-general-500 text-xs overflow-hidden whitespace-nowrap text-ellipsis'>{email}</Typography>
                                    </Grid2>
                                </Grid2>
                            </MenuItem>
                            <MenuItem className='w-[300px] px-4 py-5' onClick={() => {
                                navigate('/dashboard')
                            }}>
                                <ListItemIcon>
                                    <RiHome5Line className='text-general-500' />
                                </ListItemIcon>
                                <ListItemText primary="Beranda" className="text-general-500" />
                            </MenuItem>
                            <MenuItem className='w-[300px] px-4 py-5' onClick={() => {
                                navigate('/profil')
                            }}>
                                <ListItemIcon>
                                    <RiUserLine className='text-general-500' />
                                </ListItemIcon>
                                <ListItemText primary="Profil Saya" className="text-general-500" />
                            </MenuItem>
                            <MenuItem className='w-[300px] px-4 py-5' onClick={() => {
                                dispatch(logOut())
                                navigate('/login')
                            }}>
                                <ListItemIcon>
                                    <RiLogoutCircleRLine className='text-danger-500' />
                                </ListItemIcon>
                                <ListItemText primary="Logout" className="text-danger-500" />
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 0 },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 0 },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 2.5, pt: 13, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    {props.children}
                </Box>
            </Box >
        </>
    );
}

export default memo(Layout);
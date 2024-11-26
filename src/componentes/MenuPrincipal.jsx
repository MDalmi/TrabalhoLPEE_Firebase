import { NavLink, Outlet } from 'react-router-dom';
import LogoIfsul from '../imagens/logo512.png'
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout, signInWithGitHub } from '../firebaseConfig';
import MenuManutencoes from './comuns/MenuManutencoes';
import MenuUsuario from './comuns/MenuUsuario';
import { red } from '@mui/material/colors';


function MenuPrincipal() {
    const [user, loading, error] = useAuthState(auth);
    const [anchorElMenuManutencoes, setAnchorElMenuManutencoes] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenMenuManutencoes = (event) => {
        setAnchorElMenuManutencoes(event.currentTarget);
    };

    const handleCloseMenuManutencoes = () => {
        setAnchorElMenuManutencoes(null);
    };

    const handleCloseNavMenuManutencoes = () => {
        setAnchorElNav(null);
        setAnchorElMenuManutencoes(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        signInWithGitHub();
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        logout();
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static" style={{backgroundColor : 'gray'}}>
                
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo */}
                        <Avatar
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                            alt="Logo IFSUL"
                            src={LogoIfsul}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component={NavLink}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Camisas 
                        </Typography>

                        {/* Menu Manutenções */}
                        <Box sx={{ flexGrow: 1 }}>
                            {user && (
                                <Button onClick={handleOpenMenuManutencoes} sx={{ color: 'white' }}>
                                    Manutenções
                                </Button>
                            )}
                            <MenuManutencoes
                                anchorEl={anchorElMenuManutencoes}
                                open={Boolean(anchorElMenuManutencoes)}
                                handleClose={handleCloseMenuManutencoes}
                            />
                        </Box>

                        {/* Menu Usuário */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Menu do usuário">
                                <IconButton onClick={handleOpenUserMenu} color="inherit">
                                    <Typography>
                                        {!user ? "Autenticar" : user?.displayName}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <MenuUsuario
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                user={user}
                                handleClose={handleCloseUserMenu}
                                handleLogOut={handleLogOut}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
}

export default MenuPrincipal;

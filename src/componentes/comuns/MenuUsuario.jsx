import { Menu, MenuItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MenuUsuario({ anchorEl, open, user, handleClose, handleLogOut }) {
    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            {user ? (
                <MenuItem onClick={handleLogOut} component={NavLink} to="/">
                    <Typography textAlign="center">Efetuar Logout</Typography>
                </MenuItem>
            ) : (
                <MenuItem onClick={handleClose} component={NavLink} to="/">
                    <Typography textAlign="center">Efetuar Login</Typography>
                </MenuItem>
            )}
        </Menu>
    );
}

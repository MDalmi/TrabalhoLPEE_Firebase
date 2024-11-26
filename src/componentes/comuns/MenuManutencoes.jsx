import { Menu, MenuItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MenuManutencoes({ anchorEl, open, handleClose }) {
    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-manutencoes"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
           
            <MenuItem onClick={handleClose} component={NavLink} to="camisas">
                <Typography textAlign="center">Camisas</Typography>
            </MenuItem>
        </Menu>
    );
}

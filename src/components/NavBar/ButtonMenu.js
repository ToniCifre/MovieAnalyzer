import React from 'react';
import {Link} from "react-router-dom";

import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from "@material-ui/core/styles/makeStyles";


import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import Searchbar from "../Helper/Searchbar";



const StyledMenu = ((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const useStyles = makeStyles((theme) => ({
    link: {
        color: '#fff',
        textDecoration: 'none',
    }
}));

export default function ButtonMenu(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {translator, switch_theme} = props

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}
            >
                <MenuIcon style={{color: '#fff', fontSize: 25}}/>
            </IconButton>
            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{marginTop:8}}
            >
                <Link to='/popular' className={classes.link}>
                    <MenuItem onClick={handleClose} >
                        <ListItemIcon>
                            <StarIcon style={{color:'#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary='Popular Movies' />
                    </MenuItem>
                </Link>
                <Link to='/upcoming' className={classes.link}>
                    <MenuItem onClick={handleClose} >
                        <ListItemIcon>
                            <NewReleasesIcon style={{color:'#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary='Upcoming Movies' />
                    </MenuItem>
                </Link>
                <Link to='/favorites' className={classes.link}>
                    <MenuItem onClick={handleClose} >
                        <ListItemIcon>
                            <FavoriteIcon style={{color:'#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary='Favorites' />
                    </MenuItem>
                </Link>

                <Searchbar inline />
            </StyledMenu>
        </div>
    );
}

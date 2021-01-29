import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useMediaQuery } from "react-responsive";


import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import ButtonMenu from "./ButtonMenu";
import Searchbar from "../Helper/Searchbar";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#00000099'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#fff'
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
    },
    link: {
        color: '#fff',
        margin: '0 10px',
        textDecoration: 'none'
    },
    whiteColor: {
        color: '#fff'
    }
}));

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function NavBar(props) {
    const classes = useStyles();

    const {translator, switch_theme} = props

    const isMobile = useMediaQuery({ query: "(max-width: 680px)" });


    return (
        <>
            <HideOnScroll {...props}>
                <AppBar className={classes.root}>
                    <Toolbar>
                        {isMobile ? < ButtonMenu translator={translator} switch_theme={switch_theme}/> : ''}
                        <Typography variant="h4" align={"center"} style={isMobile? {width: '100%'} : {}} className={classes.whiteColor}>Movie Analyzer</Typography>

                        {!isMobile ?
                            <>
                            <div  className={classes.title}>
                                <div style={{display: 'inline-flex'}}>
                                    <Link to='/popular' className={classes.link}>
                                        <Typography variant="h6" >Popular Movies</Typography>
                                    </Link>
                                    <Link to='/upcoming' className={classes.link}>
                                        <Typography variant="h6" >Upcoming Movies</Typography>
                                    </Link>
                                    <Link to='/favorites' className={classes.link}>
                                        <Typography variant="h6" >Favorites</Typography>
                                    </Link>
                                </div>
                            </div>
                            <Searchbar inline />
                            </>
                            : ''}

                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            {/*<Toolbar />*/}
        </>
    );
}

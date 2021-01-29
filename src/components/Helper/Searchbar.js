import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { fetchMovies } from "../../actions";
import { TMDB_API_KEY } from "../../apis/tmdb/key";
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 32,
    backgroundColor: '#38363680',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: '#FFF',
  },
  iconButton: {
    padding: 10,
    color: '#FFF',
  }
}));

// Passes query entered in Text Input into onSubmit, which takes in modified URL query as param and sends it to axiosFetch hook.
const Search = ({ inline, fetchMovies, submittedQuery }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const history = useHistory();

  //! send a message along to prompt user to input something...
  const handleSearchSubmit = (event, url, query, inline) => {
    event.preventDefault();

    if (inline) {
      // Handle submitting from inline form.
      // Pass along search query to be used after redirect and redirect to searchpage.
      fetchMovies(url, query);
      return history.push("/search");
    } else {
      // Handle submitting when user is on search page...
      return fetchMovies(url);
    }
  };

  useEffect(() => {
    // Pass along submitted query on redirect.
    if (submittedQuery && location.pathname === "/search") {
      setQuery(submittedQuery);
    }
  }, [submittedQuery, location]);

  const url = `/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false&840`;
  const classes = useStyles();

  return (
      <Paper component="form" className={classes.root} onSubmit={(e) => handleSearchSubmit(e, url, query, inline)}>
        <InputBase
            className={classes.input}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(event) => setQuery(event.target.value)}
            value={query}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    submittedQuery: state.movies.submittedQuery,
  };
};

export default connect(mapStateToProps, { fetchMovies })(Search);

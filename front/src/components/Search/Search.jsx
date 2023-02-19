import { Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const Search = ({ searchId }) => { 
    return (
        <Box display="flex">
        <SearchIcon />
            <div id="pac-container">
                <input id={searchId} type="text" placeholder="Enter a location" />
            </div>
      </Box>
    );
}

export default Search;
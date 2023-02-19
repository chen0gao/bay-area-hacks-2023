import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        height: 'vh',
        width: '100%',
        [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: '100%' },
    },
    searchIcon: {
        padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(0.3em + ${theme.spacing(4)}px)`, transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('md')]: { width: '30ch' },
    },
    toolbar: {
        display: 'flex', justifyContent: 'space-between',
    },

    formControl: {
        display: 'block', width: '100%'
    },
    card: {
        overflow: 'scroll',
        margin: '1rem',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '100%',
        padding: '1em 1em 1.5em',
        borderRadius: '1px solid transparent',
    },

    small_btn: {
        width: '100px',
        height: '50px',
    },
    grid_container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 0.1fr)',
        gridGap: '5px',
    },
}));
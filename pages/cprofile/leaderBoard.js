import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MyAppBar from "../../components/appbar"
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import theme from './../theme';

const columns = [
    { id: 'sno', label: '#', minWidth: 50},
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
];
  
function createData(sno, name, code, population, size) {
    const density = population / size;
    return { sno, name, code, population, size, density };
}

const rows = [
    createData('1', 'India', 'IN', 1324171354, 3287263),
    createData('2', 'China', 'CN', 1403500365, 9596961),
    createData('3', 'Italy', 'IT', 60483973, 301340),
    createData('4', 'United States', 'US', 327167434, 9833520),
    createData('5', 'Canada', 'CA', 37602103, 9984670),
    createData('6', 'Australia', 'AU', 25475400, 7692024),
    createData('7', 'Germany', 'DE', 83019200, 357578),
    createData('8', 'Ireland', 'IE', 4857000, 70273),
    createData('9', 'Mexico', 'MX', 126577691, 1972550),
    createData('10', 'Japan', 'JP', 126317000, 377973),
    createData('11', 'France', 'FR', 67022000, 640679),
    createData('12', 'United Kingdom', 'GB', 67545757, 242495),
    createData('13', 'Russia', 'RU', 146793744, 17098246),
    createData('14', 'Nigeria', 'NG', 200962417, 923768),
    createData('15', 'Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    wrapContainer: {
        height: '100%',
        // display: "flex",
        // flexDirection: "row",
        margin: 30,
        marginLeft: '5%',
        // alignSelf: "center", 
        padding: theme.spacing(3),
        backgroundColor: '#DAE6FF',
        borderRadius: 30,
    },
    flexContainer: {
        height: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#F3F7FD',
        padding: theme.spacing(2),
    },
    text: {
        margin: theme.spacing(2.5),
    },
    title: {
        fontSize: 18,
    },
    searchBar: {
        borderRadius: 30,
        backgroundColor: '#ffffff',
    },
    tableRoot: {
        width: '100%',
    },
    container: {
        maxHeight: 400,
    },
}))

const leaderBoard = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <MyAppBar />
            <CssBaseline />
            <Container className={classes.wrapContainer}>
                <Container className={classes.flexContainer}> 
                    <Typography variant="h6" className={classes.title} >Leaderboard</Typography>
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Container>
                <Paper className={classes.tableRoot}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                        );
                                    })}
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    )
};

export default leaderBoard;

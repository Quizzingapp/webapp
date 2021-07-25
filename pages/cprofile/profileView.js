import {
    Container,
    Typography,
    Paper,
    Button,
} from "@material-ui/core"
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from './../theme';
import MyAppBar from "../../components/appbar"
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    
    button: {
        margin: theme.spacing(2),
        borderRadius: "5em",
    },
    bulletStyle: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    text: {
        margin: theme.spacing(2.5),
    },
    title: {
        fontSize: 24,
    },
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        color: theme.palette.text.secondary,
        borderRadius: 20,
    },
    wrapContainer: {
        height: '100%',
        display: "flex",
        flexDirection: "row",
        margin: 0,
    },
    flexContainer: {
        marginTop: '3%',
        // marginLeft: '5%',
        height: '100%',
        width: '50%',
        backgroundColor: '#F3F7FD',
        borderRadius: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    container: {
        marginTop: '3%',
        marginLeft: '5%',
        height: 725,
        // width: '80%',
        backgroundColor: '#F3F7FD',
        borderRadius: 30,
    },
    base: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pic: {
        margin: theme.spacing(2),
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}))

const profileView = (props) => {
    const classes = useStyles()
    const bullet = <span className={classes.bulletStyle}>•</span>;

    return (
        <>
            <MyAppBar />
            <CssBaseline />
                <Container className={classes.wrapContainer}>
                    <Container className={classes.flexContainer}>
                        <Avatar src="/profile3.jpg" className={classes.pic}  />
                        <Typography variant="h6" className={classes.title} >Keerthana Nuti</Typography>
                        <Typography variant="caption" display="block" gutterBottom color="textSecondary" >keerthana@mmoc.in</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Follow
                        </Button>
                        <Divider variant="middle" style={{width:'70%'}} />
                        <Typography className={classes.text} variant="subtitle1" display="block" gutterBottom >Followers: 2</Typography>
                        <Divider variant="middle" style={{width:'70%'}} />
                        <Typography className={classes.text} variant="subtitle1" display="block" gutterBottom >Following: 0</Typography>
                        <Divider variant="middle" style={{width:'70%'}} />
                        <Typography className={classes.text} variant="subtitle1" display="block" gutterBottom >Go to Leaderboard</Typography>
                        <Divider variant="middle" style={{width:'70%'}} />
                        <Typography className={classes.text} variant="subtitle1" display="block" gutterBottom >Edit Info</Typography>
                    </Container>

                    <Container className={classes.container}>
                        <div className={classes.root}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography variant="h6" className={classes.title} >
                                                True/ False
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Title 1 {bullet} Quiz 1 
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.base}>
                                            <Typography>Score Earned: 10</Typography>
                                            <Button size="small">Learn More <ArrowRightIcon /> </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography variant="h6" className={classes.title} >
                                                True/ False
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Title 1 {bullet} Quiz 1 
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.base}>
                                            <Typography>Score Earned: 10</Typography>
                                            <Button size="small">Learn More <ArrowRightIcon /> </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography variant="h6" className={classes.title} >
                                                True/ False
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Title 1 {bullet} Quiz 1 
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.base}>
                                            <Typography>Score Earned: 10</Typography>
                                            <Button size="small">Learn More <ArrowRightIcon /> </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography variant="h6" className={classes.title} >
                                                True/ False
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Title 1 {bullet} Quiz 1 
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.base}>
                                            <Typography>Score Earned: 10</Typography>
                                            <Button size="small">Learn More <ArrowRightIcon /> </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography variant="h6" className={classes.title} >
                                                True/ False
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Title 1 {bullet} Quiz 1 
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.base}>
                                            <Typography>Score Earned: 10</Typography>
                                            <Button size="small">Learn More <ArrowRightIcon /> </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography variant="h6" className={classes.title} >
                                                True/ False
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Title 1 {bullet} Quiz 1 
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.base}>
                                            <Typography>Score Earned: 10</Typography>
                                            <Button size="small">Learn More <ArrowRightIcon /> </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </Container>            
        </>
        
    );
};

export default profileView;
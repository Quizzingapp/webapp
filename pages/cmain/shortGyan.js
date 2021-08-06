import React from "react"
import MyAppBar from "../../components/appbar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Grid, Box } from "@material-ui/core"
import NavBar from "../../components/NavBar"

const useStyles = makeStyles({
    root: {
      maxWidth: 350,
    },
});

const mediaCards = [
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
    {
        image: "/sampleImage.jpg",
        title: "Contemplative Reptile",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica`,
    },
]

export default function shortGyan() {
    const classes = useStyles();

    return (
        <>
            {/* <MyAppBar /> */}
            <NavBar />
            <CssBaseline />
            <Box p={7}>
            <Grid container spacing={3}>
                {mediaCards.map((mediaCard, i) => (
                    <Grid key={i} item lg={4} sm={6} xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={mediaCard.image}
                                    title={mediaCard.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {mediaCard.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {mediaCard.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            </Box>
        </>
    )
}
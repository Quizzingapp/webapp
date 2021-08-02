import {
    Container,
    CssBaseline,
    makeStyles,
    Grid,
    Paper,
    Typography,
    GridList,
    GridListTile,
    Button,
} from "@material-ui/core"
import React from "react"
import MyAppBar from "../../../components/appbar"
import { list } from "../../../components/displayitem"
import { useRouter } from "next/router"
import { useStoreState } from "easy-peasy"
import firebase from "../../../firebase/clientApp"

const useStyles = makeStyles((theme) => ({
    board: {
        height: 400,
        backgroundColor: "#f5f5f5",
        textAlign: "center",
    },
    des: {
        maxWidth: "100%",
        minHeight: 100,
        marginTop: 16,
        backgroundColor: "#f5f5f5",
        padding: 8,
    },
    gridList: {
        flexWrap: "nowrap",
        transform: "translateZ(0)",
    },
    gridItem: {
        Height: 100,
        Width: 100,
        padding: 50,
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 8,
        backgroundColor: "#f5f5f5",
    },
}))

function quizitem({ data }) {
    const router = useRouter()
    //const { item } = router.query

    //const data = JSON.parse(item)

    // const name = useStoreState((state) => state.section.name)
    // const description = useStoreState((state) => state.section.description)
    // const topics = useStoreState((state) => state.section.topics)

    const classes = useStyles()
    let description = " this is quiz"
    return (
        <>
            <MyAppBar />
            <CssBaseline />
            <Container
                maxWidth="xl"
                style={{ marginTop: 24, overflow: "hidden" }}
            >
                <Grid container spacing={5}>
                    <Grid item xs={12} lg={9}>
                        <Typography variant="h3" component="h1">
                            {data.name}
                        </Typography>
                        <Paper className={classes.des}>
                            <Typography>{data.description}</Typography>
                        </Paper>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => router.push("/screens/quiz")}
                        >
                            Start
                        </Button>
                        <Grid container spacing={4} style={{ marginTop: 24 }}>
                            {data.topics.map((item) => (
                                <Grid key={item} item lg={12} sm={12}>
                                    <Typography variant="h6" component="h1">
                                        {item}
                                    </Typography>
                                    {/* <GridList
                                        className={classes.gridList}
                                        cols={6}
                                        cellHeight="auto"
                                        style={{
                                            height: "auto",
                                            scrollbarWidth: "thin",
                                        }}
                                    >
                                        {item.contents.map((obj) => (
                                            <GridListTile key={obj}>
                                                <Paper
                                                    className={classes.gridItem}
                                                >
                                                    <Typography>
                                                        {obj}
                                                    </Typography>
                                                </Paper>
                                            </GridListTile>
                                        ))}
                                    </GridList> */}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={3} sm={6}>
                        <Paper className={classes.board}>
                            <Typography
                                variant="h6"
                                style={{
                                    fontWeight: 600,
                                    padding: 8,
                                }}
                            >
                                Leader Board
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default quizitem

export async function getStaticProps() {
    const db = firebase.firestore()
    //const [data, setData] = useState({})
    let data = {}
    await db
        .collection("sections")
        .doc("W6arzl9T6BtFRvKsjaKs")
        .get()
        .then((item) => {
            data = item.data()
        })

    return {
        props: { data: data },
    }
}

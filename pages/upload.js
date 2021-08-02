import React, { useState } from "react"
import { Button } from "@material-ui/core"
import Papa from "papaparse"
import firebase from "../firebase/clientApp"

function upload() {
    const [text, setText] = useState([])
    const up = async (e) => {
        var file = e.target.files[0]
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                let a = results.data
                a.map((item) => {
                    let tagarr
                    let tagarr2 = []
                    if (item.tags) {
                        tagarr = item.tags.split(",")
                        tagarr.map((a) => tagarr2.push(a.trim()))
                    }
                    let obj = {
                        created_at: firebase.firestore.Timestamp.now(),
                        tags: tagarr2,
                        prob: 1,
                        answerOptions: {
                            a: item.option_a,
                            b: item.option_b,
                            c: item.option_c,
                            d: item.option_d,
                        },
                        answer: item.answer,
                        created_by: item.created_by,
                        question: item.question,
                    }
                    if (item.question) {
                        console.log(obj)
                        setText((prevState) => [...prevState, obj])
                    }

                    //console.log(obj)
                })
            },
        })
    }
    const uploadtofirebase = () => {
        const db = firebase
            .firestore()
            .collection("sections")
            .doc("W6arzl9T6BtFRvKsjaKs")
        text &&
            text.map((item) => {
                db.collection("quiz_questions").add(item)
                return
            })
    }
    return (
        <div>
            <Button variant="contained" component="label">
                Upload File
                <input
                    type="file"
                    id="cs"
                    name="csvupload"
                    hidden
                    onChange={(e) => up(e)}
                />
            </Button>
            <Button variant="contained" onClick={() => uploadtofirebase()}>
                Save
            </Button>
            {text &&
                text.map((item) => {
                    return <p>{item.question}</p>
                })}
        </div>
    )
}

export default upload

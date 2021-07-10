import firebase from "../../firebase/clientApp"
import data from "./quiz_data.json"

import React from "react"

function addto() {
    const handleClick = () => {
        const db = firebase.firestore()
        console.log("clicked")
        data.data.map((item) => {
            const a = { ...item, createdAt: firebase.firestore.Timestamp.now() }
            db.collection("questions").add(a)
        })
    }

    return <div onClick={handleClick}>click me</div>
}

export default addto

import { action, createStore } from "easy-peasy"

export const store = createStore({
    result: {
        data: [],
        addData: action((state, payload) => {
            state.data.push(payload)
        }),
    },
    section: {
        name: "",
        description: "",
        topics: [],
        addName: action((state, payload) => {
            state.name = payload
        }),
        addDescription: action((state, payload) => {
            state.description = payload
        }),
        addTopic: action((state, payload) => {
            state.topics = payload
        }),
    },
})

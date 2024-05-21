import {defineStore} from "pinia";

export const useVoteStore = defineStore('voteStore', {
    state: () => ({
        election: {},
        voter: {
            email: '',
            companyName: '',
            fullName: ''
        },
        choices: []
    })
})
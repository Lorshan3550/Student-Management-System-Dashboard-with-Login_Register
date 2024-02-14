import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    name : "Lorshan123",
    image : "https://lh3.googleusercontent.com/a/ACg8ocL0_ERj0DwxSWmVHUsyGpKynxm_KIusw2yw4Rnpfe_-r0A=s96-c",
    role : "User",
    auth : false
}




const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        userAdded : (state, action) => {
            console.log("user added", action.payload)
            state.name = action.payload.name
            state.image = action.payload.image
            state.role = action.payload.role
            state.auth = action.payload.auth
            console.log("state",state.name, state.image)
            //Behind the scene immer does ...state , like shallow copy
        }, 
            // prepare(title,content, userId){
            //     return{
            //         payload:{
            //             id : nanoid(),
            //             title,
            //             content,
            //             date : new Date().toISOString(),
            //             userId,
            //             reactions : {
            //                 thumbsUp : 0,
            //                 wow : 0,
            //                 heart : 0,
            //                 rocket : 0,
            //                 coffee : 0
            //             }

            //         }
            //     }
            // }
        
        // reactionAdded(state, action){
        //     const {postId, reaction} = action.payload
        //     const existingPost = state.find(post => post.id == postId)
        //     if(existingPost){
        //         existingPost.reactions[reaction]++
        //     }

        // }
    }
})

export const selectUser = (state) => state.users
 
export const { userAdded  } = userSlice.actions // named export

export default userSlice.reducer //default export


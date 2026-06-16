export const queries = {
    getAPost : `query getPost($id: ID!){
        post(id: $id) {
            id
            title
            body
        }
    }`,

    getAlbums : `query ($id: ID!) {
        photo(id: $id) {
            id
            album {
                id
                title
                user {
                    id
                }
            }
        }
    }`
}

export const mutations = {
    createAPost : `mutation ($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            body
        }
    }`
}
import { BaseAPI } from "../base_api";

export class PostsQL extends BaseAPI {
    async executeGQL(query: any, variables?: any, fragments?: any) {
        let data;
        if(variables && fragments) {
            data = { query: `${query} ${fragments}`, variables };
        } else if(variables) {
            data = { query, variables };
        } else if(fragments) {
            data = { query: `${query} ${fragments}` };
        } else {
            data = { query };
        }
        return this.post('api', data, await this.constructHeaders('post'));
    }

    getPosts = this.executeGQL;
    getAlbums = this.executeGQL;
    createPost = this.executeGQL;
}
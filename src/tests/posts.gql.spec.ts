import {test, expect} from '@playwright/test';
import { ApiFactory } from '../factory/ObjectProvider';
import { queries, mutations } from '../utils/query';
import { variables } from '../utils/variables';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('GraphQL Posts API Tests', () => {
    let postsQL: any;

    test.beforeEach(async ({ request }) => {
        postsQL = await ApiFactory.create('posts', request, process.env.GRAPHQL_BASE_URL || '');
    });

    test('Get a post by ID', async () => {
        const scenario = "getAPost";
        const response = await postsQL.getPosts(queries[scenario], variables[scenario]);
        const responseBody = await postsQL.getResponseBody(response);
        console.log('GraphQL Posts Response Body:', responseBody);
        expect(responseBody.data.post.id).toBe(variables[scenario].id);
    });

    test('Get albums', async () => {
        const scenario = "getAlbums";
        const response = await postsQL.getAlbums(queries[scenario], variables[scenario]);
        const responseBody = await postsQL.getResponseBody(response);
        console.log('GraphQL Albums Response Body:', responseBody);
        expect(responseBody.data.photo.id).toBe(variables[scenario].id);
    });

    test('Create a post', async () => {
        const scenario = "createAPost";
        const response = await postsQL.createPost(mutations[scenario], variables[scenario]);
        const responseBody = await postsQL.getResponseBody(response);
        console.log('GraphQL Create Post Response Body:', responseBody);
        expect(responseBody.data.createPost.title).toBe(variables[scenario].input.title);
    });
});
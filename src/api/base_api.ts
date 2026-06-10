import { request, APIRequestContext } from '@playwright/test';

export class BaseAPI {
    constructor(protected request: APIRequestContext, protected baseURL: string) {}

    //Response handling methods

    async getResponseBody(response: any) {
        return await response.json();
    }

    async getStatusCode(response: any) {
        return response.status();
    }

    //Returns response object for all the below wrapper methods

    async get(endpoint: string, headers = {}) {
        return await this.request.get(`${this.baseURL}${endpoint}`, { headers });   
    }

    async post(endpoint: string, body: object, headers = {}) {
        return await this.request.post(`${this.baseURL}${endpoint}`, { data: body, headers });
    }

    async put(endpoint: string, body: object, headers = {}) {
        return await this.request.put(`${this.baseURL}${endpoint}`, { data: body, headers });
    }

    async delete(endpoint: string, headers = {}) {
        return await this.request.delete(`${this.baseURL}${endpoint}`, { headers });
    }
}
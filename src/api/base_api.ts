import { request, APIRequestContext } from '@playwright/test';

export class BaseAPI {
    constructor(protected request: APIRequestContext, protected baseURL: string) {}

    //default headers can be set here
    getDefaultHeaders() {
        return { 
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        };
    }

    //Updated headers based on the operation type and token presence
    async constructHeaders(operation: string, token?: string) {
        if(operation === 'get' || operation === 'post') {
            return this.getDefaultHeaders();
        }else {
            return {
                ...this.getDefaultHeaders(),
                Cookie: `token=${token}`
            }
        }
    }

    //Response handling methods

    async getResponseBody(response: any) {
        return await response.json();
    }

    async getStatusCode(response: any) {
        return await response.status();
    }

    //Returns response object for all the below wrapper methods

    async get(endpoint: string, headers = {}) {
        return await this.request.get(`${this.baseURL}${endpoint}`, { headers });   
    }

    async post(endpoint: string, body: object, headers = {}) {
        console.log(`POST Request to: ${this.baseURL}${endpoint} with body: ${JSON.stringify(body)} and headers: ${JSON.stringify(headers)}`);
        return await this.request.post(`${this.baseURL}${endpoint}`, { 
            data: body, 
            headers: headers 
        });
    }

    async put(endpoint: string, body: object, headers = {}) {
        return await this.request.put(`${this.baseURL}${endpoint}`, { data: body, headers });
    }

    async patch(endpoint: string, body: object, headers = {}) {
        return await this.request.patch(`${this.baseURL}${endpoint}`, { data: body, headers });
    }

    async delete(endpoint: string, headers = {}) {
        return await this.request.delete(`${this.baseURL}${endpoint}`, { headers });
    }
}
import { BaseAPI } from "./base_api";

export class ProductsAPI extends BaseAPI {

    // Fetch products  [Filters also supported via query params]
    public async getProducts() {
        return await this.get('products', await this.constructHeaders('get'));
    }

    public async getProductById(productId: number) {
        return await this.get(`products/${productId}`, await this.constructHeaders('get'));
    }

    public async getProductsByTitle(title: string) {
        return await this.get(`products?title=${title}`, await this.constructHeaders('get'));
    }

    //Pagination support
    public async getProductsBySkippingAndLimiting(skip: number, limit: number) {
        return await this.get(`products?offset=${skip}&limit=${limit}`, await this.constructHeaders('get'));
    }
}
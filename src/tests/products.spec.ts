import * as dotenv from 'dotenv';
import { ProductsAPI } from '../api/Rest_api/products_api';
import { test , expect } from '@playwright/test';


dotenv.config();

test.describe('Products API Tests', () => {
    let productsAPI: ProductsAPI;

    test.beforeEach(async ({ request }) => {
        productsAPI = new ProductsAPI(request, process.env.PRODUCTS_BASE_URL || '');
    });

    test('Get all products', async () => {
        const response = await productsAPI.getProducts();
        expect(response.status()).toBe(200);
        const responseBody = await productsAPI.getResponseBody(response);
        console.log('Products Response Body:', responseBody);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
    });

    test('Get a product by ID', async () => {
        const productId = 17;
        const response = await productsAPI.getProductById(productId);
        expect(response.status()).toBe(200);
        const responseBody = await productsAPI.getResponseBody(response);
        console.log('Product By ID Response Body:', responseBody);
        expect(responseBody).toHaveProperty('id', productId);
    });

    //Filtering products

    test('Filter products by title', async () => {
        const response = await productsAPI.getProductsByTitle('Classic');
        expect(response.status()).toBe(200);
        const responseBody = await productsAPI.getResponseBody(response);
        console.log('Filtered Products Response Body:', responseBody);
        expect(Array.isArray(responseBody)).toBe(true);
        responseBody.forEach((product: any) => {
            expect(product.title).toContain('Classic');
        });
    });

    //Pagination test

    test('Get products with pagination', async () => {
        const skip = Number(process.env.SKIP ?? 0);
        const limit = Number(process.env.LIMIT ?? 10);
        const response = await productsAPI.getProductsBySkippingAndLimiting(skip, limit);
        expect(response.status()).toBe(200);
        const responseBody = await productsAPI.getResponseBody(response);
        console.log('Paginated Products Response Body:', responseBody);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeLessThanOrEqual(limit);
    });
});
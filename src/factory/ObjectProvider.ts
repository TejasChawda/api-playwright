import { APIRequestContext } from "playwright";
import { BookingAPI } from "../api/Rest_api/booking_api";
import { ProductsAPI } from "../api/Rest_api/products_api";
import { PostsQL } from "../api/graphQL/posts";


// export class ObjectProvider {

//     static async BookingAPI(request: APIRequestContext, baseUrl: string){
//         return new BookingAPI(request, baseUrl);
//     }

//     static async ProductsAPI(request: APIRequestContext, baseUrl: string){
//         return new ProductsAPI(request, baseUrl);
//     }

//     static async PostQL(request: APIRequestContext, baseUrl: string){
//         return new PostsQL(request, baseUrl);
//     }
// }
type ApiType = 'booking' | 'products' | 'posts';

export class ApiFactory {
    static create(apiType: ApiType, request: APIRequestContext, baseUrl: string) {
        switch (apiType) {
            case 'booking':
                return new BookingAPI(request, baseUrl);
            case 'products':
                return new ProductsAPI(request, baseUrl);
            case 'posts':
                return new PostsQL(request, baseUrl);
            default:
                throw new Error(`Unsupported API type: ${apiType}`);
        }
    }
}
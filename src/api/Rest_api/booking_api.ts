import { BaseAPI } from "../base_api";

export class BookingAPI extends BaseAPI {

    public async createAuth(dataKey: any) {
        return await this.post('auth', dataKey, await this.constructHeaders('post'));
    }

    public async createBooking(dataKey: any) {
        return await this.post('booking', dataKey, await this.constructHeaders('post'));
    }

    public async getBooking(bookingId: number) {
        return await this.get(`booking/${bookingId}`, await this.constructHeaders('get'));
    }

    public async updateBooking(bookingId: number, dataKey: any, token: string) {
        return await this.put(`booking/${bookingId}`, dataKey, await this.constructHeaders('put', token));
    }

    public async partialUpdateBooking(bookingId: number, dataKey: any, token: string) {
        return await this.patch(`booking/${bookingId}`, dataKey, await this.constructHeaders('patch', token));
    }

    public async deleteBooking(bookingId: number, token: string) {
        return await this.delete(`booking/${bookingId}`, await this.constructHeaders('delete', token));
    }
}
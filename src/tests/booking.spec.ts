import { test , expect } from '@playwright/test';
import { BookingAPI } from '../api/Rest_api/booking_api';
import * as dotenv from 'dotenv';
import data from '../data/user_data.json';
import { validateSchema } from '../utils/utilities';
import { userCreatedSchema, authResponse } from '../schemas/user_schema';

dotenv.config();

test.describe('Booking API Tests', () => {
    let bookingAPI: BookingAPI;
    let token: any;


    test.beforeEach(async ({ request }) => {
        bookingAPI = new BookingAPI(request, process.env.BOOKING_BASE_URL || '');
        const response = await bookingAPI.createAuth(data[0].authData)
        const responseBody = await bookingAPI.getResponseBody(response);
        const isValidSchema = validateSchema(responseBody, authResponse);
        if(isValidSchema) {
            token = responseBody.token;
        }
    });

    test('Create a new booking', async () => {
        const response = await bookingAPI.createBooking(data[0].createBooking[0]);
        expect(response.status()).toBe(200);
        const responseBody = await bookingAPI.getResponseBody(response);
        const isValidSchema = validateSchema(responseBody, userCreatedSchema);
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.booking).toMatchObject(data[0].createBooking[0]);
        expect(isValidSchema).toBe(true);
    });

    test('Get a booking by ID', async () => {
        // First, create a booking to ensure there is a valid booking ID to retrieve
        const createResponse = await bookingAPI.createBooking(data[0].createBooking[1]);
        const createResponseBody = await bookingAPI.getResponseBody(createResponse);
        const bookingId = createResponseBody.bookingid;

        // Now, retrieve the booking using the obtained booking ID
        const getResponse = await bookingAPI.getBooking(bookingId);
        expect(getResponse.status()).toBe(200);
        const getResponseBody = await bookingAPI.getResponseBody(getResponse);

        // console.log('Get Booking Response Body:', getResponseBody);
        // console.log('Expected Booking Data:', data[0].createBooking[1]);
        expect(getResponseBody.lastname).toBe(createResponseBody.booking.lastname);
        expect(getResponseBody).toMatchObject(data[0].createBooking[1]);
    });

    test('Update a booking by ID', async () => {
        // First, create a booking to ensure there is a valid booking ID to update
        const createResponse = await bookingAPI.createBooking(data[0].createBooking[2]);
        const createResponseBody = await bookingAPI.getResponseBody(createResponse);
        const bookingId = createResponseBody.bookingid;

        // Now, update the booking using the obtained booking ID
        const updateResponse = await bookingAPI.updateBooking(bookingId, data[0].updateBooking, token);
        expect(updateResponse.status()).toBe(200);

        //Visual verification of the update operation 
        console.log('before modification Response', await bookingAPI.getResponseBody(createResponse));
        console.log('Update Response body', await bookingAPI.getResponseBody(updateResponse));
        console.log('Expected Update Data', data[0].updateBooking);

        const updateResponseBody = await bookingAPI.getResponseBody(updateResponse);
        expect(updateResponseBody).toMatchObject(data[0].updateBooking);
    });

    test('Partially Update a booking by ID', async () => {
        // First, create a booking to ensure there is a valid booking ID to update
        const createResponse = await bookingAPI.createBooking(data[0].createBooking[3]);
        const createResponseBody = await bookingAPI.getResponseBody(createResponse);
        const bookingId = createResponseBody.bookingid;

        // Now, update the booking using the obtained booking ID
        const updateResponse = await bookingAPI.partialUpdateBooking(bookingId, data[0].partialUpdateBooking, token);
        expect(updateResponse.status()).toBe(200);

        //Visual verification of the update operation 
        console.log('before modification Response', await bookingAPI.getResponseBody(createResponse));
        console.log('Update Response body', await bookingAPI.getResponseBody(updateResponse));
        console.log('Expected Update Data', data[0].partialUpdateBooking);

        const updateResponseBody = await bookingAPI.getResponseBody(updateResponse);
        expect(updateResponseBody).toMatchObject(data[0].partialUpdateBooking);
    });

    test('Delete a booking by ID', async () => {
        // First, create a booking to ensure there is a valid booking ID to delete
        const createResponse = await bookingAPI.createBooking(data[0].createBooking[4]);
        const createResponseBody = await bookingAPI.getResponseBody(createResponse);
        const bookingId = createResponseBody.bookingid;

        // Now, delete the booking using the obtained booking ID
        const deleteResponse = await bookingAPI.deleteBooking(bookingId, token);
        expect(deleteResponse.status()).toBe(201);

        // Attempt to retrieve the deleted booking to confirm deletion
        const getResponse = await bookingAPI.getBooking(bookingId);
        expect(getResponse.status()).toBe(404);
    });
});

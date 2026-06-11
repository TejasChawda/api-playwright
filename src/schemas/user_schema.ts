export const userCreatedSchema = {
    type: 'object',
    properties: {
        bookingid: { type: 'number' },
        booking: { 
            type: 'object',
            properties: {
                firstname: { type: 'string' },
                lastname: { type: 'string' },
                totalprice: { type: 'number' },
                depositpaid: { type: 'boolean' },
                bookingdates: {
                    type: 'object',
                    properties: {
                        checkin: { type: 'string' },
                        checkout: { type: 'string' }
                    },
                },
                additionalneeds: { type: 'string' }
            }
        }
    },
    required: ['bookingid', 'booking']
}

export const authResponse = {
    type: 'object',
    properties: {
        token: { type: 'string' }
    },
    required: ['token']
}
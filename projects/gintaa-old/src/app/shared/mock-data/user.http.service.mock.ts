const userHttpServiceMockData = {
    sendOtp: {
        reqPayload: { mobile: '7797911115' },
        mockSuccessResponse: {
            success: true,
            code: 200,
            message: 'Done Successfully',
            payload: null
        },
        mockErrorResponse: {
            success: false,
            code: 400,
            message: 'Validation Failed',
            payload: [
                { param: 'mobile', reason: 'Invalid mobile no' }
            ]
        }
    },
    verifyOtp: {
        reqPayload: { mobile: '7797911115', otp: '123456' },
        mockSuccessResponse: {
            success: true,
            code: 200,
            message: 'User authentication successful',
            payload: null
        },
        mockErrorResponse: {
            success: false,
            code: 400,
            message: 'invalid otp',
            payload: null
        }
    }
};

export { userHttpServiceMockData };

export default {
    account: {
        users: {
            standardUser: 'standard_user',
            lockedOutUser: 'locked_out_user',
            problemUser: 'problem_user',
            performanceGlitchUser: 'performance_glitch_user',
        },
        passwords: {
            correct: 'secret_sauce',
            incorrect: 'not_secret_sauce',
        },
    },
    errorMessages: {
        lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
        wrongUsernameOrPassword:
            'Epic sadface: Username and password do not match any user in this service',
    },
    values: {
        numberOfItems: 6,
    },
};

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
        requiredFirstName: 'Error: First Name is required',
        requiredLastName: 'Error: Last Name is required',
        requiredPostalCode: 'Error: Postal Code is required',
    },
    checkout: {
        firstname: 'Avtandil',
        lastname: 'Gachechiladze',
        postalCode: '1039',
    },
    values: {
        numberOfItems: 6,
        a_to_z: 'az',
        z_to_a: 'za',
        lowToHigh: 'lohi',
        highToLow: 'hilo',
        productIds: [0],
    },
    regex: {
        selectEverythingButDigitsCommas: new RegExp(/[^\d.,]/g),
        selectEverythingButDigit: new RegExp(/\D/g),
    },
    links: {
        itemsPage: '/inventory.html',
        itemDetailsPage: '/inventory-item.html?id=',
        cartPage: '/cart.html',
        checkoutStepOnePage: '/checkout-step-one.html',
        checkoutStepTwoPage: '/checkout-step-two.html',
        checkoutComplete: '/checkout-complete.html',
    },
    texts: {
        checkoutCompleteText:
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    },
};

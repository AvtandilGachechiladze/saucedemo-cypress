export default {
    loginPage: {
        usernameInput: '[data-test="username"]',
        passwordInput: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        errorMessage: '[data-test="error"]',
    },
    productsPage: {
        sortButton: '[data-test="product_sort_container"]',
        items: '.inventory_item',
        itemNames: '.inventory_item_name',
        itemPrices: '.inventory_item_price',
        itemDescriptions: '.inventory_item_description',
        itemImages: '.inventory_item_img',
        cartBadge: '.shopping_cart_badge',
    },
    detailsPage: {
        itemName: '.inventory_details_name',
        itemDescription: '.inventory_details_desc',
        itemImage: '.inventory_details_img',
        itemPrice: '.inventory_details_price',
        backToProductsButton: '[data-test="back-to-products"]',
        addToCart: '*[data-test^="add-to-cart"]',
    },
};

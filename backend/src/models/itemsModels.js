const { fetchData, getCategories, getItems } = require('../utils/fetchUtils');

const originalEndpoints = {
    items: "https://api.mercadolibre.com/items/",
    categories: "https://api.mercadolibre.com/categories/",
};

exports.getItemInfo = async (itemId) => {
    const itemInfo = await fetchData(originalEndpoints.items + itemId);
    const itemDescription = await fetchData(originalEndpoints.items + itemId + "/description");
    const itemCategories = await getCategories(itemInfo);

    const organizedItemInfo = {
        id: itemInfo?.id,
        title: itemInfo?.title,
        price: {
            currency: itemInfo?.currency_id,
            amount: itemInfo?.price,
        },
        picture: itemInfo?.thumbnail,
        condition: itemInfo?.condition,
        free_shipping: itemInfo?.shipping.free_shipping,
        sold_quantity: itemInfo?.sold_quantity,
        description: itemDescription?.plain_text,
        categories: itemCategories,
        seller_address: itemInfo?.seller_address,
        available_quantity: itemInfo?.available_quantity,
    };

    return organizedItemInfo;
};
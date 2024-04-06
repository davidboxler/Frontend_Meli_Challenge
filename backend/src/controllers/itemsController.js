const { fetchData, getCategories, getItems } = require('../utils/fetchUtils');

const originalEndpoints = {
    search: "https://api.mercadolibre.com/sites/MLA/search?limit=4&q=",
    categories: "https://api.mercadolibre.com/categories/",
};

exports.searchItems = async (req, res) => {
    const query = req.params.query;

    if (!query || query.trim() === "") {
        return res.status(400).json({ error: "El valor de búsqueda no puede estar vacío." });
    }

    const data = await fetchData(originalEndpoints.search + query);
    const categories = await getCategories(data);
    const items = getItems(data);

    const author = {
        name: "David",
        lastname: "Boxler",
    };

    res.json({
        author: author,
        categories: categories,
        items: items,
    });
};
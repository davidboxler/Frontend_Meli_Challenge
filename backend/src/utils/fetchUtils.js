exports.fetchData = async (url) => {
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.log("error", error.message);
        throw new Error("Error al obtener datos");
    }
};

exports.getCategories = async (data) => {
    const category_id = data?.results[0]?.category_id || data?.available_filters[0]?.values[0]?.id;
    const respuestaCategoria = await fetch(`https://api.mercadolibre.com/categories/${category_id}`);
    const infoCat = await respuestaCategoria.json();
    return infoCat?.path_from_root;
};

exports.getItems = (data) => {
    return data?.results?.map((result) => {
        return {
            id: result?.id,
            title: result?.title,
            price: {
                currency: result?.currency_id,
                amount: result?.price,
                decimals: 2,
            },
            picture: result?.thumbnail,
            condition: result?.condition,
            free_shippin: result?.shipping?.free_shipping,
            location: result?.location?.city?.name,
            available_quantity: result?.available_quantity,
        };
    });
};
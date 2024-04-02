const express = require("express");
const cors = require("cors");

// Mensaje de conexion
console.log("API REST conectada");

// Crear servidor node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const originalEndpoints = {
  search: "https://api.mercadolibre.com/sites/MLA/search?limit=4&q=",
  items: "https://api.mercadolibre.com/items/",
  categories: "https://api.mercadolibre.com/categories/",
};

/* GET home page. */
app.get("/api/items/search/:query", async (req, res) => {
  const query = req.params.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "El valor de búsqueda no puede estar vacío." });
  }

  const fetchData = async () => {
    const url = originalEndpoints.search + query;
    try {
      const respuesta = await fetch(url);
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const data = await fetchData();

  const getCategories = async (data) => {
    if (data?.results[0]?.category_id) {
      const respuestaCategoria = await fetch(
        originalEndpoints.categories + data?.results[0]?.category_id
      );
      const infoCat = await respuestaCategoria.json();

      return infoCat.path_from_root;
    } else {
      const respuestaCategoria = await fetch(
        originalEndpoints.categories + data?.available_filters[0]?.values[0]?.id
      );
      const infoCat = await respuestaCategoria.json();
      return infoCat?.path_from_root;
    }
  };

  const getItems = (data) => {
    const itemsInfo = data?.results?.map((result) => {
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

    return itemsInfo;
  };

  const categories = await getCategories(data);
  const items = getItems(data);

  // Agregar la firma del autor al objeto de respuesta
  const author = {
    name: "David",
    lastname: "Boxler",
  };

  res.json({
    author: author,
    categories: categories,
    items: items,
  });
});

app.get("/api/items/:id", async (req, res) => {
  const itemId = req?.params?.id;

  const fetchItemData = async () => {
    const url = originalEndpoints.items + itemId;
    try {
      const respuesta = await fetch(url);
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const fetchItemDescription = async () => {
    const url = originalEndpoints.items + itemId + "/description";
    try {
      const respuesta = await fetch(url);
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getCategories = async (data) => {
    const respuestaCategoria = await fetch(
      originalEndpoints.categories + data?.category_id
    );
    const infoCat = await respuestaCategoria.json();

    return infoCat?.path_from_root;
  };

  const itemInfo = await fetchItemData();
  const itemDescription = await fetchItemDescription();
  const itemCategories = await getCategories(itemInfo);

  // Agregar la firma del autor al objeto de respuesta
  const author = {
    name: "David",
    lastname: "Boxler",
  };

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

  res.json({
    author: author,
    item: organizedItemInfo,
  });
});

// Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json({
    id: 1,
    nombre: "David",
    web: "davidboxler.es",
  });
});

// Poner servidor a escuchar peticiones http
app.listen(puerto, () => {
  console.log("Servidor de node corriendo en el puerto: ", puerto);
});

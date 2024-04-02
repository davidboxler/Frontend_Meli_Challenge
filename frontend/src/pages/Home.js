import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Mercado Libre Argentina</title>
          <meta name="description" content="Encontrá lo que buscas" />
        </Helmet>
        <h4>Buscar productos ...</h4>
      </div>
    </HelmetProvider>
  );
};

export default Home;

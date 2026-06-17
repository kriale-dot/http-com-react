import "./App.css";
import { useState } from "react";

// Hook customizado
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {

  const { data: products, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Adicionar produto
  const handleSubmit = (e) => {

    e.preventDefault();

    const product = {
      name,
      price: Number(price)
    };

    httpConfig(product, "POST");

    setName("");
    setPrice("");

  };

  return (
    <div className="App">

      <h1>Lista de Produtos</h1>
      {loading && <p>carregando dados...</p>}
      {error && <p>{error}</p>}
      {products && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - R$ {product.price}
            </li>
          ))}
        </ul>
      )}

      <div className="add-product">

        <h2>Adicionar Produto</h2>

        <form onSubmit={handleSubmit}>

          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Preço:
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 - state de loading no post */}
          {loading && <input disabled="true" type="submit" value="Aguarde" />}
          {!loading && <input type="submit" value="Criar Produto" />}

        </form>

      </div>

    </div>
  );
}

export default App;

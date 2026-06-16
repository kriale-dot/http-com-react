
import './App.css';
import { useState, useEffect } from "react";

//4 - custom hook
import { useFetch } from "./hooks/useFetch";

const url = "http://192.168.15.8:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  // 4 - custom hook
  const { data: items } = useFetch(url);


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - resgatando dados


  // 2 - adição de produtos
  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = { name, price }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    //3 - carregamento dinâmico
    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct])
    setName("")
    setPrice("")

  }
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R${product.price}</li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Preço:
            <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;

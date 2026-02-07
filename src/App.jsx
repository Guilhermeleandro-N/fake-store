import { useState } from "react";
import "./App.css";

function App() {
  const [textoBusca, setTextoBusca] = useState("");
  const [items, setItems] = useState([]);
  const [allItens, setAllItens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataType, setDataType] = useState("products");

  async function loadProducts() {
    setDataType("products");
    setLoading(true);
    setError("");
    setItems([]);

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data = await response.json();
      setItems(data);
      setAllItens(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    setDataType("users");
    setLoading(true);
    setError("");
    setItems([]);

    try {
      const response = await fetch("https://fakestoreapi.com/users");
      
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setItems(data);
      setAllItens(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  function atualizaTexto(e){
    setTextoBusca(e.target.value)
    console.log("teste");
    setItems(itens => {
      if (!textoBusca) return allItens;
      return itens.filter(item=> item.title.includes(textoBusca));      
      //return itens;
    })
  }

  return (
    <div className="container">
      <h1>FakeStore</h1>
      
      <div className="buttons">
        <button
          className={dataType === "products" ? "active" : ""}
          onClick={() => loadProducts()}
        >
          Produtos
        </button>
        <button
          className={dataType === "users" ? "active" : ""}
          onClick={() => loadUsers()}
        >
          Usuários
        </button>
      </div>

      {loading && <p className="loading">Carregando...</p>}
      {error && <div className="error">❌ {error}</div>}

      <div className="items">
        {allItens.length>0 ? (
        <form action="">
          <label htmlFor="">Buscar</label>
          <input type="text"  value={textoBusca} onChange={atualizaTexto}  />
        </form>
        ) : null }

        {items.map((item) => (
          <div className="item" key={item.id}>
            {dataType === "products" ? (
              <>
                <h3>{item.title}</h3>
                <p><strong>Preço:</strong> ${item.price.toFixed(2)}</p>
                <p><strong>Categoria:</strong> {item.category}</p>
                <p>{item.description.substring(0, 100)}...</p>
                
                <img src={item.image} className="product-image"  alt="" />
              </>
            ) : (
              <>
                <h3>{item.username}</h3>
                <p><strong>Username:</strong> {item.username}</p>
                <p><strong>Email:</strong> {item.email}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
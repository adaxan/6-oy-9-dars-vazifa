import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";

function Home() {
  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const [products, setProducts] = useState([]);
  const [token] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/api/products/private/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [])

  function handCreate(e) {
    e.preventDefault();

    const itemss = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/products/private`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(itemss)
    })
    .then(ress => ress.json())
    .then(data => {
      if(data.id) {
        setProducts([...products, data])
      }
    })
    .catch(err => {console.log(err);})

  }

  function handDelete(id) {
    let conf = confirm("Rostdan ham o'chirmoqchimisz?")
    if(conf) {
      fetch(`${import.meta.env.VITE_API_URL}/api/products/private/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
          let copied = [...products];
          copied = copied.filter(copyy => {
            return copyy.id != id;
          })
          setProducts(copied)
        }
      })
      .catch(err => {
        console.log(err);
      })

    }

  }

  return (
    <div>
      <form
        className="base-container flex flex-col gap-5 text-center w-1/3 mt-20"
        onSubmit={handCreate}
      >
        <input
          ref={nameRef}
          className="input input-bordered"
          type="text"
          placeholder="Enter product name..."
        />
        <input
          ref={priceRef}
          className="input input-bordered"
          type="text"
          placeholder="Enter product price..."
        />
        <textarea
          ref={descRef}
          className="input input-bordered resize-none pt-2"
          placeholder="Enter product description..."
        ></textarea>
        <button type="submit" className="btn btn-active btn-ghost">
          Create
        </button>
      </form>
      <div className="product-list mt-10 flex flex-wrap gap-4 ">
        {products.length > 0 &&
          products.map((product) => {
            return <Card key={product.id} product={product} del = {handDelete}></Card>;
          })}
      </div>
    </div>
  );
}

export default Home;

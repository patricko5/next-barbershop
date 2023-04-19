import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../../../styles/ShopTab.module.css";

const ShopTab = () => {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [msg, setMsg] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads"); //make sure the folder in the cloud is the same
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyk9lstek/image/upload",
        data
      );
      // console.log(uploadRes.data);
      const { url } = uploadRes.data; //url of img after API call.

      const _product = {
        productName,
        price,
        description,
        img: url,
      };
      console.log(_product);

      await axios.post("http://localhost:3000/api/products", _product);
      // setClose(true);
      setMsg(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const handleDelete = async (id) =>{
    //popup to confirm delete function
  };

  const handleClickDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // set the product attributes
  const handleEditProduct = async (product) => {
    setIsEditMode(true);
    setSelectedProductId(product._id);
    setProductName(product.productName);
    setPrice(product.price);
    setDescription(product.description);
  };

  const updateButton = async () => {
    if (!selectedProductId) return;
    try {
      const _product = {
        productName,
        price,
        description,
      };
      await axios.put(
        `http://localhost:3000/api/products/${selectedProductId}`,
        _product
      );
      setIsEditMode(false);
      setSelectedProductId(null);
      setProductName("");
      setPrice(null);
      setDescription("");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setSelectedProductId(null);
    setProductName(null);
    setPrice(null);
    setDescription(null);
    setFile(null);
    setMsg(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Manage Shop</h1>
      <div className={styles.left}>
        <div className={styles.createForm}>
          <div className="update-form">
            {isEditMode ? (
              <h4>Edit a Product</h4>
            ) : (
              <>
                <h4>Create a Product</h4>
              </>
            )}

            <p className={styles.p}>
            {isEditMode ? (
                ""
              ) : (
                <label className={styles.label}>Choose an image</label>
              )}

              {isEditMode ? (
                ""
              ) : (
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  onClick={() => setMsg(false)}
                />
              )}
            </p>
            <p className={styles.p}>
              <label className={styles.label}>Product Name</label>
              <input
                type="text"
                onChange={(e) => setProductName(e.target.value)}
                className={styles.input}
                placeholder="Product Name..."
                size="25"
                value={productName || ""}
              />
            </p>
            <p className={styles.p}>
              <label className={styles.label}>Price</label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
                placeholder="Price..."
                value={price || ""}
              />
            </p>
            <p className={styles.p}>
              <label className={styles.label}>Description</label>
              <textarea
                rows="4"
                cols="50"
                // type="text"
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textInput}
                placeholder="Description..."
                value={description || ""}
              />
            </p>
            <br></br>
            {msg && <h4>The product has been successfully created.</h4>}
            {isEditMode && (
              <button onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
            )}
            <button
              className={styles.uploadButton}
              onClick={isEditMode ? () => updateButton() : handleCreate}
            >
              {isEditMode ? "Modify" : "Create"}
            </button>
          </div>
        </div>
        
      </div>
      <br></br>
      <div className={styles.right}>
        <div className={styles.container}>
          <h1 className={styles.secondTitle}>Current Products</h1>
          <div className={styles.productsContainer}>
            {products.map((product) => (
              <div className={styles.productContainer} key={product._id}>
                <Image
                  src={product.img}
                  alt="Haircut img not found"
                  width="250"
                  height="200"
                  className={styles.prodImg}
                />
                <h2 className={styles.prodName}>{product.productName}</h2>
                <p className={styles.prodPrice}>{product.price}</p>
                {/* <div className={styles.prodDesc}>
                  <p>{product.description}</p>
                </div> */}
                <div className={styles.createFormButtons}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleClickDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.updateButton}
                    onClick={() => handleEditProduct(product)} //,_id?
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopTab;

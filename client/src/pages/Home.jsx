import React, { useEffect, useState } from "react";
import logo from "../images/logo2.png";
import { BsSearch } from "react-icons/bs";
import css from "./Home.module.css";
import { request } from "../request";
import { addToCart } from "../redux/redux.js";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  removeAllItem,
  decrementQuantity,
  incrementQuantity,
} from "../redux/redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [cat, setCat] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let tax = 0;
    let finalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
      tax = totalPrice * 0.05;
      finalPrice = tax + totalPrice;
    });
    return { totalPrice, totalQuantity, tax, finalPrice };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get(
          searchName ? `/products?search=${searchName}` : "/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [searchName]);

  useEffect(() => {
    cat
      ? setFilteredProducts(products.filter((i) => i.category.includes(cat)))
      : setFilteredProducts(products);
  }, [cat, products]);

  return (
    <div className={css.home}>
      <div className={css.products}>
        <div className={css.navbar}>
          <img src={logo} alt="logo" />
          <form className={css.search}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
            <div className={css.icon}>
              <BsSearch />
            </div>
          </form>
        </div>
        <div className={css.itemContainer}>
          <div className={css.categories}>
            <div className={css.cat} onClick={() => setCat(null)}>
              All
            </div>
            <div className={css.cat} onClick={() => setCat("men")}>
              Men
            </div>
            <div className={css.cat} onClick={() => setCat("women")}>
              Women
            </div>
          </div>
          <div className={css.items}>
            {filteredProducts
              ? filteredProducts.map((product, i) => (
                  <div
                    key={i}
                    className={css.item}
                    onClick={() => {
                      dispatch(
                        addToCart({
                          id: product._id,
                          description: product.description,
                          price: product.price,
                          image: product.image,
                        })
                      );
                    }}
                  >
                    <img src={product.image} alt="item" />
                    <p className={css.desc}>{product.description}</p>
                    <p className={css.price}>ks {product.price}</p>
                  </div>
                ))
              : products.map((product, i) => (
                  <div
                    key={i}
                    className={css.item}
                    onClick={() => {
                      dispatch(
                        addToCart({
                          id: product._id,
                          description: product.description,
                          price: product.price,
                          image: product.image,
                        })
                      );
                    }}
                  >
                    <img src={product.image} alt="item" />
                    <p className={css.desc}>{product.description}</p>
                    <p className={css.price}>ks {product.price}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className={css.order}>
        <div className={css.title}>Order details</div>
        <div className={css.orderItems}>
          {cart?.map((i, index) => (
            <div className={css.orderItem} key={index}>
              <img src={i.image} alt="item" />
              <div>
                <p className={css.orderDesc}>{i.description}</p>
                <div className={css.priceButtonWrapper}>
                  <div className={css.priceButtons}>
                    <div
                      className={css.priceButton}
                      onClick={() => dispatch(decrementQuantity(i.id))}
                    >
                      -
                    </div>
                    <div className={css.priceButton}>{i.quantity}</div>
                    <div
                      className={css.priceButton}
                      onClick={() => dispatch(incrementQuantity(i.id))}
                    >
                      +
                    </div>
                  </div>
                  <p className={css.price}>ks {i.price}</p>
                </div>
              </div>
              <div
                className={css.cancelButton}
                onClick={() => dispatch(removeItem(i.id))}
              >
                X
              </div>
            </div>
          ))}
        </div>

        <div className={css.totals}>
          <div className={css.amount}>
            <p>Subtotal</p>
            <p>Ks {getTotal().totalPrice}</p>
          </div>
          <div className={css.amount}>
            <p>Subtotal Tax (5%)</p>
            <p>Ks {getTotal().tax}</p>
          </div>
          <div className={css.line}></div>
          <div className={css.amount}>
            <p>Total</p>
            <p>Ks {getTotal().finalPrice}</p>
          </div>
          <div className={css.pay}>
            <button onClick={() => dispatch(removeAllItem())}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

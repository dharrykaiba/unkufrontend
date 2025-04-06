// src/components/CartSidebar.js
import React, { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext"; // Ajusta la ruta si es necesario
import QuantityControl from "./QuantityControl"; // Ajusta la ruta si es necesario
import "../styles/components/CartSidebar.css"; // Asegúrate de que la ruta sea correcta

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeItemFromCart,
    updateItemQuantity,
  } = useCart();
  const cartSidebarRef = useRef(null); // Referencia para el CartSidebar

  const handleClickOutside = (event) => {
    // Verificamos si el clic ocurrió fuera del área del CartSidebar
    if (
      cartSidebarRef.current &&
      !cartSidebarRef.current.contains(event.target)
    ) {
      toggleCart(); // Cierra el CartSidebar
    }
  };

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`} role="dialog" aria-labelledby="cart-sidebar-heading" ref={cartSidebarRef}>
      <button 
        onClick={toggleCart} 
        className="cart-sidebar-close"
        aria-label="Cerrar carrito">
        X
      </button>
      <h2 id="cart-sidebar-heading">Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="item-name">{item.name}</span> - 
                <span className="item-price">${item.price.toFixed(2)}</span>
                <QuantityControl
                  item={item}
                  onIncrease={() => updateItemQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateItemQuantity(item.id, item.quantity - 1)}
                  maxQuantity={item.maxQuantity} // o un valor predeterminado, si no tiene maxQuantity
                />
                <button 
                  onClick={() => removeItemFromCart(item.id)} 
                  className="remove-item" 
                  aria-label={`Eliminar ${item.name} del carrito`}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: </strong> ${calculateTotal()}
          </div>
        </>
      )}
      <button 
        className="checkout-button" 
        onClick={() => alert("Redirigiendo a la página de pago...")}
        disabled={cartItems.length === 0}
        aria-label="Proceder al pago">
        Proceder al pago
      </button>
    </div>
  );
};

export default CartSidebar;
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  juiceObj: PropTypes.objectOf(PropTypes.any.isRequired),
  keyNum: PropTypes.number.isRequired,
  taxes: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
  grandTotal: PropTypes.number.isRequired,
};

function ShoppingCartMobileProductCard({ juiceObj, keyNum, subTotal, taxes, grandTotal }) {
  return (
    <div
      key={`shopping-cart-mobile-row-${juiceObj.name}-${keyNum}`}
      className="shopping-cart-mobile-row"
    >
      <div className="shopping-cart-mobile-product-parent">
        <div className="shopping-cart-mobile-product-img">
          <img
            src={juiceObj.imgSrc}
            alt={juiceObj.name}
            className="shopping-cart-mobile-product-img-src"
          />
        </div>
        <div className="shopping-cart-mobile-product-infobox">
          <div className="shopping-cart-mobile-product-infobox-title">
            <h3>{juiceObj.name}</h3>
          </div>
          <div className="shopping-cart-mobile-product-infobox-nicotine">
            <p>Nicotine Strength:{'\u00A0'}</p>
            <i>{juiceObj.nicotine}</i>
          </div>
          <div className="shopping-cart-mobile-product-infobox-sku">
            <p>SKU:{'\u00A0'}</p>
            <p>{juiceObj.sku}</p>
          </div>
        </div>
        <ul className="shopping-cart-mobile-product-actions-list">
          <li className="shopping-cart-mobile-product-actions-price">
            <div className="shopping-cart-mobile-product-actions-price-title">
              <p>Price</p>
            </div>
            <div className="shopping-cart-mobile-product-actions-price-amt">
              <FontAwesome name="usd" />
              <p>{'\u00A0'}{`${juiceObj.price}.00`}</p>
            </div>
          </li>
          <li className="shopping-cart-mobile-product-actions-quantity">
            <div className="shopping-cart-mobile-product-actions-qty-title">
              <p>Quantity</p>
            </div>
            <div className="shopping-cart-mobile-product-actions-qty-btns">
              <div className="shopping-cart-mobile-product-actions-qty-btns-container">
                <div className="shopping-cart-mobile-product-actions-qty-readout">
                  <p>{juiceObj.qty}</p>
                </div>
                <div className="shopping-cart-mobile-product-actions-qty-btns">
                  <div className="shopping-cart-mobile-product-actions-qty-btn-plus">
                    <button className="sweep-right">
                      <FontAwesome name="plus" />
                    </button>
                  </div>
                  <div className="shopping-cart-mobile-product-actions-qty-btn-minus">
                    <button className="sweep-right">
                      <FontAwesome name="minus" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="shopping-cart-mobile-product-subtotal">
            <div className="shopping-cart-mobile-product-subtotal-title">
              <p>Subtotal</p>
            </div>
            <div className="shopping-cart-mobile-product-subtotal-qty">
              <FontAwesome name="usd" />
              <p>{'\u00A0'}{`${subTotal}.00`}</p>
            </div>
          </li>
          <li className="shopping-cart-mobile-product-actions-trash">
            <FontAwesome name="trash-o" />
          </li>
        </ul>
        <div className="shopping-cart-mobile-user-actions-btns">
          <button className="shopping-cart-mobile-user-actions-btns-clear">
            Clear Shopping Cart
          </button>
          <button className="shopping-cart-mobile-user-actions-btns-checkout">
            <FontAwesome name="credit-card-alt" />
            {'\u0020'}Express Checkout
          </button>
        </div>
        <div className="shopping-cart-mobile-analysis-main">
          <div className="shopping-cart-mobile-analysis-taxes">
            <div className="shopping-cart-mobile-analysis-taxes-title">
              <h3 className="title">Taxes</h3>
            </div>
            <div className="shopping-cart-mobile-analysis-taxes-cost">
              <FontAwesome name="usd" />
              <h3>
                {'\u00A0'}{taxes}
              </h3>
            </div>
          </div>
          <div className="shopping-cart-mobile-analysis-grand-total">
            <div className="shopping-cart-mobile-analysis-grand-total-title">
              <h3 className="title">Grand Total</h3>
            </div>
            <div className="shopping-cart-mobile-analysis-grand-total-cost">
              <FontAwesome name="usd" />
              <h3>{'\u00A0'}{`${grandTotal}`}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ShoppingCartMobileProductCard.propTypes = propTypes;
export default ShoppingCartMobileProductCard;

import React, { Component } from 'react';
import Root from '../../components/common/Root';
import Link from 'next/link';
import { connect } from 'react-redux';

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.handlePrint = this.handlePrint.bind(this);
  }

  /**
   * Print the window using the browser's native print functionality, if possible
   */
  handlePrint() {
    if (window && window.print) {
      window.print();
    }
  }

  renderPrintButton() {
    if (typeof window === 'undefined') {
      return null;
    }

    return (
      <button onClick={this.handlePrint} className="d-flex align-items-center text-decoration-underline cursor-pointer mt-3 mt-sm-0 no-print bg-transparent" role="button">
        <img src="/icon/print.svg" className="mr-2 w-20 no-print"/>
        <div className="no-print">Print Receipt</div>
      </button>
    );
  }

  render() {
    const { orderReceipt } = this.props;

    return (
      <Root>
        <div className="pt-5 mt-2 checkout-confirm receipt">
          {/* Row */}
          <div className="row mt-4">
            <div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-0">
              <div className="h-100 d-flex flex-column align-items-center justify-content-center py-5 px-4 px-sm-5">
                <div className="bg-success700 h-64 w-64 d-flex rounded-circle align-items-center justify-content-center mb-4">
                  <img src="/icon/check.svg" className="w-40"/>
                </div>
                <h3 className="text-center font-family-secondary mb-3">
                  Thank you for your purchase!
                </h3>
                <h4 className="text-center font-size-subheader mb-3">
                Your order completed successfully
                </h4>
                <p className="text-center font-color-light mb-5">
                  Here is your order number for reference : {orderReceipt.customer_reference}
                </p>
                <div className="d-flex w-100 justify-content-center flex-column flex-sm-row">
                  <Link href="/">
                    <button className="checkout-confirm-buttons h-48 px-3 flex-grow-1 border bg-white border-color-gray500 font-color-light mb-2 mb-sm-0 mr-sm-2 no-print">
                      Go back home
                    </button>
                  </Link>
                  <Link href="/collection">
                    <button className="checkout-confirm-buttons h-48 px-3 flex-grow-1 bg-black font-color-white no-print">
                      Continue shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="bg-brand300 checkout-receipt p-4 p-md-5 overflow-auto">
                <div className="p-sm-4">
                  <div className="border-bottom border-color-gray400 d-flex justify-content-between align-items-start pb-3 flex-column flex-sm-row">
                    <div>
                      <p className="font-color-light mb-2">
                        Receipt Number: {orderReceipt.customer_reference}
                      </p>
                      <p className="font-size-subheader">Order Details</p>
                    </div>
                    { this.renderPrintButton() }
                  </div>
                  <div className="border-bottom border-color-gray400 d-flex align-items-start py-4 flex-column flex-sm-row">
                    <div>
                      <p className="font-color-light mr-4 mb-3 mb-sm-0">
                        Ships to
                      </p>
                    </div>
                    <div className="flex-grow-1">
                      <p className="font-color-medium">{orderReceipt.shipping.street}</p>
                      <p className="font-color-medium">{orderReceipt.shipping.town_city}, {orderReceipt.shipping.country_state}</p>
                      <p className="font-color-medium">{orderReceipt.shipping.postal_zip_code}, {orderReceipt.shipping.country}</p>
                    </div>
                  </div>
                  <div className="py-4 borderbottom border-color-gray400">
                    {orderReceipt.order.line_items.map((item, index) => (
                      <>
                        <div className="d-flex flex-grow-1 mb-3">
                          <div className="flex-grow-1">
                            <p className="mb-2 font-weight-medium">
                              {item.quantity} x {item.product_name}
                            </p>
                            <p className="font-color-light">
                              {item.variants[0].variant_name}: {item.variants[0].option_name}
                            </p>
                          </div>
                          <div className="text-right font-weight-semibold">
                            {item.line_total.formatted_with_symbol}
                          </div>
                        </div>
                        </>
                    ))}
                  </div>

                  <div className="py-3 borderbottom border-color-black">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <p>Subtotal</p>
                        <p className="text-right font-weight-medium">${orderReceipt.order.total_with_tax.formatted_with_code}</p>
                      </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 pt-3">
                    <p className="font-size-title font-weight-semibold">
                      Order total
                    </p>
                    <p className="text-right font-weight-semibold font-size-title">${orderReceipt.order.total.formatted_with_code}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Root>
    );
  }
}

export default connect(state => state)(Confirm);

var React = require('react');

var Spinner = require('../spinner');
var OrdersTable = require('./ordersTable');

const url = "/api/orders";

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = { orders: [], groupBy: 'type', isLoading: false };
        this.handleGroupByType = this.handleGroupByType.bind(this);
        this.handleGroupBySize = this.handleGroupBySize.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.serverRequest = $.get(url, function (result) {
            var sortedOrders = _.sortBy(result, (order) => {
                return order.type;
            });
            this.setState({ orders: sortedOrders, isLoading: false });
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleGroupByType() {
        var sortedOrders = _.sortBy(this.state.orders, (order) => {
            return order.type;
        });
        this.setState({ orders: sortedOrders, groupBy: 'type' });
    }

    handleGroupBySize() {
        var sortedOrders = _.sortBy(this.state.orders, (order) => {
            return order.size;
        });
        this.setState({ orders: sortedOrders, groupBy: 'size' });
    }

    render() {
        var totalSales = _.reduce(this.state.orders, (memo, num) => {
            return memo + num.totalPrice;
        }, 0);

        var buttonStyle = {
            marginRight: "5px"
        };

        return (
            <div>
                <h2>Orders</h2>
                <div className="row">
                    <div className="col-md-8">
                        <span>Group By: </span>
                        <button style={buttonStyle} className="btn btn-default" onClick={this.handleGroupByType}>Type</button>
                        <button className="btn btn-default" onClick={this.handleGroupBySize}>Size</button>
                    </div>
                    <div className="col-md-4">
                        <h4>Total Sales: ${parseFloat(totalSales).toFixed(2)}</h4>
                    </div>
                </div>
                <div className="cdiv">
                    {this.state.isLoading ? <div className="bdiv"></div> : null}
                    {this.state.isLoading ? <Spinner /> : null}
                    <div className="row">
                        <div className="col-md-12">
                            <OrdersTable orders={this.state.orders} groupBy={this.state.groupBy} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Orders;
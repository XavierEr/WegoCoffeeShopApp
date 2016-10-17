var React = require('react');

var OrdersCategoryRow = require('./ordersCategoryRow');
var OrdersRow = require('./ordersRow');

class OrderTables extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        var lastCategory = null;

        this.props.orders.forEach((order) => {
            if (this.props.groupBy === 'type' && order.type !== lastCategory) {
                rows.push(<OrdersCategoryRow category={order.type} key={order.type} />);
            }

            if (this.props.groupBy === 'size' && order.size !== lastCategory) {
                rows.push(<OrdersCategoryRow category={order.size} key={order.size} />);
            }

            rows.push(<OrdersRow order={order} key={order._id} />);

            if (this.props.groupBy === 'type') {
                lastCategory = order.type;
            } else {
                lastCategory = order.size;
            }
        });

        return (
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

module.exports = OrderTables;
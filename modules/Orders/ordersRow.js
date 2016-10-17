var React = require('react');

class OrdersRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.order.beverage}</td>
                <td>{this.props.order.type}</td>
                <td>{this.props.order.size}</td>
                <td>{this.props.order.totalPrice}</td>
            </tr>
        );
    }
}

module.exports = OrdersRow;
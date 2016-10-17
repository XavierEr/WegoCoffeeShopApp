var React = require('react');

class OrdersCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="4">
                    {this.props.category}
                </th>
            </tr>
        );
    }
}

module.exports = OrdersCategoryRow;
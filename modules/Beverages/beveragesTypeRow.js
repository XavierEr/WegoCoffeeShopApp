var React = require('react');

class BeveragesTypeRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="4">
                    {this.props.type}
                </th>
            </tr>
        );
    }
}

module.exports = BeveragesTypeRow;
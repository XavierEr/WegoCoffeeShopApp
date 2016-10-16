var React = require('react');

class CondimentsTable extends React.Component {
    render() {
        return (
            <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.condiments.map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}

module.exports = CondimentsTable;
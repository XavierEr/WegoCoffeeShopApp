var React = require('react');

class SizesTable extends React.Component {
    render() {
        return (
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Descriptions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.sizes.map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}

module.exports = SizesTable;
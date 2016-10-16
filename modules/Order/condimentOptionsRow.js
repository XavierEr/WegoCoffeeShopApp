var React = require('React');

class CondimentOptionsRow extends React.Component {
    render() {
        return (
            <div>
                <h3>Condiments</h3>
                {
                    this.props.condiments.map((item, i) => {
                        return (
                            <div key={item._id} onClick={() => this.props.onCondimentSelect(item)}>
                                <div className="module col-md-1">
                                    {item.name} - ${item.price}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

module.exports = CondimentOptionsRow
var React = require('react');

class BeverageOptionsRow extends React.Component {
    render() {
        return (
            <div>
                <h3>Drinks</h3>
                {
                    this.props.beverages.map((item, i) => {
                        return (
                            <div key={item._id} onClick={() => this.props.onBeverageSelect(item)}>
                                <div className={"module col-md-1 " + (this.props.selectedBeverage && this.props.selectedBeverage._id === item._id ? 'selected' : '')}>
                                    {item.name}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

module.exports = BeverageOptionsRow;
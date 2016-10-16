var React = require('react');

class BeverageTypeOptionsRow extends React.Component {
    render() {
        return (
            <div>
                <h3>Types</h3>
                {
                    this.props.types.map((item, i) => {
                        return (
                            <div key={i} onClick={() => this.props.onTypeSelect(item)}>
                                <div className={"module col-md-1 " + (this.props.selectedType && this.props.selectedType === item ? 'selected' : '')}>
                                    {item.isHotBeverage ? <span>Hot - ${item.price}</span> : <span>Cold - ${item.price}</span>}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

module.exports = BeverageTypeOptionsRow;
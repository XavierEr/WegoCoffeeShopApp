var React = require('react');

class BeverageSizeOptionsRow extends React.Component {
    render() {
        return (
            <div>
                <h3>Sizes</h3>
                {
                    this.props.sizes.map((item, i) => {
                        return (
                            <div key={item} onClick={() => this.props.onSizeSelect(item)}>
                                <div className={"module col-md-1 " + (this.props.selectedSize && this.props.selectedSize === item ? 'selected' : '')}>
                                    {item}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

module.exports = BeverageSizeOptionsRow;
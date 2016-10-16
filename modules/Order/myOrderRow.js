var React = require('react');

class MyOrderRow extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <h3>My Order</h3>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <h4>Drink:</h4>
                    </div>
                    <div className="col-md-5 col-md-offset-1">
                        {this.props.selectedBeverage ? <h4>{this.props.selectedBeverage.name}</h4> : ""}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <h4>Size:</h4>
                    </div>
                    <div className="col-md-5 col-md-offset-1">
                        {this.props.selectedSize ? <h4>{this.props.selectedSize}</h4> : ""}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <h4>Type:</h4>
                    </div>
                    <div className="col-md-5 col-md-offset-1">
                        {this.props.selectedType ? this.props.selectedType.isHotBeverage ? <h4>Hot</h4> : <h4>Cold</h4> : ""}
                    </div>
                </div>
                <div className="row">
                    <hr />
                    <h4>Condiments</h4>
                </div>
                <div className="row">
                    <ul>
                        {
                            this.props.selectedCondiments.map((item, i) => {
                                return (
                                    <li key={i}>{item.name}</li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="row">
                    <hr />
                    <div className="col-md-1">
                        <h3>Total:</h3>
                    </div>
                    <div className="col-md-1 col-md-offset-1">
                        <h3>${parseFloat(this.props.totalPrice).toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = MyOrderRow;
var React = require('react');

var BeverageOptionsRow = require('./beverageOptionsRow');
var BeverageSizeOptionsRow = require('./beverageSizeOptionsRow');
var BeverageTypeOptionsRow = require('./beverageTypeOptionsRow');
var CondimentOptionsRow = require('./condimentOptionsRow');
var MyOrderRow = require('./myOrderRow');

const beveragesUrl = "/api/beverages";
const condimentsUrl = "/api/condiments";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beverages: [],
            selectedBeverage: null,
            availableSizes: [],
            selectedSize: '',
            availableTypes: [],
            selectedType: null,
            condiments: [],
            selectedCondiments: [],
            totalPrice: 0
        };
        this.handleSelectedBeverage = this.handleSelectedBeverage.bind(this);
        this.handleSelectedSize = this.handleSelectedSize.bind(this);
        this.handleSelectedType = this.handleSelectedType.bind(this);
        this.handleSelectedCondiment = this.handleSelectedCondiment.bind(this);
        this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    }

    componentDidMount() {
        this.beveragesRequest = $.get(beveragesUrl, function (result) {
            this.setState({ beverages: result });
        }.bind(this));

        this.condimentsRequest = $.get(condimentsUrl, function (result) {
            this.setState({ condiments: result });
        }.bind(this));
    }

    componentWillUnmount() {
        this.beveragesRequest.abort();
        this.condimentsRequest.abort();
    }

    handleSelectedBeverage(beverage) {
        var availableSizeGroups = _.groupBy(beverage.prices, (price) => {
            return price.size;
        });
        this.setState({ selectedBeverage: beverage, availableSizes: Object.keys(availableSizeGroups), selectedSize: '', selectedType: null, selectedCondiments: [], totalPrice: 0 });
    }

    handleSelectedSize(size) {
        var types = _.where(this.state.selectedBeverage.prices, { size: size });

        this.setState({ selectedSize: size, availableTypes: types, selectedType: null, selectedCondiments: [], totalPrice: 0 });
    }

    handleSelectedType(type) {
        console.log(type);
        this.setState({ selectedType: type, selectedCondiments: [], totalPrice: type.price });
    }

    handleSelectedCondiment(condiment) {
        var condiments = this.state.selectedCondiments;
        var newCondiments = condiments.concat([condiment]);
        var totalPrice = this.state.totalPrice;
        var newTotalPrice = totalPrice + condiment.price;

        this.setState({ selectedCondiments: newCondiments, totalPrice: newTotalPrice });
    }

    handleOrderSubmit(e) {
        e.preventDefault();
        alert('Hello');
    }

    render() {
        return (
            <div>
                <div className="col-md-8">
                    <div className="row">
                        <BeverageOptionsRow beverages={this.state.beverages} selectedBeverage={this.state.selectedBeverage} onBeverageSelect={this.handleSelectedBeverage} />
                    </div>

                    <div className="row">
                        {this.state.selectedBeverage != null ? <BeverageSizeOptionsRow sizes={this.state.availableSizes} selectedSize={this.state.selectedSize} onSizeSelect={this.handleSelectedSize} /> : null}
                    </div>

                    <div className="row">
                        {this.state.selectedSize ? <BeverageTypeOptionsRow types={this.state.availableTypes} selectedType={this.state.selectedType} onTypeSelect={this.handleSelectedType} /> : null}
                    </div>

                    <div className="row">
                        {this.state.selectedType != null ? <CondimentOptionsRow condiments={this.state.condiments} onCondimentSelect={this.handleSelectedCondiment} /> : null}
                    </div>
                </div>
                <div className="col-md-4">
                    <form onSubmit={this.handleOrderSubmit}>
                        <MyOrderRow selectedBeverage={this.state.selectedBeverage} selectedSize={this.state.selectedSize} selectedType={this.state.selectedType} selectedCondiments={this.state.selectedCondiments} totalPrice={this.state.totalPrice} />
                        <div className="row">
                            <div className="col-md-12">
                                <input type="submit" className="btn btn-lg checkout" disabled={!this.state.selectedType} value="CHECKOUT" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = Order;
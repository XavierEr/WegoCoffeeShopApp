var React = require('react');

var Spinner = require('../spinner');
var BeverageFormModal = require('./beverageFormModal');
var BeveragesTable = require('./beveragesTable');

const beveragesApiUrl = "/api/beverages";
const sizesApiUrl = "/api/sizes";

class Beverages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { beverages: [], sizes: [], showModal: false, isLoading: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleBeverageSubmit = this.handleBeverageSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.serverRequest = $.get(beveragesApiUrl, function (result) {
            var sortedBeverages = _.sortBy(result, (beverage) => {
                return beverage.type;
            });
            this.setState({ beverages: sortedBeverages, isLoading: false });
        }.bind(this));

        this.sizesRequest = $.get(sizesApiUrl, function (result) {
            var sizes = result.map((item, i) => {
                return item.name;
            });
            this.setState({ sizes: sizes });
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
        this.sizesRequest.abort();
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleBeverageSubmit(beverage) {
        this.close();
        this.setState({ isLoading: true });
        var beverages = this.state.beverages;
        var newBeverages = beverages.concat([beverage]);

        $.post(beveragesApiUrl, beverage, function (data) {
            beverage._id = data;
            var sortedBeverages = _.sortBy(newBeverages, (beverage) => {
                return beverage.type;
            });
            this.setState({ beverages: sortedBeverages, isLoading: false });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h2>Beverages</h2>
                <button className="btn btn-default" disabled={this.state.sizes.length === 0} onClick={this.open}>Add Beverage</button>
                <BeverageFormModal sizes={this.state.sizes} showModal={this.state.showModal} hideModal={this.close} onBeverageSubmit={this.handleBeverageSubmit} />
                <div className="cdiv">
                    {this.state.isLoading ? <div className="bdiv"></div> : null}
                    {this.state.isLoading ? <Spinner /> : null}
                    <div className="row">
                        <div className="col-md-12">
                            <BeveragesTable beverages={this.state.beverages} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Beverages;

// <div className="col-md-6">
//     <BeverageForm handleBeverageSubmit={this.handleCondimentSubmit} />
// </div>
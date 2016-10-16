var React = require('react');

var BeveragesTable = require('./beveragesTable');

const url = "/api/beverages";

class Beverages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { beverages: [] };
        this.handleBeverageSubmit = this.handleBeverageSubmit.bind(this);
    }

    componentDidMount() {
        this.serverRequest = $.get(url, function (result) {
            this.setState({ beverages: result });
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleBeverageSubmit(beverage) {
        var beverages = this.state.beverages;
        var newBeverages = beverages.concat([beverage]);

        $.post(url, beverages, function (data) {
            beverage._id = data;
            this.setState({ beverages: newBeverages });
        }.bind(this));
    }

    render(){
        return (
            <div>
                <h2>Beverages</h2>
                <div>
                </div>
                <div>
                    <BeveragesTable beverages={this.state.beverages} />
                </div>
            </div>
        );
    }
}

module.exports = Beverages;
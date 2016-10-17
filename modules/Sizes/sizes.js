var React = require('react');

var SizeForm = require('./sizeForm');
var SizesTable = require('./sizesTable');

const sizesApiurl = "/api/sizes";

class Sizes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sizes: [] };
        this.handleSizeSubmit = this.handleSizeSubmit.bind(this);
    }

    componentDidMount() {
        this.serverRequest = $.get(sizesApiurl, function (result) {
            this.setState({ sizes: result });
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleSizeSubmit(size) {
        var sizes = this.state.sizes;
        var newSizes = sizes.concat([size]);

        $.post(sizesApiurl, size, function (data) {
            size._id = data;
            this.setState({ sizes: newSizes });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h2>Drink Sizes</h2>
                <div>
                    <SizeForm onSizeSubmit={this.handleSizeSubmit} />
                </div>
                <div>
                    <SizesTable sizes={this.state.sizes} />
                </div>
            </div>
        );
    }
}

module.exports = Sizes;
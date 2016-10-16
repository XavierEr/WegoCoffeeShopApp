var React = require('react');

var CondimentForm = require('./condimentForm');
var CondimentsTable = require('./condimentsTable');

const url = "/api/condiments";

class Condiments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { condiments: [] };
        this.handleCondimentSubmit = this.handleCondimentSubmit.bind(this);
    }

    componentDidMount() {
        this.serverRequest = $.get(url, function (result) {
            this.setState({ condiments: result });
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleCondimentSubmit(condiment) {
        var condiments = this.state.condiments;
        var newCondiments = condiments.concat([condiment]);

        $.post(url, condiment, function (data) {
            condiment._id = data;
            this.setState({ condiments: newCondiments });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h2>Condiments</h2>
                <div>
                    <CondimentForm onCondimentSubmit={this.handleCondimentSubmit} />
                </div>
                <div>
                    <CondimentsTable condiments={this.state.condiments} />
                </div>
            </div>
        );
    }
}

module.exports = Condiments;
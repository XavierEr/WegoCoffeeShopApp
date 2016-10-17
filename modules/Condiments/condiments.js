var React = require('react');

var Spinner = require('../spinner');
var CondimentFormModal = require('./condimentFormModal');
var CondimentsTable = require('./condimentsTable');

const condimentsApiUrl = "/api/condiments";

class Condiments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { condiments: [], showModal: false, isLoading: false };
        this.handleCondimentSubmit = this.handleCondimentSubmit.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.serverRequest = $.get(condimentsApiUrl, function (result) {
            this.setState({ condiments: result, isLoading: false });
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleCondimentSubmit(condiment) {
        this.close();
        this.setState({ isLoading: true });

        var condiments = this.state.condiments;
        var newCondiments = condiments.concat([condiment]);

        $.post(condimentsApiUrl, condiment, function (data) {
            condiment._id = data;
            this.setState({ condiments: newCondiments, isLoading: false });
        }.bind(this));
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <h2>Condiments</h2>
                <button className="btn btn-default" onClick={this.open}>Add Condiment</button>
                <CondimentFormModal showModal={this.state.showModal} hideModal={this.close} onCondimentSubmit={this.handleCondimentSubmit} />
                <div className="cdiv">
                    {this.state.isLoading ? <div className="bdiv"></div> : null}
                    {this.state.isLoading ? <Spinner /> : null}
                    <div className="row">
                        <div className="col-md-12">
                            <CondimentsTable condiments={this.state.condiments} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Condiments;
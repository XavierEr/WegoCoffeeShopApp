var React = require('react');

var Spinner = require('../spinner');
var SizeFormModal = require('./sizeFormModal');
var SizesTable = require('./sizesTable');

const sizesApiurl = "/api/sizes";

class Sizes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sizes: [], showModal: false, isLoading: false };
        this.handleSizeSubmit = this.handleSizeSubmit.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.serverRequest = $.get(sizesApiurl, function (result) {
            this.setState({ sizes: result, isLoading: false });
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleSizeSubmit(size) {
        this.close();
        this.setState({ isLoading: true });

        var sizes = this.state.sizes;
        var newSizes = sizes.concat([size]);

        $.post(sizesApiurl, size, function (data) {
            size._id = data;
            this.setState({ sizes: newSizes, isLoading: false });
        }.bind(this));
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleRemove(id) {
        this.setState({ isLoading: true });
        $.ajax({
            url: sizesApiurl + "/" + id,
            type: 'DELETE',
            success: function (data) {
                var sizes = _.reject(this.state.sizes, (item) => { return item._id === id });
                this.setState({ sizes: sizes, isLoading: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(sizesApiurl, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                <h2>Drink Sizes</h2>
                <button className="btn btn-default" onClick={this.open}>Add Size</button>
                <SizeFormModal showModal={this.state.showModal} hideModal={this.close} onSizeSubmit={this.handleSizeSubmit} />
                <div className="cdiv">
                    {this.state.isLoading ? <div className="bdiv"></div> : null}
                    {this.state.isLoading ? <Spinner /> : null}
                    <div className="row">
                        <div className="col-md-12">
                            <SizesTable sizes={this.state.sizes} onRemove={this.handleRemove} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Sizes;
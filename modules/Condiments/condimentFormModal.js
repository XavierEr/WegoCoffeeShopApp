var React = require('react');
var Modal = require('react-bootstrap').Modal;

class CondifmentFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', price: '' };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handlePriceChange(e) {
        if (!isNaN(e.target.value)) {
            this.setState({ price: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var price = this.state.price;

        if (!name || !price) {
            return;
        }

        this.props.onCondimentSubmit({ name: name, price: price });
        this.setState({ name: '', price: '' });
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.hideModal}>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Condiment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="beverageName">Name</label>
                                    <input id="beverageName" type="text" className="form-control" placeholder="Beverage Name" value={this.state.name} onChange={this.handleNameChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="condimentPrice">Price</label>
                                    <input id="condimentPrice" type="text" className="form-control" placeholder="Price" value={this.state.price} onChange={this.handlePriceChange} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-default">Add</button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

module.exports = CondifmentFormModal;
var React = require('react');
var Modal = require('react-bootstrap').Modal;

class BeverageFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', type: '', size: '', price: 0, isHotBeverage: false, prices: [] };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAddSizePrice = this.handleAddSizePrice.bind(this);
        this.handleIsHotBeverageChange = this.handleIsHotBeverageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ type: 'Coffee', size: this.props.sizes[0] });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleTypeChange(e) {
        this.setState({ type: e.target.value });
    }

    handleSizeChange(e) {
        this.setState({ size: e.target.value });
    }

    handlePriceChange(e) {
        if (!isNaN(e.target.value)) {
            this.setState({ price: e.target.value });
        }
    }

    handleIsHotBeverageChange(e) {
        this.setState({ isHotBeverage: e.target.checked });
    }

    handleAddSizePrice() {
        var price = _.findWhere(this.state.prices, { size: this.state.size, isHotBeverage: this.state.isHotBeverage });

        if (!price) {
            var price = {
                size: this.state.size,
                price: this.state.price,
                isHotBeverage: this.state.isHotBeverage
            };
            var newPrices = this.state.prices.concat([price]);
            this.setState({ prices: newPrices, size: this.props.sizes[0], price: 0, isHotBeverage: false });
        } else {
            alert("Drink size and type must be unique");
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        var beverage = {
            name: this.state.name,
            type: this.state.type,
            prices: this.state.prices
        }
        this.props.onBeverageSubmit(beverage);
        this.setState({ name: '', type: 'Coffee', size: this.props.sizes[0], price: 0, isHotBeverage: false, prices: [] });
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.hideModal}>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Beverage</Modal.Title>
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
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="typeName">Type</label>
                                    <select className="form-control" onChange={this.handleTypeChange}>
                                        <option value="Coffee">Coffee</option>
                                        <option value="Tea">Tea</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="sizeName">Size</label>
                                    <select className="form-control" onChange={this.handleSizeChange}>
                                        {
                                            this.props.sizes.map((item, i) => {
                                                return <option key={item} value={item} >{item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="sizePrice">Price</label>
                                    <input id="sizePrice" type="text" className="form-control" placeholder="Price" value={this.state.price} onChange={this.handlePriceChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" checked={this.state.isHotBeverage} onChange={this.handleIsHotBeverageChange} /> Hot Beverage
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-3 col-md-offset-3">
                                <button type="button" className="btn btn-default" onClick={this.handleAddSizePrice}>Add Price</button>
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <ul>
                                    {
                                        this.state.prices.map((item, i) => {
                                            return (
                                                <li key={i}>{item.size}- ${parseFloat(item.price).toFixed(2)} {item.isHotBeverage ? 'Hot' : 'Cold'}</li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-default" disabled={this.state.name === '' || this.state.prices.length === 0}>Save</button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

module.exports = BeverageFormModal;
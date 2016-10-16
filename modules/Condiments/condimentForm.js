var React = require('react');

class CondifmentForm extends React.Component {
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
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="sr-only" htmlFor="condimentName">Name</label>
                    <input id="condimentName" type="text" className="form-control" placeholder="Condiment Name" value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div className="form-group">
                    <label className="sr-only" htmlFor="condimentPrice">Price</label>
                    <input id="condimentPrice" type="text" className="form-control" placeholder="Price" value={this.state.price} onChange={this.handlePriceChange} />
                </div>
                <button type="submit" className="btn btn-default">Add</button>
            </form>
        );
    }
}

module.exports = CondifmentForm;
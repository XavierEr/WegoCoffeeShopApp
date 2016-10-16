var React = require('react');

class SizeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', descriptions: '' };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionsChange = this.handleDescriptionsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleDescriptionsChange(e) {
        this.setState({ descriptions: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var description = this.state.descriptions.trim();

        if (!name) {
            return;
        }

        this.props.onSizeSubmit({ name: name, description: description });
        this.setState({ name: '', descriptions: '' });
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="sr-only" htmlFor="sizeName">Name</label>
                    <input id="sizeName" type="text" className="form-control" placeholder="Size Name" value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div className="form-group">
                    <label className="sr-only" htmlFor="sizeDescriptions">Size Descriptions</label>
                    <input id="sizeDescriptions" type="text" className="form-control" placeholder="Descriptions" value={this.state.descriptions} onChange={this.handleDescriptionsChange} />
                </div>
                <button type="submit" className="btn btn-default">Add</button>
            </form>
        );
    }
}

module.exports = SizeForm;
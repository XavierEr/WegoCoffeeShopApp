var React = require('react');
var Modal = require('react-bootstrap').Modal;

class SizeFormModal extends React.Component {
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
            <Modal show={this.props.showModal} onHide={this.props.hideModal}>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Size</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="sizeName">Name</label>
                            <input id="sizeName" type="text" className="form-control" placeholder="Size Name" value={this.state.name} onChange={this.handleNameChange} />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="sizeDescriptions">Size Descriptions</label>
                            <input id="sizeDescriptions" type="text" className="form-control" placeholder="Descriptions" value={this.state.descriptions} onChange={this.handleDescriptionsChange} />
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

module.exports = SizeFormModal;
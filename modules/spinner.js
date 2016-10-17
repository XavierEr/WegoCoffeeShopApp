var React = require('react');

class Spinner extends React.Component {
    render() {
        return (
            <div className="sdiv">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}

module.exports = Spinner;
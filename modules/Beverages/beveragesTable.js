var React = require('react');

var BeveragesTypeRow = require('./beveragesTypeRow');
var BeveragesRow = require('./beveragesRow');

class BeveragesTable extends React.Component {
    render() {
        var rows = [];
        var lastType = null;

        this.props.beverages.forEach((beverage) => {
            if (beverage.type !== lastType) {
                rows.push(<BeveragesTypeRow key={beverage.type} type={beverage.type} />);
            }
            rows.push(<BeveragesRow key={beverage.name} beverage={beverage} />);
            lastType = beverage.type;
        });

        return (
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tall</th>
                        <th>Grande</th>
                        <th>Venti</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

module.exports = BeveragesTable;
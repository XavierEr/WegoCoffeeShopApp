var React = require('react');

class BeveragesRow extends React.Component {
    render() {
        var tallHotPrice = _.findWhere(this.props.beverage.prices, { size: "Tall", isHotBeverage: true });
        var tallColdPrice = _.findWhere(this.props.beverage.prices, { size: "Tall", isHotBeverage: false });
        var tallPrices = sprintf("(H) %1$s / (C) %2$s", tallHotPrice ? tallHotPrice.price : "-", tallColdPrice ? tallColdPrice.price : "-");

        var grandeHotPrice = _.findWhere(this.props.beverage.prices, { size: "Grande", isHotBeverage: true });
        var grandeColdPrice = _.findWhere(this.props.beverage.prices, { size: "Grande", isHotBeverage: false });
        var grandePrices = sprintf("(H) %1$s / (C) %2$s", grandeHotPrice ? grandeHotPrice.price : "-", grandeColdPrice ? grandeColdPrice.price : "-");

        var ventiHotPrice = _.findWhere(this.props.beverage.prices, { size: "Venti", isHotBeverage: true });
        var ventiColdPrice = _.findWhere(this.props.beverage.prices, { size: "Venti", isHotBeverage: false });
        var ventiPrices = sprintf("(H) %1$s / (C) %2$s", ventiHotPrice ? ventiHotPrice.price : "-", ventiColdPrice ? ventiColdPrice.price : "-");

        return (
            <tr>
                <td>{this.props.beverage.name}</td>
                <td>{tallPrices}</td>
                <td>{grandePrices}</td>
                <td>{ventiPrices}</td>
            </tr>
        );
    }
}

module.exports = BeveragesRow;
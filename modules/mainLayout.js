var React = require('react');
var Link = require('react-router').Link;

class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <h1>Wego Coffee Shop</h1>
                <nav>
                    <Link to="order" activeClassName="active">Place Order</Link>
                    <Link to="orders" activeClassName="active">All Orders</Link>
                    <Link to="beverages" activeClassName="active">Beverages</Link>
                    <Link to="condiments" activeClassName="active">Condiments</Link>
                    <Link to="sizes" activeClassName="active">Sizes</Link>
                </nav>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

module.exports = MainLayout;
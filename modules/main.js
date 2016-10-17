var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;

var mainLayout = require('./mainLayout');
var order = require('./Order/order');
var orders = require('./Orders/orders');
var beverages = require('./Beverages/beverages');
var condiments = require('./Condiments/condiments');
var sizes = require('./Sizes/sizes');

class Main extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={mainLayout}>
                    <Route path="/order" component={order} />
                    <Route path="/orders" component={orders} />
                    <Route path="/beverages" component={beverages} />
                    <Route path="/condiments" component={condiments} />
                    <Route path="/sizes" component={sizes} />
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
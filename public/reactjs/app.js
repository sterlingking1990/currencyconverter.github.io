'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//components used
//base currency= naira
//currency types=dollar,pounds,euro,franc
//1. CurrencyCalculator
//AmountInput
//CurrencyType 
//2. AmountInput a state lifted from CurrencyCalculator

/*
    CurrencyCalculator is the ancestor component
    it has a state of currency_type initialized as the base currency and amount which is empty and foreign_currency initiailized as dollar
    it renders -
                the current state values
                conversions from naira to foreign_currency
                conversions from foreign_currency to naira
    it returns -
                the AmountInput Component
                -with state changes
                -allows you to enter amount in naira or other currency
                -responds to the corresponding changes and sends this to the ancestor methods for update

                the CurrencyType component
                -with state changes
                -allows you to change the currency type to any foreign currency
                -responds to the corresponding change and updates the foreign_currency state
*/

var currency_types = {
    'n': "Naira",
    'd': "Dollar",
    'e': "Euro",
    'p': "Pounds",
    'f': "Swiss Franc"
};

function fromForeignToNaira(curr, amount) {
    var currForm = {
        'd': amount * 360,
        'e': amount * 396.93,
        'p': amount * 450,
        'f': amount * 300
    };
    return currForm[curr];
}

function fromNairaToForeign(curr, amount) {
    var currForm = {
        'd': amount / 360,
        'e': amount / 396.93,
        'p': amount / 450,
        'f': amount / 300
    };
    return currForm[curr];
}

function convertCurrency(curr, amount, converter) {
    if (Number.isNaN(amount)) {
        return '';
    }
    var amount = converter(curr, amount);
    var amount_float = Math.round(amount * 1000) / 1000;
    return amount_float.toString();
}

function CurrencyType(props) {

    return React.createElement(
        'select',
        { value: props.value, onChange: props.onCurrencyChange },
        React.createElement(
            'option',
            { value: 'd' },
            'Dollar'
        ),
        React.createElement(
            'option',
            { value: 'e' },
            'Euro'
        ),
        React.createElement(
            'option',
            { value: 'p' },
            'Pounds'
        ),
        React.createElement(
            'option',
            { value: 'f' },
            'Swiss Franc'
        )
    );
}

var CurrencyCalculator = function (_React$Component) {
    _inherits(CurrencyCalculator, _React$Component);

    function CurrencyCalculator(props) {
        _classCallCheck(this, CurrencyCalculator);

        var _this = _possibleConstructorReturn(this, (CurrencyCalculator.__proto__ || Object.getPrototypeOf(CurrencyCalculator)).call(this, props));

        _this.state = { currency_type: 'n', foreign_currency: 'd', amount: '' };
        _this.handleNairaAmountChange = _this.handleNairaAmountChange.bind(_this);
        _this.handleForeignAmountChange = _this.handleForeignAmountChange.bind(_this);
        _this.handleCurrencyChange = _this.handleCurrencyChange.bind(_this);

        return _this;
    }

    _createClass(CurrencyCalculator, [{
        key: 'handleCurrencyChange',
        value: function handleCurrencyChange(event) {
            this.setState({ foreign_currency: event.target.value });
            var new_currency_status = this.state.foreign_currency;
            this.setState({ currency_type: new_currency_status });
        }
    }, {
        key: 'handleNairaAmountChange',
        value: function handleNairaAmountChange(amount) {
            this.setState({ currency_type: 'n', amount: amount });
        }
    }, {
        key: 'handleForeignAmountChange',
        value: function handleForeignAmountChange(amount) {
            var foreign = this.state.foreign_currency;
            this.setState({ currency_type: foreign, amount: amount });
        }
    }, {
        key: 'render',
        value: function render() {
            var currency_type = this.state.currency_type;
            var amount = this.state.amount;
            var foreign_currency = this.state.foreign_currency;

            var inNaira = currency_type !== 'n' ? convertCurrency(currency_type, amount, fromForeignToNaira) : amount;
            var inForeign = currency_type === 'n' ? convertCurrency(foreign_currency, amount, fromNairaToForeign) : amount;

            return React.createElement(
                'div',
                null,
                React.createElement(AmountInput, {
                    currency: 'n',
                    amount: inNaira,
                    onAmountChange: this.handleNairaAmountChange
                }),
                React.createElement(AmountInput, {
                    currency: foreign_currency,
                    amount: inForeign,
                    onAmountChange: this.handleForeignAmountChange
                }),
                React.createElement(CurrencyType, {
                    value: foreign_currency,
                    onCurrencyChange: this.handleCurrencyChange
                })
            );
        }
    }]);

    return CurrencyCalculator;
}(React.Component);

var AmountInput = function (_React$Component2) {
    _inherits(AmountInput, _React$Component2);

    function AmountInput(props) {
        _classCallCheck(this, AmountInput);

        var _this2 = _possibleConstructorReturn(this, (AmountInput.__proto__ || Object.getPrototypeOf(AmountInput)).call(this, props));

        _this2.handleAmount = _this2.handleAmount.bind(_this2);

        return _this2;
    }

    _createClass(AmountInput, [{
        key: 'handleAmount',
        value: function handleAmount(event) {
            this.props.onAmountChange(event.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var currency = this.props.currency;
            var amount = this.props.amount;

            return React.createElement(
                'fieldset',
                null,
                React.createElement(
                    'legend',
                    null,
                    'Enter Amount in ',
                    currency_types[currency]
                ),
                React.createElement('input', { currency: currency, value: amount, onChange: this.handleAmount })
            );
        }
    }]);

    return AmountInput;
}(React.Component);

var outlook = document.getElementById('app');
ReactDOM.render(React.createElement(CurrencyCalculator, null), outlook);

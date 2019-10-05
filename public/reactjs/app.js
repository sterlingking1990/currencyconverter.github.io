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

var CurrencyCalculator = function (_React$Component) {
    _inherits(CurrencyCalculator, _React$Component);

    function CurrencyCalculator(props) {
        _classCallCheck(this, CurrencyCalculator);

        var _this = _possibleConstructorReturn(this, (CurrencyCalculator.__proto__ || Object.getPrototypeOf(CurrencyCalculator)).call(this, props));

        _this.state = { currency_type: 'n', foreign_currency: 'd', amount: '' };

        return _this;
    }

    _createClass(CurrencyCalculator, [{
        key: 'render',
        value: function render() {
            var currency_type = this.state.currency_type;
            var amount = this.state.amount;
            var foreign_currency = this.state.foreign_currency;

            var inNaira = currency_type !== 'n' ? convertCurrency(currency_type, amount, fromForeignToNaira) : amount;
            var inForeign = currency_type === 'n' ? convertCurrency(currency_type, amount, fromNairaToForeign) : amount;

            return React.createElement(
                'div',
                null,
                React.createElement(AmountInput, {
                    currency: 'n',
                    amount: inNaira,
                    onAmountChange: this.handleAmountChange
                }),
                React.createElement(AmountInput, {
                    currency: foreign_currency,
                    amount: inForeign,
                    onAmountChange: this.handleAmountChange
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

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

const currency_types = {
    'n': "Naira",
    'd': "Dollar",
    'e': "Euro",
    'p': "Pounds",
    'f': "Swiss Franc"
}

function CurrencyType(props) {

    return (
            <select value={props.value} onChange={props.onCurrencyChange}>
                <option value="d">Dollar</option>
                <option value="e">Euro</option>
                <option value="p">Pounds</option>
                <option value="f">Swiss Franc</option>
            </select>
    )
    
}

class CurrencyCalculator extends React.Component{
    constructor(props){
        super(props);

        this.state={currency_type:'n',foreign_currency:'d',amount:''}
        this.handleNairaAmountChange=this.handleNairaAmountChange.bind(this);
        this.handleForeignAmountChange = this.handleForeignAmountChange.bind(this);
        this.handleCurrencyChange=this.handleCurrencyChange.bind(this);

    }

    handleCurrencyChange(event){
        this.setState({foreign_currency:event.target.value});
        var new_currency_status=this.state.foreign_currency;
        this.setState({currency_type: new_currency_status});
    }

    handleNairaAmountChange(amount){
        this.setState({currency_type:'n',amount:amount})
    }


    handleForeignAmountChange(amount) {
        var foreign=this.state.foreign_currency;
        this.setState({ currency_type:foreign, amount: amount })
    }




    render(){
        var currency_type=this.state.currency_type;
        var amount=this.state.amount;
        var foreign_currency=this.state.foreign_currency;

        var inNaira=currency_type!=='n'? convertCurrency(currency_type,amount,fromForeignToNaira):amount;
        var inForeign=currency_type==='n'? convertCurrency(foreign_currency,amount,fromNairaToForeign):amount;

        return(
            <div>
                <AmountInput 
                    currency='n'
                    amount={inNaira}
                    onAmountChange={this.handleNairaAmountChange}
                />

                <AmountInput
                    currency={foreign_currency}
                    amount={inForeign}
                    onAmountChange={this.handleForeignAmountChange}
                />

                <CurrencyType 
                    value={foreign_currency}
                    onCurrencyChange={this.handleCurrencyChange}
                />

            </div>

        )


    }

}

class AmountInput extends React.Component{
    constructor(props){
        super(props);
        this.handleAmount=this.handleAmount.bind(this);

    }

    handleAmount(event){
        this.props.onAmountChange(event.target.value);
    }


        render(){
            var currency=this.props.currency;
            var amount=this.props.amount;
            
            return(
                <fieldset>
                    <legend>Enter Amount in {currency_types[currency]}</legend>
                    <input currency={currency} value={amount} onChange={this.handleAmount}/>
                </fieldset>
            )
        }
    }

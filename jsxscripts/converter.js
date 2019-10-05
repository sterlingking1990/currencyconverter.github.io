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

class CurrencyCalculator extends React.Component{
    constructor(props){
        super(props);

        this.state={currency_type:'n',foreign_currency:'d',amount:''}
        this.handleAmountChange=this.handleAmountChange.bind(this);
        this.handleCurrencyChange=this.handleCurrencyChange.bind(this);
        
    }



    render(){
        var currency_type=this.state.currency_type;
        var amount=this.state.amount;
        var foreign_currency=this.state.foreign_currency;

        var inNaira=currency_type!=='n'? convertCurrency(currency_type,amount,fromForeignToNaira):amount;
        var inForeign=currency_type==='n'? convertCurrency(currency_type,amount,fromNairaToForeign):amount;

        return(
            <div>
                <AmountInput 
                    currency='n'
                    amount={inNaira}
                    onAmountChange={this.handleAmountChange}
                />

                <AmountInput
                    currency={foreign_currency}
                    amount={inForeign}
                    onAmountChange={this.handleAmountChange}
                />

                <CurrencyType 
                    value={foreign_currency}
                    onCurrencyChange={this.handleCurrencyChange}
                />

            </div>

        )


    }

}

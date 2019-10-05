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




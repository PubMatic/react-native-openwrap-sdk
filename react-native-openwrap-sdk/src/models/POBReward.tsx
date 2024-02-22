/**
 * Modal class to hold information of rewards.
 */
export class POBReward {

    /**
     * Reward currency type
     */
    public currencyType: String;

    /**
     * Reward amount
     */
    public amount: number;

    /**
     * Constructor.
     * Initializes and returns newly allocated reward object.
     *
     * @param currencyType  Reward currency type
     * @param amount        Reward amount
     */
    constructor(currencyType: String, amount: number) {
        this.currencyType = currencyType;
        this.amount = amount;
    }

    public toString(): string {
        return "POBReward{" +
            "currencyType='" + this.currencyType + '\'' +
            ", amount='" + this.amount + '\'' +
            '}';
    }
}
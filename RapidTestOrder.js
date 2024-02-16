class RapidTestOrder {
    constructor(sFrom) {
        this.OrderState = {
            WELCOMING: () => {
                let aReturn = [];
                this.stateCur = this.OrderState.ITEM_SELECTION;
                aReturn.push("Welcome to Titos! What would you like to order? We have Pizza and Wings.");
                return aReturn;
            },
            ITEM_SELECTION: (sInput) => {
                let aReturn = [];
                this.stateCur = this.OrderState.SIZE_SELECTION;
                this.order.item = sInput;
                aReturn.push("Great choice! What size would you like? We have Small, Medium, and Large.");
                return aReturn;
            },

            SIZE_SELECTION: (sInput) => {
                let aReturn = [];
                this.stateCur = this.OrderState.OPTIONS_SELECTION;
                this.order.size = sInput;
                if (this.order.item.toLowerCase() === "pizza") {
                    aReturn.push("Would you like Meat Lovers or Vegetarian pizza?");
                } else if (this.order.item.toLowerCase() === "wings") {
                    aReturn.push("Would you like Buffalo or BBQ sauce on your wings?");
                }
                return aReturn;
            },

            RESERVING: (sInput) => {
                let aReturn = [];
                this.isDone = true;
                if (sInput.toLowerCase().startsWith('y')) {
                    aReturn.push(`Your rapid test is reserved under the phone number ${this.sFrom}`);
                    let d = new Date();
                    d.setMinutes(d.getMinutes() + 120);
                    aReturn.push(`Please pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`);
                } else {
                    aReturn.push("Thanks for trying our reservation system");
                    aReturn.push("Maybe next time")
                }
                return aReturn;
            }
        };

        this.stateCur = this.OrderState.WELCOMING;
        this.isDone = false;
        this.sFrom = sFrom;
        this.order={};
    }
    handleInput(sInput) {
        return this.stateCur(sInput);
    }
    isDone() {
        return this.isDone;
    }
}

export { RapidTestOrder }









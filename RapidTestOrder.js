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


            OPTIONS_SELECTION: (sInput) => {
                let aReturn = [];
                if (this.order.item.toLowerCase() === "pizza") {
                    if (!["meat lover", "meat lovers", "vegetarian"].includes(sInput.toLowerCase())) {
                        aReturn.push("Please choose either Meat Lovers or Vegetarian.");
                    } else {
                        this.order.options = sInput;
                        aReturn.push("Good choice! Would you like to add a drink to your order?");
                         this.stateCur = this.OrderState.FINALIZE_ORDER;
                    }
                } else if (this.order.item.toLowerCase() === "wings") {
                    if (!["buffalo", "bbq"].includes(sInput.toLowerCase())) {
                        aReturn.push("Please choose either Buffalo or BBQ sauce.");
                    } else {
                        this.order.options = sInput;
                        aReturn.push("Good choice! Would you like to add a drink to your order?");
                         this.stateCur = this.OrderState.FINALIZE_ORDER;
                    }
                }
                return aReturn;
            },
         
            FINALIZE_ORDER: (sInput) => {
                let aReturn = [];
                if (sInput.toLowerCase().startsWith('y')) {
                    aReturn.push("Soda Can added to order"); // Placeholder for drink selection
                }
                else {
                    aReturn.push("Thank you for your order!");
                    this.stateCur = this.OrderState.FINALIZE_ORDER;
                }
                // Process the order and return a confirmation message
                aReturn.push("Your order has been confirmed! Enjoy your meal.");
                this.stateCur = this.OrderState.WELCOMING;
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
        this.order = {};
    }
    handleInput(sInput) {
        return this.stateCur(sInput);
    }
    isDone() {
        return this.isDone;
    }
}

export { RapidTestOrder }









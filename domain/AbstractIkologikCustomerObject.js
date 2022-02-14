import AbstractIkologikObject from "./AbstractIkologikObject.js";

export default class AbstractIkologikCustomerObject extends AbstractIkologikObject {
    constructor(customer){
        super();
        this.customer = customer;
    }
}
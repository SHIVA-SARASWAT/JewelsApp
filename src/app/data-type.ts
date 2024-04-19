export interface dataType{
    name:string;
    email:string;
    password:string;
}
export interface loginDataType{
    email:string;
    password:string;
}
export interface product{
    id:string;
    quantity:undefined | number
    name:string;
    price:string;
    category:string;
    color:string;
    description:string;
    image:string;
    productId:any
}

export interface cart{
    name:string;
    price:string;
    category:string;
    color:string;
    image:string;
    description:string;
    id:string| undefined;
    quantity:undefined | number;
    productId:any;
    userId:string;
}
export interface usercartProductSum{
    Amount:number;
    Tax:number;
    Delivery:number;
    Discount:number;
    Total:number;
}
export interface order{
    address:string;
    contact:string;
    email:string;
    id:string | undefined;
    totalPrice:number;
    userId:string
}
  
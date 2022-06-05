# Jumbish Assessment - Retail Store Delivery Service

This project was bootstrapped with **Create React App**.

This web-based Project is **MVP** version of a software for retail shops. As part of an initiative to go digital, the idea is have a software that will assist customers with in-home delivery of the items bought in store. Essentially, customers who shop in the store will be able to use software to schedule the home delivery of their items.

The project currently have the following functionalities :

1. A mechanism for users to **enter their phone numbers** and use it to fetch and display all recent orders (sorted by most recent at the top) which are eligible for home delivery.

2. After selecting one or many orders, the ability to **enter the address** of the user's choice.

3. The ability to **select a suitable time slot** is provided to the user. Time slots are of 1 hour each.

4. An optional checkbox is provided which is meant to **Tip the delivery person**. If the user checks this checkbox, then enable a textbox to enter the tip amount. Keep the textbox grayed out by default.

5. Provide a mechanism to **submit the data**.

6. Once successfully submitted, provide a **confirmation pop-up** to the user with a confirmation message and the **order number** displayed on the confirmation box.

## List of Assumptions

- Since this was a frontend only assessment , all the data which was supposed to be fetched from backend is assumed to be stored in `utils/orders.json`.
- The following is assumed to be the schema of the order data:

```
{
        "mobileNumber": "95xxxxxx188",
        "date": "04 June 2022 12:15:00",
        "items": [
            {
                "id": 0,
                "name": "ABCD",
                "MRP": 123,
                "quantity": 456
            },
            {
                "id": 1,
                "name": "ABCD",
                "MRP": 123,
                "quantity": 456
            },
            {
                "id": 2,
                "name": "ABCD",
                "MRP": 123,
                "quantity": 456
            },
        ]
    }
```

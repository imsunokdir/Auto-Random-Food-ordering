# Random Automatic food Order :Simple Restaurant Website Project


## Features
- As soon as website is loaded it starts ordering automatically(if it doesnt work,  refresh)
- There is a button to visually show the ordering process
- Displays a menu fetched from a JSON file.
- Allows users to place orders for randomly selected burgers.
- Simulates the order preparation process.
- Handles payment for the order.
- Displays a thank-you message upon successful payment.

## Functionality
1. **getMenu()**: Fetches food items from a JSON file and displays them to the user upon loading the screen.
2. **TakeOrder()**: Simulates taking an order by returning a promise that resolves after 2500 milliseconds, selecting 3 random burgers.
3. **orderPrep()**: Prepares the order by returning a promise that resolves after 1500 milliseconds, indicating the order status and payment status.
4. **payOrder()**: Handles payment by returning a promise that resolves after 1000 milliseconds, confirming the order and payment status.
5. **thankyouFnc()**: Displays a thank-you alert when the payment is confirmed.

### Promise Handling
- The app effectively chains promises to ensure each step is completed before proceeding to the next, using either promise chaining or async/await.

### Error Handling
- The project includes error handling to manage any issues that may arise during the promise resolutions.



## Demo
[Check out the live demo here!](https://imsunokdir.github.io/24-08-24-restaurant/)

## Built With
- **HTML** for structure.
- **CSS** for styling.
- **JavaScript** for functionality and API interactions.

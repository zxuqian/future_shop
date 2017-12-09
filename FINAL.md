# Future Shop

Future shop is an online ecommerce shopping system that provides functionalities for users to buy product and for administrators to management products and users. As a preliminary application, future shop now is only specific to clothing market. It may extend to a fully functional ecommerce platform in the future. Below is a screenshot of this system:

![[showcase]](../readme/picture1.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

*Node.js => 8.4.0*

*Mongodb => 3.4.9*

### Installing

Install required libraries

```
npm install

```

Import sample data

```
mongorestore sqldump/dum_2017_12_07/

```
This will create a database named `future_shop` in mongodb.

Start node server

```
npm start

```

Access front-end interface from

```
http://localhost:3000

```
For back-end dashboard

```
http://localhost:3000/admin

```

## Functionalities

This section will demonstrate how to use the application

### Register

Click `Register` button on the navibar, a register pop-up modal will be shown

![[Register]](../readme/picture2.png)

This form includes validation, if you don't enter anything, you will see validation errors when click `Register` button of the form

![[Register]](../readme/picture3.png)

After fix errors, you can continue the register process

![[Register]](../readme/picture4.png)


### Login

Enter `username` and `password` at the top navbar to login, this will send an ajax post request to server

![[Register]](../readme/picture5.png)

If there are any erros during login, you will receive an error popup

![[Register]](../readme/picture6.png)

After loggedin, the login form will change to a greeting

![[Register]](../readme/picture7.png)

### Browsing Products

The front page will show all products in all categories. Click navbar menus to see products in a specific category.

![[Register]](../readme/picture8.png)

You can also use the search bar to search products that have titles and details including the search terms

![[Register]](../readme/picture9.png)

Click the product title to see product details

![[Register]](../readme/picture10.png)

### Add to shopping cart

You can click `Add to cart` button whereever you see it to add the product to the shopping cart. Adding the same product will not update shopping cart product count, but it will update the quanity of the specific product. After the product succesfully added to the shopping cart, you will see a notification.

![[Register]](../readme/picture11.png)

### Checkout

In the checkout page, you can update product quantity. This functionality will send ajax request to server to update the shopping cart.

![[Register]](../readme/Picture12.png)

Click `checkout` button will bring you to payment page. In the payment page, you can select an exsisting recipient address or add a new one by checking the `Use a new Address` checkbox. Then input credit card info, the server will not remember this for safety concerns.

![[Register]](../readme/Picture13.png)

After you checkout successfully, you will see the `Thank you` page

![[Register]](../readme/Picture14.png)

### See order histories

Click the greeting message on the navbar, you will be brought to the account center. You can see all orders and with the price and status.

![[Register]](../readme/Picture15.png)

### User profile

Click `Profile` menu in the account center page. Here you can update profile and upload a profile image.

![[Register]](../readme/Picture16.png)

### Back-end Dashboard

### User Management


## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

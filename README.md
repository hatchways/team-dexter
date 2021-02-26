[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="client/src/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Study App</h3>

  <p align="center">
    An awesome study app for students!
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#demos">Demos</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Study App is a platform built for university students to create study groups based on their courses,
post questions on a course forums, and live chat with one another.

### Built With

* [React(.js)](https://reactjs.org/)
* [Express(.js)](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Node(.js)](https://nodejs.org/en/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* Create a [Cloudinary account](https://cloudinary.com/users/register/free)
* Create a [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Study-App.git
   ```
3. Install NPM packages in client and server folders
   ```sh
   npm install
   ```
4. Create a .env file in the server folder and add the following API keys
   ```JS
    MONGO_URI=YOUR_MONGO_URI
    SECRET_KEY=RANDOM_KEY_FOR_SIGNING_JWT
    CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_NAME
    CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET_KEY
   ```
5. Run server
  ```JS
    cd server
    npm run dev
  ```
6. Run client
  ```JS
    cd client
    npm start
  ```
<!-- DEMOS -->
## Demos

### Creating an account

![](gifs/SA-create-account.gif)

### Chat functionality with sockets

![](gifs/SA-chat.gif)

### Adding and deleting courses

![](gifs/SA-add-delete-course.gif)

### Adding a photo to the user profile

![](gifs/SA-add-profile-photo.gif)

### Adding comments on forum posts

![](gifs/SA-add-comment.gif)

### Creating a group for students

![](gifs/SA-create-group.gif)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/timegambit/Study-App/issues) for a list of proposed features (and known issues).

<!-- CONTACT -->
## Contact
<ol> 
  <li>Ethan Tam - ethan.stewart.tam@gmail.com</li>
  <li>Jonathan Quagliariello - jon.quag@gmail.com</li>
  <li>Amha Desta - amha7819@gmail.com</li>
  <li>Ethan Rosenberg - ethan@ethanrosenberg.com</li>
</ol>

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Material UI](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Mongoose](https://mongoosejs.com/)
* [Socket.io](https://laravel.com)
* [Express Validator](https://choosealicense.com)
* [JWT](https://jwt.io/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [Best-README-Teemplate](https://github.com/othneildrew/Best-README-Template)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/timegambit/Study-App.svg?style=for-the-badge
[contributors-url]: https://github.com/timegambit/Study-App/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/timegambit/Study-App.svg?style=for-the-badge
[forks-url]: https://github.com/timegambit/Study-App/network/members
[stars-shield]: https://img.shields.io/github/stars/timegambit/Study-App.svg?style=for-the-badge
[stars-url]: https://github.com/timegambit/Study-App/stargazers
[issues-shield]: https://img.shields.io/github/issues/timegambit/Study-App.svg?style=for-the-badge
[issues-url]: https://github.com/timegambit/Study-App/issues
[product-screenshot]: images/screenshot.png

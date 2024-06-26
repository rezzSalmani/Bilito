<a name="readme-top"></a>

<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/rezzSalmani/Bilito">
    <img src="https://github.com/rezzSalmani/Bilito/blob/master/public/images/mainLogo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Bilito</h3>

  <p align="center">
      <strong>Online Ticket Shop</strong>
<br />
<a href="https://github.com/rezzSalmani/Bilito"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://bilito.liara.run">View Demo</a>
·
<a href="https://github.com/rezzSalmani/Bilito/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
·
<a href="https://github.com/rezzSalmani/Bilito/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Key-Features">Key Features</a></li>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot](https://github.com/rezzSalmani/Bilito/blob/master/src/assets/screenShots/Bilito-min.png)](https://github.com/rezzSalmani/Bilito)

<p>This project is an online airplane ticket reservation system developed using React, Tailwind CSS, and Supabase for database management and user authentication.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Features

- **User-Friendly and Responsive Design**: ensures a seamless experience across all devices.
- **Single Page Application (SPA)**: utilizes React Router DOM to provide a multi-page feel within a single-page application.
- **State Management**: implements React Context API for efficient state management, enabling features like ticket search and purchase.
- **Supabase Integration**: utilizes Supabase as both a custom and fake data provider for the database.
- **Comprehensive User Authentication**: includes sign-in, sign-up, and sign-out functionalities, powered by Supabase.
- **Role-Based Access Control**: restricts access to certain features based on user authentication status.
- **User Dashboard**: Provides an exclusive view of purchased tickets for each user (Note: user information and wallet features are still under development).
- **Advanced Sorting and Filtering**: allows sorting and multi-functional filtering of tickets based on criteria such as price, time, and company.
- **Error and Loading Handling**: ensures a smoother user experience with robust error and loading state management.
- **Optimized and Dynamic Structure**: features a dynamic and optimized application structure for improved performance.


  <p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- ![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
- ![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- [![tailwindcss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Technologies Used

- React: A powerful JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- React Router: A routing library for React, providing client-side routing and navigation.

<!-- GETTING STARTED -->

## Getting Started

Before you begin, ensure you have met the following requirements:

### Prerequisites

- Node.js and npm installed on your machine.
- Supabase account and project setup for database and authentication.

### Installation

1. Get a free API Key at [https://supabase.com](https://supabase.com)
2. create your own dataBase in `supabase` website.
3. setup Authentication in `supabase` website.
4. Clone the repo
   ```sh
   git clone https://github.com/rezzSalmani/Bilito.git
   ```
5. Install NPM packages
   ```sh
    npm install
   ```
6. Enter your `supabase` API in `.env.local`
   ```.env
   VITE_SUPABASE_URL = 'ENTER YOUR API';
   VITE_SUPABASE_ANON_KEY = 'ENTER YOUR API';
   ```
7. Start the development server:
   ```sh
   npm run dev
   ```

 <strong>there is a `ticket data` inside of data folder you can use.</strong>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- Sign Up / Sign In:
  - Navigate to the authentication page and create a new account or sign in with existing credentials.
  
- Search for Tickets:
  - Use the search bar to find available tickets based on your criteria.
  
- Buy Tickets:
  - Select a ticket from the search results and proceed to purchase.

- View Dashboard:
  - After signing in, access your user dashboard to view purchased tickets.

- Filter and Sort Tickets:
  - Use the filter and sort options to refine ticket search results based on price, time, and company.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please feel free to open a new issue or submit a pull request.

<!-- CONTACT -->

## Contact

Reza Salmani - [contact me](rezasalmani.dev@gmail.com)

Project Link: [https://github.com/rezzSalmani/Bilito](https://github.com/rezzSalmani/Bilito)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/rezzSalmani/Bilito/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/rezzSalmani/Bilito/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/rezzSalmani/Bilito/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/rezzSalmani/Bilito/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/rezzSalmani/Bilito/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

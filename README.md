<style>
    @import 'https://cdn.tailwindcss.com/2.2.15/tailwind.min.css';

  body {
    @apply font-sans m-0 p-20;
    background-image: linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%);
    color: #333;
    box-sizing: border-box;
  }

  @keyframes bubbling {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .img-display{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 0;
  }

  #js, #twcss, #react, #vite{
    padding: 0 20px;
    height: 60px;
    width: 60px;
    animation: bubbling 2s infinite;
  }
   
  #twcss, #vite{
    padding: 0 20px;
    height: 60px;
    width: 60px;
    animation: bubbling 2s reverse infinite;
  }

  h1 {
    @apply text-3xl font-bold content-center text-gray-800;
    margin-bottom: 20px;
  }

 h2 {
    @apply text-2xl font-bold text-gray-800;
    margin-bottom: 10px;
  }

  ul {
    @apply mt-2 mb-8;
  }

  ul li {
    @apply mb-2;
  }

  a {
    @apply text-blue-500 no-underline;
  }

  a:hover {
    @apply underline;
  }

  code {
    @apply font-mono bg-gray-200 py-1 px-2 rounded-md;
  }

  pre {
    @apply text-rose-50 p-4 rounded-md;
    background-color: background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
    width: 50%;
  } 
</style>

# <h1 align = "center"> CUERS </h1>
+ _Note: This is the front-end section of the CUERS (Chittagong University Exam Remuneration System). The back-end section of the system is referred [here](https://github.com/Md-Kais/CUERS_SERVER )._
## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Features](#features)
- [Acknowledgements](#acknowledgements)
## Overview
**CUERS** is a web-based digital exam remuneration system with a centralized database, containing all information about the evaluators (teachers) and exam-committee members of each department of University of Chittagong. In an effort to generate the remuneration forms and subsequently the bills of each evaluator correctly, the system significantly reduces the workload and time needed by digitizing the whole process.

## Getting Started
These instructions will provide you with a local copy of the project for deployment or testing purposes. Make sure to following the steps listed below:
### Cloning Repository
1. Clone the repository into your local system:
```
git clone https://github.com/Md-Kais/CUERS-New.git
```
2. Navigate to your project directories using the command:
```
cd CUERS-New
```
### Installing Dependencies
1. In your local system, ensure that Node.js & npm are already installed. To check whether they are installed, run the following commands in either your Ubuntu terminal or Windows Command Prompt:
```
#Check npm version
npm -v 

#Check node version
node -v
```
To install either or both of them, please follow the [Node.js](https://nodejs.org/en/download/package-manager "Node.js installation via package manager") and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "Downloading and installing Node.js and npm") documentations.

### Configuring Server
1. Before building the front-end, make sure that Vite.js is installed by running the command:
```
npm create vite@latest CUERS-New
```
2. Now, to build the front-end assets, run the appropriate command listed below:
```
npm run dev
```
* _Make sure the back-end server is also started. Refer to the guidelines mentioned [here](https://github.com/Md-Kais/CUERS_SERVER )._

## Features
* Centralized database that holds all information of evaluators of the University of Chittagong while ensuring privacy & security.
* Generate full-fledged remuneration bills, by automating bill calculations from provided data.

<div class = "img-display">
<img src = "src/assets/Bill Form.png" width="200px" height="400px">
</div>
<div class="img-caption" align="center"><br>Bill Form of an Evaluator</div>

* Allow insertion, deletion and/or updating data records dynamically and handling noisy data.

## Technologies Used
<div class = "img-display">
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" ><img src = "src/assets/javascript.svg" id= "js" 
/></a>
<a href="https://tailwindcss.com/"><img src = "src/assets/tailwindcss.svg" id = "twcss"
/> </a>
<a href = "https://react.dev/"><img src = "src/assets/react.svg" id="react"
/> </a>
<a href="https://vitejs.dev/"><img src = "src/assets/vitejs.svg" id="vite"
/> </a>
</div>

## Acknowledgements
This project has been developed using confidential data records provided by [Dr. Rudra Pratap Deb Nath](https://www.cu.ac.bd/public_profile/index.php?ein=5168), Associate Professor of CSE Dept and [Muhammad Anwarul Azim](https://cu.ac.bd/public_profile/index.php?ein=3904), Professor and Chairman of CSE Dept of University of Chittagong.
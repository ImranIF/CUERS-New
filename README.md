<link rel="stylesheet" type="text/css" href="README-styles.css">

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
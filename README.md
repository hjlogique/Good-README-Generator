[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
# README-Generator Application

* By Henry Jean Logique
* Technology Used: JavaSript, Node.js, NPM, ES6
* MIT License

## Description 
  
This is a command-line application which allows for quick and easy generation of a project Github README file. It allows a project creator to spend more time working on finishing the project and less time creating a good README. The application runs with Node.js, and accepts user inputs to dynamically generate the README.md file.

## Installation and Usage

Steps:

 * In command line type the `npm i` command to install the npm package dependencies specified in the `package.json` file. They are as follows:
  * [`inquirer`](https://www.npmjs.com/package/inquirer)
  * [`axios`](https://www.npmjs.com/package/axios)
  * Next type `node index.js` to run the application. (watch the clip below)

![Gif demo of README-generator](readme-generator.mp4)

The application uses the `inquirer` package to prompt you in the command line with a series of questions like Github username, project title, project description, table of contents, installation, usage, license, contributing guideline for other developers, e-mail, tests and questions.

It takes your inputs, uses `axios` package to fetch your GitHub profile and email, uses the `generateMarkdown.js` to generate a markdown layout with a table of contents, sort your information in different sections, create a license badge, and at the end uses the `fs.writeFile` to generate a README.md file for your project. 

It also utilizes some of the ES6 syntax and paradigms, including `arrow functions`, `const`, `let`, template literals, and `async/await` to handle the `inquirer`, `axios`, and `fs.writeFile` promises.

Please preview the example urREADME file[`urREADME.md`](https://github.com/hjlogique/README-Generator/blob/master/urREADME.md) in this repository.


## Questions?

[Link to my GitHub profile](https://github.com/hjlogique)

If you have any questions, please contact me at:

Email: hjlogique@yahoo.com
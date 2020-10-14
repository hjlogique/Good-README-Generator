
// ======  README-Generator  =======
// ====  By Henry Jean Logique  ====
// ==========  index.js  ===========

const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js");

// ======  Promp users with questions - starts  =======

// Validate the users' entries

const isValid = async (input) => {
  if (input.length < 1) {
    return console.log(`${input} This is not valid. Enter a valid information.`);
  }
  return true;
};

// array of questions for user

const promptUser = [
  {
    type: 'input',  // Github Username
    message: "What is your GitHub username?",
    name: 'gitUname',
    default: 'hjlogique',
    validate: isValid
  },
  {
    type: 'input',  // Github Repository
    message: "What is the name of your GitHub repository?",
    name: 'gitRepo',
    // default: '',
    validate: isValid
  },
  {
    type: 'input',  // Project Title
    message: "What is the title of your project?",
    name: 'projTitle',
    // default: '',
    validate: isValid
  },
  {
    type: 'input',  // Project Description
    message: "Please provide a description for your project.",
    name: 'projDesc',
    // default: '',
    validate: isValid
  },
  {
    type: 'input',  // Installation 
    message: "Please provide installation instructions for your project.",
    name: 'installation',
    // default: '',
    validate: isValid
  },
  {
    type: 'input',  // Usage 
    message: "Please provide usage information for your project.",
    name: 'usage',
    // default: '',
    validate: isValid
  },
  {
    type: 'list',  // License
    message: "Please select a license for your project.",
    choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
    name: 'license',
    default: '',
  },
  {
    type: 'input',  // Contributing
    message: "Please provide contribution guidelines for your project.",
    name: 'contributing',
    // default: '',
    validate: isValid
  },
  {
    type: 'input',  // Tests
    message: "Please provide test instructions for your project.",
    name: 'tests',
    // default: '',
    validate: isValid
  },
  {
    type: 'input',  // Email
    message: "Please provide your Email address.",
    name: 'email',
    // default: '',
    validate: isValid
  }

];

// ======  Promp users with questions - ends  =======


// ======  Axios async await promise to get user's GitHub data  =======

const getAsyncGit = async (uAnswers) => {
  try {
    let response = await axios
      .get(`https://api.github.com/users/${uAnswers.gitUname}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


// ======  Function to write README file  =======

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
      if (err) {
        return console.log(err);
      }
    
      console.log("Your README.md file is generated!")
  });
}

const writeFileAsync = util.promisify(writeToFile);


// =======  Main function to initialize program =======

async function init() {
  try {

    // Async await promise to collect user's answers 
    const uAnswers = await inquirer.prompt(promptUser);

    //  Async await promise for user's GitHub info
    const uInfo = await getAsyncGit(uAnswers);

    // Use Inquirer entries to create the README content
    const rmContent = generateMarkdown(uAnswers, uInfo);
    console.log(rmContent);

    // Write readMeContent to file
    await writeFileAsync('urREADME.md', rmContent);

  } catch (error) {
    console.log(error);
  }
};

// function call to initialize program
init();


// =================================
// ======  README-Generator  =======
// =================================

const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);


// ======  Promp users with questions - starts  =======

// Validate the users' entries

const isValid = async (input) => {
  if (input.length < 1) {
    return console.log(`${input} This is not valid. Enter a valid information.`);
  }
  return true;
};


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

// ======  Generate the README Content - starts  =======

function generateRM(uAnswers, uInfo) {

  // Create Table of Content section

  let toc = `## Table of Contents`;

  if (uAnswers.installation !== '') {
    toc += `
  * [Installation](#installation)` };

  if (uAnswers.usage !== '') {
    toc += `
  * [Usage](#usage)` };

    toc += `
  * [License](#license)` 

  if (uAnswers.contributing !== '') {
    toc += `
  * [Contributing](#contributing)` };

  if (uAnswers.tests !== '') {
    toc += `
  * [Tests](#tests)` };

  toc += `
  * [Questions](#questions)`


// README main Content 
// Create the License badge

let mainContent = `

[![${uAnswers.license}](https://img.shields.io/badge/${uAnswers.license.replace(/\s+/g, '-')}-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

# ${uAnswers.projTitle}


  ## Description 
  
  ${uAnswers.projDesc}

  `

// Table of Content section
mainContent += toc;

// License section
mainContent += `
  * [License](#license)`;

// Installation section
if (uAnswers.installation !== '') {
  mainContent +=
    `
  
  ## Installation
  
  *How to install and run the project:*
  
  ${uAnswers.installation}`
};


// Usage section
if (uAnswers.usage !== '') {
  mainContent +=

    `
  
  ## Usage 
  
  *How to use the project and some examples:*
  
  ${uAnswers.usage}`
};


// Contributing section
if (uAnswers.contributing !== '') {
  mainContent +=

    `
  
  ## Contributing
  
  *To contribute to this project, please follow these guidelines.*
  
  ${uAnswers.contributing}`
};


// License section
mainContent +=
  `
  
  ## License
  
  ${uAnswers.license}
  `;


// Tests section
if (uAnswers.tests !== '') {
  mainContent +=
    `
  
  ## Tests
  
  *Tests for application and how to run them:*
  
  ${uAnswers.tests}`
};


// Question section: Links to User's Profile and Email
let contact =
  `
  
  ## Questions?
  
  [My GitHub:](${uInfo.html_url})

  If you have any questions, please contact me via email:
  `;

// Provided email

if (uAnswers.email !== null) {
  contact +=
    `

  Email: ${uAnswers.email}
  
  `};

  // If retreived GitHub email exits and is not the same as the one provided

if (uInfo.email !== null && uInfo.email !== uAnswers.email) { 
    contact +=
      `
  
    Email: ${uInfo.email}
    
    `};

// Add Contact section
mainContent += contact;

// Return main content
return mainContent;
  
}

// ======  Generate the README Content - ends  =======

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


// ============  Main function  ==============

async function init() {
  try {

    // Async await promise to collect user's answers 
    const uAnswers = await inquirer.prompt(promptUser);

    //  Async await promise for user's GitHub info
    const uInfo = await getAsyncGit(uAnswers);

    // Use Inquirer entries to create the README content
    const rmContent = generateRM(uAnswers, uInfo);
    console.log(rmContent);

    // Write readMeContent to file
    await writeFileAsync('urREADME.md', rmContent);

  } catch (error) {
    console.log(error);
  }
};

init();

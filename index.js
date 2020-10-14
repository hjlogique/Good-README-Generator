
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

  if (uAnswers.contributing !== '') {
    toc += `
  * [Contributing](#contributing)` };

  if (uAnswers.tests !== '') {
    toc += `
  * [Tests](#tests)` };

  toc += `
  * [Questions](#questions)`


// =================  README main Content  ===================

// Create the License badge with a specific 
// style based on the selected license type

let licenses = ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'];

let badgeUrl = (uAnswers.license === licenses[0]) ? "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)" :
  (uAnswers.license === licenses[1]) ? "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)" :
  (uAnswers.license === licenses[2]) ? "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)" :
  (uAnswers.license === licenses[3]) ? "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)" :
  (uAnswers.license === licenses[4]) ? "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" :
  (uAnswers.license === licenses[5]) ? "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" :
  (uAnswers.license === licenses[6]) ? "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)" :
  "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";


let mainContent = `

${badgeUrl} ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${uAnswers.gitUname}/${uAnswers.gitRepo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${uAnswers.gitUname}/${uAnswers.gitRepo}?style=flat&logo=appveyor)
  
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
  
  ## Questions
  
  [Link to my GitHub profile](${uInfo.html_url})

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

// License section
mainContent +=
  `
  
  ## License
  
  ${uAnswers.license}
  `;

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

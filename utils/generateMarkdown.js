
// ======  README-Generator  =======
// ====  By Henry Jean Logique  ====
// =====  generateMarkdown.js  =====

// ======  Generate markdown for README - starts  =======

function generateMarkdown(uAnswers, uInfo) {

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

// ======  Generate markdown for README - ends  =======

module.exports = generateMarkdown;

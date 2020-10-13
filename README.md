<<<<<<< HEAD
# Project Title  

[By Henry Jean Logique](https://github.com/hjlogique)

Released under the [MIT License](LICENSE).

## Description

Content of description


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)


## Installation

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save markdown-toc
```

## Usage

```

  input:        The Markdown file to parse for table of contents,
                or "-" to read from stdin.

  -i:           Edit the <input> file directly, injecting the TOC at <!-- toc -->;
                (Without this flag, the default is to print the TOC to stdout.)

  --json:       Print the TOC in JSON format

  --append:     Append a string to the end of the TOC

  --bullets:    Bullets to use for items in the generated TOC
                (Supports multiple bullets: --bullets "*" --bullets "-" --bullets "+")
                (Default is "*".)

  --maxdepth:   Use headings whose depth is at most maxdepth
                (Default is 6.)

  --no-firsth1: Include the first h1-level heading in a file

  --no-stripHeadingTags: Do not strip extraneous HTML tags from heading
                         text before slugifying
```

## Usage

```js
var inquire = require('inquire');

inquire('# One\n\n# Two').content;
// Results in:

```

To allow customization of the output, an object is returned with the following properties:

* `content` **{String}**: The generated table of contents. Unless you want to customize rendering, this is all you need.
* `highest` **{Number}**: The highest level heading found. This is used to adjust indentation.
* `tokens` **{Array}**: Headings tokens that can be used for custom rendering

**Usage example**

```js
var results = render('# ');
```

Results in:

```
- [AAA](#aaa)
```

### .json

Object for creating a custom .

```js
toc('# AAA\n## BBB\n### CCC\nfoo').json;

// results in
[ { content: 'AAA', slug: 'aaa', lvl: 1 },
  { content: 'BBB', slug: 'bbb', lvl: 2 }]
```

* `linkify()`: linking a heading `content` string
* `slugify()`: slugify a heading `content` string
* `strip()`: strip words or characters from a heading `content` string

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** |  
| --- | --- |  
| 1 | [hjlogique](https://github.com/hjlogique) |  
| 1   | [contributor2](https://github.com/stefanwalther) |  
| 1   | [contributor3](https://github.com/Marsup) |  
| 1   | [contributor4](https://github.com/dvcrn) |  
| 1   | [contributor5](https://github.com/maxogden) |  


## Tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

## Questions

[My Github Profile](https://github.com/hjlogique).

For any questions please contact me at: <email@example.com>  [mailto](mailto:email@example.com) 

### License
Copyright © 2020, [Henry Jean Logique](https://github.com/hjlogique).
Released under the [MIT License](LICENSE).

Notice: A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
***
=======
# README-Generator

  ![Badge for GitHub repository top](https://img.shields.io/github/languages/top/hjlogique/README-Generator?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/hjlogique/README-Generator?style=flat&logo=appveyor)
  
  Check out the badges hosted by [shields.io](https://shields.io/).
  
  
  ## Description 
  
  Project Description

  
  * [License](#license)## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  
  ## Installation
  
  *How to install and run the project:*
  
  Installation
  
  ## Usage 
  
  *How to use the project and some examples:*
  
  Usage
  
  ## Tests
  
  *Tests for application and how to run them:*
  
  Tests
  
  ## License
  
  MIT License
  
  ---
  
  ## Questions?
  
  ![Author's image](https://avatars2.githubusercontent.com/u/16179670?v=4) 
  
  If you have any questions, please contact me via email:
 
  GitHub: [@hjlogique](https://api.github.com/users/hjlogique)
  
>>>>>>> I am loading the first version of the project

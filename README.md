# CurrencyConverter
This is a react practice currency converter that should convert from naira to other currency and vice versa

# ReactDOM
The project is written in ReactJS and basically JSX
Install ReactDOM and react check out https://reactjs.org/docs/cdn-links.html
In Other to Render as ReactJS, It uses Babel compiler to Convert JSX scripts to corresponding React Script

# BABEl
Babel Compiler installed globally helps convert the JSX scripts into the corresponding React Script
babel jsxscript/script.js --out-file=public/reactscript/app.js --presets=react,env
The presets helper packages react and env for babel was installed locally in yarn packages
check out http://babeljs.io for more

# Setting Up using Yarn
1. Clone the repo
2. yarn install
3. yarn global add --babel-cli@6.24.1
//installing the presets
4. yarn add babel-preset-react@6.24.1 babel-preset-env@1.5.2

# Setting up Using Npm
1. Clone the repo
2. npm install
3. npm install -g babel-cli@6.24.1
4. npm install babel-preset-react@6.24.1 babel-preset-env@1.5.2

# Live Server and launching react script
1. Install live-server on Visual studio
2. babel jsxscript/script.js --out-file=public/reactscript/app.js --presets=react,env --watch [to wach for and convert changes synchronously]
3. start live-server using live-server public to automatically launch changes

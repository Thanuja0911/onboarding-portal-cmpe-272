module.exports = {
    presets: [
      "@babel/preset-env", // Transpiles ES6+ code to ES5 for compatibility
      "@babel/preset-react" // Transpiles React JSX to JavaScript
    ],
    plugins: [
      "@babel/plugin-transform-runtime", // Reduces code duplication in Babel helpers
      "@babel/plugin-proposal-class-properties", // Supports class properties syntax
      "@babel/plugin-proposal-private-methods", // Supports private methods in classes
      "@babel/plugin-proposal-private-property-in-object" // Supports private properties in object literals
    ]
  };
  
  
  
  
  
  
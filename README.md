# Scratch Extensions Converter
converter.js exports a promise that takes a URL for a Scratch 2 Extension JavaScript file, and returns a string with the code for a Scratch 3 Extension. converter.js will work in any environment that supports es2015. \
index.html provides a simple wrapper for inputting a URL and outputting the converted code on the page. It will work in any browser that supports es2017.

## Todo
Currently, Inputs in blocks are not formatted. \
Block functions are not yet transferred.
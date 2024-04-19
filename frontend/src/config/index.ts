const { REACT_APP_NODE_ENV } = process.env;
console.log("this is the node env", process.env);
export default REACT_APP_NODE_ENV === 'production' ? 'https://edicehaven.onrender.com' : 'http://localhost:5000';
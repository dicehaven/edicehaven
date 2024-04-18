const { NODE_ENV } = process.env;
console.log("this is the node env", process.env);
export default NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://edicehaven.onrender.com';
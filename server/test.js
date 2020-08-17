const axios = require("axios");
const array = [1, 2, 3];

// for (var i = 0; i < array.length; i++) {
// 	console.log(array[i]);
// }

// for (const item of array) {
// 	console.log(item);
// }

// console.log(process.env.NODE_ENV); // production, development

void async function main(){
	const response = await axios.get("https://itunes.apple.com/hk/lookup?id=1480196084,1518267642,1501484653");
	console.log(JSON.stringify(response.data, null, 4));
}();



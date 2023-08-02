import json5 from "json5";

// Check if a string is a valid JSON
function isValidJSON(stringData) {
    try {
        json5.parse(stringData);
    } catch (e) {
        return false;
    }
    return true;
};


// Minify a JSON object
function minifyJSON(jsonData) {
    if (isValidJSON(jsonData)) {
        return JSON.stringify(json5.parse(jsonData))
    } else {
        alert('Cats! The JSON is not valid!')
    }
};


// Beautify a JSON object
function beautifyJSON(jsonData) {
    if (isValidJSON(jsonData)) {
        return JSON.stringify(json5.parse(jsonData), null, 2)
    } else {
        alert('Cats! The JSON is not valid!')
    }
};


// clear setXXXData
function clearData(setXXXData) {
    setXXXData('')
};


export { isValidJSON , minifyJSON , beautifyJSON , clearData };
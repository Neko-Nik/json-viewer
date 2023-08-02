// Check if a string is a valid JSON
function isValidJSON(stringData) {
    try {
        JSON.parse(stringData);
    } catch (e) {
        return false;
    }
    return true;
};


// Minify a JSON object
function minifyJSON(jsonData) {
    if (isValidJSON(jsonData)) {
        return JSON.stringify(JSON.parse(jsonData))
    } else {
        alert('Cats! The JSON is not valid!')
    }
};


// Beautify a JSON object
function beautifyJSON(jsonData) {
    if (isValidJSON(jsonData)) {
        return JSON.stringify(JSON.parse(jsonData), null, 2)
    } else {
        alert('Cats! The JSON is not valid!')
    }
};


// clear setXXXData
function clearData(setXXXData) {
    setXXXData('')
};


export { isValidJSON , minifyJSON , beautifyJSON , clearData };
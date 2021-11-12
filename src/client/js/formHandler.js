const tableResults = document.getElementById('results-div');
window.onload = function () {
    document.getElementById('url').value = "";
    tableResults.classList.add('hide');
}

// selecting loading div
const loader = document.querySelector("#loading");
const loaderText = document.querySelector('.loading-text');
// showing loading
function displayLoading() {
    loader.classList.add("display");
    loaderText.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
        loaderText.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
    loaderText.classList.remove("display");
}

function handleSubmit(event) {
    tableResults.classList.remove('show');
    tableResults.classList.add('hide');

    document.getElementById("agreement").innerHTML = '';
    document.getElementById("subjectivity").innerHTML = '';
    document.getElementById("confidence").innerHTML = '';
    document.getElementById("score").innerHTML = '';
    document.getElementById("irony").innerHTML = '';
    document.getElementById("agreement-status").innerHTML = '';
    document.getElementById("subjectivity-status").innerHTML = '';
    document.getElementById("confidence-status").innerHTML = '';
    document.getElementById("score-status").innerHTML = '';
    document.getElementById("irony-status").innerHTML = '';
    event.preventDefault()

    // check what text was put into the form field
    let urlInput = document.getElementById('url').value;

    if(Client.isValidURL(urlInput)) {
        displayLoading()
    console.log("::: Form Submitted :::")

    postData('http://localhost:8081/api', {url: urlInput})

    .then(function(res) {
        hideLoading()
        tableResults.classList.remove('hide');
        tableResults.classList.add('show');
        document.getElementById("agreement").innerHTML += `${res.agreement}`;
        document.getElementById("subjectivity").innerHTML += `${res.subjectivity}`;
        document.getElementById("confidence").innerHTML += `${res.confidence}`;
        document.getElementById("score").innerHTML += `${res.score_tag}`;
        document.getElementById("irony").innerHTML += `${res.irony}`;
        document.getElementById("agreement-status").innerHTML += '&#9989';
        document.getElementById("subjectivity-status").innerHTML += '&#9989';
        document.getElementById("confidence-status").innerHTML += '&#9989';
        document.getElementById("score-status").innerHTML += '&#9989';
        document.getElementById("irony-status").innerHTML += '&#9989';
    })
    } else {
        alert('That\'s an invalid URL, please enter a valid one...');
    }
}

const postData = async (path = "", data = {}) => {
    console.log('Analyzing:', data);
    const response = await fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

export { handleSubmit }

let data = [];

// Fetch the JSON data once on page load
fetch('js/data.json')
.then(response => response.json())
.then(jsonData => {
    data = jsonData;
})
.catch(error => console.error('Error:', error));

document.getElementById('search').addEventListener('input', function(e) {
    let searchValue = e.target.value;
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    // Create a table
    let table = document.createElement('table');
    table.classList.add('table'); // Add Bootstrap table class
    
    data.forEach(item => {
        if (item.tag.includes(searchValue)) {
            // Create a new row
            let tr = document.createElement('tr');

            // Create a new cell for the image
            let tdImg = document.createElement('td');
            let imgElement = document.createElement('img');
            imgElement.src = item.url;
            imgElement.loading = 'lazy'; // Add lazy loading
            imgElement.width = 40; // Set the size
            imgElement.height = 40; // Set the size
            tdImg.appendChild(imgElement);

            // Create a new cell for the URL
            let tdUrl = document.createElement('td');
            tdUrl.textContent = item.url;

            // Create a new cell for the tags
            let tdTag = document.createElement('td');
            tdTag.textContent = ':' + item.tag.replace(/\|/g,':    :') + ':';

            // Append cells to the row
            tr.appendChild(tdImg);
            tr.appendChild(tdUrl);
            tr.appendChild(tdTag);

            // Append the row to the table
            table.appendChild(tr);
        }
    });
    // Append the table to the result div
    resultDiv.appendChild(table);
});

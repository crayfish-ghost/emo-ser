let data = [];

// Fetch the JSON data once on page load
fetch('js/data.json')
.then(response => response.json())
.then(jsonData => {
    data = jsonData;
})
.catch(error => console.error('Error:', error));

function copyToClipboard(column) {
  // カラムのテキストを取得

    var text = column.textContent || column.innerText;
    column.innerText = "(Copied!)" + column.innerText; // カラムの文字列の後ろに "(Copied!)" を追加

    // 一定時間後に "(Copied!)" を削除
    setTimeout(function() {
        column.innerText = column.innerText.replace("(Copied!)", "");
    }, 1000);

    // テキストをクリップボードにコピーする
    navigator.clipboard.writeText(text)
        .then(function() {
            console.log("テキストがクリップボードにコピーされました: " + text);
            column.style.backgroundColor = "#ee82ee"; // カラムの背景色を変更

            // 背景色をフェードアウトさせるアニメーションを追加
            var opacity = 1;
            var timer = setInterval(function() {
                opacity -= 0.1;
                column.style.backgroundColor = "rgba(238, 130, 238, " + opacity + ")";
                if (opacity <= 0) {
                    clearInterval(timer);
                    column.style.backgroundColor = "";
                }
            }, 50);

        }).catch(function(error) {
            console.error("クリップボードへのコピーに失敗しました: ", error);
        });
}

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
            tdUrl.addEventListener("click", function() {
                copyToClipboard(this);
            });

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

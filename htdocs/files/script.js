// Function to fetch news topics from the server
function fetchNewsTopics() {
    fetch('http://localhost/databases.php') // Assuming your PHP file is accessible via localhost
    .then(response => response.json())
    .then(data => {
        // Process the data and display news topics on the webpage
        const topicsContainer = document.getElementById('news-topics');
        data.forEach(topic => {
            const topicElement = document.createElement('div');
            topicElement.classList.add('topic');
            topicElement.textContent = topic.category;
            topicElement.addEventListener('click', () => fetchNewsHeadlines(topic.category));
            topicsContainer.appendChild(topicElement);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch news headlines based on selected topic
function fetchNewsHeadlines(category) {
    const country = 'NZ'; // Default country code
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f53v91VentGBDsxJPznk9HZxbD7rd9yaSDtCQjy1Y`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Process the data and display news headlines on the webpage
        const headlinesContainer = document.getElementById('news-headlines');
        headlinesContainer.innerHTML = ''; // Clear previous headlines
        if (data.articles.length === 0) {
            const noHeadlinesMessage = document.createElement('p');
            noHeadlinesMessage.textContent = 'No headlines found for this topic.';
            headlinesContainer.appendChild(noHeadlinesMessage);
        } else {
            data.articles.slice(0, 3).forEach(article => {
                const headlineElement = document.createElement('div');
                headlineElement.classList.add('news-item');
                headlineElement.innerHTML = `<p class="news-title">${article.title}</p>
                                             <a class="news-url" href="${article.url}" target="_blank">${article.url}</a>`;
                headlinesContainer.appendChild(headlineElement);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}

// Call the fetchNewsTopics function when the page loads
document.addEventListener('DOMContentLoaded', fetchNewsTopics);

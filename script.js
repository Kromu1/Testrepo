document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://comp125-a4-api.onrender.com/imagelist";
    let images = [];
    let currentIndex = 0;
    let intervalId;

    function fetchImages() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                images = data.ImageList; 
                showImage(currentIndex);
                startRotation();
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    function showImage(index) {
        const currentImage = document.getElementById('current-image');
        currentImage.src = images[index].name; 
    }

    function startRotation() {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, images[currentIndex].time); 
    }

    function adjustRotation() {
        clearInterval(intervalId);
        startRotation();
    }

    function navigateImage(forward) {
        currentIndex = (currentIndex + (forward ? 1 : -1) + images.length) % images.length;
        showImage(currentIndex);
        adjustRotation();
    }

    document.getElementById('prev-btn').addEventListener('click', () => navigateImage(false));
    document.getElementById('next-btn').addEventListener('click', () => navigateImage(true));
    document.getElementById('update-btn').addEventListener('click', () => {
        currentIndex = 0; 
        fetchImages(); 
    });

    fetchImages();
});

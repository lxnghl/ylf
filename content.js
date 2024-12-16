chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
    if (request.action === "filter") {
        console.log(`Filtering videos for language: ${request.language}`);

        function filterVideos(language) {
            // Selectors for different types of video elements
            const videoSelectors = [
                'ytd-video-renderer',
                'ytd-grid-video-renderer',
                'ytd-compact-video-renderer'
            ];

            let videos = [];
            videoSelectors.forEach(selector => {
                videos = videos.concat(Array.from(document.querySelectorAll(selector)));
            });

            console.log("Found videos:", videos.length);
            videos.forEach(video => {
                const videoTitleElement = video.querySelector('#video-title');
                if (videoTitleElement) {
                    const videoTitle = videoTitleElement.innerText;
                    console.log("Video title:", videoTitle);
                    if (videoTitle.includes(language)) { // Simplified example
                        video.style.display = 'block';
                    } else {
                        video.style.display = 'none';
                    }
                } else {
                    console.log("No video title found for this element.");
                }
            });
        }

        filterVideos(request.language);
        sendResponse({ status: "filtered" });
    }
    return true;
});
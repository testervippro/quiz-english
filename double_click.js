document.addEventListener('mouseup', async () => {
    const selectedText = window.getSelection().toString();

    // Remove any existing pop-up
    const existingPopup = document.getElementById('translation-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    if (selectedText) {
        try {
            // Translate to Vietnamese
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectedText)}&langpair=en|vi`
            );
            const data = await response.json();
            const translatedText = data.responseData.translatedText;
            console.log(`${translatedText}`);

            // Get the selection range and position
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Create pop-up element
            const popup = document.createElement('div');
            popup.id = 'translation-popup';
            popup.style.position = 'absolute';
            popup.style.backgroundColor = '#fff';
            popup.style.border = '1px solid #ccc';
            popup.style.padding = '5px 10px';
            popup.style.borderRadius = '4px';
            popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            popup.style.zIndex = '1000';
            popup.style.fontSize = '14px';
            popup.textContent = `${translatedText}`;

            // Position the pop-up near the selected text (below it)
            popup.style.left = `${rect.left + window.scrollX}px`;
            popup.style.top = `${rect.bottom + window.scrollY + 5}px`;

            // Append pop-up to the document
            document.body.appendChild(popup);

            // Remove pop-up after 3 seconds
            setTimeout(() => {
                popup.remove();
            }, 3000);

            // Text-to-Speech in English
            const utterance = new SpeechSynthesisUtterance(selectedText);
            utterance.lang = 'en-US'; // Set language to English
            speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Error:', error.message);
        }
    } else {
        console.log('No text selected.');
    }
});

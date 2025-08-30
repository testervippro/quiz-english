document.addEventListener('mouseup', async () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    try {
      // Translate to Vietnamese
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectedText)}&langpair=en|vi`);
      const data = await response.json();
      const translatedText = data.responseData.translatedText;
      console.log(`${translatedText}`);

      // Text-to-Speech in English
      const utterance = new SpeechSynthesisUtterance(selectedText);
      utterance.lang = 'en-US'; // Set language to English
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    console.log("No text selected.");
  }
});

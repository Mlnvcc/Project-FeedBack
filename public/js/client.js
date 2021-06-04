const addFeedbackButton = document.querySelector('.addfeedback');

addFeedbackButton.addEventListener('click', async () => {
  const response = await fetch('/review')

  response.status === 200 ? window.location('/rewiew') : window.location('/signup')
});

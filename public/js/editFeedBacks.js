const $divallFeedBacks = document.querySelector('.profileContent');
const $editFeedBackForm = document.forms.editFeedBackForm;

if ($divallFeedBacks) {
  $divallFeedBacks.addEventListener('click', async (event) => {
    if (event.target.dataset.delete) {
      const response = await fetch(`/user/profile/feedbacks/${event.target.dataset.delete}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        const $divSelectedFeedback = event.target.closest('.card');
        $divSelectedFeedback.remove();
      }
    } else if (event.target.dataset.edit) {
      window.location = `/user/profile/feedbacks/${event.target.dataset.edit}`;
    }
  });
}

if ($editFeedBackForm) {
  $editFeedBackForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(event.target);
    const dataFromForm = Object.fromEntries(new FormData(event.target));
    
    const response = await fetch(`/user/profile/feedbacks/${event.target.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataFromForm),
    });
     
    if (response.status === 200) {
      window.location = '/user/profile';
    }

  });
}

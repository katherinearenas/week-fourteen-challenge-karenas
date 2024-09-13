const newFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment-content').value.trim();
    const postId = event.target.getAttribute("data-id")
  
    if (comment && event.target.hasAttribute('data-id')) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text: comment, post_id: postId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/posts/${postId}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/p');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.comment-list')
//     .addEventListener('click', delButtonHandler);
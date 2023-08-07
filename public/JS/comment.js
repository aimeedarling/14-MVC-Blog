const post_id = document.querySelector('#hidden-id').value

const newFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#project-desc').value.trim();

    if (comment) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create project');
        }
    }
};

document.querySelector('.new-comment').addEventListener('submit', newFormHandler)
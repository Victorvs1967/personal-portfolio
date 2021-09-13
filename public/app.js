const links = document.querySelectorAll('.link'),
      projectContainer = document.querySelector('.project-container'),
      filters = document.querySelectorAll('.filter-btn'),
      contactBtn = document.querySelector('.contact-btn'),
      firstName = document.querySelector('.first-name'),
      lastName = document.querySelector('.last-name'),
      email = document.querySelector('.email'),
      msg = document.querySelector('.message'),
      toggleBtn = document.querySelector('.toggle-btn'),
      linkContainer = document.querySelector('.links-container');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(ele => ele.classList.remove('active'));
    link.classList.add('active');
  });
});

projects.forEach(project => {
  projectContainer.innerHTML += `
    <div class="project-card" data-tags="#all, ${project.tags}">
      <img src="img/${project.image}" alt="image">
      <div class="content">
        <h1 class="project-name">${project.name}</h1>
        <span class="tags">${project.tags}</span>
      </div>
    </div> 
  `;
});

filters.forEach(filterBtn => {
  filterBtn.addEventListener('click', () => {
    const id = filterBtn.getAttribute('id');
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      if (card.getAttribute('data-tags').includes(id)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
    filters.forEach(btn => btn.classList.remove('active'));
    filterBtn.classList.add('active');
  });

  contactBtn.addEventListener('click', () => {
    if (firstName.value.length && lastName.value.length && email.value.length && msg.value.length) {
      fetch('/mail', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          msg: msg.value,
        })
      })
      .then(res => res.json())
      .then(data => alert(data));
    }
  });
});

// toggle button
toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  linkContainer.classList.toggle('show');
});
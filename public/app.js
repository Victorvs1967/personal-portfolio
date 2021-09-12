const links = document.querySelectorAll('.link'),
      projectContainer = document.querySelector('.project-container'),
      filters = document.querySelectorAll('.filter-btn');

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
});
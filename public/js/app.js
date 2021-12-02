const toggleBtn = document.querySelector('.toggle-btn'),
      linksContainer = document.querySelector('.links-container'),
      links = document.querySelectorAll('.link'),
      filters = document.querySelectorAll('.filter-btn'),
      skillContainer = document.querySelector('.skill-container'),
      projectContainer = document.querySelector('.project-container'),
      firstName = document.querySelector('.first-name'),
      lastName = document.querySelector('.last-name'),
      email = document.querySelector('.email'),
      msg = document.querySelector('.message'),
      contactBtn = document.querySelector('.contact-btn');

const init = () => {

  // links decorating
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(ele => ele.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // skills cards
  skills.forEach(skill => {
    skillContainer.innerHTML += `
      <div class="skill-card" style="--bg: ${skill.color}">
        <p class="skill">${skill.name}</p>
      </div>
    `;
  });

  // project cards
  projects.forEach(project => {
    projectContainer.innerHTML += `
      <div class="project-card" data-tags="#all, ${project.tags}">
        <img src="img/${project.image}" alt="image">
        <div class="content">
        <a href="${project.url}" class="project-link">
            <h1 class="project-name">${project.name}</h1>
        </a>
          <span class="tags">${project.tags}</span>
        </div>
      </div> 
    `;
  });

  // filter button
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

  // contact button
  contactBtn.addEventListener('click', () => {
    if (firstName.value.length && lastName.value.length && email.value.length && msg.value.length) {
      fetch('/mail', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          msg: msg.value,
        })
      })
      .then(res => res.json())
      .then(data => {
        alert(data);
        location.reload();
      });

    }
  });

  // toggle button
  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    linksContainer.classList.toggle('show');
  });

};

init();
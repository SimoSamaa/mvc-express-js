const navigatione = document.querySelector('header');
const openNav = navigatione.querySelector('svg');
const closeNav = navigatione.querySelector('.close svg');
const nav = navigatione.querySelector('ul');
const backdrop = navigatione.querySelector('.backdrop');

openNav.addEventListener('click', () => {
  nav.classList.add('nav-act');
  backdrop.classList.add('act-backdrop');
});

const closeNavigations = () => {
  nav.classList.remove('nav-act');
  backdrop.classList.remove('act-backdrop');
};

closeNav.onclick = closeNavigations;
backdrop.onclick = closeNavigations;



cd //MAKE EACH SECTION THE SIZE OF THE VIEWPORT MINUS THE NAVBAR
function setSectionHeight(){
  const navbar = document.querySelectorAll('.navbar-inverse')[0];
  let navbarHeight = navbar.offsetHeight;
  let windowHeight = window.innerHeight;
  let sectionHeight = windowHeight - navbarHeight + 'px';
  let intro = document.getElementById('#intro')
  console.log(sectionHeight)
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => section.style.height = sectionHeight);
}

setSectionHeight();

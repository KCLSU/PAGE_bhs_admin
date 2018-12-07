

  var tabSections = document.querySelectorAll('.tab-section')
  var tabButtons = document.querySelectorAll('.tab-button')

  //document.getElementById("default-tab").click();

  function openTab(event, id){

    let targetSection = document.getElementById(id);

    tabButtons.forEach(button => {
    button.classList.remove('active');
    })

    tabSections.forEach(section => {
    section.style.display = 'none';
    })

    targetSection.style.display = 'block';

    event.target.classList.add('active');
  }

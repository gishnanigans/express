

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    var toggle = document.querySelector('#menu-toggle');
    if (toggle.checked === true) {
      toggle.checked = false;
    }
  }
});


window.addEventListener('load', event => {
  href = window.location.href;
  base = document.querySelector('base').href;
  path = href.substring(base.length);
  links = document.querySelectorAll('a');
  for (var link, i = 0; i < links.length; i ++) {
    link = links.item(i);
    if (link.href == href || link.href == path) {
      link.classList ? link.classList.add('active') : link.className += ' active';
    }
  }
});


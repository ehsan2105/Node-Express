const mobileMenuBtnElement = document.getElementById('mobil-menu-btn')

const mobileMenuElement = document.getElementById('mobil-menu')

function mobileMenu(){ 
    mobileMenuElement.classList.toggle('open')
}


mobileMenuBtnElement.addEventListener('click',mobileMenu)
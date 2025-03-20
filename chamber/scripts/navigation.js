const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const mainContent = document.querySelector('main'); 

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');

    if (mainContent) { 
        const navHeight = navigation.offsetHeight;
        mainContent.style.marginTop = navigation.classList.contains('open') ? `${navHeight}px` : '0';
    }
});



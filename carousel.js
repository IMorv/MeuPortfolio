// Obtém os elementos do carrossel
var carouselContainer = document.querySelector('.carousel-container');
var carousel = document.querySelector('.carousel');
var siteBlocks = document.querySelectorAll('.site-block');
var carouselWidth = carouselContainer.offsetWidth; // Obtém a largura do carrossel

// Configura o índice inicial do carrossel
var currentIndex = 0;

// Função para ajustar o width e height dos blocos de site
function adjustSiteBlockDimensions() {
  var siteBlockHeight = carouselContainer.offsetHeight; // Obtém a altura do carrossel

  // Itera sobre os blocos de site e ajusta as dimensões
  siteBlocks.forEach(function(siteBlock) {
    siteBlock.style.width = carouselWidth + 'px';
    siteBlock.style.height = siteBlockHeight + 'px';

    // Cria os botões de navegação para cada bloco de site
    var previousButton = document.createElement('button');
    previousButton.className = 'previous-button';
    previousButton.textContent = '<';
    siteBlock.appendChild(previousButton);

    var nextButton = document.createElement('button');
    nextButton.className = 'next-button';
    nextButton.textContent = '>';
    siteBlock.appendChild(nextButton);

    // Adiciona os eventos de clique para os botões de navegação
    nextButton.addEventListener('click', goToNextSlide);
    previousButton.addEventListener('click', goToPreviousSlide);
  });
}

// Função para centralizar os slides no carrossel
function centerSlides() {
  var siteBlockWidth = siteBlocks[currentIndex].offsetWidth; // Obtém a largura de um bloco de site
  var emptySpace = carouselWidth - siteBlockWidth;
  var margin = emptySpace / 2;
  carousel.style.marginLeft = margin + 'px';
  carousel.style.marginRight = margin + 'px';
}

// Função para navegar para o próximo slide
function goToNextSlide() {
  if (currentIndex < siteBlocks.length - 1) {
    currentIndex++;
    updateCarouselPosition();
  }
  checkNavigationButtons(); // Verifica a disponibilidade dos botões de navegação
}

// Função para navegar para o slide anterior
function goToPreviousSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselPosition();
  }
  checkNavigationButtons(); // Verifica a disponibilidade dos botões de navegação
}

// Função para atualizar a posição do carrossel
function updateCarouselPosition() {
  var newPosition = -currentIndex * carouselWidth;
  carousel.style.transform = 'translateX(' + newPosition + 'px)';
}

// Ajusta as dimensões dos blocos de site inicialmente e redimensiona quando a janela for redimensionada
adjustSiteBlockDimensions();
centerSlides();
window.addEventListener('resize', function() {
  carouselWidth = carouselContainer.offsetWidth;
  adjustSiteBlockDimensions();
  centerSlides();
});

// Verifica a disponibilidade dos botões de navegação
function checkNavigationButtons() {
  var previousButtons = document.querySelectorAll('.previous-button');
  var nextButtons = document.querySelectorAll('.next-button');

  previousButtons.forEach(function(button) {
    button.style.display = currentIndex === 0 ? 'none' : 'block';
  });

  nextButtons.forEach(function(button) {
    button.style.display = currentIndex === siteBlocks.length - 1 ? 'none' : 'block';
  });
}

// Atualiza a disponibilidade dos botões de navegação
checkNavigationButtons();

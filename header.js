function typeWriterAnimation() {
    var headerTitle = document.getElementById("header-title");
    var progressBar = document.getElementById("progress-bar");
    var text = headerTitle.textContent.trim();
    var currentCharacterIndex = 0;
    var letterSpacing = 0;
  
    // Limpa o conteúdo do elemento "header-title"
    headerTitle.textContent = '';
  
    // Função para gerar uma letra aleatória respeitando maiúsculas e minúsculas
    function getRandomLetter() {
      var currentCharacter = text.charAt(currentCharacterIndex);
      var randomCharCode;
      var randomLetter;
  
      if (currentCharacter === currentCharacter.toLowerCase()) {
        // Gera letra minúscula aleatória
        randomCharCode = Math.floor(Math.random() * 26) + 97;
      } else {
        // Gera letra maiúscula aleatória
        randomCharCode = Math.floor(Math.random() * 26) + 65;
      }
  
      randomLetter = String.fromCharCode(randomCharCode);
      return randomLetter;
    }
  
    // Função para adicionar cada caractere um por um com um pequeno atraso
    function typeCharacter() {
      if (currentCharacterIndex < text.length) {
        var currentCharacter = text.charAt(currentCharacterIndex);
  
        // Adiciona uma letra aleatória antes do caractere correto
        var randomLetter = getRandomLetter();
        headerTitle.textContent += randomLetter;
  
        // Atualiza o width da barra de progresso
        var progressWidth = (currentCharacterIndex / text.length) * 100 + '%';
        progressBar.style.width = progressWidth;
  
        // Aumenta o espaçamento entre caracteres para o efeito pixelado
        letterSpacing += 2;
        progressBar.style.letterSpacing = letterSpacing + 'px';
  
        setTimeout(function() {
          headerTitle.textContent = headerTitle.textContent.slice(0, -1); // Remove a letra aleatória
          headerTitle.textContent += currentCharacter; // Adiciona o caractere correto
          currentCharacterIndex++;
          setTimeout(typeCharacter, 60); // Atraso entre cada caractere (ajuste conforme necessário)
        }, 50); // Atraso para a letra aleatória aparecer antes do caractere correto
      }
    }
  
    // Atualiza o width da barra de progresso para 0 antes de iniciar a animação
    progressBar.style.width = '0';
  
    // Inicia a animação de digitação
    typeCharacter();
  }
  
  // Chama a função para animar o título do cabeçalho
  typeWriterAnimation();
  
  // Ouve o evento personalizado 'languageChange'
document.addEventListener('languageChange', function() {
  // Coloque aqui as ações que você deseja executar quando o evento for disparado
  // Por exemplo, ocultar os elementos ou substituir o texto traduzido em inglês
  var headerTitle = document.getElementById("header-title");
  var progressBar = document.getElementById("progress-bar");
  if (!localStorage.getItem("animationCompleted")) {
    // Se a animação ainda não foi concluída, interrompa o processo
    headerTitle.textContent = '';
    progressBar.style.width = '0';
  } else {
    headerTitle.textContent = 'Text in English'; // Substitua pelo texto traduzido em inglês
    progressBar.style.width = '100%'; // Atualize o width da barra de progresso para 100%
  }
});

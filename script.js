function typeWriterAnimation() {
  var typingText = document.getElementById("typing-text");
  var accelerationButton = document.getElementById("acceleration-button");
  var text = typingText.textContent.trim();
  var currentCharacterIndex = 0;
  var blinkingRectangle = false;

  // Limpa o conteúdo do elemento "typing-text"
  typingText.textContent = '';

  // Função para adicionar cada caractere um por um com um pequeno atraso
  function typeCharacter() {
    if (currentCharacterIndex < text.length) {
      var currentCharacter = text.charAt(currentCharacterIndex);
      typingText.textContent += currentCharacter;
      currentCharacterIndex++;

      if (currentCharacter === '.') {
        setTimeout(typeCharacter, 500); // Atraso maior para pausa nos pontos finais
      } else {
        setTimeout(typeCharacter, 30); // Atraso entre cada caractere (ajuste conforme necessário)
      }
    } else {
      setTimeout(startBlinkingRectangle, 500); // Aguarda meio segundo antes de adicionar o retângulo
      document.removeEventListener('beforeunload', clearAnimationCompletion); // Remove o ouvinte de evento antes de marcar a animação como concluída
      localStorage.setItem("animationCompleted", true); // Marca a animação como concluída
      accelerationButton.style.display = "none"; // Oculta o botão de aceleração
    }
  }

  // Função para iniciar o efeito de piscar do retângulo
  function startBlinkingRectangle() {
    blinkingRectangle = true;
    typingText.innerHTML += '<span class="blinking-rectangle"></span>';
  }

  // Função para acelerar a animação
  function accelerateAnimation() {
    typingText.textContent = text; // Pula para o final do texto
    currentCharacterIndex = text.length;
    accelerationButton.disabled = true;
  }

  // Função para limpar a marcação da conclusão da animação
  function clearAnimationCompletion() {
    localStorage.removeItem("animationCompleted");
  }

  // Adiciona o ouvinte de evento ao botão de aceleração
  accelerationButton.addEventListener("click", accelerateAnimation);

  // Adiciona o ouvinte de evento antes de sair da página
  document.addEventListener('beforeunload', clearAnimationCompletion);

  // Inicia a animação de digitação
  typeCharacter();
}

// Chama a função para animar o parágrafo
typeWriterAnimation();

// Ouve o evento personalizado 'languageChange'
document.addEventListener('languageChange', function() {
  // Coloque aqui as ações que você deseja executar quando o evento for disparado
  // Por exemplo, ocultar os elementos ou substituir o texto traduzido em inglês
  var typingText = document.getElementById("typing-text");
  var accelerationButton = document.getElementById("acceleration-button");
  if (!localStorage.getItem("animationCompleted")) {
    // Se a animação ainda não foi concluída, interrompa o processo
    typingText.textContent = '';
    accelerationButton.style.display = "none";
  } else {
    typingText.textContent = 'Text in English'; // Substitua pelo texto traduzido em inglês
    accelerationButton.style.display = "none"; // Ocultar o botão de aceleração
  }
});

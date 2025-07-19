document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');

    // Verifica se os elementos existem antes de adicionar o event listener
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show'); // Adiciona ou remove a classe 'show'
        });

        // Opcional: Fecha o menu se clicar fora dele
        document.addEventListener('click', function(event) {
            // Se o clique não foi no botão de menu E não foi dentro do próprio menu
            if (!menuButton.contains(event.target) && !navMenu.contains(event.target)) {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });

        // Opcional: Fecha o menu quando um link é clicado (útil em single-page applications)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
            });
        });
    } else {
        console.error("Erro: Elementos 'menuButton' ou 'navMenu' não encontrados no DOM.");
    }

     // === CÓDIGO DO CARROSSEL ===
     const carouselSlideWrapper = document.getElementById('carouselSlideWrapper');
     const carouselItems = document.querySelectorAll('.carousel-item');
     const carouselPrevBtn = document.getElementById('carouselPrev');
     const carouselNextBtn = document.getElementById('carouselNext');
     const carouselDotsContainer = document.querySelector('.carousel-dots');
 
     if (carouselSlideWrapper && carouselItems.length > 0 && carouselPrevBtn && carouselNextBtn && carouselDotsContainer) {
         let currentIndex = 0;
         const totalItems = carouselItems.length;
         carouselSlideWrapper.style.width = `${totalItems * 100}%`;
         // Gerar os dots
         function createDots() {
             carouselDotsContainer.innerHTML = ''; // Limpa antes de gerar
             for (let i = 0; i < totalItems; i++) {
                 const dot = document.createElement('span');
                 dot.classList.add('dot');
                 if (i === currentIndex) {
                     dot.classList.add('active');
                 }
                 dot.dataset.index = i; // Armazena o índice para clicar
                 carouselDotsContainer.appendChild(dot);
             }
         }
 
         // Atualizar a posição do carrossel
         function updateCarousel() {
            const offset = -currentIndex * (100 / totalItems); // Move 100% para cada slide
             carouselSlideWrapper.style.transform = `translateX(${offset}%)`;
 
             // Atualizar os dots
             document.querySelectorAll('.dot').forEach((dot, index) => {
                 dot.classList.remove('active');
                 if (index === currentIndex) {
                     dot.classList.add('active');
                 }
             });
         }
 
         // Navegação para o próximo slide
         carouselNextBtn.addEventListener('click', () => {
             currentIndex = (currentIndex + 1) % totalItems; // Volta ao início se chegar ao fim
             updateCarousel();
         });
 
         // Navegação para o slide anterior
         carouselPrevBtn.addEventListener('click', () => {
             currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Garante índice positivo
             updateCarousel();
         });
 
         // Navegação pelos dots
         carouselDotsContainer.addEventListener('click', (event) => {
             if (event.target.classList.contains('dot')) {
                 const clickedIndex = parseInt(event.target.dataset.index);
                 if (!isNaN(clickedIndex)) {
                     currentIndex = clickedIndex;
                     updateCarousel();
                 }
             }
         });
 
         createDots();
         updateCarousel(); 
        
          let autoPlayInterval;
          function startAutoPlay() {
             autoPlayInterval = setInterval(() => {
                  currentIndex = (currentIndex + 1) % totalItems;
                  updateCarousel();
             }, 7000); // Muda a cada 5 segundos
          }
          startAutoPlay(); // Inicia o auto-play ao carregar
         
          carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
          carouselContainer.addEventListener('mouseleave', () => startAutoPlay());
 
     } else {
         console.error("Erro: Elementos do carrossel não encontrados ou slides ausentes.");
     }

});
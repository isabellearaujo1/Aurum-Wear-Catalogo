        document.addEventListener('DOMContentLoaded', function() {
            // Função para controlar os carrosséis
            const carousels = document.querySelectorAll('.carousel');
            
            carousels.forEach(carousel => {
                const inner = carousel.querySelector('.carousel-inner');
                const prevBtn = carousel.querySelector('.prev');
                const nextBtn = carousel.querySelector('.next');
                const items = carousel.querySelectorAll('.carousel-item');
                
                let position = 0;
                const totalItems = items.length;
                
                // Função para atualizar a posição do carrossel
                function updatePosition() {
                    inner.style.transform = `translateX(${-position * 100}%)`;
                }
                
                // Evento para o botão anterior
                prevBtn.addEventListener('click', function() {
                    position = (position - 1 + totalItems) % totalItems;
                    updatePosition();
                });
                
                // Evento para o botão seguinte
                nextBtn.addEventListener('click', function() {
                    position = (position + 1) % totalItems;
                    updatePosition();
                });
                
                // Adicionar eventos de toque para dispositivos móveis
                let touchStartX = 0;
                let touchEndX = 0;
                
                carousel.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                }, false);
                
                carousel.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                }, false);
                
                function handleSwipe() {
                    if (touchEndX < touchStartX - 50) {
                        // Swipe para a esquerda - próximo slide
                        position = (position + 1) % totalItems;
                        updatePosition();
                    } else if (touchEndX > touchStartX + 50) {
                        // Swipe para a direita - slide anterior
                        position = (position - 1 + totalItems) % totalItems;
                        updatePosition();
                    }
                }
            });
            
            // Menu mobile toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav ul');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    mainNav.classList.toggle('active');
                    menuToggle.classList.toggle('active');
                });
            }
            
            // Fechar menu ao clicar em um link (navegação mobile)
            const navLinks = document.querySelectorAll('.main-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (menuToggle && menuToggle.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                });
            });
        });

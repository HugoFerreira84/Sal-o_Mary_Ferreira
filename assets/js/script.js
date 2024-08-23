document.addEventListener('DOMContentLoaded', function () {
    // Função de Rolagem Suave
    function smoothScroll(targetElement) {
        const headerHeight = document.querySelector('nav').offsetHeight;  // Altura do header
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'  // Usando a rolagem suave nativa
        });
    }

    // Aplicando a Rolagem Suave aos Links de Navegação
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                smoothScroll(targetSection);
            }
        });
    });
});    

// Header Transparente
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('nav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            //header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
           // header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.horizontal-gallery');
    
    let isScrolling;
    
    gallery.addEventListener('wheel', function (e) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY; // Permite rolagem horizontal ao usar o scroll do mouse
    });
});

//Modal Galeria
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os itens da galeria
    const galleryItems = document.querySelectorAll('.gallery-item'); // Usando a classe correta
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');

    // Verifica se o modal e o botão de fechar estão presentes
    if (modal && closeModal && modalImage) {
        // Para cada item de galeria, adiciona um evento de clique
        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const imgSrc = this.getAttribute('data-image');
                modal.style.display = 'block';
                modalImage.src = imgSrc; // Define a imagem no modal
            });
        });

        // Fecha o modal ao clicar no X
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Fecha o modal ao clicar fora da imagem
        window.addEventListener('click', function (e) {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});

//gallery
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todas as imagens da galeria
    const galleryItems = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-image');
            modal.style.display = 'flex';  // Exibe o modal
            modalImage.src = imgSrc;       // Define a imagem no modal
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';  // Fecha o modal
    });

    window.addEventListener('click', function (e) {
        if (e.target == modal) {
            modal.style.display = 'none';  // Fecha o modal ao clicar fora da imagem
        }
    });
});

//Contact
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o comportamento padrão de envio do formulário

        // Obtendo os dados do formulário
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
        };

        // Mostra um SweetAlert de carregamento enquanto a mensagem é enviada
        Swal.fire({
            title: 'Enviando...',
            text: 'Sua mensagem está sendo enviada, por favor aguarde.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Enviando o formulário via EmailJS
        emailjs.send('service_8dtlbdl', 'template_glpaaor', formData)
            .then(function(response) {
                // Quando o envio for bem-sucedido, mostre o alerta de sucesso
                Swal.fire({
                    title: 'Mensagem Enviada!',
                    text: 'Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                form.reset(); // Reseta o formulário após o envio
            }, function(error) {
                // Quando ocorrer um erro no envio, mostre o alerta de erro
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    });
});


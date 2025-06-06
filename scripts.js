document.addEventListener('DOMContentLoaded', () => {
  // Плавная прокрутка при клике на ссылки
  const OFFSET = 20;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Анимация появления блоков авторов
  const authors = document.querySelectorAll('.author-block');
  const authorsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });
  authors.forEach(block => authorsObserver.observe(block));

  // Typed.js анимация
  let typedStarted = false;
  const typedObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typedStarted) {
        typedStarted = true;
        new Typed("#typed-left", {
          strings: [
            "Это независимый бренд одежды, специализирующийся на кастомизации, ручной росписи и авторском пошиве.",
            "Это не просто одежда — это вызов.<br>Каждая вещь несёт в себе характер, эмоцию и отпечаток личности."
          ],
          typeSpeed: 20,
          backSpeed: 10,
          backDelay: 4000,
          startDelay: 300,
          loop: true
        });

        new Typed("#typed-right", {
          strings: [
            "Мы не под тренды.<br>Мы — под рок.",
            "Скажи, <br>кто ты есть,<br> не произнеся <br>ни слова.",
            "Искусство <br>- в деталях.<br>И в твоей одежде.",
            "Гардероб <br>как акт <br>протеста.",
            "Это не просто одежда, <br>― это вызов."
          ],
          typeSpeed: 50,
          backSpeed: 10,
          backDelay: 3000,
          startDelay: 0,
          loop: true
        });
      }
    });
  }, { threshold: 0.6 });
  const aboutSection = document.querySelector('#about');
  if (aboutSection) typedObserver.observe(aboutSection);

  // Анимация смены фраз
  const phraseContainer = document.getElementById('phrase-container');
  const phrases = [
    "Воплощает стиль и элегантность",
    "Мы не под тренды.<br>Мы — под рок.",
    "Скажи, <br>кто ты есть,<br> не произнеся <br>ни слова.",
    "Искусство — в деталях.<br>И в твоей одежде.",
    "Гардероб <br>как акт <br>протеста.",
    "Это не просто одежда, <br>― это вызов."
  ];
  let currentPhrase = 0;
  const showNextPhrase = () => {
    phraseContainer.classList.remove('visible');
    setTimeout(() => {
      phraseContainer.innerHTML = phrases[currentPhrase];
      phraseContainer.classList.add('visible');
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }, 700);
  };
  let phrasesStarted = false;
  const phrasesObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !phrasesStarted) {
        phrasesStarted = true;
        showNextPhrase();
        setInterval(showNextPhrase, 5000);
      }
    });
  }, { threshold: 0.6 });
  if (aboutSection) phrasesObserver.observe(aboutSection);

  // Анимация смены изображений в карточках услуг
  const services = [
    {
      selector: '.usluga-card:nth-child(1) img',
      images: ['images/usluga1_1.jpg', 'images/usluga1_2.jpg', 'images/usluga1_3.jpg'],
      delay: 0
    },
    {
      selector: '.usluga-card:nth-child(2) img',
      images: ['images/usluga2_1.jpg', 'images/usluga2_2.jpg', 'images/usluga2_3.jpg'],
      delay: 1000
    },
    {
      selector: '.usluga-card:nth-child(3) img',
      images: ['images/usluga3_1.jpg', 'images/usluga3_2.jpg', 'images/usluga3_3.jpg'],
      delay: 2000
    }
  ];
  services.forEach(service => {
    const img = document.querySelector(service.selector);
    if (!img) return;

    let index = 0;
    img.style.opacity = '0';
    setTimeout(() => {
      img.style.transition = 'opacity 0.3s ease-out';
      img.style.opacity = '1';

      const switchImage = () => {
        img.style.transition = 'opacity 0.3s ease-out';
        img.style.opacity = '0';
        setTimeout(() => {
          index = (index + 1) % service.images.length;
          img.src = service.images[index];
          img.style.transition = 'opacity 1s ease-in';
          img.style.opacity = '1';
        }, 300);
      };

      setInterval(switchImage, 6000);
    }, service.delay);
  });

  // Анимация "взрывных" эскизов в разделе контактов
  const contactSection = document.querySelector('section#contact');
  const burstContainer = document.createElement('div');
  burstContainer.className = 'burst-container';
  contactSection.style.position = 'relative';
  contactSection.appendChild(burstContainer);

  const allImages = [];
  const outerPaths = Array.from({ length: 15 }, (_, i) => `images/eskizi/vnesh/${i + 1}.png`);
  outerPaths.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'burst-sketch';
    const angle = (2 * Math.PI / 15) * i;
    const radius = 700 + Math.random() * 50;
    const isMobile = window.innerWidth <= 768;
    const x = Math.cos(angle) * radius * (isMobile ? 1 : 1);
    const y = Math.sin(angle) * radius * (isMobile ? 1.5 : 0.7);
    const rotate = Math.floor(Math.random() * 91) - 45;
    const size = 600 + Math.floor(Math.random() * 101);
    img.style.width = `${size}px`;
    img.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    img.dataset.defaultTransform = img.style.transform;
    img.style.opacity = '0';
    burstContainer.appendChild(img);
    allImages.push({ img, angle });
  });
  const innerPaths = Array.from({ length: 10 }, (_, i) => `images/eskizi/vnutr/${i + 1}.png`);
  innerPaths.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'burst-sketch';
    const angle = (2 * Math.PI / 10) * i;
    const radius = 350 + Math.random() * 100;
    const isMobile = window.innerWidth <= 768;
    const x = Math.cos(angle) * radius * (isMobile ? 1 : 1);
    const y = Math.sin(angle) * radius * (isMobile ? 1.5 : 0.7);
    const rotate = Math.floor(Math.random() * 91) - 45;
    const size = 250 + Math.floor(Math.random() * 151);
    img.style.width = `${size}px`;
    img.style.transform = `translate(-50%, -20%) translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    img.dataset.defaultTransform = img.style.transform;
    img.style.opacity = '0';
    burstContainer.appendChild(img);
    allImages.push({ img, angle });
  });
  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      allImages.forEach(({ img, angle }) => {
        if (entry.isIntersecting) {
          img.style.opacity = '1';
          img.style.transform = img.dataset.defaultTransform;
        } else {
          const outX = Math.cos(angle) * 1500;
          const outY = Math.sin(angle) * 1500;
          img.style.opacity = '0';
          img.style.transform = `translate(-50%, -50%) translate(${outX}px, ${outY}px)`;
        }
      });
    });
  }, { threshold: 0.6 });
  scrollObserver.observe(contactSection);

  // Открытие и закрытие модального окна с Google Формой
  document.querySelectorAll('.usluga-card button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const button = e.currentTarget;
    button.classList.add('clicked');
    button.classList.add('force-hover');

    setTimeout(() => {
      document.getElementById('order-modal').style.display = 'flex';
      button.classList.remove('clicked');
      button.classList.remove('force-hover');
    }, 300);
  });
});
  });
  document.getElementById('order-modal').addEventListener('click', e => {
    if (e.target.id === 'order-modal') {
      document.getElementById('order-modal').style.display = 'none';
    }
  });
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const modal = document.getElementById('order-modal');
      if (modal && modal.style.display === "flex") {
        modal.style.display = "none";
      }
    });
  });
});

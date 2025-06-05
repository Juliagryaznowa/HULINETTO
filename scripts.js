
document.addEventListener('DOMContentLoaded', () => {
  const OFFSET = 20; // на сколько пикселей выше прокрутить

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
});




document.addEventListener('DOMContentLoaded', () => {
  const authors = document.querySelectorAll('.author-block');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  authors.forEach(block => observer.observe(block));
});




document.addEventListener('DOMContentLoaded', () => {
  let typedStarted = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typedStarted) {
        typedStarted = true;

        new Typed("#typed-left", {
          strings: ["Это независимый бренд одежды, специализирующийся на кастомизации, \
            ручной росписи и авторском пошиве.", 
            "Это не просто одежда — это вызов.\
            <br>Каждая вещь несёт в себе характер, эмоцию и отпечаток личности."],

          typeSpeed: 20,
          backSpeed: 10,
          backDelay: 4000,
          startDelay: 300,
          loop: true
        });


        new Typed("#typed-right", {
          strings: ["Мы не под тренды.<br>Мы — под рок.", 
            "Скажи, <br>кто ты есть,<br> не произнеся <br>ни слова.",
            "Искусство <br>- в деталях.<br>И в твоей одежде.",
            "Гардероб <br>как акт <br>протеста.", 
            "Это не просто одежда, <br>― это вызов."],
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
  if (aboutSection) observer.observe(aboutSection);
});








document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('phrase-container');

  const phrases = [
    "Воплощает стиль и элегантность",
    "Мы не под тренды.<br>Мы — под рок.",
    "Скажи, <br>кто ты есть,<br> не произнеся <br>ни слова.",
    "Искусство — в деталях.<br>И в твоей одежде.",
    "Гардероб <br>как акт <br>протеста.",
    "Это не просто одежда, <br>― это вызов."
  ];

  let current = 0;

  const showNext = () => {
    container.classList.remove('visible');
    setTimeout(() => {
      container.innerHTML = phrases[current];
      container.classList.add('visible');
      current = (current + 1) % phrases.length;
    }, 700); 
  };

  let started = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        showNext();
        setInterval(showNext, 5000); 
      }
    });
  }, { threshold: 0.6 });

  observer.observe(document.querySelector('#about'));
});












const services = [
  {
    selector: '.usluga-card:nth-child(1) img',
    images: ['images/usluga1_1.JPG', 'images/usluga1_2.JPG', 'images/usluga1_3.JPG'],
    delay: 0
  },
  {
    selector: '.usluga-card:nth-child(2) img',
    images: ['images/usluga2_1.JPG', 'images/usluga2_2.JPG', 'images/usluga2_3.JPG'],
    delay: 1000
  },
  {
    selector: '.usluga-card:nth-child(3) img',
    images: ['images/usluga3_1.JPG', 'images/usluga3_2.JPG', 'images/usluga3_3.JPG'],
    delay: 2000
  }
];

services.forEach(service => {
  const img = document.querySelector(service.selector);
  if (!img) return;

  let index = 0;

  // Сначала убираем transition, чтобы первое изображение не мигало
  img.style.opacity = '0';

  // Ждём загрузку изображения и затем включаем анимацию
  setTimeout(() => {
    img.style.transition = 'opacity 0.3s ease-out'; // исчезновение
    img.style.opacity = '1'; // плавное первое появление

    const switchImage = () => {
      img.style.transition = 'opacity 0.3s ease-out'; // быстрое исчезновение
      img.style.opacity = '0';

      setTimeout(() => {
        index = (index + 1) % service.images.length;
        img.src = service.images[index];
        img.style.transition = 'opacity 1s ease-in'; // плавное появление
        img.style.opacity = '1';
      }, 300); // исчезновение 0.3 сек
    };

    // Первая смена через 6 сек, далее по кругу
    setInterval(switchImage, 6000);
  }, service.delay);
});





document.addEventListener('DOMContentLoaded', () => {
  const contactSection = document.querySelector('section#contact');
  const container = document.createElement('div');
  container.className = 'burst-container';
  contactSection.style.position = 'relative';
  contactSection.appendChild(container);

  const allImages = [];

  //  ВНЕШНИЙ РАДИУС
  const outerSketches = 15;
  const outerPaths = Array.from({ length: outerSketches }, (_, i) => `images/eskizi/vnesh/${i + 1}.png`);

  outerPaths.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'burst-sketch';

    const angle = (2 * Math.PI / outerSketches) * i;
    const radius = 700 + Math.random() * 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.7;
    const rotate = Math.floor(Math.random() * 91) - 45;
    const size = 600 + Math.floor(Math.random() * 101);

    img.style.width = `${size}px`;
    img.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    img.dataset.defaultTransform = img.style.transform;
    img.style.opacity = '0';

    container.appendChild(img);
    allImages.push({ img, angle, radius });
  });


  // ВНУТРЕННИЙ РАДИУС
  const innerSketches = 10;
  const innerPaths = Array.from({ length: innerSketches }, (_, i) => `images/eskizi/vnutr/${i + 1}.png`);

  innerPaths.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'burst-sketch';

    const angle = (2 * Math.PI / innerSketches) * i;
    const radius = 350 + Math.random() * 100;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.7; 

    const rotate = Math.floor(Math.random() * 91) - 45;
    const size = 250 + Math.floor(Math.random() * 151);

    img.style.width = `${size}px`;
    img.style.transform = `translate(-50%, -20%) translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    img.dataset.defaultTransform = img.style.transform;
    img.style.opacity = '0';

    container.appendChild(img);
    allImages.push({ img, angle, radius });
  });



  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allImages.forEach(({ img }) => {
          img.style.opacity = '1';
          img.style.transform = img.dataset.defaultTransform;
        });
      } else {
        allImages.forEach(({ img, angle }) => {
          const outX = Math.cos(angle) * 1500;
          const outY = Math.sin(angle) * 1500;
          img.style.opacity = '0';
          img.style.transform = `translate(-50%, -50%) translate(${outX}px, ${outY}px)`;
        });
      }
    });
  }, { threshold: 0.6 });

  scrollObserver.observe(contactSection);
});


// Открытие модального окна при клике на кнопку "Сделать заказ"
document.querySelectorAll('.usluga-card button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'flex';
  });
});

// Отправка формы через Formspree
document.getElementById('order-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch('https://formspree.io/f/mjkrklvw', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        this.classList.add('hidden'); // скрываем форму
        document.getElementById('success-message').classList.remove('hidden');
        this.reset();
      } else {
        alert("Ошибка при отправке формы.");
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert("Ошибка при отправке формы.");
    });
});

// Закрытие модального окна при клике вне формы
document.getElementById('order-modal').addEventListener('click', e => {
  if (e.target.id === 'order-modal') {
    document.getElementById('order-modal').style.display = 'none';
    document.getElementById('order-form').classList.remove('hidden');
    document.getElementById('success-message').classList.add('hidden');
  }
});

// Закрытие модального окна при переходе по навигации
const orderModal = document.getElementById('order-modal');
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (orderModal && orderModal.style.display === "flex") {
      orderModal.style.display = "none";
    }
  });
});

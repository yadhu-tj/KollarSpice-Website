// image notch
initLoaderUI();

// Show loader as early as possible
showLoader();

// Hide loader when EVERYTHING (including images) is loaded
$(window).on("load", function () {
  hideLoader();
});

function changeImage() {
  clipperElement.classList.add('fade');
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    clipperElement.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    clipperElement.classList.remove('fade');
    console.log('Image changed to:', images[currentImageIndex]);
  }, fadeDuration);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Slideshow script loaded');

  // Slideshow functionality
  const images = [
    'asset/image/photo1.jpg',
    'asset/image/photo10.jpg',
    'asset/image/photo44.jpg',
    'asset/image/photo4.png'
  ];
  let currentImageIndex = 0;
  const clipperElement = document.querySelector('.image-clipper');
  const slideInterval = 5000; // 5 seconds
  const fadeDuration = 1000; // 1 second fade

  if (!clipperElement) {
    console.error('Image clipper element not found');
    return;
  }

  function changeImage() {
    clipperElement.classList.add('fade');
    setTimeout(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      clipperElement.style.backgroundImage = `url('${images[currentImageIndex]}')`;
      clipperElement.classList.remove('fade');
      console.log('Image changed to:', images[currentImageIndex]);
    }, fadeDuration);
  }

  // Start slideshow
  changeImage();
  setInterval(changeImage, slideInterval);

  /* JavaScript for functionality */

  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const closeBtn = document.querySelector('.close-btn');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', menu.classList.contains('active'));
  });

  closeBtn.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !menu.contains(event.target)) {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// image notch end
// #################
// #########################
// ##########################

// SPICE WHEEL 

document.addEventListener('DOMContentLoaded', () => {
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const image = document.querySelector('.images');
    const items = document.querySelectorAll('.images .item');
    const contents = document.querySelectorAll('.content .item');

    // Initialize with first item at bottom (6 o'clock)
    let rotate = 120; // Start with 90° rotation to position first item at bottom
    let active = 0;
    const countItem = items.length;
    const rotateAdd = 360 / countItem; // 60° per item

    function updateSlider() {
        // Apply rotation with bottom-center active item
        image.style.setProperty('--rotate', rotate + 'deg');
        
        // Update active content
        contents.forEach((content, key) => {
            content.classList.toggle('active', key === active);
        });
    }

    function nextSlider() {
        rotate -= rotateAdd; // Rotate counter-clockwise
        active = (active + 1) % countItem;
        updateSlider();
    }

    function prevSlider() {
        rotate += rotateAdd; // Rotate clockwise
        active = (active - 1 + countItem) % countItem;
        updateSlider();
    }
function updateSlider() {
    // Clear ALL active-img classes first
    items.forEach(item => item.classList.remove('active-img'));
    
    // Then add to the current active one
    items[active].classList.add('active-img');
    
    // Update rotation and content as before
    image.style.setProperty('--rotate', rotate + 'deg');
    contents.forEach((content, index) => {
        content.classList.toggle('active', index === active);
    });
}

    // Event listeners
    prev.addEventListener('click', prevSlider);
    next.addEventListener('click', nextSlider);

    // Initialize
    updateSlider();
});

//spicewheel end
// ########################
// ########################
// ########################

// spice dish


document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('spice-dish');
  if (!container) return;

  const spices = [
    {
      name: "Turmeric Milk",
      image: "./asset/image/turmeric_milk.jpg",
      intro: "Known as Golden Milk around the world, this ancient drink is India’s most famous showcase of turmeric’s strength and purity.",
      details: `
        <h1> Turmeric Milk</h1>
        <h3>✹ Just one spice, all the power</h3>
        <p>Turmeric is the only spice used — stirred into hot milk, giving it color, comfort, and cultural weight.</p>
        <h3>✹ Timeless tradition</h3>
        <p>Passed from grandmothers to grandchildren, this is more than a health drink — it’s a ritual of warmth and care.</p>
        <h3>✹ Global wellness trend</h3>
        <p>Renamed Golden Milk in cafés and yoga kitchens worldwide, the original drink’s roots are proudly Indian.</p>
        <h3>✹ Taste of simplicity</h3>
        <p>No sugar, no spice mix — just earthy, golden turmeric and warm milk. The purity is what makes it powerful.</p>
      `
    },
    {
      name: "Jeera Rice",
      image: "./asset/image/jeera_rice.jpg",
      intro: "Jeera rice is where cumin leads — an everyday favorite with bold simplicity and timeless appeal.",
      details: `
        <h1>Jeera Rice</h1>
        <h3>✹ Toasted cumin perfection</h3>
        <p>The dish begins with cumin seeds sizzling in ghee, releasing deep, nutty aromas that flavor the entire dish.</p>
        <h3>✹ No masala needed</h3>
        <p>Jeera rice uses no complex spices. Cumin alone does all the talking — earthy, aromatic, and distinctly Indian.</p>
        <h3>✹ A versatile companion</h3>
        <p>Often served with dal, paneer, or spicy curries, its mildness makes it a dependable base for rich gravies and lentils.</p>
        <h3>✹ Light but flavorful</h3>
        <p>Perfect for everyday meals or festival thalis, its fragrance stays long after the meal is over.</p>
      `
    },
    {
      name: "Cardamom Tea",
      image: "./asset/image/cardamom_tea.jpg",
      intro: "Sweet, warm, and comforting, cardamom tea is a traditional Indian beverage where cardamom shines as the key flavor.",
      details: `
        <h1> Cardamom Tea</h1>
        <h3>✹ Aroma in every sip</h3>
        <p>Crushed green cardamom pods release fragrant oils that define the tea’s signature floral sweetness and golden color.</p>
        <h3>✹ A morning and evening ritual</h3>
        <p>In many Indian homes, cardamom tea is not just a drink — it’s a daily pause, a symbol of hospitality, and a moment of calm.</p>
        <h3>✹ Simple ingredients, rich flavor</h3>
        <p>With just tea leaves, milk, sugar, and cardamom, this recipe shows how one spice can uplift an entire beverage.</p>
        <h3>✹ Loved across generations</h3>
        <p>From grandmothers to college students, cardamom tea connects age-old tradition with modern comfort.</p>
      `
    },
    {
      name: "Cinnamon Roll",
      image: "./asset/image/cinnamon_roll.jpg",
      intro: "Soft, sticky, and swirling with spice, cinnamon rolls are a global tribute to the richness of true cinnamon.",
      details: `
        <h1>Cinnamon Roll</h1>
        <h3>✹ The spice defines the swirl</h3>
        <p>Cinnamon powder mixed with butter and sugar forms the heart of every roll — without it, there is no identity.</p>
        <h3>✹ Sweet comfort food</h3>
        <p>From coffee shops to bakeries, the cinnamon roll is a worldwide favorite rooted in warmth and indulgence.</p>
        <h3>✹ Spice meets tradition</h3>
        <p>Though Western in origin, many rolls use premium Indian cinnamon bark for authentic flavor and aroma.</p>
        <h3>✹ Visually iconic</h3>
        <p>The spiral pattern and golden top glaze have made the cinnamon roll an Instagram star and comfort classic.</p>
      `
    },
    {
      name: "Laung Pulao",
      image: "./asset/image/clove_pulav.jpg",
      intro: "In this delicate rice dish, the strong and spicy notes of clove take the lead — bold but balanced.",
      details: `
        <h1>Laung Pulao</h1>
        <h3>✹ Whole cloves, whole flavor</h3>
        <p>Cloves are lightly fried and slow-cooked with rice to release their essential oils and pungent depth.</p>
        <h3>✹ Subtle elegance</h3>
        <p>This pulao doesn’t overpower — it impresses with minimalism, letting the richness of clove shine in every spoonful.</p>
        <h3>✹ A festive favorite</h3>
        <p>Often prepared during Eid, weddings, or North Indian feasts, it adds elegance to celebratory thalis.</p>
        <h3>✹ Rooted in royal kitchens</h3>
        <p>Once used in Mughal cuisine and trade routes, cloves have long held a place in high culinary art — and this dish preserves that legacy.</p>
      `
    },
    {
      name: "Pepper Chicken",
      image: "./asset/image/pepper_chicken.jpg",
      intro: "Fiercely flavorful and proudly Keralite, Pepper Chicken puts black pepper at the center of the culinary spotlight.",
      details: `
        <h1>Pepper Chicken</h1>
        <h3>✹ Only pepper, no chili</h3>
        <p>There’s no red chili or turmeric — crushed black pepper is the sole source of heat and spice, defining the dish’s taste.</p>
        <h3>✹ Freshly ground, never powdered</h3>
        <p>Whole peppercorns are crushed just before cooking, ensuring maximum aroma and bite. The difference is bold and unmistakable.</p>
        <h3>✹ A dish of strength</h3>
        <p>Known for its energizing warmth, this preparation is often served during monsoon or winter for its deep heat and comfort.</p>
        <h3>✹ Truly local</h3>
        <p>Made with locally grown Malabar pepper, it’s not just a recipe — it’s a spicy representation of Kerala’s identity.</p>
      `
    }
  ];

  const slideshow = container.querySelector('.slideshow');
  const detailsSection = container.querySelector('.details-section');
  const detailsContent = container.querySelector('.details-content');

  let currentSlide = 0;

  function createSlides() {
    spices.forEach((spice, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      if (index === 0) slide.classList.add('active');
      slide.style.backgroundImage = `url(${spice.image})`;

      slide.innerHTML = `
        <div class="overlay-box">
          <h1>${spice.name}</h1>
          <p>${spice.intro}</p>
          <button class="read-more" data-index="${index}">Read more ↗</button>
        </div>
      `;
      slideshow.appendChild(slide);
    });
  }

  function toggleDetails(show, index = currentSlide) {
    if (show) {
      detailsContent.innerHTML = spices[index].details;
      detailsSection.classList.add('active');
    } else {
      detailsSection.classList.remove('active');
    }
  }

  function rotateSlides() {
    const slides = container.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

container.addEventListener('click', function (e) {
  if (e.target.classList.contains('read-more')) {
    const index = parseInt(e.target.dataset.index); // 🔥 Fix: convert string to number
    toggleDetails(true, index);
  }

  if (e.target.classList.contains('close-btn')) {
    toggleDetails(false);
  }
});


  // Initialize
  createSlides();
  setInterval(rotateSlides, 6000);
});


//spice dish end
// ########################
// ########################
// ########################
// ########################
// ########################

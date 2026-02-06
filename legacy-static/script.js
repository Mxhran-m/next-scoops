const variants = [
  {
    name: 'Panda',
    subtitle: 'panda scoops',
    description:
      'A modern take on a classic ice cream with a perfect blend of sweet and tart, full of nostalgic flavor.',
    accent: '#3f7cff',
    mode: 'dark',
    sequence: {
      baseUrl:
        'https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/panda/ezgif-frame-001.jpg',
      frameCount: 240,
    },
  },
  {
    name: 'waffle-cone',
    subtitle: 'cone',
    description:
      'A modern functional soda brand inspired by classic flavors but made with better ingredients.',
    accent: '#ffffff',
    mode: 'dark',
    sequence: {
      baseUrl:
        'https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/cone/ezgif-frame-001.jpg',
      frameCount: 240,
    },
  },
  {
    name: 'sundae',
    subtitle: 'sundae ice cream',
    description:
      'Bright and refreshing citrus soda with natural lemon spark and crisp bubbles.',
    accent: '#7a31ee',
    mode: 'dark',
    sequence: {
      baseUrl:
        'https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/sundae/ezgif-frame-001.jpg',
      frameCount: 240,
    },
  },
  {
    name: 'Shake',
    subtitle: 'milk shake',
    description:
      'Bright and refreshing citrus soda with natural lemon spark and crisp bubbles.',
    accent: '#4aa7ff',
    mode: 'dark',
    sequence: {
      baseUrl:
        'https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/shake/ezgif-frame-001.jpg',
      frameCount: 240,
    },
  },
];

const heroBg = document.getElementById('heroBg');
const heroText = document.getElementById('heroText');
const itemName = document.getElementById('itemName');
const itemSubtitle = document.getElementById('itemSubtitle');
const itemDesc = document.getElementById('itemDesc');
const heroIndex = document.getElementById('heroIndex');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const variantLoading = document.getElementById('variantLoading');
const modeToggle = document.getElementById('modeToggle');
const modeText = modeToggle.querySelector('.mode-text');
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const heroScroll = document.getElementById('heroScroll');

let currentIndex = 0;
let currentFrameIndex = 0;
let isTicking = false;

function getPadInfo(url) {
  const match = url.match(/(\d+)(\.[a-zA-Z]+)$/);
  if (!match) {
    return { digits: 3, suffix: '' };
  }
  return { digits: match[1].length, suffix: match[2] };
}

function buildFrameUrl(baseUrl, index) {
  const match = baseUrl.match(/(\d+)(\.[a-zA-Z]+)$/);
  if (!match) {
    return baseUrl;
  }
  const digits = match[1].length;
  const padded = String(index).padStart(digits, '0');
  return baseUrl.replace(match[1], padded);
}

function preloadSequence(variant, onProgress) {
  if (variant.frames) {
    onProgress(variant.frames.length, variant.frames.length);
    return Promise.resolve(variant.frames);
  }
  const { frameCount, baseUrl } = variant.sequence;
  const frames = new Array(frameCount);
  let loaded = 0;

  return new Promise((resolve) => {
    for (let i = 1; i <= frameCount; i += 1) {
      const img = new Image();
      img.onload = () => {
        loaded += 1;
        frames[i - 1] = img;
        onProgress(loaded, frameCount);
        if (loaded === frameCount) {
          variant.frames = frames;
          resolve(frames);
        }
      };
      img.onerror = () => {
        loaded += 1;
        frames[i - 1] = img;
        onProgress(loaded, frameCount);
        if (loaded === frameCount) {
          variant.frames = frames;
          resolve(frames);
        }
      };
      img.src = buildFrameUrl(baseUrl, i);
    }
  });
}

function updateHeroContent(variant) {
  itemName.textContent = variant.name.toUpperCase();
  itemSubtitle.textContent = variant.subtitle.toUpperCase();
  itemDesc.textContent = variant.description;
  heroIndex.textContent = String(currentIndex + 1).padStart(2, '0');
  document.documentElement.style.setProperty('--accent', variant.accent);
  document.documentElement.style.setProperty(
    '--accent-soft',
    `${variant.accent}33`
  );
  if (variant.mode) {
    setTheme(variant.mode, true);
  }
}

function setTheme(mode, silent) {
  document.documentElement.setAttribute('data-theme', mode);
  modeText.textContent = mode === 'dark' ? 'Dark' : 'Light';
  if (!silent) {
    variants[currentIndex].mode = mode;
  }
}

function fadeText(callback) {
  heroText.classList.add('fade');
  setTimeout(() => {
    callback();
    heroText.classList.remove('fade');
  }, 300);
}

function updateFrame() {
  const variant = variants[currentIndex];
  if (!variant.frames || !variant.frames.length) return;
  const frame = variant.frames[currentFrameIndex];
  if (frame && heroBg.src !== frame.src) {
    heroBg.src = frame.src;
  }
}

function updateScrollFrame() {
  const start = heroScroll.offsetTop;
  const end = heroScroll.offsetTop + heroScroll.offsetHeight - window.innerHeight;
  const progress = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);
  const variant = variants[currentIndex];
  const targetFrame = Math.round(progress * (variant.sequence.frameCount - 1));
  if (targetFrame !== currentFrameIndex) {
    currentFrameIndex = targetFrame;
    updateFrame();
  }
  isTicking = false;
}

function onScroll() {
  if (!isTicking) {
    window.requestAnimationFrame(updateScrollFrame);
    isTicking = true;
  }
}

function switchVariant(direction) {
  const nextIndex =
    direction === 'next'
      ? (currentIndex + 1) % variants.length
      : (currentIndex - 1 + variants.length) % variants.length;
  if (nextIndex === currentIndex) return;
  currentIndex = nextIndex;
  const variant = variants[currentIndex];
  variantLoading.classList.add('visible');
  fadeText(() => updateHeroContent(variant));
  preloadSequence(variant, () => {}).then(() => {
    currentFrameIndex = 0;
    updateFrame();
    variantLoading.classList.remove('visible');
  });
}

function setupAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      item.classList.toggle('active');
    });
  });
}

function setupActiveNav() {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.dataset.section === entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.6 }
  );
  sections.forEach((section) => observer.observe(section));
}

modeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

prevBtn.addEventListener('click', () => switchVariant('prev'));
nextBtn.addEventListener('click', () => switchVariant('next'));

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', updateScrollFrame);

preloadSequence(variants[0], (loaded, total) => {
  const percent = Math.round((loaded / total) * 100);
  loaderBar.style.width = `${percent}%`;
  loaderPercent.textContent = `Loading ${percent}%`;
}).then(() => {
  updateHeroContent(variants[0]);
  updateFrame();
  setupAccordion();
  setupActiveNav();
  loader.classList.add('hidden');
  setTimeout(() => loader.remove(), 600);
});

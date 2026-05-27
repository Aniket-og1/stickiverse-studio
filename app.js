/* ==========================================================================
   STICKIVERSE STUDIO - Core Application Logic & Router
   ========================================================================== */

// --- State Management & Defaults ---
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "Holographic Space Sticker Pack",
    category: "Holographic",
    description: "Blast off into the cosmic sticker realm! This premium pack features 5 die-cut holographic vinyl stickers including neon astronauts, iridescent solar systems, nebula portal graphics, and retro rocket ships. Made with premium metallic-core vinyl that shifts color in light. 100% waterproof, scratch-resistant, and perfect for laptops or helmets.",
    price: 499,
    salePrice: 299,
    stock: 50,
    image: "assets/holo_space.png",
    tags: ["holographic", "space", "astronaut", "glow"],
    rating: 4.8,
    reviewsCount: 14,
    featured: true,
    trending: true
  },
  {
    id: 2,
    title: "Cyberpunk Neon Sticker Pack",
    category: "Cyberpunk",
    description: "Upgrade your hardware with our cyberpunk pack! Contains 6 custom-designed vinyl stickers showcasing neon cyborg skull heads, glitched high-tech kanji emblems, holographic circuit boards, and futuristic neon supercars. Printed on specialized glow-accent vinyl that catches high contrast details. Heavy-duty construction built for phone cases and keyboards.",
    price: 599,
    salePrice: 349,
    stock: 42,
    image: "assets/neon_cyber.png",
    tags: ["cyberpunk", "neon", "kanji", "holographic"],
    rating: 4.9,
    reviewsCount: 22,
    featured: true,
    trending: true
  },
  {
    id: 3,
    title: "Dripping Anime Mascot Stickers",
    category: "Pop-Art",
    description: "Add a splash of vibrant pop culture! This set features 5 gloss-coated anime mascot stickers designed in our signature dripping paint style. Bold neon pastel lines make these characters jump out. Die-cut to precision on premium flexible vinyl. Bubble-free application guarantees a smooth finish on skateboards, laptops, or water bottles.",
    price: 399,
    salePrice: 249,
    stock: 80,
    image: "assets/dripping_anime.png",
    tags: ["anime", "dripping", "pop-art", "cute"],
    rating: 4.7,
    reviewsCount: 19,
    featured: false,
    trending: true
  },
  {
    id: 4,
    title: "Retro Vaporwave Sticker Set",
    category: "Vaporwave",
    description: "Step into the 1980s digital dream. This pack holds 5 premium matte-finish aesthetic stickers showcasing classic Roman sculpture heads wearing neon shutter shades, iridescent floppy disks, vaporwave grid sunset palm trees, and retro synthwave text. Sophisticated UV protection ensures colors never fade even under harsh sunlight.",
    price: 449,
    salePrice: 279,
    stock: 30,
    image: "assets/vaporwave.png",
    tags: ["vaporwave", "retro", "aesthetic", "synthwave"],
    rating: 4.6,
    reviewsCount: 11,
    featured: true,
    trending: false
  }
];

const DEFAULT_BLOGS = [
  {
    id: 1,
    title: "How to Design Stickers that Stand Out in 2026",
    excerpt: "Learn the secrets to creating high-contrast sticker designs, leveraging holographic foils, and styling cyberpunk graffiti art.",
    content: "<p>Sticker designing is an art form that merges graphic branding with street culture. In 2026, the trend has shifted heavily towards futuristic retro aesthetics, cyberpunk neon grids, and iridescent foils that play with ambient lighting.</p><p>First, always consider contrast. Stickers are relatively small, which means your lines must be bold, and color choices should be vibrant. If you are creating a cyberpunk design, combining deep matte black backgrounds with glowing cyan or hot pink lines creates a dramatic contrast.</p><p>Second, think about die-cut shapes. Standard circles and squares are fine, but custom contour die-cutting (where the sticker border outlines the shape of the artwork itself) feels much more premium and professional. Our chameleons and dripping text at STICKIVERSE are all die-cut to follow their natural fluid curves!</p><p>Finally, material choice makes or breaks a sticker. Glossy vinyl is the standard, but specialty sheets like holographic silver or glowing fluorescent vinyl can transform a simple drawing into a premium merchandise item that people love showing off on their expensive hardware.</p>",
    date: "May 25, 2026",
    author: "Stickiverse Creative Team",
    image: "assets/hero_banner.png"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Customizing Your Laptop Workspace",
    excerpt: "Workspace styling tips to express your identity, including stickering layouts, cable setups, and ambient neon desk lighting.",
    content: "<p>Your setup is your digital canvas. For developers, designers, and creators, the laptop lid is prime real estate to express personal aesthetics. In this guide, we will walk through styling a clean, tech-focused workspace.</p><p>When it comes to laptop stickering, there are two primary schools of thought: Minimalist curation and Sticker Bombing.</p><p>Minimalist curation uses 2 to 4 high-quality premium holographic or metallic stickers strategically positioned to align with your laptop's lines. This maintains a sleek, professional corporate look while adding a pop of creative personality. Cyberpunk and vaporwave stickers work exceptionally well for this.</p><p>Sticker bombing, on the other hand, is a chaotic collage. You layer stickers over stickers until the entire surface is covered. To make a sticker bomb look cohesive, stick to a unified color palette (e.g., all warm neon colors or all black-and-white grids) and place your largest stickers down first, finishing with detailed die-cuts overlapping the borders. Remember to use high-quality vinyl stickers—cheap paper stickers will peel, leave nasty residue, and ruin your device.</p>",
    date: "May 18, 2026",
    author: "Workspace Hackers",
    image: "assets/holo_space.png"
  }
];

const DEFAULT_COUPONS = [
  { code: "STICKER15", discountType: "percentage", value: 15, active: true },
  { code: "FAMPAY20", discountType: "percentage", value: 20, active: true },
  { code: "FLAT100", discountType: "fixed", value: 100, active: true }
];

const DEFAULT_SETTINGS = {
  storeName: "STICKIVERSE STUDIO",
  upiId: "9181251519@fam", // FamPay UPI ID linked to merchant account
  upiName: "STICKIVERSE STUDIO",
  email: "support@stickiversestudio.com",
  phone: "+91 98765 43210",
  address: "Creative Zone, Sector 4, Bangalore, Karnataka, 560001",
  seoTitle: "STICKIVERSE STUDIO | Premium Custom Holographic Stickers",
  seoDescription: "Shop high-quality, dripping cyberpunk, anime, and space stickers. Secure UPI payments to FamPay.",
  shippingFee: 40,
  freeShippingMin: 499
};

// Initialize Database State
class DB {
  static get(key, defaultValue) {
    const val = localStorage.getItem(key);
    if (!val) {
      this.set(key, defaultValue);
      return defaultValue;
    }
    return JSON.parse(val);
  }
  static set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
}

let products = DB.get("sv_products", DEFAULT_PRODUCTS);
let blogs = DB.get("sv_blogs", DEFAULT_BLOGS);
let coupons = DB.get("sv_coupons", DEFAULT_COUPONS);
let settings = DB.get("sv_settings", DEFAULT_SETTINGS);

// Database Migration check for User's active FamPay ID
if (settings.upiId === "stickiverse@fam") {
  settings.upiId = "9181251519@fam";
  DB.set("sv_settings", settings);
}
if (settings.shippingFee === undefined) {
  settings.shippingFee = 40;
  settings.freeShippingMin = 499;
}
if (!settings.storefrontUrl) {
  settings.storefrontUrl = "https://aniket-og1.github.io/stickiverse-studio/";
  settings.adminUrl = "https://aniket-og1.github.io/stickiverse-admin/";
}
DB.set("sv_settings", settings);
let cart = DB.get("sv_cart", []);
let wishlist = DB.get("sv_wishlist", []);
let orders = DB.get("sv_orders", []);
let currentUser = DB.get("sv_user", null);
let reviews = DB.get("sv_reviews", {});

// --- Core Helper Functions ---
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : "toast-success"}`;
  toast.innerHTML = `
    <span class="toast-msg">${message}</span>
    <i class="fa-solid fa-xmark toast-close"></i>
  `;
  container.appendChild(toast);
  
  // Bind close event
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.remove();
  });
  
  // Auto remove
  setTimeout(() => {
    toast.style.animation = "slide-in-toast 0.4s reverse forwards";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// --- Cart and Wishlist Controls ---
function updateBadges() {
  const cartBadge = document.getElementById("cart-badge");
  const wishlistBadge = document.getElementById("wishlist-badge");
  const cartDrawerCount = document.getElementById("cart-drawer-count");
  
  const cartQtySum = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.innerText = cartQtySum;
  cartDrawerCount.innerText = cartQtySum;
  wishlistBadge.innerText = wishlist.length;
}

function addToCart(productId, qty = 1, variant = "Standard") {
  const prod = products.find(p => p.id === Number(productId));
  if (!prod) return;

  if (prod.stock <= 0) {
    showToast("Sorry, this item is out of stock!", "error");
    return;
  }

  const existing = cart.find(item => item.id === prod.id && item.variant === variant);
  if (existing) {
    if (existing.qty + qty > prod.stock) {
      showToast(`Only ${prod.stock} units available in stock.`, "error");
      return;
    }
    existing.qty += qty;
  } else {
    cart.push({
      id: prod.id,
      title: prod.title,
      price: prod.salePrice || prod.price,
      image: prod.image,
      variant: variant,
      qty: qty,
      maxStock: prod.stock
    });
  }

  DB.set("sv_cart", cart);
  updateBadges();
  renderCartDrawer();
  showToast(`Added ${prod.title} (${variant}) to your Cart!`);
}

function toggleWishlist(productId) {
  const id = Number(productId);
  const index = wishlist.indexOf(id);
  const prod = products.find(p => p.id === id);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed ${prod.title} from Wishlist.`);
  } else {
    wishlist.push(id);
    showToast(`Added ${prod.title} to Wishlist!`);
  }
  DB.set("sv_wishlist", wishlist);
  updateBadges();
  
  // Re-render current page to update wishlist icon states
  router();
}

function updateCartQty(productId, variant, delta) {
  const item = cart.find(i => i.id === Number(productId) && i.variant === variant);
  if (!item) return;

  const newQty = item.qty + delta;
  if (newQty <= 0) {
    cart = cart.filter(i => !(i.id === item.id && i.variant === item.variant));
  } else {
    if (newQty > item.maxStock) {
      showToast(`Maximum stock limit reached (${item.maxStock} units).`, "error");
      return;
    }
    item.qty = newQty;
  }
  
  DB.set("sv_cart", cart);
  updateBadges();
  renderCartDrawer();
  
  // If we are currently on the full cart page, refresh its contents
  if (window.location.hash === "#/cart") {
    renderCartPage();
  }
  if (window.location.hash === "#/checkout") {
    renderCheckoutPage();
  }
}

function removeFromCart(productId, variant) {
  cart = cart.filter(i => !(i.id === Number(productId) && i.variant === variant));
  DB.set("sv_cart", cart);
  updateBadges();
  renderCartDrawer();
  
  if (window.location.hash === "#/cart") {
    renderCartPage();
  }
  showToast("Item removed from cart.");
}

// --- Cart Drawer Interface ---
function renderCartDrawer() {
  const container = document.getElementById("cart-drawer-items");
  const totalEl = document.getElementById("cart-drawer-total");
  const footerEl = document.getElementById("cart-drawer-footer");
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty</p>
        <a href="#/shop" class="btn btn-primary btn-sm" id="close-drawer-shop-btn">Explore Shop</a>
      </div>
    `;
    totalEl.innerText = "₹0.00";
    footerEl.style.display = "none";
    
    const shopBtn = document.getElementById("close-drawer-shop-btn");
    if (shopBtn) {
      shopBtn.addEventListener("click", () => {
        document.getElementById("cart-drawer").classList.remove("active");
        document.getElementById("cart-drawer-overlay").classList.remove("active");
      });
    }
    return;
  }
  
  footerEl.style.display = "block";
  container.innerHTML = "";
  
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-drawer-item";
    div.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="text-secondary small-text">Variant: ${item.variant}</div>
        <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn dec-qty-drawer" data-id="${item.id}" data-var="${item.variant}"><i class="fa-solid fa-minus"></i></button>
          <span>${item.qty}</span>
          <button class="qty-btn inc-qty-drawer" data-id="${item.id}" data-var="${item.variant}"><i class="fa-solid fa-plus"></i></button>
        </div>
        <a class="remove-item remove-drawer-item" data-id="${item.id}" data-var="${item.variant}">Remove</a>
      </div>
    `;
    container.appendChild(div);
  });
  
  totalEl.innerText = `₹${subtotal.toFixed(2)}`;

  // Dynamic Shipping calculations
  const shippingFee = settings.shippingFee !== undefined ? settings.shippingFee : 40;
  const freeShippingMin = settings.freeShippingMin !== undefined ? settings.freeShippingMin : 499;
  const isFreeShipping = subtotal >= freeShippingMin;

  const shippingValEl = document.getElementById("cart-drawer-shipping");
  const shippingNoticeEl = document.getElementById("cart-drawer-shipping-notice");
  const noticeTextEl = document.getElementById("shipping-notice-text");
  const progressBarEl = document.getElementById("shipping-progress-bar");

  if (shippingValEl) {
    if (isFreeShipping) {
      shippingValEl.className = "text-success font-bold";
      shippingValEl.innerText = "FREE";
    } else {
      shippingValEl.className = "text-secondary font-bold";
      shippingValEl.innerText = `₹${shippingFee.toFixed(2)}`;
    }
  }

  if (shippingNoticeEl) {
    if (isFreeShipping) {
      shippingNoticeEl.style.display = "none";
    } else {
      shippingNoticeEl.style.display = "flex";
      const remaining = freeShippingMin - subtotal;
      noticeTextEl.innerHTML = `Add <span class="highlight">₹${remaining.toFixed(2)}</span> more for <span class="font-bold text-success">FREE shipping</span>!`;
      
      const percentage = Math.min(100, (subtotal / freeShippingMin) * 100);
      progressBarEl.style.width = `${percentage}%`;
    }
  }
  
  // Bind actions
  document.querySelectorAll(".dec-qty-drawer").forEach(btn => {
    btn.addEventListener("click", () => updateCartQty(btn.dataset.id, btn.dataset.var, -1));
  });
  document.querySelectorAll(".inc-qty-drawer").forEach(btn => {
    btn.addEventListener("click", () => updateCartQty(btn.dataset.id, btn.dataset.var, 1));
  });
  document.querySelectorAll(".remove-drawer-item").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id, btn.dataset.var));
  });
}

// --- Layout Modals & Theme Triggers ---
function initAppLayout() {
  // Update Merchant Portal link dynamically from settings
  const adminLink = document.getElementById("storefront-admin-link");
  if (adminLink && settings.adminUrl) {
    adminLink.href = settings.adminUrl;
  }

  const themeToggle = document.getElementById("theme-toggle");
  const cartTrigger = document.getElementById("cart-trigger");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const closeCart = document.getElementById("close-cart-drawer");
  
  const mobileTrigger = document.getElementById("mobile-menu-trigger");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileOverlay = document.getElementById("mobile-drawer-overlay");
  const closeMobile = document.getElementById("close-mobile-drawer");
  
  const searchTrigger = document.getElementById("search-trigger");
  const searchBox = document.getElementById("dropdown-search");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  const authModal = document.getElementById("auth-modal");
  const closeAuth = document.getElementById("close-auth-modal");
  
  // Theme Switching
  const currentTheme = localStorage.getItem("sv_theme") || "dark";
  if (currentTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  }
  
  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      localStorage.setItem("sv_theme", "light");
      showToast("Light mode activated!");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      localStorage.setItem("sv_theme", "dark");
      showToast("Dark mode activated!");
    }
  });

  // Cart Drawer toggling
  const openCartFn = () => {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    renderCartDrawer();
  };
  const closeCartFn = () => {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
  };
  cartTrigger.addEventListener("click", openCartFn);
  closeCart.addEventListener("click", closeCartFn);
  cartOverlay.addEventListener("click", closeCartFn);

  // Mobile Drawer toggling
  const openMobileFn = () => {
    mobileDrawer.classList.add("active");
    mobileOverlay.classList.add("active");
  };
  const closeMobileFn = () => {
    mobileDrawer.classList.remove("active");
    mobileOverlay.classList.remove("active");
  };
  mobileTrigger.addEventListener("click", openMobileFn);
  closeMobile.addEventListener("click", closeMobileFn);
  mobileOverlay.addEventListener("click", closeMobileFn);

  // Close drawers on link click
  document.querySelectorAll(".mobile-nav-item").forEach(link => {
    link.addEventListener("click", closeMobileFn);
  });

  // Search trigger toggling
  searchTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBox.classList.toggle("open");
    if (searchBox.classList.contains("open")) {
      searchInput.focus();
    }
  });
  
  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && e.target !== searchTrigger && !searchTrigger.contains(e.target)) {
      searchBox.classList.remove("open");
    }
  });

  const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.hash = `#/shop?search=${encodeURIComponent(query)}`;
      searchBox.classList.remove("open");
      searchInput.value = "";
    }
  };

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch();
  });

  // Newsletter signup form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletter-email");
      if (emailInput.value.trim()) {
        showToast("Awesome! You are now subscribed to the Sticker Rebellion 🚀");
        emailInput.value = "";
      }
    });
  }

  // Header shrink on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".glass-header");
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  // Auth Form Controls
  const authTrigger = document.getElementById("user-trigger");
  authTrigger.addEventListener("click", (e) => {
    if (!currentUser) {
      e.preventDefault();
      authModal.classList.add("active");
    }
  });
  
  closeAuth.addEventListener("click", () => authModal.classList.remove("active"));
  
  const tabLogin = document.getElementById("tab-login-btn");
  const tabRegister = document.getElementById("tab-register-btn");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  });
  
  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  });
  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    currentUser = { name: email.split("@")[0], email: email };
    DB.set("sv_user", currentUser);
    authModal.classList.remove("remove");
    location.reload(); // Refresh to update user header dashboard links
  });
  
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    currentUser = { name, email };
    DB.set("sv_user", currentUser);
    authModal.classList.remove("remove");
    location.reload();
  });
}

// --- Dynamic View Router ---
function router() {
  const content = document.getElementById("main-content");
  const path = window.location.hash || "#/";
  
  // Show Loader briefly for transition
  const loader = document.getElementById("page-loader");
  loader.classList.remove("fade-out");
  
  // Page Transition duration mock
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 300);

  // Parse queries
  const parts = path.split("?");
  const route = parts[0];
  const queryString = parts[1] || "";
  const queryParams = new URLSearchParams(queryString);

  // Update navbar items dynamically based on current route
  document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(el => {
    const href = el.getAttribute("href");
    if (href && (route === href || (href !== "#/" && route.startsWith(href)))) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
  
  if (route === "#/") {
    renderHome(content);
  } else if (route === "#/shop") {
    renderShop(content, queryParams);
  } else if (route.startsWith("#/product/")) {
    const id = route.split("/")[2];
    renderProductDetail(content, id);
  } else if (route === "#/cart") {
    renderCartPage(content);
  } else if (route === "#/checkout") {
    renderCheckoutPage(content);
  } else if (route === "#/wishlist") {
    renderWishlistPage(content);
  } else if (route === "#/dashboard") {
    renderDashboard(content, queryParams);
  } else if (route === "#/blog") {
    renderBlogList(content);
  } else if (route.startsWith("#/blog/")) {
    const id = route.split("/")[2];
    renderBlogPost(content, id);
  } else if (route === "#/faq") {
    renderFAQPage(content);
  } else if (route === "#/about") {
    renderAboutPage(content);
  } else if (route === "#/contact") {
    renderContactPage(content);
  } else if (route === "#/privacy") {
    renderPolicyPage(content, "Privacy Policy", "privacy");
  } else if (route === "#/terms") {
    renderPolicyPage(content, "Terms & Conditions", "terms");
  } else if (route === "#/refund") {
    renderPolicyPage(content, "Refund & Return Policy", "refund");
  } else if (route === "#/shipping") {
    renderPolicyPage(content, "Shipping Policy", "shipping");
  } else if (route.startsWith("#/order-success/")) {
    const orderId = route.split("/")[2];
    renderOrderSuccessPage(content, orderId);
  } else {
    // 404 fallback
    content.innerHTML = `
      <div class="container section-padding text-center">
        <h2 style="font-size: 5rem; margin-bottom: 20px;" class="highlight">404</h2>
        <h3 class="mb-3">Cosmic Route Not Found</h3>
        <p class="mb-4">It seems you have drifted into deep space. The coordinates you entered do not exist.</p>
        <a href="#/" class="btn btn-primary">Return to Base (Home)</a>
      </div>
    `;
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// --- Page Render Functions ---

// 1. HOME VIEW
function renderHome(container) {
  // Update SEO Head
  document.title = settings.seoTitle || "STICKIVERSE STUDIO | Premium Custom Holographic Stickers";
  document.querySelector('meta[name="description"]').setAttribute("content", settings.seoDescription || "Shop high-quality, dripping cyberpunk, anime, and space stickers.");

  const featured = products.filter(p => p.featured);
  const trending = products.filter(p => p.trending);

  let featuredHtml = featured.map(p => renderProductCardHtml(p)).join("");
  let trendingHtml = trending.map(p => renderProductCardHtml(p)).join("");

  container.innerHTML = `
    <!-- Hero Banner Component -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-info">
            <span class="hero-subtitle">Premium Sticker Gear</span>
            <h1 class="hero-title">Dripping with <br><span class="highlight">Futuristic Art</span></h1>
            <p class="hero-desc">Elevate your hardware with high-grade, waterproof, holographic decals. Designed for hackers, developers, anime enthusiasts, and street-style rebels.</p>
            <div class="hero-actions">
              <a href="#/shop" class="btn btn-primary">Shop Sticker Packs</a>
              <a href="#/about" class="btn btn-secondary">Our Story</a>
            </div>
            <div class="hero-badge-strip">
              <div class="hero-badge"><i class="fa-solid fa-truck-fast"></i> India-wide Free Delivery</div>
              <div class="hero-badge"><i class="fa-solid fa-shield-halved"></i> Secured UPI via FamPay</div>
              <div class="hero-badge"><i class="fa-solid fa-droplet"></i> Waterproof Vinyl</div>
            </div>
          </div>
          <div class="hero-image-wrapper">
            <img src="assets/hero_banner.png" alt="STICKIVERSE premium merchandise lineup">
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Explore Categories</h2>
          <a href="#/shop" class="btn btn-outline-accent btn-sm">View Catalog</a>
        </div>
        <div class="category-grid">
          <div class="category-card" style="background-image: url('assets/neon_cyber.png');">
            <div class="category-card-info">
              <span>Future Aesthetics</span>
              <h3>Cyberpunk</h3>
            </div>
          </div>
          <div class="category-card" style="background-image: url('assets/holo_space.png');">
            <div class="category-card-info">
              <span>Color-Shifting Foils</span>
              <h3>Holographic</h3>
            </div>
          </div>
          <div class="category-card" style="background-image: url('assets/dripping_anime.png');">
            <div class="category-card-info">
              <span>Bold Pastel Drips</span>
              <h3>Anime & Pop</h3>
            </div>
          </div>
          <div class="category-card" style="background-image: url('assets/vaporwave.png');">
            <div class="category-card-info">
              <span>80s Nostalgia</span>
              <h3>Vaporwave</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section-padding" style="background-color: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="text-secondary uppercase tracking-wider font-bold small-text">Highly Recommended</span>
            <h2 class="section-title mt-1">Featured Sticker Packs</h2>
          </div>
        </div>
        <div class="product-grid">
          ${featuredHtml || "<p>Loading awesome stickers...</p>"}
        </div>
      </div>
    </section>

    <!-- Mid Promotional Banner -->
    <section class="section-padding">
      <div class="container">
        <div class="glass-card promo-banner-inner" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15)); padding: var(--spacing-xl); border-radius: var(--radius-lg); text-align: center; border: 1px solid var(--border-color);">
          <span class="highlight uppercase tracking-widest font-bold font-large" style="display:block; margin-bottom:15px; font-size:1.1rem;">Limited Offer Drop</span>
          <h2 style="font-size:2.4rem; margin-bottom:15px;">Unlock 20% Off checkout</h2>
          <p class="mb-4 text-secondary" style="max-width: 600px; margin: 0 auto 24px auto;">Use code <strong class="text-primary font-bold">FAMPAY20</strong> at checkout for 20% off when paying online. Pay seamlessly with Indian UPI, cards, and wallets.</p>
          <a href="#/shop" class="btn btn-accent">Claim Discount</a>
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="text-secondary uppercase tracking-wider font-bold small-text">Hot Right Now</span>
            <h2 class="section-title mt-1">Trending Products</h2>
          </div>
        </div>
        <div class="product-grid">
          ${trendingHtml || "<p>Loading hot items...</p>"}
        </div>
      </div>
    </section>

    <!-- Customer Reviews System -->
    <section class="section-padding" style="background-color: var(--bg-secondary); border-top: 1px solid var(--border-color);">
      <div class="container">
        <div class="text-center mb-5">
          <h2>Loved by Creators & Devs</h2>
          <p>Read review responses from real verified collectors in our community.</p>
        </div>
        <div class="blog-grid" style="grid-template-columns: repeat(3, 1fr);">
          <div class="glass-card p-4">
            <div class="review-stars mb-2" style="color: #fbbf24;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="italic mb-3">"The holographic space pack is literally out of this world! Shines beautifully under desk lamps and holds up to scratches really well."</p>
            <div class="font-bold">- Rohan M. <span class="text-success small-text"><i class="fa-solid fa-circle-check"></i> Verified Buyer</span></div>
          </div>
          <div class="glass-card p-4">
            <div class="review-stars mb-2" style="color: #fbbf24;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="italic mb-3">"I bombed my keyboard setup with the cyberpunk neon pack. They feel extremely premium, and the colors are super punchy."</p>
            <div class="font-bold">- Ananya K. <span class="text-success small-text"><i class="fa-solid fa-circle-check"></i> Verified Buyer</span></div>
          </div>
          <div class="glass-card p-4">
            <div class="review-stars mb-2" style="color: #fbbf24;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="italic mb-3">"Simple, secure payment with my FamApp UPI. No cash on delivery needed when delivery is free and checkout takes 10 seconds!"</p>
            <div class="font-bold">- Kabir S. <span class="text-success small-text"><i class="fa-solid fa-circle-check"></i> Verified Buyer</span></div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach card triggers
  bindProductCardEvents();
}

// 2. SHOP CATALOGUE VIEW
function renderShop(container, queryParams) {
  // Query Filters
  const searchFilter = queryParams.get("search") || "";
  const catFilter = queryParams.get("category") || "";
  const priceFilter = Number(queryParams.get("price")) || 1000;
  const sortFilter = queryParams.get("sort") || "featured";

  document.title = "Shop Stickers | STICKIVERSE STUDIO";

  // Categories list
  const categories = [...new Set(products.map(p => p.category))];

  // Filtering products with weighted scoring algorithm
  let scored = products.map(p => {
    let score = 0;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      if (p.title.toLowerCase().includes(q)) score += 5;
      p.tags.forEach(t => {
        if (t.toLowerCase().includes(q)) score += 3;
      });
      if (p.category.toLowerCase().includes(q)) score += 2;
      if (p.description.toLowerCase().includes(q)) score += 1;
    } else {
      score = 1;
    }
    return { ...p, _searchScore: score };
  });

  let filtered = scored.filter(p => {
    const matchSearch = searchFilter ? p._searchScore > 0 : true;
    const matchCat = catFilter ? p.category.toLowerCase() === catFilter.toLowerCase() : true;
    const matchPrice = p.salePrice <= priceFilter;
    
    return matchSearch && matchCat && matchPrice;
  });

  // Sorting
  if (sortFilter === "featured") {
    if (searchFilter) {
      filtered.sort((a, b) => b._searchScore - a._searchScore);
    }
  } else if (sortFilter === "price-low") {
    filtered.sort((a, b) => a.salePrice - b.salePrice);
  } else if (sortFilter === "price-high") {
    filtered.sort((a, b) => b.salePrice - a.salePrice);
  } else if (sortFilter === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  let catalogGridHtml = filtered.map(p => renderProductCardHtml(p)).join("");
  if (filtered.length === 0) {
    catalogGridHtml = `
      <div class="grid-span-full text-center py-5">
        <i class="fa-solid fa-circle-info mb-3" style="font-size: 3rem; color: var(--border-color);"></i>
        <p class="text-secondary">No stickers match your filters. Try adjusting your parameters.</p>
        <button id="reset-filters-btn" class="btn btn-secondary mt-3">Reset All Filters</button>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="container">
      <div class="catalog-layout">
        <!-- Sidebar filters -->
        <aside class="catalog-filters glass-card">
          <div class="filter-group">
            <h3 class="filter-title">Search</h3>
            <div style="position:relative;">
              <input type="text" id="sidebar-search" value="${searchFilter}" placeholder="Keywords..." style="width: 100%; border: 1px solid var(--border-color); padding: 8px 12px; border-radius: 4px;">
            </div>
          </div>
          
          <div class="filter-group">
            <h3 class="filter-title">Categories</h3>
            <div class="filter-list">
              <label class="filter-item">
                <input type="radio" name="cat-radio" value="" ${!catFilter ? "checked" : ""}> All Categories
              </label>
              ${categories.map(c => `
                <label class="filter-item">
                  <input type="radio" name="cat-radio" value="${c}" ${catFilter.toLowerCase() === c.toLowerCase() ? "checked" : ""}> ${c}
                </label>
              `).join("")}
            </div>
          </div>

          <div class="filter-group">
            <h3 class="filter-title">Max Price (₹<span id="price-limit-display">${priceFilter}</span>)</h3>
            <div class="price-range-container">
              <input type="range" class="price-slider" id="sidebar-price-slider" min="100" max="1000" step="50" value="${priceFilter}">
              <div class="price-range-values">
                <span>₹100</span>
                <span>₹1000</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Catalog main list -->
        <div class="catalog-main">
          <div class="catalog-main-header">
            <p class="text-secondary">${filtered.length} products found</p>
            <div class="sort-select-wrapper">
              <label for="sort-select" class="small-text text-secondary mr-2">Sort by:</label>
              <select id="sort-select">
                <option value="featured" ${sortFilter === "featured" ? "selected" : ""}>Featured</option>
                <option value="price-low" ${sortFilter === "price-low" ? "selected" : ""}>Price: Low to High</option>
                <option value="price-high" ${sortFilter === "price-high" ? "selected" : ""}>Price: High to Low</option>
                <option value="rating" ${sortFilter === "rating" ? "selected" : ""}>Top Rated</option>
              </select>
            </div>
          </div>

          <div class="product-grid" style="grid-template-columns: repeat(3, 1fr);">
            ${catalogGridHtml}
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind catalog filters actions
  const applyFilters = () => {
    const searchVal = document.getElementById("sidebar-search").value.trim();
    const catVal = document.querySelector('input[name="cat-radio"]:checked').value;
    const priceVal = document.getElementById("sidebar-price-slider").value;
    const sortVal = document.getElementById("sort-select").value;

    window.location.hash = `#/shop?search=${encodeURIComponent(searchVal)}&category=${encodeURIComponent(catVal)}&price=${priceVal}&sort=${sortVal}`;
  };

  document.getElementById("sidebar-search").addEventListener("keypress", (e) => {
    if (e.key === "Enter") applyFilters();
  });
  document.querySelectorAll('input[name="cat-radio"]').forEach(radio => {
    radio.addEventListener("change", applyFilters);
  });
  
  const slider = document.getElementById("sidebar-price-slider");
  slider.addEventListener("input", (e) => {
    document.getElementById("price-limit-display").innerText = e.target.value;
  });
  slider.addEventListener("change", applyFilters);
  
  document.getElementById("sort-select").addEventListener("change", applyFilters);

  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      window.location.hash = `#/shop`;
    });
  }

  bindProductCardEvents();
}

function renderProductCardHtml(p) {
  const isWishlisted = wishlist.includes(p.id);
  const discountPercent = Math.round(((p.price - p.salePrice) / p.price) * 100);
  
  return `
    <div class="product-card">
      <div class="product-card-badge">-${discountPercent}%</div>
      <button class="product-card-wishlist ${isWishlisted ? "active" : ""}" data-id="${p.id}" aria-label="Add to Wishlist">
        <i class="${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
      </button>
      <a href="#/product/${p.id}" class="product-card-img">
        <img src="${p.image}" alt="${p.title}">
      </a>
      <div class="product-card-info">
        <span class="product-card-cat">${p.category}</span>
        <a href="#/product/${p.id}" class="product-card-title">${p.title}</a>
        <div class="product-card-rating">
          <i class="fa-solid fa-star"></i>
          <span>${p.rating.toFixed(1)} (${p.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <div class="price-container">
            <span class="price-old">₹${p.price}</span>
            <span class="price-current">₹${p.salePrice}</span>
          </div>
          <button class="add-cart-btn home-add-cart" data-id="${p.id}" aria-label="Add to Cart">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function bindProductCardEvents() {
  document.querySelectorAll(".product-card-wishlist").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleWishlist(btn.dataset.id);
    });
  });

  document.querySelectorAll(".home-add-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      addToCart(btn.dataset.id, 1, "Standard");
    });
  });
}

// 3. PRODUCT DETAILS VIEW
function renderProductDetail(container, id) {
  const prod = products.find(p => p.id === Number(id));
  if (!prod) {
    container.innerHTML = `
      <div class="container section-padding text-center">
        <h2>Product Not Found</h2>
        <a href="#/shop" class="btn btn-primary mt-3">Back to Shop</a>
      </div>
    `;
    return;
  }

  // Update SEO Page metadata
  document.title = `${prod.title} | STICKIVERSE STUDIO`;
  document.querySelector('meta[name="description"]').setAttribute("content", prod.description.substring(0, 155));

  // Get related suggestions
  const related = products.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 4);
  let relatedHtml = related.map(p => renderProductCardHtml(p)).join("");

  // Get product reviews
  const prodReviews = reviews[prod.id] || [];

  container.innerHTML = `
    <div class="container">
      <div class="product-detail-grid">
        <!-- Gallery -->
        <div class="product-gallery">
          <div class="main-image-container">
            <img src="${prod.image}" alt="${prod.title}" id="detail-main-img">
          </div>
          <div class="thumbnail-strip">
            <div class="thumb-item active" data-img="${prod.image}">
              <img src="${prod.image}" alt="Thumb main">
            </div>
            <!-- Mock different colors/variants thumbnails -->
            <div class="thumb-item" data-img="assets/hero_banner.png">
              <img src="assets/hero_banner.png" alt="Thumb details">
            </div>
          </div>
        </div>

        <!-- Info details -->
        <div class="product-info-panel">
          <span class="uppercase tracking-widest text-secondary font-bold small-text">${prod.category}</span>
          <h2>${prod.title}</h2>
          
          <div class="product-meta-row">
            <div class="review-stars" style="color: #fbbf24;">
              <i class="fa-solid fa-star"></i>
              <span>${prod.rating.toFixed(1)} (${prod.reviewsCount} reviews)</span>
            </div>
            <span class="stock-status ${prod.stock > 0 ? "stock-in" : "stock-out"}">
              ${prod.stock > 0 ? `<i class="fa-solid fa-circle-check"></i> ${prod.stock} In Stock` : `<i class="fa-solid fa-circle-xmark"></i> Out of Stock`}
            </span>
          </div>

          <div class="detail-price-row">
            <span class="detail-price">₹${prod.salePrice}</span>
            <span class="detail-price-old">₹${prod.price}</span>
            <span class="text-success small-text font-bold">You save ₹${prod.price - prod.salePrice} (${Math.round(((prod.price - prod.salePrice)/prod.price)*100)}%)</span>
          </div>

          <p class="detail-desc text-secondary">${prod.description}</p>

          <!-- Variants selection -->
          <div class="variants-section">
            <label class="font-bold text-secondary">Material Grade Variant:</label>
            <div class="variant-options">
              <button class="variant-btn active" data-variant="Standard">Standard Glossy Vinyl</button>
              <button class="variant-btn" data-variant="Holographic">Rainbow Holographic Foil (+₹50)</button>
              <button class="variant-btn" data-variant="Glitch-Glow">Fluorescent Glitch Glow (+₹70)</button>
            </div>
          </div>

          <!-- Quantity selector -->
          <div class="qty-selector">
            <span class="font-bold text-secondary">Quantity:</span>
            <div class="qty-input-box">
              <button id="qty-dec"><i class="fa-solid fa-minus"></i></button>
              <input type="text" id="qty-val" value="1" readonly>
              <button id="qty-inc"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>

          <div class="detail-actions-row">
            <button class="btn btn-primary" id="detail-add-cart" style="flex:1;"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            <button class="btn btn-accent" id="detail-buy-now" style="flex:1;">Buy It Now</button>
            <button class="btn btn-secondary" id="detail-wishlist" style="width:50px; padding:0;"><i class="fa-regular fa-heart"></i></button>
          </div>

          <!-- SEO trust badges -->
          <div class="hero-badge-strip" style="margin-top:20px; padding-top:20px;">
            <div class="hero-badge"><i class="fa-solid fa-shield-halved"></i> 100% Secure Checkout</div>
            <div class="hero-badge"><i class="fa-solid fa-award"></i> High Definition Die-Cut</div>
          </div>
        </div>
      </div>

      <!-- Reviews and Description tabs -->
      <div class="product-info-tabs">
        <div class="tab-nav">
          <button class="tab-btn active" data-tab="tab-details">Description Details</button>
          <button class="tab-btn" data-tab="tab-reviews">Customer Reviews (${prod.reviewsCount})</button>
        </div>
        
        <div class="tab-content active" id="tab-details">
          <div class="glass-card p-4">
            <h3 class="mb-3">Specifications</h3>
            <table class="mb-3">
              <tr><th>Brand</th><td>STICKIVERSE STUDIO</td></tr>
              <tr><th>Material</th><td>Premium Waterproof Vinyl (Holographic/Standard/Glow)</td></tr>
              <tr><th>Finish</th><td>UV Gloss Laminate / Scratch Resistant</td></tr>
              <tr><th>Adhesive</th><td>Bubble-Free, High Tack Removable (Leaves no residue)</td></tr>
            </table>
            <p>Our sticker packs represent standard-setting, studio-level creative printing. Each graphic is conceptualized by creative designers and color-profiled for vibrant contrast on black carbon setups. They are perfect for laptops, skates, cases, iPads, or street decor.</p>
          </div>
        </div>

        <div class="tab-content" id="tab-reviews">
          <div class="glass-card p-4">
            <h3 class="mb-3">Reviews</h3>
            <!-- Add review form -->
            <form id="review-form" class="mb-4" style="border-bottom:1px solid var(--border-color); padding-bottom:20px;">
              <h4 class="mb-3">Submit a Review</h4>
              <div class="form-grid">
                <div class="form-group">
                  <label for="rev-name">Your Name</label>
                  <input type="text" id="rev-name" required placeholder="Jane Doe">
                </div>
                <div class="form-group">
                  <label for="rev-stars">Rating (1-5 Stars)</label>
                  <select id="rev-stars">
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                    <option value="2">⭐⭐ (2/5)</option>
                    <option value="1">⭐ (1/5)</option>
                  </select>
                </div>
              </div>
              <div class="form-group form-group-full">
                <label for="rev-comment">Review Description</label>
                <textarea id="rev-comment" required rows="3" placeholder="Tell us how you love the holographic quality..."></textarea>
              </div>
              <button type="submit" class="btn btn-accent btn-sm mt-2">Submit Verified Review</button>
            </form>

            <div class="reviews-list" id="reviews-list">
              <!-- Render dynamic + mock reviews -->
              <div class="review-item">
                <div class="review-item-header">
                  <span class="review-author">Karan J.</span>
                  <span class="review-stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p class="text-secondary text-sm">"Absolutely stunning print quality. These chameleons glow insanely bright. Will purchase the cyberpunk set next."</p>
              </div>
              ${prodReviews.map(r => `
                <div class="review-item">
                  <div class="review-item-header">
                    <span class="review-author">${r.name}</span>
                    <span class="review-stars">${"⭐".repeat(r.stars)}</span>
                  </div>
                  <p class="text-secondary text-sm">"${r.comment}"</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- Related Section -->
      ${related.length > 0 ? `
        <section class="section-padding">
          <h2 class="mb-4">Related Masterpieces</h2>
          <div class="product-grid">
            ${relatedHtml}
          </div>
        </section>
      ` : ""}
    </div>
  `;

  // --- Interaction Bindings ---
  // Image Thumb swap
  document.querySelectorAll(".thumb-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
      item.classList.add("active");
      document.getElementById("detail-main-img").src = item.dataset.img;
    });
  });

  // Quantity controllers
  const qtyInput = document.getElementById("qty-val");
  document.getElementById("qty-dec").addEventListener("click", () => {
    let current = Number(qtyInput.value);
    if (current > 1) qtyInput.value = current - 1;
  });
  document.getElementById("qty-inc").addEventListener("click", () => {
    let current = Number(qtyInput.value);
    if (current < prod.stock) qtyInput.value = current + 1;
  });

  // Variant picking
  let selectedVariant = "Standard";
  let additionalPrice = 0;
  document.querySelectorAll(".variant-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".variant-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedVariant = btn.dataset.variant;
      
      // Update Price display based on variant
      if (selectedVariant === "Holographic") {
        additionalPrice = 50;
      } else if (selectedVariant === "Glitch-Glow") {
        additionalPrice = 70;
      } else {
        additionalPrice = 0;
      }
      document.querySelector(".detail-price").innerText = `₹${(prod.salePrice + additionalPrice).toFixed(2)}`;
    });
  });

  // Actions
  document.getElementById("detail-add-cart").addEventListener("click", () => {
    const qty = Number(qtyInput.value);
    addToCart(prod.id, qty, selectedVariant);
  });

  document.getElementById("detail-buy-now").addEventListener("click", () => {
    const qty = Number(qtyInput.value);
    // Add to cart first, then route to checkout
    addToCart(prod.id, qty, selectedVariant);
    window.location.hash = "#/checkout";
  });

  // Wishlist toggle
  const wishBtn = document.getElementById("detail-wishlist");
  const updateWishBtnState = () => {
    if (wishlist.includes(prod.id)) {
      wishBtn.innerHTML = `<i class="fa-solid fa-heart" style="color:var(--accent-pink);"></i>`;
    } else {
      wishBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    }
  };
  updateWishBtnState();
  wishBtn.addEventListener("click", () => {
    toggleWishlist(prod.id);
    updateWishBtnState();
  });

  // Tab controls
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Submit Review Form
  document.getElementById("review-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("rev-name").value.trim();
    const stars = Number(document.getElementById("rev-stars").value);
    const comment = document.getElementById("rev-comment").value.trim();

    if (!reviews[prod.id]) reviews[prod.id] = [];
    reviews[prod.id].push({ name, stars, comment });
    DB.set("sv_reviews", reviews);

    // Dynamic append to list
    const list = document.getElementById("reviews-list");
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <div class="review-item-header">
        <span class="review-author">${name}</span>
        <span class="review-stars">${"⭐".repeat(stars)}</span>
      </div>
      <p class="text-secondary text-sm">"${comment}"</p>
    `;
    list.prepend(item);

    // Reset fields
    document.getElementById("rev-name").value = "";
    document.getElementById("rev-comment").value = "";
    showToast("Thank you for your verified review response!");
  });

  bindProductCardEvents();
}

// 4. FULL CART PAGE VIEW
function renderCartPage(container) {
  if (!container) container = document.getElementById("main-content");
  document.title = "Your Shopping Cart | STICKIVERSE STUDIO";

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="container section-padding text-center">
        <i class="fa-solid fa-cart-shopping mb-4" style="font-size: 5rem; color: var(--border-color);"></i>
        <h2>Your Cart is Empty</h2>
        <p class="mb-4">Fill it with cyberpunk stickers!</p>
        <a href="#/shop" class="btn btn-primary">Go Shopping</a>
      </div>
    `;
    return;
  }

  let subtotal = 0;
  let cartRows = cart.map(item => {
    subtotal += item.price * item.qty;
    return `
      <div class="cart-table-row">
        <div class="cart-product-cell">
          <img src="${item.image}" alt="${item.title}">
          <div>
            <h4>${item.title}</h4>
            <span class="text-muted small-text">Grade: ${item.variant}</span>
          </div>
        </div>
        <div class="text-center font-bold">₹${item.price}</div>
        <div class="qty-selector" style="justify-content: center;">
          <div class="qty-input-box">
            <button class="dec-qty-page" data-id="${item.id}" data-var="${item.variant}"><i class="fa-solid fa-minus"></i></button>
            <input type="text" value="${item.qty}" readonly style="width:30px;">
            <button class="inc-qty-page" data-id="${item.id}" data-var="${item.variant}"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <div class="text-center font-bold text-success">₹${item.price * item.qty}</div>
        <div class="text-center">
          <button class="remove-page-item" data-id="${item.id}" data-var="${item.variant}" style="color:var(--accent-pink);"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="container">
      <h1 class="mb-4 text-center">Your Cart</h1>
      <div class="cart-layout">
        <!-- Left details -->
        <div class="glass-card cart-table-card">
          <div class="cart-table-header">
            <div>Product</div>
            <div class="text-center">Price</div>
            <div class="text-center">Quantity</div>
            <div class="text-center">Total</div>
            <div></div>
          </div>
          <div class="cart-rows-container">
            ${cartRows}
          </div>
          
          <div class="coupon-section">
            <input type="text" id="coupon-code-input" placeholder="Promo Coupon Code">
            <button id="apply-coupon-btn" class="btn btn-secondary btn-sm">Apply Coupon</button>
          </div>
        </div>

        <!-- Right Summary -->
        <div class="glass-card p-4 h-fit">
          <h3 class="mb-4">Order Summary</h3>
          <div class="cart-summary-row">
            <span>Subtotal:</span>
            <span>₹${subtotal.toFixed(2)}</span>
          </div>
          <div class="cart-summary-row" id="coupon-row" style="display:none;">
            <span>Discount Applied:</span>
            <span class="text-success" id="coupon-amount-display">-₹0.00</span>
          </div>
          <div class="cart-summary-row">
            <span>Shipping:</span>
            <span class="text-success font-bold" id="cart-shipping-fee">FREE Delivery</span>
          </div>
          <div class="cart-summary-row" style="border-top:1px solid var(--border-color); padding-top:15px; margin-top:15px;">
            <span class="font-large font-bold">Grand Total:</span>
            <span class="font-large font-bold text-accent" id="cart-grand-total">₹${subtotal.toFixed(2)}</span>
          </div>
          <a href="#/checkout" class="btn btn-primary w-100 mt-4">Proceed to Secure Checkout</a>
          
          <div class="trust-badges mt-4" style="justify-content:center;">
            <span class="badge-item"><i class="fa-solid fa-shield-halved"></i> Secured Payments</span>
            <span class="badge-item"><i class="fa-solid fa-bolt"></i> Instant UPI Verification</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind actions
  document.querySelectorAll(".dec-qty-page").forEach(btn => {
    btn.addEventListener("click", () => updateCartQty(btn.dataset.id, btn.dataset.var, -1));
  });
  document.querySelectorAll(".inc-qty-page").forEach(btn => {
    btn.addEventListener("click", () => updateCartQty(btn.dataset.id, btn.dataset.var, 1));
  });
  document.querySelectorAll(".remove-page-item").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id, btn.dataset.var));
  });

  // Calculate discounts locally if coupon already applied in localStorage
  let activeCoupon = sessionStore.get("sv_active_coupon", null);
  const recalculateTotal = () => {
    let disc = 0;
    if (activeCoupon) {
      document.getElementById("coupon-row").style.display = "flex";
      if (activeCoupon.discountType === "percentage") {
        disc = (subtotal * activeCoupon.value) / 100;
      } else {
        disc = activeCoupon.value;
      }
      document.getElementById("coupon-amount-display").innerText = `-₹${disc.toFixed(2)}`;
    } else {
      document.getElementById("coupon-row").style.display = "none";
    }

    // Dynamic Shipping Calculations
    const shippingFee = settings.shippingFee !== undefined ? settings.shippingFee : 40;
    const freeShippingMin = settings.freeShippingMin !== undefined ? settings.freeShippingMin : 499;
    const isFreeShipping = subtotal >= freeShippingMin;
    const currentShipping = isFreeShipping ? 0 : shippingFee;

    const shippingFeeEl = document.getElementById("cart-shipping-fee");
    if (shippingFeeEl) {
      if (isFreeShipping) {
        shippingFeeEl.className = "text-success font-bold";
        shippingFeeEl.innerText = "FREE Delivery";
      } else {
        shippingFeeEl.className = "text-secondary font-bold";
        shippingFeeEl.innerText = `₹${shippingFee.toFixed(2)}`;
      }
    }

    let grand = Math.max(0, subtotal - disc) + currentShipping;
    document.getElementById("cart-grand-total").innerText = `₹${grand.toFixed(2)}`;
  };
  recalculateTotal();

  // Coupon binding
  document.getElementById("apply-coupon-btn").addEventListener("click", () => {
    const code = document.getElementById("coupon-code-input").value.trim().toUpperCase();
    const found = coupons.find(c => c.code === code && c.active);
    
    if (found) {
      activeCoupon = found;
      sessionStore.set("sv_active_coupon", found);
      recalculateTotal();
      showToast(`Coupon '${code}' applied successfully!`);
    } else {
      showToast("Invalid or expired coupon code", "error");
    }
  });
}

// Session store simulation helper
const sessionStore = {
  get(key) {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  },
  set(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
  }
};

// 5. CHECKOUT PAGE
function renderCheckoutPage(container) {
  if (!container) container = document.getElementById("main-content");
  document.title = "Checkout | STICKIVERSE STUDIO";

  if (cart.length === 0) {
    window.location.hash = "#/cart";
    return;
  }

  let subtotal = 0;
  cart.forEach(item => subtotal += item.price * item.qty);

  // Apply Coupon
  let discount = 0;
  let activeCoupon = sessionStore.get("sv_active_coupon", null);
  if (activeCoupon) {
    if (activeCoupon.discountType === "percentage") {
      discount = (subtotal * activeCoupon.value) / 100;
    } else {
      discount = activeCoupon.value;
    }
  }

  // Dynamic Shipping Calculations
  const shippingFee = settings.shippingFee !== undefined ? settings.shippingFee : 40;
  const freeShippingMin = settings.freeShippingMin !== undefined ? settings.freeShippingMin : 499;
  const isFreeShipping = subtotal >= freeShippingMin;
  const currentShipping = isFreeShipping ? 0 : shippingFee;

  let grandTotal = subtotal - discount;
  if (grandTotal < 0) grandTotal = 0;
  grandTotal += currentShipping;

  container.innerHTML = `
    <div class="container">
      <h1 class="mb-4 text-center">Secure Checkout</h1>
      <div class="checkout-layout">
        <!-- Billing / shipping Form -->
        <div class="glass-card p-4">
          <form id="checkout-form">
            <h3 class="mb-3">Shipping Information</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="chk-first">First Name *</label>
                <input type="text" id="chk-first" required placeholder="John">
              </div>
              <div class="form-group">
                <label for="chk-last">Last Name *</label>
                <input type="text" id="chk-last" required placeholder="Doe">
              </div>
            </div>
            
            <div class="form-group">
              <label for="chk-email">Email Address *</label>
              <input type="email" id="chk-email" required placeholder="name@example.com" value="${currentUser ? currentUser.email : ""}">
            </div>
            
            <div class="form-group">
              <label for="chk-phone">Mobile Phone Number (UPI Alerts) *</label>
              <input type="tel" id="chk-phone" required placeholder="98765 43210" pattern="[0-9]{10}">
            </div>

            <div class="form-group">
              <label for="chk-address">Shipping Address *</label>
              <textarea id="chk-address" required rows="3" placeholder="Flat/House no, building, street, area"></textarea>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label for="chk-city">City *</label>
                <input type="text" id="chk-city" required placeholder="Bangalore">
              </div>
              <div class="form-group">
                <label for="chk-zip">Postal Pin Code *</label>
                <input type="text" id="chk-zip" required placeholder="560001" pattern="[0-9]{6}">
              </div>
            </div>

            <!-- Online Only Payments Systems -->
            <h3 class="mb-3 mt-4">Secure Online Payments</h3>
            <p class="text-secondary small-text mb-3"><i class="fa-solid fa-lock text-success"></i> Cash on Delivery (COD) is disabled to ensure prompt tracking and secure logistics. Please pay online.</p>
            
            <div class="payment-methods-grid">
              <!-- UPI/FamPay -->
              <div class="payment-method-option active" data-method="UPI">
                <input type="radio" name="payment-method" id="pay-upi" checked>
                <div class="payment-method-details">
                  <span class="payment-method-title"><i class="fa-solid fa-bolt text-success"></i> FamPay / UPI (Recommended)</span>
                  <span class="payment-method-desc">Pay instantly using FamApp, PhonePe, GPay, Paytm, or BHIM.</span>
                </div>
              </div>

              <!-- Cards -->
              <div class="payment-method-option" data-method="CARD">
                <input type="radio" name="payment-method" id="pay-card">
                <div class="payment-method-details">
                  <span class="payment-method-title"><i class="fa-regular fa-credit-card text-primary"></i> Debit / Credit Card</span>
                  <span class="payment-method-desc">Secure processing for RuPay, Visa, and Mastercard cards.</span>
                </div>
              </div>

              <!-- Netbanking & Wallets -->
              <div class="payment-method-option" data-method="OTHER">
                <input type="radio" name="payment-method" id="pay-other">
                <div class="payment-method-details">
                  <span class="payment-method-title"><i class="fa-solid fa-wallet text-secondary"></i> Net Banking / Wallets</span>
                  <span class="payment-method-desc">Pay via Netbanking banks or AmazonPay/Mobikwik wallets.</span>
                </div>
              </div>
            </div>

            <!-- Card inputs wrapper -->
            <div class="card-details-fields" id="card-fields" style="display:none;">
              <div class="form-group form-group-full">
                <label for="card-num">Card Number</label>
                <input type="text" id="card-num" placeholder="4111 2222 3333 4444" pattern="[0-9]{16}">
              </div>
              <div class="form-group">
                <label for="card-exp">Expiry (MM/YY)</label>
                <input type="text" id="card-exp" placeholder="12/28">
              </div>
              <div class="form-group">
                <label for="card-cvv">CVV</label>
                <input type="password" id="card-cvv" placeholder="•••" pattern="[0-9]{3}">
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 mt-4" style="font-size: 1.1rem;">Authorize Payment & Place Order (₹${grandTotal.toFixed(2)})</button>
          </form>
        </div>

        <!-- Right items summary -->
        <div class="glass-card p-4 h-fit">
          <h3 class="mb-3">Your Order</h3>
          <div class="checkout-items" style="max-height: 250px; overflow-y: auto; margin-bottom: 20px; border-bottom: 1px solid var(--border-color);">
            ${cart.map(item => `
              <div class="cart-drawer-item" style="border-bottom:none; margin-bottom:10px; padding-bottom:5px;">
                <div class="cart-item-img" style="width:50px; height:50px;">
                  <img src="${item.image}">
                </div>
                <div class="cart-item-info">
                  <div class="cart-item-title" style="font-size:0.85rem;">${item.title} x${item.qty}</div>
                  <div class="text-secondary small-text">₹${(item.price * item.qty).toFixed(2)}</div>
                </div>
              </div>
            `).join("")}
          </div>

          <div class="cart-summary-row">
            <span>Subtotal:</span>
            <span>₹${subtotal.toFixed(2)}</span>
          </div>
          ${discount > 0 ? `
            <div class="cart-summary-row">
              <span>Coupon Discount:</span>
              <span class="text-success">-₹${discount.toFixed(2)}</span>
            </div>
          ` : ""}
          <div class="cart-summary-row">
            <span>Shipping:</span>
            <span class="${isFreeShipping ? "text-success" : "text-secondary"} font-bold">${isFreeShipping ? "FREE Delivery" : `₹${shippingFee.toFixed(2)}`}</span>
          </div>
          <div class="cart-summary-row" style="border-top:1px solid var(--border-color); padding-top:10px; margin-top:10px;">
            <span class="font-bold">Total to Pay:</span>
            <span class="font-large font-bold text-accent">₹${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Live UPI QR Payment Gateway Dialog Overlay -->
    <div class="gateway-overlay" id="checkout-gateway">
      <div class="gateway-box glass-card">
        <div class="gateway-header">
          <span class="gateway-logo highlight">STICKIVERSE PAY</span>
          <p class="text-secondary small-text">Powered by UPI Merchant Network</p>
        </div>
        
        <p class="text-secondary mb-2">Scan & Pay using any UPI App</p>
        <div class="gateway-amount mb-3">₹${grandTotal.toFixed(2)}</div>
        
        <div class="qr-code-box">
          <img src="" id="gateway-qr-img" alt="Scan QR Code to pay">
        </div>
        
        <div class="timer-box">
          <i class="fa-solid fa-clock-rotate-left"></i> Expires in: <span id="gateway-timer">05:00</span>
        </div>
        
        <p class="small-text text-muted mb-4">Merchant UPI ID: <strong id="gateway-upi-id"></strong></p>
        
        <div class="d-flex gap-2">
          <button class="btn btn-secondary btn-sm w-100" id="gateway-cancel">Cancel Payment</button>
          <button class="btn btn-primary btn-sm w-100" id="gateway-confirm">Confirm Payment</button>
        </div>
      </div>
    </div>
  `;

  // Bind radio toggle card input fields
  const methodOptions = document.querySelectorAll(".payment-method-option");
  const cardFields = document.getElementById("card-fields");
  let selectedMethod = "UPI";

  methodOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      methodOptions.forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      
      const radio = opt.querySelector('input[type="radio"]');
      radio.checked = true;
      selectedMethod = opt.dataset.method;
      
      if (selectedMethod === "CARD") {
        cardFields.style.display = "grid";
      } else {
        cardFields.style.display = "none";
      }
    });
  });

  // Submit checkout form
  const chkForm = document.getElementById("checkout-form");
  chkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Save shipping details
    const shipping = {
      name: `${document.getElementById("chk-first").value} ${document.getElementById("chk-last").value}`,
      email: document.getElementById("chk-email").value.trim(),
      phone: document.getElementById("chk-phone").value.trim(),
      address: document.getElementById("chk-address").value.trim(),
      city: document.getElementById("chk-city").value.trim(),
      zip: document.getElementById("chk-zip").value.trim()
    };

    if (selectedMethod === "UPI") {
      openUPIGateway(grandTotal, shipping);
    } else {
      // Direct mock card payment / netbanking
      showToast("Verifying payment transaction...");
      setTimeout(() => {
        completeOrder("Online Card/NetBanking", shipping, grandTotal);
      }, 2000);
    }
  });
}

// Open UPI Scan Dialog
function openUPIGateway(amount, shipping) {
  const overlay = document.getElementById("checkout-gateway");
  const qrImg = document.getElementById("gateway-qr-img");
  const upiLabel = document.getElementById("gateway-upi-id");
  const timerLabel = document.getElementById("gateway-timer");
  
  overlay.classList.add("active");
  upiLabel.innerText = settings.upiId;

  // Generate REAL UPI URI scheme
  // e.g. upi://pay?pa=recipient@bank&pn=MerchantName&am=Amount&cu=INR
  const upiUri = `upi://pay?pa=${settings.upiId}&pn=${encodeURIComponent(settings.storeName)}&am=${amount.toFixed(2)}&cu=INR&tn=Order%20StickerPack`;
  
  // Set source to dynamic google/api QR generator
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUri)}`;

  // Start 5 min timer
  let remaining = 300;
  const timerInterval = setInterval(() => {
    remaining--;
    const min = Math.floor(remaining / 60).toString().padStart(2, "0");
    const sec = (remaining % 60).toString().padStart(2, "0");
    timerLabel.innerText = `${min}:${sec}`;
    
    if (remaining <= 0) {
      clearInterval(timerInterval);
      overlay.classList.remove("active");
      showToast("UPI Transaction expired. Please check out again.", "error");
    }
  }, 1000);

  // Buttons inside gateway dialog
  const cancelBtn = document.getElementById("gateway-cancel");
  const confirmBtn = document.getElementById("gateway-confirm");

  const cleanup = () => {
    clearInterval(timerInterval);
    overlay.classList.remove("active");
  };

  cancelBtn.onclick = () => {
    cleanup();
    showToast("Transaction cancelled by shopper.", "error");
  };

  confirmBtn.onclick = () => {
    cleanup();
    showToast("Verifying transaction with FamPay API...");
    setTimeout(() => {
      completeOrder("UPI (FamPay)", shipping, amount);
    }, 1500);
  };
}

function completeOrder(payMethod, shipping, amount) {
  // Create order
  const orderId = `STK-${Date.now().toString().slice(-6)}`;
  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString("en-IN"),
    paymentMethod: payMethod,
    shippingDetails: shipping,
    items: [...cart],
    total: amount,
    status: "Paid" // Direct paid status because Online Only checkout
  };

  // Push order & cleanup cart
  orders.push(newOrder);
  DB.set("sv_orders", orders);
  
  cart = [];
  DB.set("sv_cart", cart);
  updateBadges();
  sessionStorage.removeItem("sv_active_coupon");

  // Redirect to order success page
  window.location.hash = `#/order-success/${orderId}`;
}

// 6. ORDER SUCCESS PAGE
function renderOrderSuccessPage(container, orderId) {
  document.title = "Payment Successful | STICKIVERSE STUDIO";
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    container.innerHTML = `
      <div class="container section-padding text-center">
        <h2>Order Not Found</h2>
        <a href="#/" class="btn btn-primary mt-3">Back to Home</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="container">
      <div class="status-box">
        <div class="status-icon status-success-icon">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h1 class="highlight">Order Placed Successfully!</h1>
        <p class="text-secondary mt-2">Thank you for supporting STICKIVERSE STUDIO. Your payment was verified instantly.</p>
        
        <div class="glass-card order-details-card">
          <h3 class="mb-3 text-center">Order Confirmation Details</h3>
          <div class="order-meta-grid">
            <div><strong>Order Reference ID:</strong> <span class="text-accent font-bold">${order.id}</span></div>
            <div><strong>Transaction Status:</strong> <span class="badge-item bg-success text-success" style="display:inline-flex;"><i class="fa-solid fa-circle-check"></i> Verified Paid</span></div>
            <div><strong>Total Paid:</strong> ₹${order.total.toFixed(2)}</div>
            <div><strong>Payment Mode:</strong> ${order.paymentMethod}</div>
          </div>
          <div class="mt-3">
            <strong>Delivery Ship Address:</strong>
            <p class="text-secondary text-sm mt-1">${order.shippingDetails.name}<br>${order.shippingDetails.address}, ${order.shippingDetails.city} - ${order.shippingDetails.zip}</p>
          </div>
        </div>

        <div class="d-flex gap-2" style="justify-content:center;">
          <a href="#/dashboard" class="btn btn-secondary">Track Orders</a>
          <a href="#/shop" class="btn btn-primary">Keep Shopping</a>
        </div>
      </div>
    </div>
  `;
}

// 7. USER ACCOUNTS DASHBOARD
function renderDashboard(container, queryParams) {
  document.title = "User Dashboard | STICKIVERSE STUDIO";
  
  if (!currentUser) {
    container.innerHTML = `
      <div class="container section-padding text-center">
        <h2>Please Login</h2>
        <p>Access your dashboard page to track your custom sticker purchases.</p>
        <button id="dashboard-trigger-login" class="btn btn-primary mt-3">Login / Register</button>
      </div>
    `;
    document.getElementById("dashboard-trigger-login").onclick = () => {
      document.getElementById("auth-modal").classList.add("active");
    };
    return;
  }

  const userOrders = orders.filter(o => o.shippingDetails.email.toLowerCase() === currentUser.email.toLowerCase());
  
  let ordersRows = userOrders.map(o => `
    <tr>
      <td class="font-bold text-accent">${o.id}</td>
      <td>${o.date}</td>
      <td>₹${o.total.toFixed(2)}</td>
      <td>${o.paymentMethod}</td>
      <td><span class="stock-status stock-in" style="background-color:rgba(16, 185, 129, 0.15); color:var(--accent-green);"><i class="fa-solid fa-box"></i> Packed & Paid</span></td>
    </tr>
  `).join("");

  if (userOrders.length === 0) {
    ordersRows = `<tr><td colspan="5" class="text-center text-muted">You haven't made any transactions yet.</td></tr>`;
  }

  container.innerHTML = `
    <div class="container">
      <h1 class="mb-4">Welcome back, ${currentUser.name}!</h1>
      
      <div class="dashboard-layout">
        <!-- Menu -->
        <aside class="dashboard-menu">
          <div class="dashboard-menu-item active" data-panel="panel-orders"><i class="fa-solid fa-box"></i> Order History</div>
          <div class="dashboard-menu-item" data-panel="panel-profile"><i class="fa-solid fa-address-card"></i> Profile Details</div>
          <div class="dashboard-menu-item" id="dashboard-logout" style="color:var(--accent-pink);"><i class="fa-solid fa-right-from-bracket"></i> Logout</div>
        </aside>

        <!-- Content Panels -->
        <div class="dashboard-content-area">
          
          <!-- Orders Panel -->
          <div class="dashboard-panel active glass-card p-4" id="panel-orders">
            <h3 class="mb-3">Purchased Order History</h3>
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Amount Paid</th>
                    <th>Payment Mode</th>
                    <th>Shipping Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${ordersRows}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Profile Details Panel -->
          <div class="dashboard-panel glass-card p-4" id="panel-profile">
            <h3 class="mb-3">Your Profile Details</h3>
            <div class="form-group">
              <label>Full Registered Name</label>
              <input type="text" value="${currentUser.name}" readonly>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="text" value="${currentUser.email}" readonly>
            </div>
            <p class="text-secondary small-text"><i class="fa-solid fa-info-circle"></i> Profile information is managed securely inside browser LocalStorage metadata.</p>
          </div>

        </div>
      </div>
    </div>
  `;

  // Bind Menu
  document.querySelectorAll(".dashboard-menu-item").forEach(item => {
    if (item.id === "dashboard-logout") return;
    item.addEventListener("click", () => {
      document.querySelectorAll(".dashboard-menu-item").forEach(m => m.classList.remove("active"));
      document.querySelectorAll(".dashboard-panel").forEach(p => p.classList.remove("active"));

      item.classList.add("active");
      document.getElementById(item.dataset.panel).classList.add("active");
    });
  });

  // Logout
  document.getElementById("dashboard-logout").onclick = () => {
    localStorage.removeItem("sv_user");
    showToast("Logged out successfully.");
    window.location.hash = "#/";
    setTimeout(() => location.reload(), 500);
  };
}

// 8. WISHLIST VIEW
function renderWishlistPage(container) {
  document.title = "Your Wishlist | STICKIVERSE STUDIO";
  
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="container section-padding text-center">
        <i class="fa-regular fa-heart mb-4" style="font-size: 5rem; color: var(--border-color);"></i>
        <h2>Your Wishlist is Empty</h2>
        <p class="mb-4">Tap the heart icon on any sticker pack to save it here.</p>
        <a href="#/shop" class="btn btn-primary">Go Shopping</a>
      </div>
    `;
    return;
  }

  const wishProds = products.filter(p => wishlist.includes(p.id));
  let wishGridHtml = wishProds.map(p => renderProductCardHtml(p)).join("");

  container.innerHTML = `
    <div class="container">
      <h1 class="mb-4 text-center">My Wishlist</h1>
      <div class="product-grid">
        ${wishGridHtml}
      </div>
    </div>
  `;

  bindProductCardEvents();
}

// 9. FAQ VIEW
function renderFAQPage(container) {
  document.title = "Help & FAQ | STICKIVERSE STUDIO";
  
  container.innerHTML = `
    <div class="container">
      <h1 class="text-center mb-4">Frequently Asked Questions</h1>
      <div class="faq-list">
        <div class="faq-item">
          <div class="faq-question">What payment methods do you support? <i class="fa-solid fa-chevron-down"></i></div>
          <div class="faq-answer">
            We support online payments inside India, including FamPay (FamApp), UPI (PhonePe, GPay, Paytm), all major Debit/Credit Cards (RuPay, Visa, Mastercard), and Wallets. Cash on Delivery is disabled.
          </div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Are the stickers waterproof and scratchproof? <i class="fa-solid fa-chevron-down"></i></div>
          <div class="faq-answer">
            Yes! All our sticker packs are printed on premium heavy vinyl sheets with a top-grade UV laminate protection layer. They are 100% waterproof, weather-resistant, and won't scratch or peel under normal conditions.
          </div>
        </div>
        <div class="faq-item">
          <div class="faq-question">How long does shipping take and what are the charges? <i class="fa-solid fa-chevron-down"></i></div>
          <div class="faq-answer">
            Standard shipping is ₹${settings.shippingFee.toFixed(2)} (completely FREE for orders above ₹${settings.freeShippingMin.toFixed(2)}). Orders are shipped within 24-48 hours. Delivery takes 3-5 business days depending on your locality.
          </div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Can I remove the stickers without residue? <i class="fa-solid fa-chevron-down"></i></div>
          <div class="faq-answer">
            Absolutely. We use high-tack, bubble-free, removable adhesive that leaves zero sticky residue on laptops, skateboards, or phone covers when peeled.
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind FAQ accordions
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      item.classList.toggle("active");
    });
  });
}

// 10. BLOG SECTION
function renderBlogList(container) {
  document.title = "Studio Blog | STICKIVERSE STUDIO";
  
  let blogCardsHtml = blogs.map(b => `
    <div class="blog-card">
      <div class="blog-card-img">
        <img src="${b.image}" alt="${b.title}">
      </div>
      <div class="blog-card-content">
        <div class="blog-card-meta">
          <span><i class="fa-regular fa-calendar"></i> ${b.date}</span>
          <span><i class="fa-regular fa-user"></i> ${b.author}</span>
        </div>
        <h3 class="blog-card-title">${b.title}</h3>
        <p class="blog-card-excerpt">${b.excerpt}</p>
        <a href="#/blog/${b.id}" class="blog-card-link">Read Full Article <i class="fa-solid fa-arrow-right-long"></i></a>
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="container">
      <h1 class="text-center mb-4">Studio Blog</h1>
      <p class="text-center text-secondary mb-5" style="max-width: 600px; margin: 0 auto;">Read design tutorials, laptop stickering guides, and insights from the STICKIVERSE STUDIO design team.</p>
      <div class="blog-grid">
        ${blogCardsHtml}
      </div>
    </div>
  `;
}

function renderBlogPost(container, id) {
  const post = blogs.find(b => b.id === Number(id));
  if (!post) {
    container.innerHTML = `
      <div class="container section-padding text-center">
        <h2>Article Not Found</h2>
        <a href="#/blog" class="btn btn-primary mt-3">Back to Blog</a>
      </div>
    `;
    return;
  }

  document.title = `${post.title} | STICKIVERSE STUDIO`;

  container.innerHTML = `
    <div class="container">
      <div class="blog-post-container">
        <a href="#/blog" class="text-secondary small-text font-bold mb-3 d-inline-block"><i class="fa-solid fa-chevron-left"></i> Back to Blog list</a>
        <div class="blog-post-header">
          <h1 class="highlight">${post.title}</h1>
          <div class="blog-post-meta">
            <span><i class="fa-regular fa-calendar"></i> Published: ${post.date}</span>
            <span><i class="fa-regular fa-user"></i> By: ${post.author}</span>
          </div>
        </div>
        
        <div class="main-image-container mb-4" style="aspect-ratio: 16/9; background-color: var(--bg-secondary);">
          <img src="${post.image}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>

        <div class="blog-post-content text-secondary">
          ${post.content}
        </div>
      </div>
    </div>
  `;
}

// 11. INFORMATIONAL ABOUT
function renderAboutPage(container) {
  document.title = "Our Story | STICKIVERSE STUDIO";
  container.innerHTML = `
    <div class="container">
      <div class="blog-post-container" style="max-width:800px;">
        <h1 class="text-center mb-4 highlight">Our Story</h1>
        <p class="text-secondary mb-4 text-center">STICKIVERSE STUDIO is a futuristic brand crafting high-definition stickers that showcase your personal rebel stance.</p>
        
        <div class="main-image-container mb-4" style="aspect-ratio: 16/9;">
          <img src="assets/hero_banner.png" style="width:100%; height:100%; object-fit:cover;">
        </div>

        <h3 class="mb-3">Who We Are</h3>
        <p class="text-secondary mb-4">Born from a group of digital creators, designers, and terminal developers, STICKIVERSE STUDIO is dedicated to creating premium sticker merchandise. We grew tired of boring, generic, paper sticker designs that leave massive sticky residues on high-end laptops. We resolved to make premium sticker packs designed to stand out.</p>

        <h3 class="mb-3">Uncompromising Premium Grade</h3>
        <p class="text-secondary mb-4">Our products are engineered with heavy die-cut custom contours, color-shifting foils (holographic cosmos), and waterproof laminations. We manage payments completely online via secure UPI configurations linked with FamPay accounts to offer our community a flawless India-wide shopping experience with zero-charge delivery shipping.</p>
      </div>
    </div>
  `;
}

// 12. CONTACT PAGE
function renderContactPage(container) {
  document.title = "Contact Support | STICKIVERSE STUDIO";
  container.innerHTML = `
    <div class="container">
      <h1 class="text-center mb-4">Get in Touch</h1>
      <div class="contact-grid">
        <!-- Contact details -->
        <div class="glass-card p-4 contact-info">
          <h3>Contact STICKIVERSE STUDIO</h3>
          <p class="text-secondary">Have custom printing inquiries, bulk order questions, or need support with your online UPI FamPay order? Our support team is here to assist.</p>
          
          <div class="contact-info-item mt-4">
            <i class="fa-solid fa-envelope"></i>
            <div>
              <strong>Email Support</strong>
              <p class="text-secondary">${settings.email}</p>
            </div>
          </div>

          <div class="contact-info-item">
            <i class="fa-solid fa-phone"></i>
            <div>
              <strong>Phone Helpline</strong>
              <p class="text-secondary">${settings.phone}</p>
            </div>
          </div>

          <div class="contact-info-item">
            <i class="fa-solid fa-location-dot"></i>
            <div>
              <strong>Studio Address</strong>
              <p class="text-secondary">${settings.address}</p>
            </div>
          </div>

          <div class="contact-info-item">
            <i class="fa-brands fa-instagram text-accent" style="font-size:1.3rem;"></i>
            <div>
              <strong>Instagram Handle</strong>
              <p class="text-secondary"><a href="https://instagram.com/stickiverse_studio" target="_blank" class="text-accent">@stickiverse_studio</a></p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="glass-card p-4">
          <form id="contact-form">
            <h3>Send Message</h3>
            <div class="form-group mt-3">
              <label for="con-name">Your Full Name</label>
              <input type="text" id="con-name" required placeholder="John Doe">
            </div>
            <div class="form-group">
              <label for="con-email">Email Address</label>
              <input type="email" id="con-email" required placeholder="name@example.com">
            </div>
            <div class="form-group">
              <label for="con-msg">Message Description</label>
              <textarea id="con-msg" required rows="4" placeholder="How can we help your setup?"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-3">Send Support Request</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Message sent successfully! Our creative team will respond within 24 hours.");
    document.getElementById("con-name").value = "";
    document.getElementById("con-email").value = "";
    document.getElementById("con-msg").value = "";
  });
}

// 13. LEGAL POLICIES PAGE
function renderPolicyPage(container, title, key) {
  document.title = `${title} | STICKIVERSE STUDIO`;

  let policyText = "";
  if (key === "privacy") {
    policyText = `
      <p>At STICKIVERSE STUDIO, accessible from index.html routing, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by STICKIVERSE STUDIO and how we use it.</p>
      <h3 class="mt-4 mb-3">LocalStorage Database</h3>
      <p>We use LocalStorage on your machine to save shopping cart configurations, profiles, and order status histories. No user profiles are shared with third-party vendors except transaction processors.</p>
      <h3 class="mt-4 mb-3">Payment Processing Security</h3>
      <p>All online transaction pathways (UPI QR codes, cards, and wallets) are handled securely. We do not store credit card credentials on our servers. Transactions proceed directly through secure merchant UPI setups (connected with FamPay).</p>
    `;
  } else if (key === "terms") {
    policyText = `
      <p>Welcome to STICKIVERSE STUDIO!</p>
      <p>These terms and conditions outline the rules and regulations for the use of STICKIVERSE STUDIO's Website.</p>
      <h3 class="mt-4 mb-3">Online Ordering</h3>
      <p>By placing an order on our shop catalog, you warrant that you are resident in India and that payment is processed via verified online gateways. Cash on Delivery is not supported. All mock custom details are synchronized inside LocalStorage.</p>
    `;
  } else if (key === "refund") {
    policyText = `
      <h3 class="mb-3">Returns & Replacements</h3>
      <p>We stand behind the premium vinyl grade of our stickers. If your sticker pack arrives damaged, bent, or with defects, you are eligible for a 100% free replacement or full refund within 7 days of receiving the package.</p>
      <h3 class="mt-4 mb-3">Refund Procedure</h3>
      <p>Contact support at ${settings.email} with your order reference ID (e.g. STK-xxxxxx) and a photo of the defect. Approved refunds are credited directly back to your original source of payment (UPI/FamPay or original bank account) within 3-5 business days.</p>
    `;
  } else {
    policyText = `
      <h3 class="mb-3">India-wide Shipping & Rates</h3>
      <p>We provide standard India-wide shipping for <strong class="text-accent">₹${settings.shippingFee.toFixed(2)}</strong>. You can unlock 100% FREE delivery shipping on all orders with a subtotal of <strong class="text-success">₹${settings.freeShippingMin.toFixed(2)}</strong> or more.</p>
      <h3 class="mt-4 mb-3">Dispatch & Timelines</h3>
      <p>All sticker packs are packed securely in rigid cardboard envelopes to avoid bending during transit. Orders are dispatched within 24-48 business hours. Average delivery times: Metro cities (2-3 business days), rest of India (4-5 business days). You can track your order status in your User Dashboard.</p>
    `;
  }

  container.innerHTML = `
    <div class="container">
      <div class="blog-post-container" style="max-width:800px;">
        <h1 class="text-center mb-4 highlight">${title}</h1>
        <div class="glass-card p-4 text-secondary line-height-lg">
          ${policyText}
        </div>
      </div>
    </div>
  `;
}

// --- Init Event Bindings ---
window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
  initAppLayout();
  updateBadges();
  router();
});

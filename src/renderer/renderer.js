// --- Simple in-memory state ---
const TAX_RATE = 0.07; // 7%
let carts = [];
let activeCartIndex = 0;
const STORAGE_KEY = 'retailpro_carts';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data.carts)) {
        carts = data.carts;
        activeCartIndex = data.activeCartIndex || 0;
      }
    }
  } catch (err) {
    console.error('Failed to load state', err);
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ carts, activeCartIndex })
    );
  } catch (err) {
    console.error('Failed to save state', err);
  }
}


// Demo products
const PRODUCTS = [
  {
    id: 'apples',
    name: 'Organic Apples',
    price: 2.99,
    unit: '/lb',
    category: 'Produce',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFS9-2ho8rNxqGfqcEg-M5Q_mt6NSi9dFx3GgzYDRWGPGb1ZowObqtUd3VZvehFYi-PQ5lNc0bFcRgGdaA32spDO3F9F8LHLGYriDNEEse6lhTSMVV5y1jIxvj7wEpuIcd1L-BOk1CbWIxEFw71-pbJHm6et2mzBgfmR9FRZLL1VaZPpFCGE8MQB_YqbpD7gL6BO6HJNOcFAAy9EWz0uuW6V-emoIKscGYCGXr4lEM2vyq8nfrVq2aACweg4CjRXlPw-VE4zWWoFcN'
  },
  { id: 'milk', name: 'Whole Milk', price: 3.49, unit: '', category: 'Groceries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSkt6gSoc__L4-PXNj-f5JWAnccJfKkHgxExT6EpPcP3eU_YIGGuJh_es3nxfxwctHLJprj7TImoaquV76H54hq1xjyqrvfndtYqTtGDvc5agN9kjmliskFa4qnp_Dz-uw9rcJzPCag2YM-jUL-TOBr58kcFYBoqH_9CtpSO-I3L_cO5_zSlVqUiLvC08UlAZ20j5NYg3YfVIgyNx9MYh_yhsgOigsbSiDRuY7AJ25ySxah1x1z3nl39f4hoMlvmFjVlJQO9Nm6UtC' },
  { id: 'bread', name: 'Artisan Bread', price: 4.99, unit: '', category: 'Bakery', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGCH_vpCkkYV5uPq3YhyjM_8N6AE3kMPd4yYPg_Uw4JT4_vZUMqxT2AvD8SJTvnVvlS4zZSzrQykk0OyolmKOH8UE001e9W5eu3Z-O2TVLtn2mS7n604ubZRB85OLeUC4YHPxJnoawwabN9zCz6uBV0yWlTJiSkvscV4OdJ0sSPp9Xf6wH9UEnoQlLN7Lxy91TIb9V8xHguZA3bvYsubPPwbDzW9ce_gjCNCwmBHeZFCuVdqCLxim5ex3HyzvlYC-JC2HI-J1whP4U' },
  { id: 'eggs', name: 'Free-Range Eggs', price: 5.99, unit: '/dozen', category: 'Groceries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXPi62DBm8LAWsbelUqp4ANDUuUfGTQrcGbHMIAVTFZOXVaCpUhJDQ0kXUsusfeCuXvNrIZTarmJEi4dRGlHfZI1AnW9eAG17J0TQUQSh0WlHozd56AdqW2uLD7RyRd-LZcIDT_Nq-2WwK-9Nb6UqWs_8CUmGh_sTw-O8_qVblw_VluLX5rvmHLZLK7LHSoTeKWGY1qGwomGGjom_fdDrADtVBdJ1UgZ14v05EkT2clK9d3dNtQZ9pAZW3NNL_htIchpSJzgVwMT6i' },
  { id: 'avocado', name: 'Avocados', price: 1.79, unit: ' each', category: 'Produce', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcpFln4DIrg5vMacn-44LZ2kBBwQ0bPaiV2LDkjAZ44L6dN3PIdhgE_vGi1LKSCMEecL-wj4as0dEO_00MN7KmdV37qj5J3CYcZvpxwxDKclEgkToxZR52thzrbRMQsHDhTKOv3uChkx356EOQVEpjpEMgoJ83_TF-Sq39tjzh47XxyRvr9GgBW9ziQ9gAQVgQDDZCS_8dleb4kxc5YXLt7zP7YqwyjIou_Y5QXFozFvcGHEdY0yxui7Pv-qgzdrDRGK9eCwdAIcYk' },
  { id: 'honey', name: 'Local Honey', price: 8.99, unit: '', category: 'Groceries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyGzn-ewbKXMrZlBnKz_peGHyP3ZhOFL00sj_-L3T1suBVskSMlUyoKpIXiSPgMf2ddA2_0WTxT4yogTzdmohO7LkdIovWvV33NQdSVC4I6yjrsCCoWCzVlRD9zVBpCdF0if3w98u_r70VUD4bgO6F2I163AuIXbp1xdSXQr5iFe8S654ApQj4C1X5HmWmJjEbyCEITUGJYBH9zIXZLbAIgJCesQUqceMtpWjPj-Kc67_k8ZxKml2BQiHXMH3h5n2bdQPb4CmjL4Hw' },
  { id: 'beer', name: 'Craft Beer', price: 12.99, unit: '/6-pack', category: 'Groceries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQu7OnoC3nuo4eRltYfWVWRDMtnreHz16ysA8zHfChT9aPr9w6h8VBYIESJh4Q0-g7HgSHmEDOnNwkrQ71LcfUWU405a4wsMQwz-qfZpSvXPiJ-nbDJ6nI9sc09mMKwos124AAuuHRJ34XcOV-INJpWEOwNqgU5n53C8DAvCzKsItF4O7rDPNwsogXwChbIYJujApdejWn-VjLLfOeSMO7zug0HD4GRXAUYOK91stuQq_4mPVbRXEneWkoLds9P6Xx50UEOxdmQfhy' },
  { id: 'salmon', name: 'Fresh Salmon', price: 14.99, unit: '/lb', category: 'Groceries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxePp8VD-hk5JLLDm-9JXeMlbQZhlMLVkQlQbLxhP6XroRiAApUaR61DOppK2QNvhrXGaDivabD6TQjjr2Vq9yOzJ-fqDmVoWldlscz6T7YQCa0N3E_WN_D7xy3-rF5iChh5NVGiNrNrEvjsJQKgLEoiXxsjwG7A9cSzW4GI0Mc0hxsX1Fbi_sMmVwAfe6elKyZSgxXRw9NE5ORpoh-ssVNmwKNg2eq_Kud5X-YYJ21iLhmAFEki4EBwuv-6sqf5NvbY6YOQrT36fy' }
];

// --- DOM refs ---
const cartTabs = document.getElementById('cartTabs');
const productGrid = document.getElementById('productGrid');
const cartItemsEl = document.getElementById('cartItems');
const totalsEl = document.getElementById('totals');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const themeToggle = document.getElementById('themeToggle');

// --- Helpers ---
const money = (n) => `$${n.toFixed(2)}`;

function makeEmptyCart() { return { id: crypto.randomUUID(), name: '', items: {} }; }

function ensureAtLeastOneCart() {
  if (carts.length === 0) {
    carts.push(makeEmptyCart());
    activeCartIndex = 0;
  }
}

function setActiveCart(index) {
  activeCartIndex = index;
  renderTabs();
  renderCart();
  saveState();
}

function addNewCart() {
  carts.push(makeEmptyCart());
  setActiveCart(carts.length - 1);
}

function addToCart(productId, qty = 1) {
  const cart = carts[activeCartIndex];
  cart.items[productId] = (cart.items[productId] || 0) + qty;
  renderCart();
  renderTabs();
  saveState();
}

function updateQty(productId, qty) {
  const cart = carts[activeCartIndex];
  if (qty <= 0) delete cart.items[productId];
  else cart.items[productId] = qty;
  renderCart();
  renderTabs();
  saveState();
}

function removeFromCart(productId) {
  const cart = carts[activeCartIndex];
  delete cart.items[productId];
  renderCart();
  renderTabs();
  saveState();
}

function calcTotals(cart) {
  let subtotal = 0;
  Object.entries(cart.items).forEach(([pid, q]) => {
    const p = PRODUCTS.find((x) => x.id === pid);
    if (p) subtotal += p.price * q;
  });
  const tax = subtotal * TAX_RATE;
  const discounts = 0;
  const grand = subtotal + tax - discounts;
  return { subtotal, tax, discounts, grand };
}

function filteredProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  return PRODUCTS.filter((p) => {
    const okTerm = !term || p.name.toLowerCase().includes(term);
    const okCat = cat === 'all' || p.category === cat;
    return okTerm && okCat;
  });
}

// --- Renderers ---
function renderTabs() {
  cartTabs.innerHTML = '';

  carts.forEach((cart, idx) => {
    const { grand } = calcTotals(cart);
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = (idx === activeCartIndex)
      ? 'border-[var(--primary-500)] text-[var(--primary-500)] whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold flex items-center'
      : 'border-transparent text-neutral-400 hover:border-neutral-600 hover:text-neutral-300 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium';
    btn.innerHTML = `Cart ${idx + 1} ${idx === activeCartIndex ? `<span class="ml-1 rounded-md bg-blue-900/50 px-2 py-0.5 text-xs text-[var(--primary-500)]">${money(grand)}</span>` : ''}`;
    btn.addEventListener('click', (e) => { e.preventDefault(); setActiveCart(idx); });
    cartTabs.appendChild(btn);
  });

  const newBtn = document.createElement('button');
  newBtn.className = 'flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-neutral-400 hover:bg-neutral-800';
  newBtn.innerHTML = `<svg fill="currentColor" height="16" viewBox="0 0 256 256" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg> New Cart`;
  newBtn.addEventListener('click', addNewCart);
  cartTabs.appendChild(newBtn);
}

function renderProducts() {
  const products = filteredProducts();
  productGrid.innerHTML = '';
  products.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer rounded-lg border border-transparent p-2 hover:border-[var(--primary-500)] hover:bg-neutral-700/50 hover:shadow-md';
    card.innerHTML = `
      <div class="aspect-square w-full overflow-hidden rounded-md bg-neutral-700">
        <img alt="${p.name}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" src="${p.image}"/>
      </div>
      <div class="mt-2">
        <p class="truncate text-sm font-medium text-neutral-200">${p.name}</p>
        <p class="text-xs text-neutral-400">${money(p.price)}${p.unit}</p>
      </div>`;
    card.addEventListener('click', () => addToCart(p.id, 1));
    productGrid.appendChild(card);
  });
}

function renderCart() {
  const cart = carts[activeCartIndex];
  cartItemsEl.innerHTML = '';

  Object.entries(cart.items).forEach(([pid, qty]) => {
    const p = PRODUCTS.find((x) => x.id === pid);
    if (!p) return;
    const row = document.createElement('div');
    row.className = 'flex items-center gap-4';
    row.innerHTML = `
      <img alt="${p.name} in cart" class="h-14 w-14 rounded-md object-cover" src="${p.image}"/>
      <div class="flex-1">
        <p class="font-medium text-neutral-200">${p.name}</p>
        <div class="flex items-center gap-2 text-sm text-neutral-400">
          <button class="dec rounded-md bg-neutral-700 px-2 py-1 hover:bg-neutral-600" title="Decrease">−</button>
          <input type="number" min="0" value="${qty}" class="qty w-16 rounded-md border-neutral-600 bg-neutral-700 text-center text-sm text-neutral-200 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]"/>
          <button class="inc rounded-md bg-neutral-700 px-2 py-1 hover:bg-neutral-600" title="Increase">+</button>
          <span>x ${money(p.price)}</span>
        </div>
      </div>
      <p class="font-medium text-neutral-200">${money(p.price * qty)}</p>
      <button class="remove text-neutral-500 hover:text-red-500" title="Remove item">
        <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,208H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
      </button>
    `;

    const qtyInput = row.querySelector('.qty');
    row.querySelector('.dec').addEventListener('click', () => {
      const newQty = Math.max(0, (parseInt(qtyInput.value, 10) || 0) - 1);
      qtyInput.value = newQty;
      updateQty(pid, newQty);
    });
    row.querySelector('.inc').addEventListener('click', () => {
      const newQty = (parseInt(qtyInput.value, 10) || 0) + 1;
      qtyInput.value = newQty;
      updateQty(pid, newQty);
    });
    qtyInput.addEventListener('change', (e) => {
      const newQty = Math.max(0, parseInt(e.target.value, 10) || 0);
      updateQty(pid, newQty);
    });

    row.querySelector('.remove').addEventListener('click', () => removeFromCart(pid));
    cartItemsEl.appendChild(row);
  });

  const { subtotal, tax, discounts, grand } = calcTotals(cart);
  totalsEl.innerHTML = `
    <div class="flex justify-between text-sm"><p class="text-neutral-400">Subtotal</p><p class="font-medium text-neutral-200">${money(subtotal)}</p></div>
    <div class="flex justify-between text-sm"><p class="text-neutral-400">Tax (7%)</p><p class="font-medium text-neutral-200">${money(tax)}</p></div>
    <div class="flex justify-between text-sm"><p class="text-neutral-400">Discounts</p><p class="font-medium text-green-500">${money(discounts)}</p></div>
    <div class="flex justify-between border-t border-neutral-700 pt-2 text-lg font-bold"><p>Grand Total</p><p>${money(grand)}</p></div>
  `;
}

// --- Events ---
searchInput.addEventListener('input', renderProducts);
categoryFilter.addEventListener('change', renderProducts);
if (themeToggle) themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  applyTheme(isLight ? 'dark' : 'light');
});

// --- Init ---
loadTheme();
loadState();
ensureAtLeastOneCart();
renderTabs();
renderProducts();
renderCart();
saveState();

const PRODUCTS_URL = 'products.json'
const CART_KEY = 'ngw-cart'

async function loadProducts(){
  const res = await fetch(PRODUCTS_URL)
  return res.json()
}

function formatPrice(n){return n.toFixed(2)}

function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || {} }catch(e){return {}}
}

function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartUI(); }

function addToCart(id){
  const cart = getCart()
  cart[id] = (cart[id]||0)+1
  saveCart(cart)
}

function removeFromCart(id){
  const cart = getCart()
  delete cart[id]
  saveCart(cart)
}

function clearCart(){ localStorage.removeItem(CART_KEY); updateCartUI(); }

function updateCartUI(){
  const cart = getCart();
  const count = Object.values(cart).reduce((s,v)=>s+v,0)
  document.getElementById('cart-count').textContent = count
}

function openCart(){
  document.getElementById('cart-modal').setAttribute('aria-hidden','false')
  renderCartItems()
}

function closeCart(){ document.getElementById('cart-modal').setAttribute('aria-hidden','true') }

async function renderProducts(){
  const products = await loadProducts()
  const root = document.getElementById('products')
  root.innerHTML = ''
  products.forEach(p=>{
    const el = document.createElement('article')
    el.className = 'card'
    el.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <strong>$${formatPrice(p.price)}</strong>
        <button data-id="${p.id}">Add</button>
      </div>`
    el.querySelector('button').addEventListener('click',()=>{ addToCart(p.id); })
    root.appendChild(el)
  })
}

async function renderCartItems(){
  const cart = getCart()
  const products = await loadProducts()
  const itemsRoot = document.getElementById('cart-items')
  itemsRoot.innerHTML = ''
  let total = 0
  for(const [idStr,qty] of Object.entries(cart)){
    const id = Number(idStr)
    const p = products.find(x=>x.id===id)
    if(!p) continue
    total += p.price*qty
    const item = document.createElement('div')
    item.className = 'cart-item'
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between"><strong>${p.name}</strong><span>$${formatPrice(p.price)}</span></div>
        <div style="font-size:.9rem;color:#666">Qty: ${qty}</div>
      </div>
      <div>
        <button data-id="${p.id}" class="remove">Remove</button>
      </div>`
    item.querySelector('.remove').addEventListener('click',()=>{ removeFromCart(p.id) })
    itemsRoot.appendChild(item)
  }
  document.getElementById('cart-total').textContent = formatPrice(total)
}

document.addEventListener('click', (e)=>{
  if(e.target.id === 'cart-btn') openCart()
  if(e.target.id === 'close-cart') closeCart()
  if(e.target.id === 'clear-cart') clearCart()
  if(e.target.id === 'checkout'){
    const cart = getCart();
    if(Object.keys(cart).length===0){ alert('Cart is empty') ; return }
    alert('Order placed! (demo)')
    clearCart()
    closeCart()
  }
})

window.addEventListener('storage', updateCartUI)
window.addEventListener('load', async ()=>{ await renderProducts(); updateCartUI(); })

import type { Product, CategoryInfo } from '../types'

export const PRODUCTS: Product[] = [
  { id:1, name:'Samsung Galaxy A54', category:'Smartphones', price:45000, discount:10, emoji:'📱', featured:true, inStock:true, desc:'6.4" Super AMOLED 120Hz display. 50MP triple camera, 5000mAh battery, 8GB RAM + 256GB storage.', specs:{ Display:'6.4" Super AMOLED 120Hz', Camera:'50MP + 12MP + 5MP', Battery:'5000 mAh', RAM:'8GB', Storage:'256GB', OS:'Android 13' } },
  { id:2, name:'Tecno Camon 20 Pro', category:'Smartphones', price:28500, emoji:'📱', featured:true, inStock:true, desc:'50MP RGBW AI camera, 6.67" curved AMOLED display, Helio G99 processor, 5000mAh battery.', specs:{ Display:'6.67" Curved AMOLED', Camera:'50MP RGBW AI', Processor:'Helio G99', Battery:'5000 mAh', RAM:'8GB', Storage:'256GB' } },
  { id:3, name:'iPhone 13', category:'Smartphones', price:98000, discount:5, emoji:'📱', featured:true, inStock:true, desc:'A15 Bionic chip, dual 12MP Cinematic mode camera, Ceramic Shield, Super Retina XDR display with 5G.', specs:{ Display:'6.1" Super Retina XDR', Camera:'Dual 12MP + Cinematic', Chip:'A15 Bionic', Battery:'Up to 19hrs', Storage:'128GB', '5G':'Yes' } },
  { id:4, name:'Redmi Note 12', category:'Smartphones', price:22000, emoji:'📱', featured:false, inStock:true, desc:'6.67" OLED 120Hz, 50MP triple camera, 5000mAh + 33W fast charging, Snapdragon 685.', specs:{ Display:'6.67" OLED 120Hz', Camera:'50MP Triple', Processor:'Snapdragon 685', Battery:'5000 mAh + 33W', RAM:'6GB', Storage:'128GB' } },
  { id:5, name:'JBL PartyBox 310', category:'Audio & Woofers', price:52000, discount:15, emoji:'🔊', featured:true, inStock:true, desc:'240W party speaker with built-in light show, IPX4 splashproof, 18-hour battery, TWS pairing.', specs:{ Power:'240W RMS', Battery:'18 hours', 'Water Rating':'IPX4', Connectivity:'Bluetooth 5.1', Inputs:'USB, AUX, Mic', Weight:'16.8 kg' } },
  { id:6, name:'Sony SRS-XB43', category:'Audio & Woofers', price:18500, emoji:'🔊', featured:false, inStock:true, desc:'Extra Bass wireless speaker, IP67 waterproof & dustproof, 24-hour battery, Party Connect.', specs:{ Battery:'24 hours', 'Water Rating':'IP67', Connectivity:'Bluetooth 5.0', 'Extra Bass':'Yes', 'Party Connect':'100 speakers', Weight:'1.4 kg' } },
  { id:7, name:'Vitron V636 Subwoofer', category:'Audio & Woofers', price:8500, emoji:'🔊', featured:false, inStock:true, desc:'6.5" subwoofer with deep bass, USB/AUX/FM connectivity, remote control included.', specs:{ Woofer:'6.5"', Power:'60W RMS', Connectivity:'USB, AUX, FM', Remote:'Yes', Equalizer:'3-Band EQ', Color:'Gloss Black' } },
  { id:8, name:'Samsung 43" Smart TV', category:'TVs & Electronics', price:48000, emoji:'📺', featured:true, inStock:true, desc:'4K UHD, HDR10+, Tizen OS with built-in WiFi, Netflix, YouTube & Prime Video ready.', specs:{ Screen:'43" 4K UHD', HDR:'HDR10+', OS:'Tizen Smart TV', HDMI:'3 ports', WiFi:'Built-in', 'Smart Features':'Netflix, YouTube, Prime' } },
  { id:9, name:'LG 32" LED TV', category:'TVs & Electronics', price:22000, emoji:'📺', featured:false, inStock:true, desc:'32" HD Ready LED, Dolby Audio, 2 HDMI + 2 USB ports, slim bezel, energy certified.', specs:{ Screen:'32" HD Ready', Audio:'Dolby Audio', HDMI:'2 ports', USB:'2 ports', Bezel:'Slim Design', Energy:'Energy Star' } },
  { id:10, name:'65W USB-C GaN Charger', category:'TVs & Electronics', price:2800, emoji:'🔌', featured:false, inStock:true, desc:'Compact 65W GaN charger, 3 ports (USB-C + 2× USB-A), PD 3.0 + QC 4.0 fast charging.', specs:{ Power:'65W GaN', Ports:'1× USB-C + 2× USB-A', 'Fast Charge':'PD 3.0 + QC 4.0', Compatibility:'Universal', Size:'Ultra Compact', Plug:'Foldable' } },
  { id:11, name:'Ramtons Blender', category:'Kitchen Appliances', price:3800, discount:10, emoji:'🥤', featured:false, inStock:true, desc:'600W motor, 1.5L BPA-free jar, stainless steel blades, 3 speeds + pulse function.', specs:{ Power:'600W', Capacity:'1.5 Litres', Blades:'Stainless Steel', Speeds:'3 + Pulse', Jar:'BPA-Free', Warranty:'1 Year' } },
  { id:12, name:'Standing Gas Cooker', category:'Kitchen Appliances', price:28000, emoji:'🍳', featured:true, inStock:true, desc:'4-burner gas cooker with oven, auto-ignition, tempered glass lid, stainless steel, safety valve.', specs:{ Burners:'4', Oven:'Integrated', Ignition:'Auto', Body:'Stainless Steel', Safety:'Flame Failure Device', Color:'Silver / Black' } },
  { id:13, name:'Electric Kettle 1.8L', category:'Kitchen Appliances', price:2200, emoji:'☕', featured:false, inStock:true, desc:'1800W rapid boil, 1.8L stainless steel, auto shut-off, boil-dry protection, 360° base.', specs:{ Power:'1800W', Capacity:'1.8 Litres', 'Auto Shut-off':'Yes', 'Boil-dry Protection':'Yes', Material:'Stainless Steel', Base:'360° Rotational' } },
  { id:14, name:'Persian Carpet 5×8ft', category:'Home & Living', price:12000, emoji:'🏠', featured:false, inStock:true, desc:'Machine-woven Persian-pattern carpet, durable polyester, vibrant fade-resistant colours.', specs:{ Size:'5 × 8 feet', Material:'Premium Polyester', Pattern:'Persian Traditional', Pile:'Medium', 'Anti-slip':'No', Care:'Machine Washable' } },
  { id:15, name:'Shaggy Carpet 6×9ft', category:'Home & Living', price:9500, emoji:'🏠', featured:false, inStock:true, desc:'Ultra-soft high-pile shaggy carpet, non-slip rubber backing, easy to clean.', specs:{ Size:'6 × 9 feet', Material:'Microfiber', Pile:'High Shag 3.5cm', 'Anti-slip':'Rubber Backing', Thickness:'3.5 cm', Care:'Vacuum / Spot Clean' } },
  { id:16, name:'Modern Wall Clock', category:'Home & Living', price:2800, emoji:'🕐', featured:false, inStock:true, desc:'12" minimalist silent quartz clock, non-ticking sweep, battery operated, perfect for any room.', specs:{ Size:'12 inches', Movement:'Silent Quartz Sweep', Battery:'1 × AA', Mechanism:'Non-ticking', Material:'Plastic / Glass', Style:'Minimalist Modern' } },
]

export const CATEGORIES: CategoryInfo[] = [
  { name:'Smartphones', emoji:'📱', desc:'Latest phones & accessories' },
  { name:'Audio & Woofers', emoji:'🔊', desc:'Speakers, subwoofers & sound' },
  { name:'TVs & Electronics', emoji:'📺', desc:'Televisions & gadgets' },
  { name:'Kitchen Appliances', emoji:'🍳', desc:'Cookers, blenders & more' },
  { name:'Home & Living', emoji:'🏠', desc:'Carpets, decor & furniture' },
]

export const WHATSAPP_NUMBER = '254798928060'
export const EMAIL = 'info@edenelectronics.co.ke'
export const PHONE = '+254 798 928 060'

export function finalPrice(product: Product): number {
  return product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price
}

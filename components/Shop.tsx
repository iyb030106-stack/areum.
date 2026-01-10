import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, Search, ShoppingBag, Heart, SlidersHorizontal, Star, Truck, ShieldCheck, X, Trash2, CreditCard, CheckCircle2, Minus, Plus, User, Lock, Mail, MapPin, Phone, LogOut, Camera, BarChart3, Package, Users, MessageSquare, ShoppingCart, Clock, Settings, Edit, Trash } from 'lucide-react';

interface ShopProps {
  onBack: () => void;
}

type Gender = 'women' | 'men';
type ShopView = 'listing' | 'detail' | 'cart' | 'checkout' | 'success' | 'login' | 'signup' | 'admin';

interface Product {
  id: number;
  gender: Gender;
  category: string;
  name: string;
  price: number; // Daily price
  originalPrice: number; // Retail price
  image: string;
  brand: string;
}

interface CartItem extends Product {
  rentalDays: number;
}

// User Interface
interface UserData {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}

// Visitor/User Session Tracking
interface VisitorSession {
  email: string | null;
  startTime: number;
  lastActivity: number;
  pageViews: number;
}

// Order Interface
interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    detailAddress: string;
  };
  orderDate: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

// Customer Service Inquiry
interface CSInquiry {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  subject: string;
  message: string;
  createdAt: number;
  status: 'pending' | 'responded' | 'resolved';
  response?: string;
  respondedAt?: number;
}

const Shop: React.FC<ShopProps> = ({ onBack }) => {
  const [shopView, setShopView] = useState<ShopView>('listing');
  const [gender, setGender] = useState<Gender>('women');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Auth State - Load from localStorage on mount
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('areum_isLoggedIn');
    return saved === 'true';
  });
  const [users, setUsers] = useState<UserData[]>(() => {
    const saved = localStorage.getItem('areum_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('areum_currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Save users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('areum_users', JSON.stringify(users));
  }, [users]);
  
  // Save login state and current user to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('areum_isLoggedIn', isLoggedIn.toString());
    if (currentUser) {
      localStorage.setItem('areum_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('areum_currentUser');
    }
  }, [isLoggedIn, currentUser]);
  
  // Load user's cart when user logs in
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const userCart = localStorage.getItem(`areum_cart_${currentUser.email}`);
      if (userCart) {
        setCart(JSON.parse(userCart));
      } else {
        setCart([]);
      }
    } else if (!isLoggedIn) {
      // 로그아웃 시 장바구니 초기화
      setCart([]);
    }
  }, [isLoggedIn, currentUser]);

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Checkout State - Load from localStorage (user-specific)
  const [cart, setCart] = useState<CartItem[]>(() => {
    // 로그인된 사용자가 있으면 해당 사용자의 장바구니 불러오기
    const saved = localStorage.getItem('areum_currentUser');
    if (saved) {
      const user = JSON.parse(saved);
      const userCart = localStorage.getItem(`areum_cart_${user.email}`);
      return userCart ? JSON.parse(userCart) : [];
    }
    return [];
  });
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [checkoutSource, setCheckoutSource] = useState<'detail' | 'cart'>('detail');
  
  // Wishlist State - Load from localStorage
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('areum_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Save cart to localStorage whenever it changes (user-specific)
  useEffect(() => {
    if (currentUser && isLoggedIn) {
      // 로그인된 사용자의 장바구니만 저장
      localStorage.setItem(`areum_cart_${currentUser.email}`, JSON.stringify(cart));
    }
  }, [cart, currentUser, isLoggedIn]);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('areum_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Checkout Form State
  const [shippingInfo, setShippingInfo] = useState({
      name: '',
      phone: '',
      address: '',
      detailAddress: ''
  });
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);

  // Rental Days State for Detail View
  const [rentalDays, setRentalDays] = useState(1);

  // Toast Notification State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Login/Signup Form State
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
      name: '', email: '', password: '', confirmPassword: '', phone: '', address: '' 
  });
  const [authError, setAuthError] = useState('');

  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Check if current user is admin
  const isAdmin = currentUser?.email === 'areum1004@gmail.com';
  
  // Admin: Visitor Tracking State
  const [visitorSessions, setVisitorSessions] = useState<VisitorSession[]>(() => {
    const saved = localStorage.getItem('areum_visitorSessions');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Admin: Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('areum_orders');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Admin: CS Inquiries State
  const [csInquiries, setCsInquiries] = useState<CSInquiry[]>(() => {
    const saved = localStorage.getItem('areum_csInquiries');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Admin: Product Management State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    gender: 'women',
    category: '',
    name: '',
    price: 0,
    originalPrice: 0,
    image: '',
    brand: ''
  });
  
  // Admin: Current Visitor Session
  const [currentSession, setCurrentSession] = useState<VisitorSession | null>(null);
  
  // Track visitor session
  useEffect(() => {
    const session: VisitorSession = {
      email: currentUser?.email || null,
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: 1
    };
    setCurrentSession(session);
    
    // Update last activity every 30 seconds
    const activityInterval = setInterval(() => {
      setCurrentSession(prev => prev ? { ...prev, lastActivity: Date.now() } : null);
    }, 30000);
    
    return () => clearInterval(activityInterval);
  }, [currentUser]);
  
  // Save visitor session when it changes
  useEffect(() => {
    if (currentSession) {
      const sessions = [...visitorSessions];
      const existingIndex = sessions.findIndex(s => 
        s.email === currentSession.email && 
        Date.now() - s.lastActivity < 300000 // 5분 이내 활동
      );
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = {
          ...sessions[existingIndex],
          lastActivity: currentSession.lastActivity,
          pageViews: sessions[existingIndex].pageViews + 1
        };
      } else {
        sessions.push(currentSession);
      }
      
      setVisitorSessions(sessions);
      localStorage.setItem('areum_visitorSessions', JSON.stringify(sessions));
    }
  }, [currentSession?.lastActivity]);
  
  // Save orders and CS inquiries to localStorage
  useEffect(() => {
    localStorage.setItem('areum_orders', JSON.stringify(orders));
  }, [orders]);
  
  useEffect(() => {
    localStorage.setItem('areum_csInquiries', JSON.stringify(csInquiries));
  }, [csInquiries]);

  // Categories
  const womenCategories = ['전체', '아우터', '셔츠/블라우스', '팬츠', '스커트', '원피스'];
  const menCategories = ['전체', '아우터', '셔츠', '팬츠'];

  const categories = gender === 'women' ? womenCategories : menCategories;

  // --- Data Generation Helper & State ---
  const [products, setProducts] = useState<Product[]>(() => {
    const brands = ['Studio A', 'Silk Road', 'Urban', 'Feminine', 'Office Look', 'Classic', 'Gentle', 'Standard', 'Tailor', 'Soft Touch'];
    
    // Explicitly typed image maps to ensure data integrity
    const womenImages: Record<string, string[]> = {
        '아우터': [
            'https://images.unsplash.com/photo-1554568218-0f1715e72254', // White Coat/Blazer
            'https://images.unsplash.com/photo-1559563458-527698bf5295', // Camel Coat
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', // Grey Blazer
            'https://images.unsplash.com/photo-1544923246-77307dd654cb'  // Beige Trench
        ],
        '셔츠/블라우스': [
            'https://images.unsplash.com/photo-1621335829175-95f437384d7c', // White Blouse
            'https://images.unsplash.com/photo-1604006856573-0d5652514389', // Blue Shirt
            'https://images.unsplash.com/photo-1564257631407-4deb1f99d992', // Clean White Top
            'https://images.unsplash.com/photo-1551163943-3f6a29e39426'  // Patterned Blouse
        ],
        '팬츠': [
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1', // Wide Beige Pants
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', // Jeans
            'https://images.unsplash.com/photo-1620799140408-ed5341cd2431', // White Pants
            'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495'  // Black Pants
        ],
        '스커트': [
            'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa', // Long Skirt
            'https://images.unsplash.com/photo-1582142327373-56d8873c9616', // Denim Skirt
            'https://images.unsplash.com/photo-1623123089602-5321d283ace4', // Pleated Skirt
            'https://images.unsplash.com/photo-1577900232427-18219b9166a0'  // Patterned Skirt
        ],
        '원피스': [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8', // Black Dress
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', // White Dress
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1', // Floral Dress
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c'  // Formal Dress
        ]
    };

    const menImages: Record<string, string[]> = {
        '아우터': [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf', // Suit Jacket
            'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0', // Blazer
            'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2', // Coat
            'https://images.unsplash.com/photo-1548126466-4470dfd3a209'  // Bomber/Casual Jacket
        ],
        '셔츠': [
            'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf', // White Dress Shirt
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c', // Blue Shirt
            'https://images.unsplash.com/photo-1603252109303-2751440ee43d', // Checkered Shirt
            'https://images.unsplash.com/photo-1588359348347-9bc6c5a086c5'  // Pink/Casual Shirt
        ],
        '팬츠': [
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80', // Beige Chinos
            'https://images.unsplash.com/photo-1473966968600-fa801b869a1a', // Grey Trousers
            'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a', // Jeans
            'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7'  // Dark Pants
        ]
    };

    const generatedProducts: Product[] = [];
    let idCounter = 1;

    // Generate Women's Products
    Object.keys(womenImages).forEach(cat => {
        const imgList = womenImages[cat];
        for (let i = 0; i < 12; i++) {
            generatedProducts.push({
                id: idCounter++,
                gender: 'women',
                category: cat,
                name: `${brands[i % brands.length]} ${cat} ${i + 1}`,
                price: 2000 + (Math.floor(Math.random() * 30) * 100), // 2000 ~ 4900 won
                originalPrice: 80000 + (Math.floor(Math.random() * 200) * 1000),
                image: `${imgList[i % imgList.length]}?auto=format&fit=crop&w=800&q=80`,
                brand: brands[i % brands.length]
            });
        }
    });

    // Generate Men's Products
    Object.keys(menImages).forEach(cat => {
        const imgList = menImages[cat];
        for (let i = 0; i < 12; i++) {
            generatedProducts.push({
                id: idCounter++,
                gender: 'men',
                category: cat,
                name: `${brands[i % brands.length]} ${cat} ${i + 1}`,
                price: 2000 + (Math.floor(Math.random() * 30) * 100), // 2000 ~ 4900 won
                originalPrice: 80000 + (Math.floor(Math.random() * 200) * 1000),
                image: `${imgList[i % imgList.length]}?auto=format&fit=crop&w=800&q=80`,
                brand: brands[i % brands.length]
            });
        }
    });

    return generatedProducts;
  });

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const isGenderMatch = product.gender === gender;
      const isCategoryMatch = selectedCategory === '전체' || product.category === selectedCategory;
      const isSearchMatch = searchQuery === '' || 
                            product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return isGenderMatch && isCategoryMatch && isSearchMatch;
    });
  }, [products, gender, selectedCategory, searchQuery]);

  // Image Upload Handlers
  const handleImageEdit = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    setEditingProductId(productId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProductId) {
        const imageUrl = URL.createObjectURL(file);
        
        // Update product list
        setProducts(prev => prev.map(p => p.id === editingProductId ? { ...p, image: imageUrl } : p));
        
        // Update selected product if it matches
        if (selectedProduct?.id === editingProductId) {
            setSelectedProduct(prev => prev ? { ...prev, image: imageUrl } : null);
        }
        
        // Update cart items
        setCart(prev => prev.map(p => p.id === editingProductId ? { ...p, image: imageUrl } : p));
        
        // Update checkout items
        setCheckoutItems(prev => prev.map(p => p.id === editingProductId ? { ...p, image: imageUrl } : p));
        
        showToastNotification("사진이 변경되었습니다.");
    }
    // Reset file input
    if (e.target) e.target.value = '';
  };

  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    setSelectedCategory('전체');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setRentalDays(1); // Default to 1 day
    setShopView('detail');
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
        setShowToast(false);
    }, 3000);
  }

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent triggering card click
    if (!isLoggedIn) {
        setShopView('login');
        return;
    }
    
    if (wishlist.includes(product.id)) {
        setWishlist(prev => prev.filter(id => id !== product.id));
        showToastNotification('찜 목록에서 삭제되었습니다.');
    } else {
        setWishlist(prev => [...prev, product.id]);
        showToastNotification('찜 목록에 추가되었습니다.');
    }
  };

  const addToCart = () => {
    if (!isLoggedIn) {
        setShopView('login');
        return;
    }

    if (!selectedProduct) return;
    const newItem: CartItem = { ...selectedProduct, rentalDays };
    setCart([...cart, newItem]);
    showToastNotification('장바구니에 담겼습니다');
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.rentalDays), 0);
  };

  const getCheckoutTotal = () => {
    return checkoutItems.reduce((total, item) => total + (item.price * item.rentalDays), 0);
  };

  const startCheckout = (items: CartItem[], source: 'detail' | 'cart') => {
    setCheckoutItems(items);
    setCheckoutSource(source);
    
    // Initialize checkout fields based on default preference
    if (currentUser) {
        setUseDefaultAddress(true);
        setShippingInfo({
            name: currentUser.name,
            phone: currentUser.phone,
            address: currentUser.address,
            detailAddress: ''
        });
    } else {
        setUseDefaultAddress(false);
        setShippingInfo({ name: '', phone: '', address: '', detailAddress: '' });
    }

    setShopView('checkout');
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
        setShopView('login');
        return;
    }

    if (!selectedProduct) return;
    const item: CartItem = { ...selectedProduct, rentalDays };
    startCheckout([item], 'detail');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    // Create order
    const newOrder: Order = {
      id: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.email,
      userEmail: currentUser.email,
      userName: currentUser.name,
      items: checkoutItems,
      totalAmount: checkoutItems.reduce((total, item) => total + (item.price * item.rentalDays), 0),
      shippingInfo: {
        name: shippingInfo.name,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        detailAddress: shippingInfo.detailAddress
      },
      orderDate: Date.now(),
      status: 'pending'
    };
    
    // Save order
    setOrders([...orders, newOrder]);
    
    setTimeout(() => {
        if (checkoutSource === 'cart') setCart([]);
        setShopView('success');
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin Check Logic
    if (loginForm.email === 'areum1004@gmail.com' && loginForm.password === 'areum1004!') {
        const adminUser: UserData = {
            email: 'areum1004@gmail.com',
            password: 'areum1004!',
            name: '관리자',
            phone: '010-0000-0000',
            address: '아름 스토어 본점'
        };
        setIsLoggedIn(true);
        setCurrentUser(adminUser);
        setAuthError('');
        setLoginForm({ email: '', password: '' });
        
        // 관리자 장바구니 불러오기
        const adminCart = localStorage.getItem(`areum_cart_${adminUser.email}`);
        if (adminCart) {
            setCart(JSON.parse(adminCart));
        } else {
            setCart([]);
        }
        
        if (selectedProduct) {
            setShopView('detail');
        } else {
            setShopView('listing');
        }
        showToastNotification("관리자 계정으로 로그인되었습니다.");
        return;
    }

    // Auth Validation (Normal Users)
    const userFound = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
    
    if (userFound) {
        setIsLoggedIn(true);
        setCurrentUser(userFound);
        setAuthError('');
        setLoginForm({ email: '', password: '' });
        
        // 로그인한 사용자의 장바구니 불러오기
        const userCart = localStorage.getItem(`areum_cart_${userFound.email}`);
        if (userCart) {
            setCart(JSON.parse(userCart));
        } else {
            setCart([]); // 장바구니가 없으면 빈 배열
        }
        
        // Navigation logic
        if (selectedProduct) {
            setShopView('detail');
        } else {
            setShopView('listing');
        }
    } else {
        setAuthError('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    // Strict Validation
    if (!signupForm.name.trim()) {
        setAuthError('이름을 입력해주세요.');
        return;
    }
    if (!signupForm.email.trim()) {
        setAuthError('이메일을 입력해주세요.');
        return;
    }
    if (!signupForm.phone.trim()) {
        setAuthError('연락처를 입력해주세요.');
        return;
    }
    if (!signupForm.address.trim()) {
        setAuthError('주소를 입력해주세요.');
        return;
    }
    if (!signupForm.password) {
        setAuthError('비밀번호를 입력해주세요.');
        return;
    }
    if (!signupForm.confirmPassword) {
        setAuthError('비밀번호 확인을 입력해주세요.');
        return;
    }

    // Logic Checks
    if (signupForm.password !== signupForm.confirmPassword) {
        setAuthError('비밀번호가 일치하지 않습니다.');
        return;
    }

    if (users.find(u => u.email === signupForm.email)) {
        setAuthError('이미 존재하는 이메일입니다.');
        return;
    }

    // Create User
    const newUser: UserData = {
        email: signupForm.email,
        password: signupForm.password,
        name: signupForm.name,
        phone: signupForm.phone,
        address: signupForm.address
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // Auto login after signup
    setIsLoggedIn(true);
    setCurrentUser(newUser);
    setAuthError('');
    setSignupForm({ name: '', email: '', password: '', confirmPassword: '', phone: '', address: '' });
    
    // 새 사용자는 빈 장바구니로 시작
    setCart([]);
    
    // Navigate to appropriate view
    if (selectedProduct) {
        setShopView('detail');
    } else {
        setShopView('listing');
    }
    
    showToastNotification('회원가입이 완료되었습니다. 로그인되었습니다.');
  };

  // Effect to toggle address fields in Checkout
  useEffect(() => {
      if (shopView === 'checkout') {
          if (useDefaultAddress && currentUser) {
              setShippingInfo(prev => ({
                  ...prev,
                  name: currentUser.name,
                  phone: currentUser.phone,
                  address: currentUser.address,
              }));
          } else if (!useDefaultAddress) {
              // Only clear if switching to new address, but allow typing
          }
      }
  }, [useDefaultAddress, currentUser, shopView]);

  const handleAddressToggle = (useDefault: boolean) => {
      setUseDefaultAddress(useDefault);
      if (useDefault && currentUser) {
          setShippingInfo({
              name: currentUser.name,
              phone: currentUser.phone,
              address: currentUser.address,
              detailAddress: ''
          });
      } else {
          setShippingInfo({
              name: '',
              phone: '',
              address: '',
              detailAddress: ''
          });
      }
  };

  const handleLogout = () => {
    // 로그아웃 시 장바구니 초기화
    setCart([]);
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowLogoutConfirm(false);
    // Clear user-related localStorage
    localStorage.removeItem('areum_isLoggedIn');
    localStorage.removeItem('areum_currentUser');
    // 장바구니는 사용자별로 저장되어 있으므로 삭제하지 않음 (다시 로그인하면 복원됨)
    // Optionally redirect to listing
    // setShopView('listing'); 
  };


  // --- Views ---

  // 1. Listing View
  const renderListing = () => (
    <>
      {/* Gender Selection Tabs */}
      <div className="flex items-center justify-center mb-8">
          <div className="bg-stone-200/50 p-1 rounded-xl flex">
              <button 
                  onClick={() => handleGenderChange('women')}
                  className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${
                      gender === 'women' 
                      ? 'bg-white text-stone-800 shadow-sm' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
              >
                  WOMEN
              </button>
              <button 
                  onClick={() => handleGenderChange('men')}
                  className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${
                      gender === 'men' 
                      ? 'bg-white text-stone-800 shadow-sm' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
              >
                  MEN
              </button>
          </div>
      </div>

      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-48 md:h-64 shadow-xl shadow-orange-900/5 group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-stone-100 opacity-90"></div>
          <img 
          src={gender === 'women' 
              ? "https://images.unsplash.com/photo-1548624149-f32195f560e2?auto=format&fit=crop&w=1200&q=80"
              : "https://images.unsplash.com/photo-1507258615559-29e9779518ad?auto=format&fit=crop&w=1200&q=80"
          } 
          alt="Business Casual" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 text-stone-800">
              나다운 옷을 마음껏
            </h2>
            <p className="text-stone-600 text-sm md:text-base max-w-md leading-relaxed">
              {gender === 'women' 
              ? '아름에서 여성 비즈니스 캐쥬얼 컬렉션을 만나보세요.' 
              : '아름에서 남성 비즈니스 캐쥬얼 컬렉션을 만나보세요.'}
            </p>
          </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-[#FDFBF7]/95 backdrop-blur-sm py-2 -mx-4 px-4 border-b border-stone-200 mb-6 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
              <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${
                  selectedCategory === cat
                  ? 'bg-stone-800 text-white shadow-sm' 
                  : 'bg-white text-stone-500 border border-stone-200 hover:border-orange-300 hover:text-orange-500'
              }`}
              >
              {cat}
              </button>
          ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 mb-12">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group cursor-pointer relative" 
            onClick={() => handleProductClick(product)}
          >
            {/* Image Container */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-3 relative shadow-sm border border-stone-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-4 transition-transform duration-500"
              />
              
              {/* Camera Icon - Only for Admin */}
              {isAdmin && (
                <button 
                    onClick={(e) => handleImageEdit(e, product.id)}
                    className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm shadow-sm rounded-full transition-all border border-stone-100 hover:text-indigo-600 hover:bg-white z-10 text-stone-400"
                    title="사진 변경 (관리자 전용)"
                >
                    <Camera size={16} />
                </button>
              )}

              <button 
                onClick={(e) => toggleWishlist(e, product)}
                className={`absolute top-3 right-3 p-2 bg-white shadow-sm rounded-full transition-all border border-stone-100 hover:text-red-500 z-10 ${
                  wishlist.includes(product.id) ? 'text-red-500 opacity-100' : 'text-stone-300 opacity-0 group-hover:opacity-100'
                }`}
              >
                  <Heart size={16} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
              </button>
              
              <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold text-stone-700 bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-stone-100">
                      최대 3일 대여
                    </span>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="px-1">
              <div className="flex justify-between items-start">
                  <p className="text-xs text-orange-500 font-medium mb-1">{product.brand}</p>
                  <p className="text-[10px] text-stone-400 border border-stone-200 px-1 rounded-sm">{product.category}</p>
              </div>
              <h3 className="text-stone-800 font-medium text-sm md:text-base mb-1 truncate">{product.name}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-stone-900 font-bold">₩{product.price.toLocaleString()}</span>
                  <span className="text-xs text-stone-400">/ 1일</span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-stone-400">
              <p>해당 검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );

  // 2. Detail View
  const renderDetail = () => {
    if (!selectedProduct) return null;
    const totalPrice = selectedProduct.price * rentalDays;

    return (
      <div className="animate-in fade-in slide-in-from-right-10 duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Side */}
          <div className="bg-white rounded-2xl overflow-hidden aspect-[3/4] md:aspect-auto md:h-[600px] flex items-center justify-center relative border border-stone-100 shadow-sm">
             <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-full object-contain p-8 transition-transform duration-500"
             />
             
             {/* Camera Icon - Only for Admin */}
             {isAdmin && (
                <button 
                    onClick={(e) => handleImageEdit(e, selectedProduct.id)}
                    className="absolute top-4 left-4 p-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-md border border-stone-100 hover:text-indigo-600 text-stone-400 z-10"
                    title="사진 변경 (관리자 전용)"
                >
                    <Camera size={24} />
                </button>
             )}

             <button 
                onClick={(e) => selectedProduct && toggleWishlist(e, selectedProduct)}
                className={`absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-md border border-stone-100 ${
                     selectedProduct && wishlist.includes(selectedProduct.id) ? 'text-red-500' : 'text-stone-400'
                }`}
             >
                <Heart size={24} fill={selectedProduct && wishlist.includes(selectedProduct.id) ? "currentColor" : "none"} />
             </button>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
               <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">{selectedProduct.brand}</span>
               <div className="h-3 w-[1px] bg-stone-300"></div>
               <span className="text-stone-500 text-sm">{selectedProduct.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2">{selectedProduct.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
               <div className="flex text-yellow-400">
                 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
               </div>
               <span className="text-stone-400 text-sm">(4.9)</span>
            </div>

            <div className="p-6 bg-white rounded-xl border border-stone-200 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                  <span className="text-stone-500 text-sm">일일 대여료</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-stone-800">₩{selectedProduct.price.toLocaleString()}</span>
                  </div>
              </div>
              
              {/* Rental Days Selector */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <span className="text-stone-500 text-sm">대여 기간 선택</span>
                  <div className="flex flex-col items-end">
                      <div className="flex items-center gap-4 bg-stone-100 rounded-lg p-1">
                          <button 
                            onClick={() => setRentalDays(prev => Math.max(1, prev - 1))}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md text-stone-600 disabled:opacity-30 transition-all"
                            disabled={rentalDays <= 1}
                          >
                              <Minus size={16} />
                          </button>
                          <span className="font-bold text-stone-800 w-8 text-center">{rentalDays}일</span>
                          <button 
                            onClick={() => setRentalDays(prev => Math.min(3, prev + 1))}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md text-stone-600 disabled:opacity-30 transition-all"
                            disabled={rentalDays >= 3}
                          >
                              <Plus size={16} />
                          </button>
                      </div>
                      {rentalDays >= 3 && (
                        <span className="text-xs text-orange-500 mt-2">최대 3일까지만 대여 가능합니다.</span>
                      )}
                  </div>
              </div>

              {/* Total Price Display */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
                  <span className="text-stone-800 font-bold">총 대여 금액</span>
                  <span className="text-3xl font-bold text-orange-600">₩{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Service Badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-xl">
                    <Truck className="text-orange-500" size={20} />
                    <div className="text-xs text-stone-600">
                        <p className="font-bold text-stone-800">무료 배송/수거</p>
                        <p>왕복 택배비 포함</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-xl">
                    <ShieldCheck className="text-orange-500" size={20} />
                    <div className="text-xs text-stone-600">
                        <p className="font-bold text-stone-800">안심 케어</p>
                        <p>세탁/소독 완벽 관리</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
                <button 
                  onClick={addToCart}
                  className="flex-1 bg-white hover:bg-stone-50 text-stone-800 py-4 rounded-xl font-bold transition-colors border border-stone-300"
                >
                    장바구니 담기
                </button>
                <button 
                   onClick={handleBuyNow}
                   className="flex-1 bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-stone-900/10"
                >
                    바로 대여하기
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. Cart View
  const renderCart = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-10 duration-300">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-stone-800">
            <ShoppingBag className="text-orange-500" />
            장바구니
            <span className="text-sm font-normal text-stone-400 ml-2">({cart.length})</span>
        </h2>

        {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <ShoppingBag size={48} className="mx-auto text-stone-300 mb-4" />
                <p className="text-stone-500 mb-6">장바구니가 비어있습니다.</p>
                <button 
                    onClick={() => setShopView('listing')}
                    className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-colors"
                >
                    쇼핑 계속하기
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-white rounded-xl border border-stone-200 relative group shadow-sm">
                            <div className="w-24 h-24 bg-stone-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-orange-500 mb-1">{item.brand}</p>
                                <h3 className="font-bold text-stone-800 text-sm mb-1 truncate">{item.name}</h3>
                                <p className="text-stone-400 text-xs mb-3">{item.category} | {item.rentalDays}일 대여</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-stone-800">₩{(item.price * item.rentalDays).toLocaleString()}</span>
                                    <span className="text-xs text-stone-500">(@ ₩{item.price.toLocaleString()}/일)</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeFromCart(index)}
                                className="absolute top-4 right-4 text-stone-400 hover:text-red-400 p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm sticky top-24">
                        <h3 className="font-bold text-lg mb-6 pb-4 border-b border-stone-100 text-stone-800">주문 예상 금액</h3>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-stone-500">총 상품금액</span>
                                <span className="text-stone-800">₩{getCartTotal().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-stone-500">배송비</span>
                                <span className="text-orange-500">무료</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-6 pt-4 border-t border-stone-100">
                            <span className="font-bold text-stone-800">총 결제금액</span>
                            <span className="font-bold text-xl text-orange-600">₩{getCartTotal().toLocaleString()}</span>
                        </div>

                        <button 
                            onClick={() => startCheckout(cart, 'cart')}
                            className="w-full bg-stone-800 text-white py-3 rounded-xl font-bold hover:bg-stone-900 transition-colors shadow-lg shadow-stone-900/10"
                        >
                            주문하기
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );

  // 4. Checkout View
  const renderCheckout = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-10 duration-300">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-stone-800">
            <CreditCard className="text-orange-500" />
            주문/결제
        </h2>
        
        <form onSubmit={handlePayment}>
            {/* 1. Item Summary */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6 shadow-sm">
                <h3 className="font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">주문 상품 정보</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                    {checkoutItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                             <div className="w-16 h-16 bg-stone-50 rounded-lg flex-shrink-0 flex items-center justify-center p-1">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-stone-800">{item.name}</h4>
                                <p className="text-xs text-stone-400">{item.brand} | {item.rentalDays}일 대여</p>
                                <p className="text-sm font-bold text-orange-500 mt-1">₩{(item.price * item.rentalDays).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-stone-500 text-sm">총 {checkoutItems.length}개 상품</span>
                    <span className="font-bold text-stone-800 text-lg">₩{getCheckoutTotal().toLocaleString()}</span>
                </div>
            </div>

            {/* 2. Recipient Info */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6 shadow-sm">
                <h3 className="font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">배송지 정보</h3>
                
                {/* Address Source Selection */}
                <div className="flex gap-4 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="addressSource" 
                            checked={useDefaultAddress}
                            onChange={() => handleAddressToggle(true)}
                            className="accent-orange-500"
                        />
                        <span className={`text-sm ${useDefaultAddress ? 'text-stone-800 font-bold' : 'text-stone-400'}`}>기본 주소 가져오기</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="addressSource" 
                            checked={!useDefaultAddress}
                            onChange={() => handleAddressToggle(false)}
                            className="accent-orange-500"
                        />
                        <span className={`text-sm ${!useDefaultAddress ? 'text-stone-800 font-bold' : 'text-stone-400'}`}>신규 주소 입력</span>
                    </label>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-stone-500 mb-1">받는 분</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="이름" 
                            value={shippingInfo.name}
                            onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-stone-500 mb-1">연락처</label>
                        <input 
                            type="tel" 
                            required 
                            placeholder="010-0000-0000" 
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-stone-500 mb-1">주소</label>
                        <div className="flex gap-2 mb-2">
                             <input 
                                type="text" 
                                readOnly 
                                value="06234" 
                                className="w-24 bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-800" 
                             />
                             <button type="button" className="bg-stone-200 text-stone-600 px-4 rounded-lg text-sm hover:bg-stone-300 transition-colors">우편번호 찾기</button>
                        </div>
                        <input 
                            type="text" 
                            required 
                            placeholder="기본주소" 
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-800 mb-2 focus:outline-none focus:border-orange-400 transition-colors" 
                        />
                        <input 
                            type="text" 
                            required 
                            placeholder="상세주소" 
                            value={shippingInfo.detailAddress}
                            onChange={(e) => setShippingInfo({...shippingInfo, detailAddress: e.target.value})}
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                        />
                    </div>
                </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-8 shadow-sm">
                <h3 className="font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">결제 수단</h3>
                <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                        <input type="radio" name="payment" className="peer sr-only" defaultChecked />
                        <div className="border border-stone-200 rounded-xl p-4 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-900 transition-all bg-stone-50">
                            <span className="block text-sm font-bold text-stone-600 peer-checked:text-orange-700">카드결제</span>
                        </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                        <input type="radio" name="payment" className="peer sr-only" />
                        <div className="border border-stone-200 rounded-xl p-4 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-900 transition-all bg-stone-50">
                            <span className="block text-sm font-bold text-stone-600 peer-checked:text-orange-700">무통장입금</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Pay Button */}
            <button 
                type="submit"
                className="w-full bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-stone-900/10 transition-all mb-4"
            >
                {getCheckoutTotal().toLocaleString()}원 결제하기
            </button>
            <button 
                type="button"
                onClick={() => setShopView(checkoutSource)}
                className="w-full bg-transparent text-stone-500 py-2 rounded-xl text-sm hover:text-stone-800 transition-colors"
            >
                취소하고 뒤로가기
            </button>
        </form>
    </div>
  );

  // 5. Success View
  const renderSuccess = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-2 ring-green-200">
             <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4">주문이 완료되었습니다!</h2>
        <p className="text-stone-500 mb-12 max-w-md leading-relaxed">
            고객님의 주문이 성공적으로 접수되었습니다.<br/>
            빠른 시일 내에 배송해 드리겠습니다. 감사합니다.
        </p>
        <button 
            onClick={() => {
                setCart([]);
                setShopView('listing');
            }}
            className="px-12 py-3 bg-stone-800 text-white font-bold rounded-xl hover:bg-stone-900 transition-colors shadow-lg shadow-stone-900/10"
        >
            쇼핑 계속하기
        </button>
    </div>
  );

  // 6. Login View
  const renderLogin = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-stone-200 shadow-xl shadow-stone-900/5">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">로그인</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">이메일</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            required 
                            placeholder="user@example.com" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        />
                        <Mail size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">비밀번호</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        />
                        <Lock size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
                <button type="submit" className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-stone-900/10 mt-2">
                    로그인
                </button>
            </form>
            <div className="mt-6 text-center text-sm text-stone-400">
                계정이 없으신가요? <button onClick={() => { setAuthError(''); setShopView('signup'); }} className="text-orange-500 hover:text-orange-600 font-medium ml-1">회원가입 하러가기</button>
            </div>
            {selectedProduct && (
                 <div className="mt-4 pt-4 border-t border-stone-100 text-center">
                    <button onClick={() => { setAuthError(''); setShopView('detail'); }} className="text-stone-400 hover:text-stone-600 text-sm">취소하고 상품으로 돌아가기</button>
                 </div>
            )}
        </div>
    </div>
  );

  // 7. Sign Up View
  const renderSignUp = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in slide-in-from-bottom-5 duration-300 my-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-stone-200 shadow-xl shadow-stone-900/5">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">회원가입</h2>
            <form onSubmit={handleSignUp} className="space-y-4" noValidate>
                <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">이름 (필수)</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="홍길동" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={signupForm.name}
                            onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                        />
                        <User size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">이메일 (필수)</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="user@example.com" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={signupForm.email}
                            onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        />
                        <Mail size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">연락처 (필수)</label>
                    <div className="relative">
                        <input 
                            type="tel" 
                            placeholder="010-0000-0000" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={signupForm.phone}
                            onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                        />
                        <Phone size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">주소 (필수)</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="서울시 종로구 대학로 12길" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={signupForm.address}
                            onChange={(e) => setSignupForm({...signupForm, address: e.target.value})}
                        />
                        <MapPin size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">비밀번호 (필수)</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        />
                        <Lock size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-stone-500 mb-1">비밀번호 확인 (필수)</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 pl-10 pr-4 text-stone-800 focus:outline-none focus:border-orange-400 transition-colors" 
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        />
                        <CheckCircle2 size={18} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                </div>
                {authError && <p className="text-red-500 text-sm text-center font-medium mt-2">{authError}</p>}
                <button type="submit" className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-stone-900/10 mt-4">
                    가입하기
                </button>
            </form>
            <div className="mt-6 text-center text-sm text-stone-400">
                이미 계정이 있으신가요? <button onClick={() => { setAuthError(''); setShopView('login'); }} className="text-orange-500 hover:text-orange-600 font-medium ml-1">로그인 하러가기</button>
            </div>
             {selectedProduct && (
                 <div className="mt-4 pt-4 border-t border-stone-100 text-center">
                    <button onClick={() => { setAuthError(''); setShopView('detail'); }} className="text-stone-400 hover:text-stone-600 text-sm">취소하고 상품으로 돌아가기</button>
                 </div>
            )}
        </div>
    </div>
  );

  // Admin Dashboard View
  const renderAdmin = () => {
    const activeVisitors = visitorSessions.filter(v => Date.now() - v.lastActivity < 300000); // 5분 이내 활동
    const totalVisitors = visitorSessions.length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const pendingCS = csInquiries.filter(cs => cs.status === 'pending').length;
    
    // Calculate average session time
    const avgSessionTime = visitorSessions.length > 0
      ? visitorSessions.reduce((sum, v) => sum + (v.lastActivity - v.startTime), 0) / visitorSessions.length / 1000 / 60
      : 0;
    
    return (
      <div className="min-h-screen bg-[#FDFBF7] pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">관리자 대시보드</h1>
          <p className="text-stone-500">Store 관리 및 데이터 확인</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-stone-500">현재 접속자</h3>
              <Users className="text-orange-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-stone-800">{activeVisitors.length}</p>
            <p className="text-xs text-stone-400 mt-1">전체: {totalVisitors}명</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-stone-500">주문 건수</h3>
              <ShoppingCart className="text-blue-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-stone-800">{totalOrders}</p>
            <p className="text-xs text-stone-400 mt-1">대기: {pendingOrders}건</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-stone-500">총 매출</h3>
              <BarChart3 className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-stone-800">₩{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-stone-400 mt-1">평균 세션: {avgSessionTime.toFixed(1)}분</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-stone-500">고객 상담</h3>
              <MessageSquare className="text-red-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-stone-800">{csInquiries.length}</p>
            <p className="text-xs text-stone-400 mt-1">대기: {pendingCS}건</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
          <div className="border-b border-stone-200 flex gap-4 px-6">
            <button 
              onClick={() => setShopView('admin')}
              className="py-4 px-2 border-b-2 border-orange-500 text-orange-500 font-bold text-sm"
            >
              대시보드
            </button>
          </div>
          
          <div className="p-6">
            {/* Active Visitors */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Users size={20} />
                현재 접속자 ({activeVisitors.length}명)
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activeVisitors.length > 0 ? (
                  activeVisitors.map((visitor, idx) => {
                    const sessionMinutes = Math.floor((visitor.lastActivity - visitor.startTime) / 1000 / 60);
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                        <div>
                          <p className="font-medium text-stone-800">{visitor.email || '비회원'}</p>
                          <p className="text-xs text-stone-500">접속 시간: {sessionMinutes}분 | 조회수: {visitor.pageViews}</p>
                        </div>
                        <Clock size={16} className="text-stone-400" />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-stone-400 text-center py-4">현재 접속자가 없습니다.</p>
                )}
              </div>
            </div>

            {/* Orders */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <ShoppingCart size={20} />
                주문 관리 ({orders.length}건)
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {orders.length > 0 ? (
                  orders.slice().reverse().map((order) => (
                    <div key={order.id} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-stone-800">{order.id}</p>
                          <p className="text-sm text-stone-600">{order.userName} ({order.userEmail})</p>
                          <p className="text-xs text-stone-500">{new Date(order.orderDate).toLocaleString('ko-KR')}</p>
                        </div>
                        <select 
                          value={order.status}
                          onChange={(e) => {
                            const updated = orders.map(o => 
                              o.id === order.id ? { ...o, status: e.target.value as Order['status'] } : o
                            );
                            setOrders(updated);
                          }}
                          className="px-3 py-1 text-xs rounded-lg border border-stone-200 bg-white"
                        >
                          <option value="pending">대기중</option>
                          <option value="processing">처리중</option>
                          <option value="shipped">배송중</option>
                          <option value="delivered">배송완료</option>
                          <option value="cancelled">취소됨</option>
                        </select>
                      </div>
                      <div className="mt-2 pt-2 border-t border-stone-200">
                        <p className="text-xs text-stone-600 mb-1">주문 상품: {order.items.length}개</p>
                        <p className="text-sm font-bold text-orange-600">총액: ₩{order.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-stone-500 mt-1">배송지: {order.shippingInfo.address}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-stone-400 text-center py-4">주문이 없습니다.</p>
                )}
              </div>
            </div>

            {/* Registered Users */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <User size={20} />
                회원 목록 ({users.length}명)
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {users.length > 0 ? (
                  users.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                      <div>
                        <p className="font-medium text-stone-800">{user.name}</p>
                        <p className="text-xs text-stone-500">{user.email} | {user.phone}</p>
                        <p className="text-xs text-stone-400">{user.address}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-stone-400 text-center py-4">등록된 회원이 없습니다.</p>
                )}
              </div>
            </div>

            {/* Product Management */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Package size={20} />
                상품 관리
              </h2>
              <div className="bg-stone-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">성별</label>
                    <select 
                      value={newProduct.gender}
                      onChange={(e) => setNewProduct({...newProduct, gender: e.target.value as Gender})}
                      className="w-full p-2 border border-stone-200 rounded-lg bg-white"
                    >
                      <option value="women">여성</option>
                      <option value="men">남성</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">카테고리</label>
                    <input 
                      type="text"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full p-2 border border-stone-200 rounded-lg bg-white"
                      placeholder="아우터, 셔츠 등"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">상품명</label>
                    <input 
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full p-2 border border-stone-200 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">브랜드</label>
                    <input 
                      type="text"
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                      className="w-full p-2 border border-stone-200 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">일일 대여료 (원)</label>
                    <input 
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border border-stone-200 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1">원가 (원)</label>
                    <input 
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({...newProduct, originalPrice: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border border-stone-200 rounded-lg bg-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-stone-500 mb-1">이미지 URL</label>
                    <input 
                      type="text"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      className="w-full p-2 border border-stone-200 rounded-lg bg-white"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (!newProduct.name || !newProduct.category || !newProduct.price) {
                      showToastNotification('필수 항목을 입력해주세요.');
                      return;
                    }
                    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
                    const addedProduct: Product = {
                      id: maxId + 1,
                      gender: newProduct.gender || 'women',
                      category: newProduct.category || '',
                      name: newProduct.name || '',
                      price: newProduct.price || 0,
                      originalPrice: newProduct.originalPrice || 0,
                      image: newProduct.image || '',
                      brand: newProduct.brand || ''
                    };
                    setProducts([...products, addedProduct]);
                    setNewProduct({
                      gender: 'women',
                      category: '',
                      name: '',
                      price: 0,
                      originalPrice: 0,
                      image: '',
                      brand: ''
                    });
                    showToastNotification('상품이 추가되었습니다.');
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-bold"
                >
                  상품 추가
                </button>
              </div>
            </div>

            {/* CS Management */}
            <div>
              <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                고객 상담 ({csInquiries.length}건)
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {csInquiries.length > 0 ? (
                  csInquiries.slice().reverse().map((inquiry) => (
                    <div key={inquiry.id} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-stone-800">{inquiry.subject}</p>
                          <p className="text-sm text-stone-600">{inquiry.userName} ({inquiry.userEmail})</p>
                          <p className="text-xs text-stone-500">{new Date(inquiry.createdAt).toLocaleString('ko-KR')}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${
                          inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          inquiry.status === 'responded' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {inquiry.status === 'pending' ? '대기중' : inquiry.status === 'responded' ? '답변완료' : '해결완료'}
                        </span>
                      </div>
                      <p className="text-sm text-stone-700 mb-2">{inquiry.message}</p>
                      {inquiry.response && (
                        <div className="mt-2 pt-2 border-t border-stone-200">
                          <p className="text-xs text-stone-500 mb-1">답변:</p>
                          <p className="text-sm text-stone-700">{inquiry.response}</p>
                        </div>
                      )}
                      {inquiry.status === 'pending' && (
                        <button
                          onClick={() => {
                            const response = prompt('답변을 입력하세요:');
                            if (response) {
                              const updated = csInquiries.map(cs =>
                                cs.id === inquiry.id
                                  ? { ...cs, status: 'responded' as const, response, respondedAt: Date.now() }
                                  : cs
                              );
                              setCsInquiries(updated);
                              showToastNotification('답변이 등록되었습니다.');
                            }
                          }}
                          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600"
                        >
                          답변하기
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-stone-400 text-center py-4">고객 상담 문의가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 pb-20 relative">
      {/* Toast Notification */}
      {showToast && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[100] bg-stone-800 text-white px-6 py-3 rounded-full shadow-xl font-bold animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-2">
              <CheckCircle2 className="text-green-400" size={20} />
              {toastMessage}
          </div>
      )}
      
      {/* Hidden File Input for Image Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)}></div>
             <div className="relative bg-white border border-stone-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl transform animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold text-stone-800 mb-2 text-center">로그아웃</h3>
                <p className="text-stone-500 text-center mb-6">로그아웃 하시겠습니까?</p>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowLogoutConfirm(false)}
                        className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-medium transition-colors"
                    >
                        취소
                    </button>
                    <button 
                        onClick={() => {
                            setIsLoggedIn(false);
                            setCurrentUser(null);
                            setShowLogoutConfirm(false);
                            setShopView('listing');
                        }}
                        className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
             </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => {
                    if (shopView === 'listing') onBack();
                    else if (shopView === 'login' || shopView === 'signup') {
                        if(selectedProduct) setShopView('detail');
                        else setShopView('listing');
                    }
                    else if (shopView === 'checkout') setShopView(checkoutSource);
                    else if (shopView === 'success') setShopView('listing');
                    else if (shopView === 'admin') setShopView('listing');
                    else setShopView('listing');
                }}
                className="p-2 -ml-2 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold tracking-tight flex items-baseline gap-2 text-stone-800">
                <span>Areum <span className="text-orange-500">Store</span></span>
                <span className="text-xs text-stone-400 font-normal">혜화점</span>
            </h1>
          </div>
          
          <div className="flex gap-2 text-stone-500 items-center">
            
            {/* Login Status */}
            {!isSearchOpen && (
                <div className="hidden md:flex mr-2 items-center gap-2">
                    {isLoggedIn ? (
                        <>
                            {isAdmin && (
                                <button 
                                    onClick={() => setShopView('admin')}
                                    className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg font-bold flex items-center gap-1"
                                >
                                    <Settings size={12} />
                                    관리자
                                </button>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-stone-500">
                                    <span className="text-stone-800 font-bold">{currentUser?.name}</span>님
                                </span>
                                <button onClick={() => setShowLogoutConfirm(true)} className="text-xs text-stone-400 hover:text-stone-800 px-2 py-1 flex items-center gap-1">
                                    <LogOut size={12} />
                                    로그아웃
                                </button>
                            </div>
                        </>
                    ) : (
                        <button onClick={() => setShopView('login')} className="text-xs text-orange-500 hover:text-orange-600 font-bold px-2 py-1">
                            로그인
                        </button>
                    )}
                </div>
            )}

            {/* Search Bar */}
            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-48 md:w-64 bg-white border border-stone-200 rounded-full px-3 py-1 shadow-sm' : 'w-10'}`}>
                {isSearchOpen ? (
                    <>
                        <Search size={18} className="text-stone-400 mr-2" />
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="검색..." 
                            className="bg-transparent border-none outline-none text-stone-800 text-sm w-full placeholder:text-stone-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => !searchQuery && setIsSearchOpen(false)}
                        />
                         <button onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}><X size={14} className="text-stone-400 hover:text-stone-600" /></button>
                    </>
                ) : (
                    <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:text-stone-800 transition-colors">
                        <Search size={24} />
                    </button>
                )}
            </div>

            <button 
                onClick={() => setShopView('cart')}
                className="p-2 hover:text-stone-800 transition-colors relative"
            >
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold shadow-sm">
                        {cart.length}
                    </span>
                )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-6">
        {shopView === 'listing' && renderListing()}
        {shopView === 'detail' && renderDetail()}
        {shopView === 'cart' && renderCart()}
        {shopView === 'checkout' && renderCheckout()}
        {shopView === 'success' && renderSuccess()}
        {shopView === 'login' && renderLogin()}
        {shopView === 'signup' && renderSignUp()}
        {shopView === 'admin' && isAdmin && renderAdmin()}
      </main>
    </div>
  );
};

export default Shop;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Минималистичные наушники',
    price: 12990,
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Премиальное качество звука'
  },
  {
    id: 2,
    name: 'Умные часы',
    price: 24990,
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'Следи за здоровьем'
  },
  {
    id: 3,
    name: 'Беспроводная клавиатура',
    price: 8990,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    description: 'Тихие клавиши, долгая работа'
  },
  {
    id: 4,
    name: 'Дизайнерская лампа',
    price: 5990,
    category: 'Интерьер',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    description: 'Создаёт уют в доме'
  },
  {
    id: 5,
    name: 'Кожаный рюкзак',
    price: 15990,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    description: 'Стиль и практичность'
  },
  {
    id: 6,
    name: 'Портативная колонка',
    price: 6990,
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    description: 'Мощный звук в компактном корпусе'
  }
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'profile' | 'about'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => setCurrentPage('home')}>
              Store
            </h1>
            
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setCurrentPage('catalog')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === 'catalog' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === 'about' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                О магазине
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage('profile')}
                className="relative"
              >
                <Icon name="User" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage('cart')}
                className="relative"
              >
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {currentPage === 'home' && (
        <main>
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center max-w-4xl">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Минималистичный<br />стиль жизни
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Откройте для себя тщательно отобранную коллекцию продуктов, 
                сочетающих функциональность и эстетику
              </p>
              <Button size="lg" onClick={() => setCurrentPage('catalog')} className="text-base px-8">
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold mb-12 text-center">Популярные товары</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockProducts.slice(0, 3).map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden bg-secondary/50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {product.category}
                      </Badge>
                      <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{product.price.toLocaleString()} ₽</span>
                        <Button
                          onClick={() => addToCart(product)}
                          size="sm"
                          className="gap-2"
                        >
                          <Icon name="Plus" size={16} />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {currentPage === 'catalog' && (
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-6">Каталог товаров</h2>
              <div className="relative max-w-xl">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию или категории..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-secondary/50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {product.category}
                    </Badge>
                    <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{product.price.toLocaleString()} ₽</span>
                      <Button
                        onClick={() => addToCart(product)}
                        size="sm"
                        className="gap-2"
                      >
                        <Icon name="Plus" size={16} />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить запрос</p>
              </div>
            )}
          </div>
        </main>
      )}

      {currentPage === 'cart' && (
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Корзина</h2>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
                <Button onClick={() => setCurrentPage('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(({ product, quantity }) => (
                  <Card key={product.id} className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary/50 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                        <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          <span className="text-xl font-bold ml-auto">
                            {(product.price * quantity).toLocaleString()} ₽
                          </span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={20} />
                      </Button>
                    </div>
                  </Card>
                ))}

                <Card className="p-6 bg-secondary/30">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-semibold">Итого:</span>
                    <span className="text-3xl font-bold">{cartTotal.toLocaleString()} ₽</span>
                  </div>
                  <Button size="lg" className="w-full">
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </main>
      )}

      {currentPage === 'profile' && (
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold mb-8">Профиль</h2>
            <Card className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={40} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-1">Гость</h3>
                  <p className="text-muted-foreground">guest@example.com</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <Icon name="Package" size={20} />
                  Мои заказы
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <Icon name="Heart" size={20} />
                  Избранное
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <Icon name="Settings" size={20} />
                  Настройки
                </Button>
              </div>
            </Card>
          </div>
        </main>
      )}

      {currentPage === 'about' && (
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">О магазине</h2>
            <Card className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Наша философия</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Мы верим, что меньше — значит больше. Каждый товар в нашем каталоге 
                  тщательно отобран, чтобы приносить радость и функциональность в вашу жизнь.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">Качество превыше всего</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Мы сотрудничаем только с проверенными производителями, которые разделяют 
                  наши ценности: долговечность, экологичность и внимание к деталям.
                </p>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-xl font-semibold mb-4">Свяжитесь с нами</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="Mail" size={20} />
                    <span>support@store.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="Phone" size={20} />
                    <span>+7 (800) 555-35-35</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="MapPin" size={20} />
                    <span>Москва, ул. Примерная, 123</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      )}

      <footer className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Store</h3>
          <p className="text-muted-foreground mb-6">
            Минималистичный интернет-магазин для ценителей качества
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Twitter" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Facebook" size={20} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            © 2024 Store. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

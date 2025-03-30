'use client'

import { useState, useEffect } from 'react'
import { TaskType, classifyTask, getTaskTypeDescription } from '@/lib/task-classifier'
import { renderTaskData } from '@/components/task-renderers'

// Data generators for different task types
export const generateFlightData = (origin, destination) => {
  const AIRLINES = [
    'Аэрофлот', 'Air China', 'China Eastern', 'S7 Airlines', 'Hainan Airlines', 
    'China Southern', 'Ural Airlines', 'Sichuan Airlines', 'JAL', 'ANA'
  ];
  
  const flights = [];
  const today = new Date();
  
  // Generate 3-5 flights
  const flightCount = 3 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < flightCount; i++) {
    // Random date in the next 30 days
    const departureDate = new Date(today);
    departureDate.setDate(today.getDate() + Math.floor(Math.random() * 30));
    
    // Random time
    departureDate.setHours(6 + Math.floor(Math.random() * 16));
    departureDate.setMinutes(Math.floor(Math.random() * 60));
    
    // Flight duration in minutes (for Moscow-Beijing, typically 7-9 hours)
    const durationMinutes = 420 + Math.floor(Math.random() * 120);
    
    // Calculate arrival time
    const arrivalDate = new Date(departureDate);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationMinutes);
    
    // Random price (for Moscow-Beijing, typically 30,000-80,000 RUB)
    const price = 30000 + Math.floor(Math.random() * 50000);
    
    // Random airline
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
    
    // Random flight number
    const flightNumber = airline.substring(0, 2).toUpperCase() + Math.floor(Math.random() * 1000 + 100);
    
    // Random number of stops
    const stops = Math.floor(Math.random() * 2); // 0, 1 stops
    
    // Add flight to list
    flights.push({
      airline,
      flightNumber,
      origin,
      destination,
      departureDate: departureDate.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      arrivalDate: arrivalDate.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      duration: `${Math.floor(durationMinutes / 60)}ч ${durationMinutes % 60}м`,
      stops,
      price: price.toLocaleString('ru-RU') + ' ₽',
      available: Math.floor(Math.random() * 30) + 1
    });
  }
  
  // Sort by price
  flights.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
  
  return flights;
};

// Generate weather data
export const generateWeatherData = (location) => {
  const today = new Date();
  const forecast = [];
  
  // Weather conditions
  const conditions = [
    'Солнечно', 'Переменная облачность', 'Облачно', 'Пасмурно', 
    'Небольшой дождь', 'Дождь', 'Ливень', 'Гроза',
    'Небольшой снег', 'Снег', 'Метель', 'Туман'
  ];
  
  // Generate 5-day forecast
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Random temperature based on season
    const month = date.getMonth();
    let tempMin, tempMax;
    
    if (month >= 11 || month <= 1) { // Winter
      tempMin = -15 + Math.floor(Math.random() * 10);
      tempMax = tempMin + 3 + Math.floor(Math.random() * 5);
    } else if (month >= 2 && month <= 4) { // Spring
      tempMin = 0 + Math.floor(Math.random() * 10);
      tempMax = tempMin + 5 + Math.floor(Math.random() * 7);
    } else if (month >= 5 && month <= 7) { // Summer
      tempMin = 15 + Math.floor(Math.random() * 8);
      tempMax = tempMin + 5 + Math.floor(Math.random() * 10);
    } else { // Fall
      tempMin = 5 + Math.floor(Math.random() * 10);
      tempMax = tempMin + 4 + Math.floor(Math.random() * 6);
    }
    
    // Random condition
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    // Random humidity
    const humidity = 40 + Math.floor(Math.random() * 50);
    
    // Random wind speed
    const windSpeed = 1 + Math.floor(Math.random() * 10);
    
    // Add to forecast
    forecast.push({
      date: date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }),
      tempMin: tempMin,
      tempMax: tempMax,
      condition: condition,
      humidity: humidity,
      windSpeed: windSpeed
    });
  }
  
  return {
    location: location,
    current: {
      temp: forecast[0].tempMin + Math.floor((forecast[0].tempMax - forecast[0].tempMin) * Math.random()),
      condition: forecast[0].condition,
      humidity: forecast[0].humidity,
      windSpeed: forecast[0].windSpeed,
      feelsLike: forecast[0].tempMin + Math.floor((forecast[0].tempMax - forecast[0].tempMin) * Math.random()) - 2
    },
    forecast: forecast
  };
};

// Generate stock price data
export const generateStockData = (symbol) => {
  // Base price between $10 and $500
  const basePrice = 10 + Math.floor(Math.random() * 490);
  const prices = [];
  const dates = [];
  const today = new Date();
  
  // Generate 30 days of historical data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }
    
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Random daily change between -5% and +5%
    const changePercent = -5 + Math.random() * 10;
    const change = basePrice * (changePercent / 100);
    
    if (i === 30) {
      // First day
      prices.push(basePrice);
    } else {
      // Subsequent days based on previous price
      prices.push(prices[prices.length - 1] + change);
    }
  }
  
  // Current price (last in the array)
  const currentPrice = prices[prices.length - 1];
  
  // Previous close (second to last)
  const previousClose = prices[prices.length - 2];
  
  // Calculate change
  const priceChange = currentPrice - previousClose;
  const priceChangePercent = (priceChange / previousClose) * 100;
  
  // 52-week range
  const min52Week = Math.min(...prices) * 0.9;
  const max52Week = Math.max(...prices) * 1.1;
  
  // Market cap (random between 1B and 2T)
  const marketCap = (1 + Math.floor(Math.random() * 2000)) * 1000000000;
  
  // Volume (random between 1M and 50M)
  const volume = (1 + Math.floor(Math.random() * 50)) * 1000000;
  
  // P/E ratio (random between 10 and 40)
  const peRatio = 10 + Math.floor(Math.random() * 30);
  
  // Dividend yield (random between 0% and 5%)
  const dividendYield = Math.random() * 5;
  
  return {
    symbol: symbol,
    companyName: getCompanyNameForSymbol(symbol),
    currentPrice: currentPrice.toFixed(2),
    priceChange: priceChange.toFixed(2),
    priceChangePercent: priceChangePercent.toFixed(2),
    previousClose: previousClose.toFixed(2),
    open: (previousClose + (Math.random() * 2 - 1)).toFixed(2),
    dayRange: `${(currentPrice * 0.98).toFixed(2)} - ${(currentPrice * 1.02).toFixed(2)}`,
    week52Range: `${min52Week.toFixed(2)} - ${max52Week.toFixed(2)}`,
    marketCap: formatLargeNumber(marketCap),
    volume: formatLargeNumber(volume),
    peRatio: peRatio.toFixed(2),
    dividendYield: dividendYield.toFixed(2) + '%',
    historicalData: {
      dates: dates,
      prices: prices.map(p => p.toFixed(2))
    }
  };
};

// Helper function to get company name for stock symbol
const getCompanyNameForSymbol = (symbol) => {
  const companies = {
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corporation',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com, Inc.',
    'META': 'Meta Platforms, Inc.',
    'TSLA': 'Tesla, Inc.',
    'NVDA': 'NVIDIA Corporation',
    'JPM': 'JPMorgan Chase & Co.',
    'V': 'Visa Inc.',
    'JNJ': 'Johnson & Johnson',
    'WMT': 'Walmart Inc.',
    'PG': 'Procter & Gamble Company',
    'MA': 'Mastercard Incorporated',
    'UNH': 'UnitedHealth Group Incorporated',
    'HD': 'The Home Depot, Inc.',
    'BAC': 'Bank of America Corporation',
    'XOM': 'Exxon Mobil Corporation',
    'DIS': 'The Walt Disney Company',
    'NFLX': 'Netflix, Inc.',
    'INTC': 'Intel Corporation'
  };
  
  return companies[symbol] || `${symbol} Corporation`;
};

// Helper function to format large numbers
export const formatLargeNumber = (num) => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + 'T';
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toString();
};

// Generate translation data
export const generateTranslationData = (text, sourceLang, targetLang) => {
  // Mock translations for demo purposes
  const translations = {
    'hello': {
      'ru': 'привет',
      'fr': 'bonjour',
      'de': 'hallo',
      'es': 'hola',
      'it': 'ciao',
      'zh': '你好',
      'ja': 'こんにちは'
    },
    'goodbye': {
      'ru': 'до свидания',
      'fr': 'au revoir',
      'de': 'auf wiedersehen',
      'es': 'adiós',
      'it': 'arrivederci',
      'zh': '再见',
      'ja': 'さようなら'
    },
    'thank you': {
      'ru': 'спасибо',
      'fr': 'merci',
      'de': 'danke',
      'es': 'gracias',
      'it': 'grazie',
      'zh': '谢谢',
      'ja': 'ありがとう'
    },
    'how are you': {
      'ru': 'как дела',
      'fr': 'comment allez-vous',
      'de': 'wie geht es dir',
      'es': 'cómo estás',
      'it': 'come stai',
      'zh': '你好吗',
      'ja': 'お元気ですか'
    },
    'good morning': {
      'ru': 'доброе утро',
      'fr': 'bonjour',
      'de': 'guten morgen',
      'es': 'buenos días',
      'it': 'buongiorno',
      'zh': '早上好',
      'ja': 'おはようございます'
    }
  };
  
  // Check if we have a predefined translation
  const lowerText = text.toLowerCase();
  if (translations[lowerText] && translations[lowerText][targetLang]) {
    return {
      originalText: text,
      translatedText: translations[lowerText][targetLang],
      sourceLang: sourceLang,
      targetLang: targetLang,
      alternativeTranslations: []
    };
  }
  
  // For other texts, generate a mock translation
  return {
    originalText: text,
    translatedText: `[Перевод текста "${text}" с ${sourceLang} на ${targetLang}]`,
    sourceLang: sourceLang,
    targetLang: targetLang,
    alternativeTranslations: [
      `[Альтернативный перевод 1]`,
      `[Альтернативный перевод 2]`
    ]
  };
};

// Generate calculation result
export const generateCalculationResult = (expression) => {
  // Simple expressions that can be evaluated
  try {
    // Remove any non-math characters for safety
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
    
    // Evaluate the expression
    const result = eval(sanitizedExpression);
    
    return {
      expression: expression,
      result: result,
      steps: [
        `Получено выражение: ${expression}`,
        `Вычисление: ${sanitizedExpression} = ${result}`
      ]
    };
  } catch (error) {
    return {
      expression: expression,
      result: 'Ошибка вычисления',
      error: error.message,
      steps: [
        `Получено выражение: ${expression}`,
        `Ошибка: ${error.message}`
      ]
    };
  }
};

// Generate news data
export const generateNewsData = (query) => {
  const today = new Date();
  const articles = [];
  
  // News sources
  const sources = [
    'РИА Новости', 'ТАСС', 'Интерфакс', 'Коммерсантъ', 'Ведомости', 
    'РБК', 'Газета.ru', 'Лента.ru', 'Медуза', 'BBC News Русская служба'
  ];
  
  // Generate 5-10 news articles
  const articleCount = 5 + Math.floor(Math.random() * 6);
  
  for (let i = 0; i < articleCount; i++) {
    // Random date in the last 7 days
    const publishedDate = new Date(today);
    publishedDate.setDate(today.getDate() - Math.floor(Math.random() * 7));
    publishedDate.setHours(Math.floor(Math.random() * 24));
    publishedDate.setMinutes(Math.floor(Math.random() * 60));
    
    // Random source
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    // Add article
    articles.push({
      title: `Новость о "${query}" ${i + 1}`,
      description: `Это подробное описание новости о "${query}". Здесь содержится основная информация о событии, которое произошло недавно и связано с запросом пользователя.`,
      source: source,
      publishedAt: publishedDate.toISOString(),
      url: `https://example.com/news/${i + 1}`
    });
  }
  
  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  return {
    query: query,
    articles: articles
  };
};

// Generate recipe data
export const generateRecipeData = (dishName) => {
  return {
    name: dishName,
    description: `Классический рецепт блюда "${dishName}". Это блюдо отличается насыщенным вкусом и ароматом, его легко приготовить дома.`,
    cookTime: `${30 + Math.floor(Math.random() * 90)} минут`,
    servings: 2 + Math.floor(Math.random() * 4),
    difficulty: ['Легко', 'Средне', 'Сложно'][Math.floor(Math.random() * 3)],
    ingredients: [
      '300 г основного ингредиента',
      '2 столовые ложки растительного масла',
      '1 луковица',
      '2 зубчика чеснока',
      '1 чайная ложка соли',
      '1/2 чайной ложки черного перца',
      'Специи по вкусу',
      '200 мл воды или бульона'
    ],
    instructions: [
      'Подготовьте все ингредиенты согласно списку.',
      'Нарежьте основной ингредиент кубиками среднего размера.',
      'Мелко нарежьте лук и чеснок.',
      'Разогрейте масло в сковороде на среднем огне.',
      'Обжарьте лук до прозрачности, затем добавьте чеснок и готовьте еще 1 минуту.',
      'Добавьте основной ингредиент и обжаривайте 5-7 минут, помешивая.',
      'Добавьте соль, перец и специи, перемешайте.',
      'Влейте воду или бульон, доведите до кипения.',
      'Уменьшите огонь, накройте крышкой и тушите 20-25 минут до готовности.',
      'Подавайте горячим, при желании украсив зеленью.'
    ],
    tips: [
      'Для более насыщенного вкуса можно добавить сметану или сливки в конце приготовления.',
      'Блюдо хорошо сочетается с рисом, картофелем или свежим хлебом.',
      'Оставшуюся порцию можно хранить в холодильнике до 3 дней.'
    ]
  };
};

// Generate movie data
export const generateMovieData = (movieTitle) => {
  return {
    title: movieTitle,
    year: 2010 + Math.floor(Math.random() * 14),
    director: 'Известный Режиссер',
    genre: ['Драма', 'Комедия', 'Боевик', 'Триллер', 'Фантастика'].sort(() => 0.5 - Math.random()).slice(0, 2),
    rating: (6 + Math.random() * 4).toFixed(1),
    runtime: 90 + Math.floor(Math.random() * 60),
    plot: `"${movieTitle}" - это захватывающий фильм, который рассказывает историю о главном герое, сталкивающемся с необычными обстоятельствами. По мере развития сюжета, зритель погружается в мир интриг, эмоций и неожиданных поворотов.`,
    cast: [
      'Известный Актер',
      'Популярная Актриса',
      'Характерный Актер',
      'Молодая Звезда',
      'Ветеран Кино'
    ],
    reviews: [
      {
        text: 'Фильм поражает своей глубиной и проработкой персонажей. Режиссерская работа заслуживает особого внимания.',
        author: 'Кинокритик',
        source: 'Известный журнал'
      },
      {
        text: 'Несмотря на некоторые недостатки сценария, актерская игра и визуальный ряд делают фильм достойным просмотра.',
        author: 'Блогер',
        source: 'Популярный блог о кино'
      }
    ]
  };
};

// Generate music data
export const generateMusicData = (query, type = 'track') => {
  if (type === 'artist') {
    return {
      type: 'artist',
      name: query,
      genres: ['Поп', 'Рок', 'Электроника'].sort(() => 0.5 - Math.random()).slice(0, 2),
      bio: `${query} - известный исполнитель, начавший карьеру в начале 2000-х годов. За время творческой деятельности выпустил несколько успешных альбомов и синглов, получивших признание критиков и слушателей.`,
      popularTracks: [
        { name: 'Хит №1', album: 'Альбом 1', year: 2015 },
        { name: 'Популярная песня', album: 'Альбом 2', year: 2018 },
        { name: 'Новый сингл', album: 'Альбом 3', year: 2022 }
      ]
    };
  } else if (type === 'album') {
    return {
      type: 'album',
      name: query,
      artist: 'Исполнитель',
      year: 2015 + Math.floor(Math.random() * 9),
      genre: ['Поп', 'Рок', 'Электроника', 'Хип-хоп', 'Джаз'][Math.floor(Math.random() * 5)],
      description: `"${query}" - это альбом, который демонстрирует музыкальное развитие исполнителя. Он содержит разнообразные композиции, объединенные общей тематикой и настроением.`,
      tracks: [
        { name: 'Трек 1', duration: '3:45' },
        { name: 'Трек 2', duration: '4:12' },
        { name: 'Трек 3', duration: '3:21' },
        { name: 'Трек 4', duration: '5:07' },
        { name: 'Трек 5', duration: '3:58' }
      ]
    };
  } else {
    return {
      type: 'track',
      name: query,
      artist: 'Исполнитель',
      album: 'Название альбома',
      year: 2018 + Math.floor(Math.random() * 6),
      genre: ['Поп', 'Рок', 'Электроника', 'Хип-хоп', 'Джаз'][Math.floor(Math.random() * 5)],
      description: `"${query}" - это композиция, которая отличается запоминающейся мелодией и глубоким текстом. Песня быстро завоевала популярность среди слушателей.`,
      lyrics: `Первый куплет:
Здесь будет текст первого куплета песни "${query}".
Строки с рифмами и смыслом, передающие основную идею.
Продолжение текста с развитием темы.
Завершение куплета с подводкой к припеву.

Припев:
Запоминающийся припев песни "${query}".
Повторяющиеся строки, которые легко запомнить.
Основной посыл композиции.
Еще одна строка припева.

Второй куплет:
Развитие истории, начатой в первом куплете.
Новые детали и образы в тексте песни.
Эмоциональное усиление перед следующим припевом.
Завершающие строки второго куплета.

[Повтор припева]

Бридж:
Изменение ритма и настроения.
Кульминационные строки песни.
Подготовка к финальному припеву.

[Финальный припев]

Аутро:
Завершающие строки песни "${query}".
Последний акцент на основной идее композиции.`
    };
  }
};

// Generate sports data
export const generateSportsData = (query, type = 'match') => {
  if (type === 'match') {
    return {
      type: 'match',
      title: `Матч: ${query}`,
      team1: 'Команда 1',
      team2: 'Команда 2',
      score1: Math.floor(Math.random() * 5),
      score2: Math.floor(Math.random() * 5),
      status: ['Завершен', 'Идет сейчас', 'Перерыв'][Math.floor(Math.random() * 3)],
      league: 'Премьер-лига',
      events: [
        { time: 12, description: 'Гол! Команда 1 открывает счет' },
        { time: 34, description: 'Желтая карточка игроку Команды 2' },
        { time: 45, description: 'Конец первого тайма' },
        { time: 67, description: 'Гол! Команда 2 сравнивает счет' },
        { time: 78, description: 'Замена в Команде 1' },
        { time: 89, description: 'Гол! Команда 1 выходит вперед' }
      ]
    };
  } else if (type === 'standings') {
    return {
      type: 'standings',
      title: `Турнирная таблица: ${query}`,
      standings: [
        { position: 1, name: 'Команда A', played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 24, goalsAgainst: 7, points: 25 },
        { position: 2, name: 'Команда B', played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 22, goalsAgainst: 10, points: 23 },
        { position: 3, name: 'Команда C', played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 12, points: 20 },
        { position: 4, name: 'Команда D', played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 15, goalsAgainst: 10, points: 18 },
        { position: 5, name: 'Команда E', played: 10, won: 4, drawn: 4, lost: 2, goalsFor: 14, goalsAgainst: 11, points: 16 }
      ]
    };
  } else {
    return {
      type: 'schedule',
      title: `Расписание матчей: ${query}`,
      matches: [
        { date: '01.04.2025', time: '19:00', team1: 'Команда A', team2: 'Команда B', league: 'Премьер-лига', venue: 'Стадион 1' },
        { date: '05.04.2025', time: '17:30', team1: 'Команда C', team2: 'Команда A', league: 'Премьер-лига', venue: 'Стадион 2' },
        { date: '12.04.2025', time: '20:00', team1: 'Команда A', team2: 'Команда D', league: 'Премьер-лига', venue: 'Стадион 1' },
        { date: '19.04.2025', time: '18:45', team1: 'Команда E', team2: 'Команда A', league: 'Премьер-лига', venue: 'Стадион 3' }
      ]
    };
  }
};

// Extract location from weather query
export const extractLocationFromWeatherQuery = (query) => {
  const locationMatch = query.match(/погода\s+в\s+([а-яА-Яa-zA-Z\s-]+)/i) || 
                       query.match(/прогноз\s+в\s+([а-яА-Яa-zA-Z\s-]+)/i) ||
                       query.match(/погода\s+([а-яА-Яa-zA-Z\s-]+)/i) ||
                       query.match(/weather\s+in\s+([a-zA-Z\s-]+)/i);
  
  return locationMatch ? locationMatch[1].trim() : 'Москва';
};

// Extract stock symbol from query
export const extractStockSymbolFromQuery = (query) => {
  const symbolMatch = query.match(/акции\s+([A-Z]+)/i) || 
                     query.match(/stock\s+([A-Z]+)/i) ||
                     query.match(/([A-Z]{1,5})\s+stock/i) ||
                     query.match(/([A-Z]{1,5})\s+акции/i);
  
  return symbolMatch ? symbolMatch[1].toUpperCase() : 'AAPL';
};

// Extract text and languages from translation query
export const extractTranslationParams = (query) => {
  const textMatch = query.match(/перевести\s+["'](.+?)["']/i) || 
                   query.match(/перевод\s+["'](.+?)["']/i) ||
                   query.match(/translate\s+["'](.+?)["']/i) ||
                   query.match(/перевести\s+(.+?)\s+на/i);
  
  const text = textMatch ? textMatch[1] : query.replace(/перевести|перевод|translate/gi, '').trim();
  
  // Detect target language
  const targetLangMatch = query.match(/на\s+(русский|английский|французский|немецкий|испанский|итальянский|китайский|японский)/i) ||
                         query.match(/to\s+(russian|english|french|german|spanish|italian|chinese|japanese)/i);
  
  const langMap = {
    'русский': 'ru', 'russian': 'ru',
    'английский': 'en', 'english': 'en',
    'французский': 'fr', 'french': 'fr',
    'немецкий': 'de', 'german': 'de',
    'испанский': 'es', 'spanish': 'es',
    'итальянский': 'it', 'italian': 'it',
    'китайский': 'zh', 'chinese': 'zh',
    'японский': 'ja', 'japanese': 'ja'
  };
  
  const targetLang = targetLangMatch ? langMap[targetLangMatch[1].toLowerCase()] : 'en';
  const sourceLang = targetLang === 'en' ? 'ru' : 'en';
  
  return { text, sourceLang, targetLang };
};

// Extract expression from calculation query
export const extractExpressionFromQuery = (query) => {
  const expressionMatch = query.match(/посчитай\s+(.+)/i) || 
                         query.match(/вычисли\s+(.+)/i) ||
                         query.match(/calculate\s+(.+)/i) ||
                         query.match(/сколько\s+будет\s+(.+)/i);
  
  return expressionMatch ? expressionMatch[1] : query;
};

// Generate task-specific data based on task type and query
export const generateTaskData = (taskType, query) => {
  switch (taskType) {
    case TaskType.FLIGHT_SEARCH: {
      const cities = query.match(/([а-яА-Яa-zA-Z\s-]+)\s+(?:в|to)\s+([а-яА-Яa-zA-Z\s-]+)/i);
      const origin = cities ? cities[1].trim() : 'москва';
      const destination = cities ? cities[2].trim() : 'пекин';
      return generateFlightData(origin, destination);
    }
    
    case TaskType.WEATHER: {
      const location = extractLocationFromWeatherQuery(query);
      return generateWeatherData(location);
    }
    
    case TaskType.STOCK_PRICE: {
      const symbol = extractStockSymbolFromQuery(query);
      return generateStockData(symbol);
    }
    
    case TaskType.TRANSLATION: {
      const { text, sourceLang, targetLang } = extractTranslationParams(query);
      return generateTranslationData(text, sourceLang, targetLang);
    }
    
    case TaskType.CALCULATION: {
      const expression = extractExpressionFromQuery(query);
      return generateCalculationResult(expression);
    }
    
    case TaskType.NEWS: {
      const newsQuery = query.replace(/новости|news|события|events/gi, '').trim();
      return generateNewsData(newsQuery || 'общие');
    }
    
    case TaskType.RECIPE: {
      const recipeMatch = query.match(/рецепт\s+(.+)/i) || 
                         query.match(/как\s+приготовить\s+(.+)/i) ||
                         query.match(/recipe\s+for\s+(.+)/i);
      const dishName = recipeMatch ? recipeMatch[1] : 'блюдо';
      return generateRecipeData(dishName);
    }
    
    case TaskType.MOVIE_INFO: {
      const movieMatch = query.match(/фильм\s+(.+)/i) || 
                        query.match(/movie\s+(.+)/i) ||
                        query.match(/информация\s+о\s+фильме\s+(.+)/i);
      const movieTitle = movieMatch ? movieMatch[1] : 'фильм';
      return generateMovieData(movieTitle);
    }
    
    case TaskType.MUSIC_INFO: {
      const musicMatch = query.match(/песня\s+(.+)/i) || 
                        query.match(/song\s+(.+)/i) ||
                        query.match(/исполнитель\s+(.+)/i) ||
                        query.match(/artist\s+(.+)/i) ||
                        query.match(/альбом\s+(.+)/i) ||
                        query.match(/album\s+(.+)/i);
      
      const musicQuery = musicMatch ? musicMatch[1] : query.replace(/музыка|music/gi, '').trim();
      
      // Determine type (artist, album, or track)
      let type = 'track';
      if (query.includes('исполнитель') || query.includes('artist')) {
        type = 'artist';
      } else if (query.includes('альбом') || query.includes('album')) {
        type = 'album';
      }
      
      return generateMusicData(musicQuery, type);
    }
    
    case TaskType.SPORTS: {
      const sportsMatch = query.match(/матч\s+(.+)/i) || 
                         query.match(/match\s+(.+)/i) ||
                         query.match(/таблица\s+(.+)/i) ||
                         query.match(/standings\s+(.+)/i) ||
                         query.match(/расписание\s+(.+)/i) ||
                         query.match(/schedule\s+(.+)/i);
      
      const sportsQuery = sportsMatch ? sportsMatch[1] : query.replace(/спорт|sport/gi, '').trim();
      
      // Determine type (match, standings, or schedule)
      let type = 'match';
      if (query.includes('таблица') || query.includes('standings')) {
        type = 'standings';
      } else if (query.includes('расписание') || query.includes('schedule')) {
        type = 'schedule';
      }
      
      return generateSportsData(sportsQuery, type);
    }
    
    default:
      return null;
  }
};

// Generate a response based on the task type, mode, and data
export const generateTaskResponse = (taskText, taskMode, type, data) => {
  switch (type) {
    case TaskType.FLIGHT_SEARCH:
      if (data && data.length > 0) {
        const cheapestFlight = data[0];
        const fastestFlight = [...data].sort((a, b) => {
          const durationA = parseInt(a.duration.split('ч')[0]) * 60 + parseInt(a.duration.split('ч')[1].split('м')[0]);
          const durationB = parseInt(b.duration.split('ч')[0]) * 60 + parseInt(b.duration.split('ч')[1].split('м')[0]);
          return durationA - durationB;
        })[0];
        
        return `Найдено ${data.length} рейсов по маршруту ${data[0].origin} - ${data[0].destination}. Самый дешевый рейс: ${cheapestFlight.airline} ${cheapestFlight.flightNumber} за ${cheapestFlight.price}, вылет ${cheapestFlight.departureDate}. Самый быстрый рейс: ${fastestFlight.airline} ${fastestFlight.flightNumber}, длительность ${fastestFlight.duration}.`;
      }
      return `К сожалению, не удалось найти рейсы по указанному маршруту. Попробуйте изменить даты или направление.`;
      
    case TaskType.WEATHER:
      if (data) {
        return `Погода в ${data.location}: сейчас ${data.current.temp}°C, ${data.current.condition.toLowerCase()}. Ощущается как ${data.current.feelsLike}°C. Влажность: ${data.current.humidity}%, ветер: ${data.current.windSpeed} м/с. Прогноз на ближайшие дни: ${data.forecast[1].date} - от ${data.forecast[1].tempMin}°C до ${data.forecast[1].tempMax}°C, ${data.forecast[1].condition.toLowerCase()}.`;
      }
      return `К сожалению, не удалось получить данные о погоде для указанного местоположения.`;
      
    case TaskType.STOCK_PRICE:
      if (data) {
        const changeDirection = parseFloat(data.priceChange) >= 0 ? 'выросли' : 'упали';
        return `Акции ${data.companyName} (${data.symbol}) сейчас торгуются по цене $${data.currentPrice}. За последний торговый день они ${changeDirection} на ${Math.abs(parseFloat(data.priceChange)).toFixed(2)}$ (${Math.abs(parseFloat(data.priceChangePercent)).toFixed(2)}%). Рыночная капитализация компании составляет ${data.marketCap}. 52-недельный диапазон: $${data.week52Range}.`;
      }
      return `К сожалению, не удалось получить данные о котировках для указанной компании.`;
      
    case TaskType.TRANSLATION:
      if (data) {
        return `Перевод текста "${data.originalText}" с ${data.sourceLang} на ${data.targetLang}: "${data.translatedText}"`;
      }
      return `К сожалению, не удалось выполнить перевод для указанного текста.`;
      
    case TaskType.CALCULATION:
      if (data) {
        return `Результат вычисления выражения "${data.expression}": ${data.result}`;
      }
      return `К сожалению, не удалось выполнить вычисление для указанного выражения.`;
      
    case TaskType.NEWS:
      if (data && data.articles && data.articles.length > 0) {
        return `Последние новости по запросу "${data.query}": ${data.articles[0].title} (${data.articles[0].source}), ${data.articles[1].title} (${data.articles[1].source}). Всего найдено ${data.articles.length} новостей.`;
      }
      return `К сожалению, не удалось найти новости по вашему запросу.`;
      
    case TaskType.RECIPE:
      if (data) {
        return `Рецепт "${data.name}": ${data.description} Время приготовления: ${data.cookTime}. Основные ингредиенты: ${data.ingredients.slice(0, 3).join(', ')}. Рецепт состоит из ${data.instructions.length} шагов.`;
      }
      return `К сожалению, не удалось найти рецепт по вашему запросу.`;
      
    case TaskType.MOVIE_INFO:
      if (data) {
        return `Фильм "${data.title}" (${data.year}): режиссер - ${data.director}, жанр - ${data.genre.join(', ')}, рейтинг - ${data.rating}/10. В главных ролях: ${data.cast.slice(0, 3).join(', ')}. Краткое описание: ${data.plot.substring(0, 100)}...`;
      }
      return `К сожалению, не удалось найти информацию о запрошенном фильме.`;
      
    case TaskType.MUSIC_INFO:
      if (data) {
        if (data.type === 'artist') {
          return `Исполнитель "${data.name}": жанры - ${data.genres.join(', ')}. ${data.bio.substring(0, 100)}... Популярные треки: ${data.popularTracks.map(t => t.name).join(', ')}.`;
        } else if (data.type === 'album') {
          return `Альбом "${data.name}" исполнителя ${data.artist} (${data.year}): жанр - ${data.genre}, содержит ${data.tracks.length} треков. ${data.description.substring(0, 100)}...`;
        } else {
          return `Трек "${data.name}" исполнителя ${data.artist} из альбома "${data.album}" (${data.year}): жанр - ${data.genre}. ${data.description.substring(0, 100)}...`;
        }
      }
      return `К сожалению, не удалось найти информацию о запрошенной музыке.`;
      
    case TaskType.SPORTS:
      if (data) {
        if (data.type === 'match') {
          return `Матч ${data.team1} - ${data.team2}: счет ${data.score1}:${data.score2}, статус - ${data.status}. Лига: ${data.league}. Ключевые события: ${data.events.slice(0, 2).map(e => `${e.time}' - ${e.description}`).join(', ')}.`;
        } else if (data.type === 'standings') {
          return `Турнирная таблица: 1. ${data.standings[0].name} - ${data.standings[0].points} очков, 2. ${data.standings[1].name} - ${data.standings[1].points} очков, 3. ${data.standings[2].name} - ${data.standings[2].points} очков.`;
        } else {
          return `Ближайшие матчи: ${data.matches[0].date} ${data.matches[0].time} - ${data.matches[0].team1} vs ${data.matches[0].team2}, ${data.matches[1].date} ${data.matches[1].time} - ${data.matches[1].team1} vs ${data.matches[1].team2}.`;
        }
      }
      return `К сожалению, не удалось найти спортивную информацию по вашему запросу.`;
      
    case TaskType.SUMMARIZATION:
      return `Я проанализировал контент и подготовил подробное резюме. Ключевые моменты организованы в логическую структуру с выделением основных идей. ${taskMode === 'multi' ? 'Несколько специализированных агентов сотрудничали для обеспечения точности и полноты.' : 'Анализ был выполнен с вниманием к деталям и контексту.'}`;
      
    case TaskType.RESEARCH:
      return `Исследование завершено. Я собрал информацию из нескольких надежных источников, перепроверил данные и составил подробный отчет. ${taskMode === 'multi' ? 'Исследовательская группа использовала специализированных агентов для различных информационных доменов.' : 'Исследование проводилось систематически с тщательной проверкой источников.'}`;
      
    case TaskType.CONTENT_CREATION:
      return `Создание контента завершено. Я разработал запрошенный контент, следуя лучшим практикам структуры, ясности и вовлеченности. Стиль письма адаптирован к соответствующей аудитории и цели. ${taskMode === 'multi' ? 'Несколько специализированных агентов внесли свой вклад в различные аспекты процесса создания контента.' : 'Контент был создан с особым вниманием к качеству и согласованности.'}`;
      
    case TaskType.DATA_ANALYSIS:
      return `Анализ завершен. Я тщательно изучил данные и выявил ключевые закономерности, тенденции и выводы. Анализ включает как количественные показатели, так и качественные наблюдения. ${taskMode === 'multi' ? 'Несколько специализированных агентов предоставили различные аналитические перспективы.' : 'Анализ проводился с использованием комплексных методологий.'}`;
      
    case TaskType.CODING:
      return `Задача разработки завершена. Код написан в соответствии с лучшими практиками, с чистой архитектурой, соответствующими комментариями и обработкой ошибок. ${taskMode === 'multi' ? 'Несколько специализированных агентов занимались различными аспектами процесса разработки.' : 'Разработка была завершена с вниманием к качеству и поддерживаемости.'}`;
      
    case TaskType.QUESTION_ANSWERING:
      return `На основе доступной информации, ответ на ваш вопрос: "${taskText}" следующий: [Детальный ответ на вопрос пользователя с учетом контекста и доступных данных]. ${taskMode === 'multi' ? 'Для формирования полного ответа были задействованы агенты с различными областями знаний.' : 'Ответ сформирован на основе анализа релевантной информации.'}`;
      
    case TaskType.RECOMMENDATION:
      return `На основе вашего запроса, вот мои рекомендации: [Список персонализированных рекомендаций с обоснованием каждого выбора]. Эти рекомендации основаны на анализе популярности, отзывов и соответствия вашим критериям. ${taskMode === 'multi' ? 'Различные агенты проанализировали разные аспекты для формирования оптимальных рекомендаций.' : 'Рекомендации сформированы с учетом множества факторов для наилучшего соответствия вашим потребностям.'}`;
      
    case TaskType.DEFINITION:
      return `Определение термина "${taskText.replace(/что такое|определение|definition|what is/gi, '').trim()}": [Подробное определение с этимологией, контекстом использования и примерами]. ${taskMode === 'multi' ? 'Определение составлено с учетом различных источников и областей применения термина.' : 'Определение основано на авторитетных источниках и включает все ключевые аспекты понятия.'}`;
      
    case TaskType.COMPARISON:
      return `Сравнительный анализ по вашему запросу: [Детальное сравнение с таблицей ключевых параметров, преимуществ и недостатков каждого варианта]. Анализ учитывает объективные характеристики и субъективные оценки пользователей. ${taskMode === 'multi' ? 'Различные аспекты сравнения были проанализированы специализированными агентами.' : 'Сравнение проведено по комплексной методике для обеспечения объективности результатов.'}`;
      
    default:
      return `Задача выполнена успешно. Я обработал ваш запрос: "${taskText}" используя режим ${taskMode}. Выполнение задействовало продвинутые возможности фреймворка ANUS для достижения оптимальных результатов. Все подзадачи были выполнены с высокой точностью и эффективностью.`;
  }
};

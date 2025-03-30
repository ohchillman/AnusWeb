// Task classification system for ANUS web interface
// This module provides intelligent task classification and response generation

// Task types
export enum TaskType {
  GENERAL = 'general',
  FLIGHT_SEARCH = 'flight_search',
  WEATHER = 'weather',
  TRANSLATION = 'translation',
  CALCULATION = 'calculation',
  CODING = 'coding',
  SUMMARIZATION = 'summarization',
  RESEARCH = 'research',
  CONTENT_CREATION = 'content_creation',
  DATA_ANALYSIS = 'data_analysis',
  QUESTION_ANSWERING = 'question_answering',
  RECOMMENDATION = 'recommendation',
  STOCK_PRICE = 'stock_price',
  NEWS = 'news',
  DEFINITION = 'definition',
  COMPARISON = 'comparison',
  RECIPE = 'recipe',
  MOVIE_INFO = 'movie_info',
  MUSIC_INFO = 'music_info',
  SPORTS = 'sports'
}

// Task classification patterns
interface PatternRule {
  type: TaskType;
  patterns: string[];
  languages?: string[];
}

// Define classification rules
const classificationRules: PatternRule[] = [
  {
    type: TaskType.FLIGHT_SEARCH,
    patterns: [
      'билет', 'рейс', 'полет', 'авиа', 'самолет', 'flight', 'ticket', 'plane', 'airport',
      'авиабилет', 'перелет', 'аэропорт', 'вылет', 'прилет', 'бронирование'
    ]
  },
  {
    type: TaskType.WEATHER,
    patterns: [
      'погода', 'температура', 'осадки', 'weather', 'forecast', 'temperature', 'rain', 'snow',
      'прогноз', 'климат', 'ветер', 'облачность', 'солнечно', 'дождь', 'снег'
    ]
  },
  {
    type: TaskType.TRANSLATION,
    patterns: [
      'перевод', 'перевести', 'translate', 'translation', 'переведи', 'как будет', 'как сказать',
      'как по-английски', 'как по-русски', 'как по-французски', 'как по-немецки', 'как по-испански',
      'как по-итальянски', 'как по-китайски', 'как по-японски'
    ]
  },
  {
    type: TaskType.CALCULATION,
    patterns: [
      'посчитай', 'вычисли', 'рассчитай', 'calculate', 'compute', 'калькулятор', 'сложи', 'вычти',
      'умножь', 'раздели', 'корень', 'степень', 'процент', 'сколько будет', 'решить уравнение',
      '+', '-', '*', '/', '=', '>', '<', '≥', '≤', '≠', '±', '÷', '×'
    ]
  },
  {
    type: TaskType.CODING,
    patterns: [
      'код', 'программа', 'функция', 'алгоритм', 'code', 'program', 'function', 'algorithm',
      'напиши код', 'напиши программу', 'напиши функцию', 'разработай', 'javascript', 'python',
      'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust', 'typescript'
    ]
  },
  {
    type: TaskType.SUMMARIZATION,
    patterns: [
      'суммируй', 'обобщи', 'резюме', 'краткое содержание', 'summarize', 'summary', 'summarization',
      'сделай выжимку', 'ключевые моменты', 'основные идеи', 'главные мысли', 'тезисы'
    ]
  },
  {
    type: TaskType.RESEARCH,
    patterns: [
      'исследуй', 'найди информацию', 'изучи', 'research', 'find information', 'investigate',
      'узнай', 'поищи', 'информация о', 'данные о', 'что известно о', 'что такое'
    ]
  },
  {
    type: TaskType.CONTENT_CREATION,
    patterns: [
      'напиши', 'создай', 'сочини', 'write', 'create content', 'compose', 'draft',
      'статья', 'эссе', 'пост', 'текст', 'письмо', 'сообщение', 'история', 'рассказ',
      'стихотворение', 'поэма', 'сценарий', 'диалог', 'описание', 'инструкция'
    ]
  },
  {
    type: TaskType.DATA_ANALYSIS,
    patterns: [
      'анализ', 'проанализируй', 'analyze', 'analysis', 'данные', 'статистика', 'тренды',
      'паттерны', 'корреляция', 'регрессия', 'кластеризация', 'классификация', 'прогнозирование'
    ]
  },
  {
    type: TaskType.QUESTION_ANSWERING,
    patterns: [
      'что', 'кто', 'где', 'когда', 'почему', 'как', 'сколько', 'какой', 'какая', 'какое', 'какие',
      'what', 'who', 'where', 'when', 'why', 'how', 'which', 'whose', 'whom', 'объясни', 'расскажи'
    ]
  },
  {
    type: TaskType.RECOMMENDATION,
    patterns: [
      'рекомендуй', 'посоветуй', 'предложи', 'recommend', 'suggest', 'advise', 'propose',
      'лучший', 'лучшая', 'лучшее', 'лучшие', 'топ', 'рейтинг', 'популярный', 'популярная',
      'популярное', 'популярные', 'что посмотреть', 'что почитать', 'что послушать'
    ]
  },
  {
    type: TaskType.STOCK_PRICE,
    patterns: [
      'акции', 'биржа', 'котировки', 'stock', 'stocks', 'share', 'shares', 'market', 'exchange',
      'цена акций', 'стоимость акций', 'курс акций', 'инвестиции', 'инвестирование', 'трейдинг',
      'nasdaq', 'nyse', 'мосбиржа', 'ммвб', 'ртс', 'dow jones', 's&p 500', 'ftse', 'nikkei'
    ]
  },
  {
    type: TaskType.NEWS,
    patterns: [
      'новости', 'события', 'news', 'events', 'headlines', 'последние новости', 'свежие новости',
      'что происходит', 'что случилось', 'что нового', 'актуальные события', 'текущие события'
    ]
  },
  {
    type: TaskType.DEFINITION,
    patterns: [
      'определение', 'дефиниция', 'definition', 'что значит', 'что означает', 'что такое',
      'значение', 'смысл', 'толкование', 'объяснение', 'термин', 'понятие', 'концепция'
    ]
  },
  {
    type: TaskType.COMPARISON,
    patterns: [
      'сравни', 'сравнение', 'compare', 'comparison', 'различия', 'отличия', 'сходства',
      'разница между', 'отличие между', 'чем отличается', 'в чем разница', 'против', 'vs', 'versus'
    ]
  },
  {
    type: TaskType.RECIPE,
    patterns: [
      'рецепт', 'recipe', 'как приготовить', 'как сделать', 'приготовление', 'кулинария',
      'блюдо', 'еда', 'пища', 'готовка', 'ингредиенты', 'способ приготовления'
    ]
  },
  {
    type: TaskType.MOVIE_INFO,
    patterns: [
      'фильм', 'кино', 'movie', 'film', 'cinema', 'актер', 'актриса', 'режиссер', 'сюжет',
      'жанр', 'рейтинг', 'отзывы', 'критика', 'премьера', 'трейлер', 'сериал', 'шоу'
    ]
  },
  {
    type: TaskType.MUSIC_INFO,
    patterns: [
      'музыка', 'песня', 'трек', 'альбом', 'music', 'song', 'track', 'album', 'исполнитель',
      'певец', 'певица', 'группа', 'бэнд', 'композитор', 'жанр', 'лирика', 'текст песни'
    ]
  },
  {
    type: TaskType.SPORTS,
    patterns: [
      'спорт', 'sport', 'матч', 'игра', 'команда', 'игрок', 'счет', 'результат', 'турнир',
      'чемпионат', 'футбол', 'баскетбол', 'хоккей', 'теннис', 'волейбол', 'бейсбол', 'гольф',
      'формула 1', 'бокс', 'мма', 'ufc', 'олимпиада', 'олимпийские игры'
    ]
  }
];

// City pairs for flight search
export const CITY_PAIRS = [
  ['москва', 'пекин'],
  ['москва', 'шанхай'],
  ['москва', 'токио'],
  ['москва', 'нью-йорк'],
  ['москва', 'лондон'],
  ['москва', 'париж'],
  ['москва', 'берлин'],
  ['санкт-петербург', 'пекин'],
  ['санкт-петербург', 'шанхай'],
  ['санкт-петербург', 'токио'],
  ['москва', 'стамбул'],
  ['москва', 'дубай'],
  ['москва', 'рим'],
  ['москва', 'мадрид'],
  ['москва', 'амстердам'],
  ['москва', 'сеул'],
  ['москва', 'бангкок'],
  ['москва', 'сингапур'],
  ['москва', 'дели'],
  ['москва', 'тель-авив']
];

// Classify task based on text content
export function classifyTask(taskText: string): TaskType {
  const lowerTask = taskText.toLowerCase();
  
  // Check for flight search with city pairs
  if (isFlightSearchQuery(lowerTask)) {
    return TaskType.FLIGHT_SEARCH;
  }
  
  // Check other task types
  for (const rule of classificationRules) {
    if (rule.patterns.some(pattern => lowerTask.includes(pattern))) {
      return rule.type;
    }
  }
  
  // Default to general task type
  return TaskType.GENERAL;
}

// Check if task is a flight search query
export function isFlightSearchQuery(taskText: string): boolean {
  const lowerTask = taskText.toLowerCase();
  
  // Check for flight-related keywords
  const hasFlightKeyword = classificationRules
    .find(rule => rule.type === TaskType.FLIGHT_SEARCH)
    ?.patterns.some(keyword => lowerTask.includes(keyword));
  
  if (!hasFlightKeyword) return false;
  
  // Check for city pairs
  return CITY_PAIRS.some(([origin, destination]) => 
    lowerTask.includes(origin) && lowerTask.includes(destination)
  );
}

// Extract origin and destination from flight search query
export function extractFlightCities(taskText: string): { origin: string, destination: string } | null {
  const lowerTask = taskText.toLowerCase();
  
  for (const [origin, destination] of CITY_PAIRS) {
    if (lowerTask.includes(origin) && lowerTask.includes(destination)) {
      return { origin, destination };
    }
  }
  
  return null;
}

// Get task type description
export function getTaskTypeDescription(type: TaskType): string {
  switch (type) {
    case TaskType.FLIGHT_SEARCH:
      return 'Поиск авиабилетов';
    case TaskType.WEATHER:
      return 'Прогноз погоды';
    case TaskType.TRANSLATION:
      return 'Перевод текста';
    case TaskType.CALCULATION:
      return 'Математические вычисления';
    case TaskType.CODING:
      return 'Программирование';
    case TaskType.SUMMARIZATION:
      return 'Обобщение информации';
    case TaskType.RESEARCH:
      return 'Исследование';
    case TaskType.CONTENT_CREATION:
      return 'Создание контента';
    case TaskType.DATA_ANALYSIS:
      return 'Анализ данных';
    case TaskType.QUESTION_ANSWERING:
      return 'Ответы на вопросы';
    case TaskType.RECOMMENDATION:
      return 'Рекомендации';
    case TaskType.STOCK_PRICE:
      return 'Информация о акциях';
    case TaskType.NEWS:
      return 'Новости';
    case TaskType.DEFINITION:
      return 'Определение термина';
    case TaskType.COMPARISON:
      return 'Сравнение';
    case TaskType.RECIPE:
      return 'Кулинарный рецепт';
    case TaskType.MOVIE_INFO:
      return 'Информация о фильмах';
    case TaskType.MUSIC_INFO:
      return 'Информация о музыке';
    case TaskType.SPORTS:
      return 'Спортивная информация';
    default:
      return 'Общая задача';
  }
}

// Get task processing status message based on task type and progress
export function getTaskStatusMessage(taskType: TaskType, progress: number): string {
  if (progress < 30) {
    switch (taskType) {
      case TaskType.FLIGHT_SEARCH:
        return 'Поиск доступных рейсов...';
      case TaskType.WEATHER:
        return 'Получение метеорологических данных...';
      case TaskType.TRANSLATION:
        return 'Анализ исходного текста...';
      case TaskType.CALCULATION:
        return 'Подготовка вычислений...';
      case TaskType.CODING:
        return 'Анализ требований к коду...';
      case TaskType.STOCK_PRICE:
        return 'Получение данных с биржи...';
      default:
        return 'Анализ запроса...';
    }
  } else if (progress < 60) {
    switch (taskType) {
      case TaskType.FLIGHT_SEARCH:
        return 'Сравнение вариантов перелета...';
      case TaskType.WEATHER:
        return 'Анализ погодных условий...';
      case TaskType.TRANSLATION:
        return 'Выполнение перевода...';
      case TaskType.CALCULATION:
        return 'Выполнение вычислений...';
      case TaskType.CODING:
        return 'Написание кода...';
      case TaskType.SUMMARIZATION:
        return 'Выделение ключевых моментов...';
      case TaskType.RESEARCH:
        return 'Сбор информации из источников...';
      case TaskType.STOCK_PRICE:
        return 'Анализ рыночных трендов...';
      default:
        return 'Обработка компонентов задачи...';
    }
  } else if (progress < 90) {
    switch (taskType) {
      case TaskType.FLIGHT_SEARCH:
        return 'Подготовка результатов поиска...';
      case TaskType.WEATHER:
        return 'Формирование прогноза...';
      case TaskType.TRANSLATION:
        return 'Проверка качества перевода...';
      case TaskType.CALCULATION:
        return 'Проверка результатов...';
      case TaskType.CODING:
        return 'Тестирование кода...';
      case TaskType.CONTENT_CREATION:
        return 'Редактирование контента...';
      case TaskType.DATA_ANALYSIS:
        return 'Формирование выводов...';
      case TaskType.STOCK_PRICE:
        return 'Подготовка финансового отчета...';
      default:
        return 'Генерация ответа...';
    }
  } else {
    return 'Завершение задачи...';
  }
}

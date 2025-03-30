import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Render UI components for different task types

// Render flight data as a table
export const renderFlightTable = (flights) => {
  if (!flights || flights.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">Найденные рейсы:</h4>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Авиакомпания</TableHead>
              <TableHead>Рейс</TableHead>
              <TableHead>Вылет</TableHead>
              <TableHead>Прилет</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead>Пересадки</TableHead>
              <TableHead>Цена</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight, index) => (
              <TableRow key={index}>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.departureDate}</TableCell>
                <TableCell>{flight.arrivalDate}</TableCell>
                <TableCell>{flight.duration}</TableCell>
                <TableCell>{flight.stops === 0 ? 'Прямой' : flight.stops + ' пересадка'}</TableCell>
                <TableCell>{flight.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm dark:text-gray-300">
          <strong>Самый дешевый рейс:</strong> {flights[0].airline} {flights[0].flightNumber} за {flights[0].price}
        </p>
        <p className="text-sm dark:text-gray-300">
          <strong>Самый быстрый рейс:</strong> {
            [...flights].sort((a, b) => {
              const durationA = parseInt(a.duration.split('ч')[0]) * 60 + parseInt(a.duration.split('ч')[1].split('м')[0]);
              const durationB = parseInt(b.duration.split('ч')[0]) * 60 + parseInt(b.duration.split('ч')[1].split('м')[0]);
              return durationA - durationB;
            })[0].airline
          } {
            [...flights].sort((a, b) => {
              const durationA = parseInt(a.duration.split('ч')[0]) * 60 + parseInt(a.duration.split('ч')[1].split('м')[0]);
              const durationB = parseInt(b.duration.split('ч')[0]) * 60 + parseInt(b.duration.split('ч')[1].split('м')[0]);
              return durationA - durationB;
            })[0].flightNumber
          }, длительность {
            [...flights].sort((a, b) => {
              const durationA = parseInt(a.duration.split('ч')[0]) * 60 + parseInt(a.duration.split('ч')[1].split('м')[0]);
              const durationB = parseInt(b.duration.split('ч')[0]) * 60 + parseInt(b.duration.split('ч')[1].split('м')[0]);
              return durationA - durationB;
            })[0].duration
          }
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Цены указаны на момент поиска и могут измениться. Рекомендуется проверить актуальность на сайте авиакомпании.
        </p>
      </div>
    </div>
  );
};

// Render weather data
export const renderWeatherData = (weather) => {
  if (!weather) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">Погода в {weather.location}</h4>
      
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold dark:text-gray-200">{weather.current.temp}°C</p>
            <p className="dark:text-gray-300">{weather.current.condition}</p>
            <p className="text-sm dark:text-gray-300">Ощущается как {weather.current.feelsLike}°C</p>
          </div>
          <div className="text-right">
            <p className="dark:text-gray-300">Влажность: {weather.current.humidity}%</p>
            <p className="dark:text-gray-300">Ветер: {weather.current.windSpeed} м/с</p>
          </div>
        </div>
      </div>
      
      <h4 className="font-medium mb-2 dark:text-gray-200">Прогноз на 5 дней</h4>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Мин. темп.</TableHead>
              <TableHead>Макс. темп.</TableHead>
              <TableHead>Условия</TableHead>
              <TableHead>Влажность</TableHead>
              <TableHead>Ветер</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weather.forecast.map((day, index) => (
              <TableRow key={index}>
                <TableCell>{day.date}</TableCell>
                <TableCell>{day.tempMin}°C</TableCell>
                <TableCell>{day.tempMax}°C</TableCell>
                <TableCell>{day.condition}</TableCell>
                <TableCell>{day.humidity}%</TableCell>
                <TableCell>{day.windSpeed} м/с</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Render stock data
export const renderStockData = (stock) => {
  if (!stock) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">{stock.companyName} ({stock.symbol})</h4>
      
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold dark:text-gray-200">${stock.currentPrice}</p>
            <p className={`${parseFloat(stock.priceChange) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {parseFloat(stock.priceChange) >= 0 ? '+' : ''}{stock.priceChange} ({parseFloat(stock.priceChangePercent) >= 0 ? '+' : ''}{stock.priceChangePercent}%)
            </p>
          </div>
          <div className="text-right">
            <p className="dark:text-gray-300">Рыночная кап.: {stock.marketCap}</p>
            <p className="dark:text-gray-300">Объем: {stock.volume}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h5 className="font-medium mb-2 dark:text-gray-200">Информация о торгах</h5>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Предыдущее закрытие</TableCell>
                <TableCell>${stock.previousClose}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Открытие</TableCell>
                <TableCell>${stock.open}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Дневной диапазон</TableCell>
                <TableCell>{stock.dayRange}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">52-недельный диапазон</TableCell>
                <TableCell>{stock.week52Range}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <h5 className="font-medium mb-2 dark:text-gray-200">Ключевые показатели</h5>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">P/E</TableCell>
                <TableCell>{stock.peRatio}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Дивидендная доходность</TableCell>
                <TableCell>{stock.dividendYield}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Рыночная капитализация</TableCell>
                <TableCell>{stock.marketCap}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Объем торгов</TableCell>
                <TableCell>{stock.volume}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

// Render translation data
export const renderTranslationData = (translation) => {
  if (!translation) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">Результат перевода</h4>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md">
          <p className="font-medium dark:text-gray-200">Исходный текст ({translation.sourceLang}):</p>
          <p className="dark:text-gray-300 mt-1">{translation.originalText}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md">
          <p className="font-medium dark:text-gray-200">Перевод ({translation.targetLang}):</p>
          <p className="dark:text-gray-300 mt-1">{translation.translatedText}</p>
        </div>
        
        {translation.alternativeTranslations && translation.alternativeTranslations.length > 0 && (
          <div>
            <p className="font-medium dark:text-gray-200 mb-2">Альтернативные варианты:</p>
            <ul className="list-disc pl-5 dark:text-gray-300">
              {translation.alternativeTranslations.map((alt, index) => (
                <li key={index}>{alt}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Render calculation data
export const renderCalculationData = (calculation) => {
  if (!calculation) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">Результат вычисления</h4>
      
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-4">
        <p className="font-medium dark:text-gray-200">Выражение:</p>
        <p className="dark:text-gray-300 mt-1">{calculation.expression}</p>
        
        <p className="font-medium dark:text-gray-200 mt-3">Результат:</p>
        <p className="text-xl font-bold dark:text-gray-200 mt-1">{calculation.result}</p>
        
        {calculation.error && (
          <p className="text-red-600 dark:text-red-400 mt-2">{calculation.error}</p>
        )}
      </div>
      
      {calculation.steps && calculation.steps.length > 0 && (
        <div>
          <p className="font-medium dark:text-gray-200 mb-2">Шаги вычисления:</p>
          <ul className="list-decimal pl-5 dark:text-gray-300">
            {calculation.steps.map((step, index) => (
              <li key={index} className="mb-1">{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Render news data
export const renderNewsData = (news) => {
  if (!news || !news.articles || news.articles.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">Последние новости</h4>
      
      <div className="space-y-4">
        {news.articles.map((article, index) => (
          <div key={index} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md">
            <h5 className="font-medium text-lg dark:text-gray-200">{article.title}</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {article.source} • {new Date(article.publishedAt).toLocaleString()}
            </p>
            <p className="dark:text-gray-300 mb-2">{article.description}</p>
            {article.url && (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                Читать полностью
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Render recipe data
export const renderRecipeData = (recipe) => {
  if (!recipe) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">{recipe.name}</h4>
      
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <p className="font-medium dark:text-gray-200 mb-2">Информация:</p>
            <p className="text-sm dark:text-gray-300 mb-1">Время приготовления: {recipe.cookTime}</p>
            <p className="text-sm dark:text-gray-300 mb-1">Порций: {recipe.servings}</p>
            <p className="text-sm dark:text-gray-300 mb-1">Сложность: {recipe.difficulty}</p>
            <p className="text-sm dark:text-gray-300">{recipe.description}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium mb-2 dark:text-gray-200">Ингредиенты:</h5>
          <ul className="list-disc pl-5 dark:text-gray-300">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium mb-2 dark:text-gray-200">Инструкция:</h5>
          <ol className="list-decimal pl-5 dark:text-gray-300">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        </div>
      </div>
      
      {recipe.tips && recipe.tips.length > 0 && (
        <div className="mt-4">
          <h5 className="font-medium mb-2 dark:text-gray-200">Советы:</h5>
          <ul className="list-disc pl-5 dark:text-gray-300">
            {recipe.tips.map((tip, index) => (
              <li key={index} className="mb-1">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Render movie info data
export const renderMovieData = (movie) => {
  if (!movie) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">{movie.title} ({movie.year})</h4>
      
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <p className="font-medium dark:text-gray-200 mb-1">Режиссер: {movie.director}</p>
            <p className="font-medium dark:text-gray-200 mb-1">Жанр: {movie.genre.join(', ')}</p>
            <p className="font-medium dark:text-gray-200 mb-1">Рейтинг: {movie.rating}/10</p>
            <p className="font-medium dark:text-gray-200 mb-2">Длительность: {movie.runtime} мин.</p>
            <p className="dark:text-gray-300">{movie.plot}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h5 className="font-medium mb-2 dark:text-gray-200">В ролях:</h5>
        <p className="dark:text-gray-300">{movie.cast.join(', ')}</p>
      </div>
      
      {movie.reviews && movie.reviews.length > 0 && (
        <div className="mt-4">
          <h5 className="font-medium mb-2 dark:text-gray-200">Отзывы критиков:</h5>
          <div className="space-y-2">
            {movie.reviews.map((review, index) => (
              <div key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1">
                <p className="dark:text-gray-300 italic">"{review.text}"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">— {review.author}, {review.source}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Render music info data
export const renderMusicData = (music) => {
  if (!music) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">{music.type === 'artist' ? 'Исполнитель' : music.type === 'album' ? 'Альбом' : 'Трек'}</h4>
      
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-4">
        {music.type === 'artist' && (
          <div>
            <p className="text-xl font-bold dark:text-gray-200">{music.name}</p>
            <p className="dark:text-gray-300 mb-2">Жанры: {music.genres.join(', ')}</p>
            <p className="dark:text-gray-300">{music.bio}</p>
          </div>
        )}
        
        {music.type === 'album' && (
          <div>
            <p className="text-xl font-bold dark:text-gray-200">{music.name}</p>
            <p className="dark:text-gray-300 mb-1">Исполнитель: {music.artist}</p>
            <p className="dark:text-gray-300 mb-1">Год выпуска: {music.year}</p>
            <p className="dark:text-gray-300 mb-2">Жанр: {music.genre}</p>
            <p className="dark:text-gray-300">{music.description}</p>
          </div>
        )}
        
        {music.type === 'track' && (
          <div>
            <p className="text-xl font-bold dark:text-gray-200">{music.name}</p>
            <p className="dark:text-gray-300 mb-1">Исполнитель: {music.artist}</p>
            <p className="dark:text-gray-300 mb-1">Альбом: {music.album}</p>
            <p className="dark:text-gray-300 mb-1">Год выпуска: {music.year}</p>
            <p className="dark:text-gray-300 mb-2">Жанр: {music.genre}</p>
            <p className="dark:text-gray-300">{music.description}</p>
          </div>
        )}
      </div>
      
      {music.type === 'artist' && music.popularTracks && (
        <div>
          <h5 className="font-medium mb-2 dark:text-gray-200">Популярные треки:</h5>
          <ol className="list-decimal pl-5 dark:text-gray-300">
            {music.popularTracks.map((track, index) => (
              <li key={index} className="mb-1">{track.name} ({track.album}, {track.year})</li>
            ))}
          </ol>
        </div>
      )}
      
      {music.type === 'album' && music.tracks && (
        <div>
          <h5 className="font-medium mb-2 dark:text-gray-200">Треки:</h5>
          <ol className="list-decimal pl-5 dark:text-gray-300">
            {music.tracks.map((track, index) => (
              <li key={index} className="mb-1">{track.name} ({track.duration})</li>
            ))}
          </ol>
        </div>
      )}
      
      {music.lyrics && (
        <div className="mt-4">
          <h5 className="font-medium mb-2 dark:text-gray-200">Текст песни:</h5>
          <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md whitespace-pre-line">
            <p className="dark:text-gray-300">{music.lyrics}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Render sports data
export const renderSportsData = (sports) => {
  if (!sports) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2 dark:text-gray-200">{sports.title}</h4>
      
      {sports.type === 'match' && (
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="font-medium dark:text-gray-200">{sports.team1}</p>
              <p className="text-3xl font-bold dark:text-gray-200">{sports.score1}</p>
            </div>
            <div className="text-center">
              <p className="text-sm dark:text-gray-300">{sports.status}</p>
              <p className="text-sm dark:text-gray-300">{sports.league}</p>
            </div>
            <div className="text-center">
              <p className="font-medium dark:text-gray-200">{sports.team2}</p>
              <p className="text-3xl font-bold dark:text-gray-200">{sports.score2}</p>
            </div>
          </div>
          
          {sports.events && sports.events.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium mb-2 dark:text-gray-200">Ключевые события:</h5>
              <ul className="space-y-1 dark:text-gray-300">
                {sports.events.map((event, index) => (
                  <li key={index}>
                    <span className="font-medium">{event.time}'</span> - {event.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {sports.type === 'standings' && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Позиция</TableHead>
                <TableHead>Команда</TableHead>
                <TableHead>И</TableHead>
                <TableHead>В</TableHead>
                <TableHead>Н</TableHead>
                <TableHead>П</TableHead>
                <TableHead>ГЗ</TableHead>
                <TableHead>ГП</TableHead>
                <TableHead>О</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sports.standings.map((team, index) => (
                <TableRow key={index}>
                  <TableCell>{team.position}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.played}</TableCell>
                  <TableCell>{team.won}</TableCell>
                  <TableCell>{team.drawn}</TableCell>
                  <TableCell>{team.lost}</TableCell>
                  <TableCell>{team.goalsFor}</TableCell>
                  <TableCell>{team.goalsAgainst}</TableCell>
                  <TableCell className="font-bold">{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {sports.type === 'schedule' && (
        <div className="space-y-4">
          {sports.matches.map((match, index) => (
            <div key={index} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <p className="dark:text-gray-300">{match.date}, {match.time}</p>
                <p className="dark:text-gray-300">{match.league}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="font-medium dark:text-gray-200">{match.team1}</p>
                <p className="dark:text-gray-300">vs</p>
                <p className="font-medium dark:text-gray-200">{match.team2}</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{match.venue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main function to render task-specific data based on task type
export const renderTaskData = (type, data) => {
  if (!data) return null;
  
  switch (type) {
    case 'flight_search':
      return renderFlightTable(data);
    case 'weather':
      return renderWeatherData(data);
    case 'stock_price':
      return renderStockData(data);
    case 'translation':
      return renderTranslationData(data);
    case 'calculation':
      return renderCalculationData(data);
    case 'news':
      return renderNewsData(data);
    case 'recipe':
      return renderRecipeData(data);
    case 'movie_info':
      return renderMovieData(data);
    case 'music_info':
      return renderMusicData(data);
    case 'sports':
      return renderSportsData(data);
    default:
      return null;
  }
};

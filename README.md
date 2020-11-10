# Weather Eye
This is an implementation of the weather app project from [The Odin Project](https://www.theodinproject.com/courses/javascript/lessons/weather-app) built with Vuejs 2.x. 

I first started the project with Vuejs 3 to take advantage of the improvements it adds, but had some initial issues with it still being a preview build. I decided to downgrade to 2.x and give v3 a little more time to mature.


This project also uses: 
- OpenWeatherMap
- LocationIQ - reverse geocode API to get locations
<br>
<br>
<details>
<summary>7 day forecast with current weather</summary>
![Demo Image](../assets/demo.png)
</details>
<br>
<br>
With the information returned from OpenWeatherMap varying based on the data being used for the query, I decided to not force the user to provide location data access. Using the search bar will return daily weather, and a refresh of the location (or saving it as your default location) will return an extended forecast. This is due to what data the API exposes to ZIP and city name queries. Only geolocation-based queries return a full forecast.

I felt requiring interaction for a 2nd query, instead of querying repeatedly to get initial data with coordinates and then repeating the query with geolocation data, was a better choice, if not less intuitive to interact with. Free API key limits and all.


## Live Demo
The demo can be found [here](https://ellielle.github.io/weather-eye/).

## Getting Started
```
$ git clone https://github.com/ellielle/weather-eye.git
$ cd weather-eye
$ npm install
$ npm run serve
```

## Known Issues
- Vuejs 2.x can be finicky with reactive values causing the name of the queried location to not show up on first search with a clean localStorage, but works on all subsequent searches.
- Again due to the issue above, some of the animations trigger improperly. This could be potentially worked around by refactoring my components to dynamic components and combining the different views I have currently set up into the new components so that everything transitions at once.
# Rainfinder

## Objective
Provide a simple web interface which allows users to find the closest rainfall to their geographic location.



## Design
```@plantuml

@startuml
[Webserver] <--> [HttpController] : HTTP
[HttpController] <--> [RainFinder]
[APIClient] <--> [RainFinder]
[APIClient] <-up-> [API]
@enduml

```

## Scenarios

1. Service searches for rain based on user IP 

```@plantuml
@startuml
participant webserver
participant HTTPController
participant Rainfinder
participant APIHandler
participant IP_API
participant openweatherAPI

webserver -> HTTPController : IP
HTTPController -> Rainfinder : IP
Rainfinder->APIHandler : IP
APIHandler -> IP_API : IP
return Coordinates
APIHandler -> Rainfinder : Coordinates

activate Rainfinder
Rainfinder -> Rainfinder : findRain()
Rainfinder -> APIHandler : checkRain(Coordinates)
APIHandler -> openweatherAPI : Coordinates
openweatherAPI -> APIHandler : JSON response
APIHandler -> APIHandler : Parse response
APIHandler -> Rainfinder : bool rainFound

alt rainFound
Rainfinder -> HTTPController : Location data
HTTPController -> webserver : Location data

else !rainFound
loop !rainFound && numIntercardinalQueries < 8
Rainfinder -> Rainfinder : queryIntercardinal()
Rainfinder -> APIHandler : checkRain(N, NE, E, SE, S, SW, W, NW)
APIHandler -> openweatherAPI : Coordinates x8
openweatherAPI -> APIHandler : JSON responses
APIHandler -> APIHandler : Parse responses
APIHandler -> Rainfinder : bool rainFound

alt Rain found
Rainfinder -> HTTPController : Location data
HTTPController -> webserver : Location data
end
end
Rainfinder -> HTTPController : No rain found message
HTTPController -> webserver : No rain found message
deactivate Rainfinder
end
@enduml
```
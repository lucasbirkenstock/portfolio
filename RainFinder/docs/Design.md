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
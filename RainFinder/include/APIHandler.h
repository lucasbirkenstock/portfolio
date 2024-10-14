#pragma once
#include "Coordinate.h"
#include "LocationInfo.h"
#include <boost/beast/http.hpp>
#include <iostream>
#include <string>

class APIHandler
{
    public:
    // Makes API request to IP-API to convert user's IP to GPS coordinates
    Coordinate getCoordinatesFromIP(const std::string &userIP);

    // Makes API request to openweatherAPI for one set of coordinates. Fills out Locationinfo struct with response and returns the struct. 
    LocationInfo checkCoordinatesForRain(const Coordinate &coords);

    // Parse JSON response to fill out Locationinfo struct
    LocationInfo parseJsonResponse(boost::beast::http::response<boost::beast::http::string_body> response);
};
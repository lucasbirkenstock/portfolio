#pragma once
#include "Coordinate.h"
#include "LocationInfo.h"
#include <boost/beast/core.hpp>
#include <boost/beast/http.hpp>
#include <boost/beast/ssl.hpp>
#include <boost/asio/connect.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <boost/asio/ssl.hpp>
#include <boost/beast/version.hpp>
#include <iostream>
#include <string>

class APIHandler
{
    public:
    // Temporary: API key
    std::string m_apiKey = "";

    // Makes API request to IP-API to convert user's IP to GPS coordinates
    Coordinate getCoordinatesFromIP(const std::string &userIP);

    // Makes API request to openweatherAPI for one set of coordinates. Fills out Locationinfo struct with response and returns the struct. 
    LocationInfo checkCoordinatesForRain(const Coordinate &coords);

    // Parse JSON response to fill out Locationinfo struct
    LocationInfo parseJsonResponse(boost::beast::http::response<boost::beast::http::string_body> response);
};
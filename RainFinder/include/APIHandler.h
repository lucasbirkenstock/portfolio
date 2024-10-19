#pragma once
#include "Coordinate.h"
#include "LocationInfo.h"
#include "nlohmann.h"
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

    /*!
    * @brief Makes API request to IP-API to convert user's IP to GPS coordinates
    * @param[in] userIP User's IP to convert to GPS coordinates
    * @return    Coordinate struct
    */
    Coordinate getCoordinatesFromIP(const std::string &userIP);

    // 
    /*!
    * @brief Makes API request to openweatherAPI for one set of coordinates. Fills out Locationinfo struct with response and returns the struct. 
    * @param[in] coords Coordinate struct containing longitude and latitude for openweatherapi to check.
    * @return    LocationInfo struct
    */
    LocationInfo checkCoordinatesForRain(const Coordinate &coords);
};
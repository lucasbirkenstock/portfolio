#pragma once
#include "Coordinate.h"
#include "LocationInfo.h"
#include "nlohmann.h"
#include "resultInfo.h"
#include "CoordinateCalculator.h"
#include "intercardinalQueryResult.h"
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
    private:
    // Temporary: API key. Intentionally leaving string empty for git pushes. 
    std::string m_OpenweatherApiKey = "";

    /*!
    * @brief Makes API request to IP-API to convert user's IP to GPS coordinates
    * @param[in] userIP User's IP to convert to GPS coordinates
    * @return    Coordinate struct
    */
    Coordinate getCoordinatesFromIP(const std::string &userIP);

    
    /*!
    * @brief Makes API request to openweatherAPI for one set of coordinates. Fills out Locationinfo struct with response and returns the struct. 
    * @param[in] coords Coordinate struct containing longitude and latitude for openweatherapi to check.
    * @return    LocationInfo struct
    */
    LocationInfo checkCoordinatesForRain(const Coordinate &coords);

    /*!
    * @brief Calls overloaded function to check each intercardinal direction from the center coordinate for rain. 
    * @param[in] coord Center coordinate.
    * @param[in] step Distance away from the center coordinate to check. 
    * @return    intercardinalQueryResult struct - struct containing a vector of LocationInfo structs and a boolean 
    * indicating if any of the intercardinal coordinates have rain present.
    */
    intercardinalQueryResult checkIntercardinalCoords(const Coordinate& coord, double step);

    /*!
    * @brief Calls checkCoordinatesForRain() for each intercardinal coordinate passed into the function. 
    * @param[in] N Coordinate north of the central coordinate.
    * @param[in] NE Coordinate northeast of the central coordinate. 
    * @param[in] E Coordinate east of the central coordinate.
    * @param[in] SE Coordinate southeast of the central coordinate. 
    * @param[in] S Coordinate south of the central coordinate.
    * @param[in] SW Coordinate southwest of the central coordinate. 
    * @param[in] W Coordinate west of the central coordinate.
    * @param[in] NW Coordinate northwest of the central coordinate. 
    * @return    intercardinalQueryResult struct - struct containing a vector of LocationInfo structs and a boolean 
    * indicating if any of the intercardinal coordinates have rain present.
    */
    intercardinalQueryResult checkIntercardinalCoords(const Coordinate& N, const Coordinate& NE, const Coordinate& E, const Coordinate& SE, const Coordinate& S, const Coordinate& SW, const Coordinate& W, const Coordinate& NW);
    /*!
    @brief Calls checkIntercardinalCoords() with several radius distances from the center coordinate, within a specified radius
    @param[in] center The center coordinate
    @param[in] radius The outermost radius for checked coordinates
    @return intercardinalQueryResult - intercardinalQueryResult struct - struct containing a vector of LocationInfo structs and a boolean 
    * indicating if any of the intercardinal coordinates have rain present. Returns the first struct to contain rain, and if no rain is found, returns the outermost struct.
    */
    intercardinalQueryResult checkRadius(const Coordinate& center, const double radius);


    public:
    /*!
    @brief Main client function called to check a set of coordinates for rain. 
    @param[in] center The center coordinate
    @param[in] radius The maximum radius around the center coordinate to check the weather of. Unit is degrees. 
    */
    resultInfo findRain(const Coordinate& center, const double radius);
};

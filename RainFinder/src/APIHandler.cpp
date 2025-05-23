#pragma once
#include "APIHandler.h"
#include <cmath>

LocationInfo APIHandler::checkCoordinatesForRain(const Coordinate &coords)
{
    LocationInfo info = LocationInfo();
    try 
    {
        boost::asio::io_context ioContext;

        // Set up SSL context because openWeatherApi uses HTTPS
        boost::asio::ssl::context ctx(boost::asio::ssl::context::sslv23_client);

        // Get IP from url
        boost::asio::ip::tcp::resolver resolver(ioContext); 
        auto const results = resolver.resolve("api.openweathermap.org", "443");

        boost::beast::ssl_stream<boost::beast::tcp_stream> stream(ioContext, ctx);

        // Connect the stream
        boost::beast::get_lowest_layer(stream).connect(results);

        // Perform SSL handshake
        stream.handshake(boost::asio::ssl::stream_base::client);

        // Format GET request
        std::string lat = std::to_string(coords.latitude);
        std::string lon = std::to_string(coords.longitude);
        std::string target = "/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + m_OpenweatherApiKey + "&units=imperial";
        
        boost::beast::http::request<boost::beast::http::string_body> req{boost::beast::http::verb::get, target, 11};
        req.set(boost::beast::http::field::host, "api.openweathermap.org");
        req.set(boost::beast::http::field::user_agent, BOOST_BEAST_VERSION_STRING);

        // Send the HTTP GET
        boost::beast::http::write(stream, req);

        // Buffer for storing response
        boost::beast::flat_buffer buffer;

        // Container for holding response
        boost::beast::http::response<boost::beast::http::string_body> resp;

        // Receive the response
        boost::beast::http::read(stream, buffer, resp);

        // Print raw response
        // std::cout << resp << std::endl;

        // Parse response using nlohmannjson
        nlohmann::json jsonResp = nlohmann::json::parse(resp.body());

        // Extract useful fields
        if (jsonResp.contains("weather") && !jsonResp["weather"].empty())
        {
            info.weatherType = jsonResp["weather"][0]["main"];
            info.weatherDescription = jsonResp["weather"][0]["description"];

            if (info.weatherType == "Rain") 
            {
                info.isRaining = true;
            }
            else 
            {
                info.isRaining = false;
            }
            //std::cout << std::endl << "Weather type is " << info.weatherType << ", specifically " << info.weatherDescription << std::endl;
        }

        if (jsonResp.contains("main") && !jsonResp["main"].empty())
        {
            info.temperature = jsonResp["main"]["temp"];
            //std::cout << "Temp is: " << info.temperature << std::endl; 
        }

        if (jsonResp.contains("coord") && !jsonResp["coord"].empty())
        {
            info.coordinates = Coordinate(jsonResp["coord"]["lat"], jsonResp["coord"]["lon"]);
            //std::cout << "Coordinates are: Lon = " << info.coordinates.longitude << ", Lat = " << info.coordinates.latitude << std::endl;
        }

        if (jsonResp.contains("name"))
        {
            if (jsonResp["name"] == "")
            {
                info.cityName = "No city name";
            }
            else 
            {
                info.cityName = jsonResp["name"];
            }

            //std::cout << "The city of : " << info.cityName << std::endl;
        }

        if (jsonResp.contains("sys") && !jsonResp["sys"].empty())
        {
            info.countryCode = jsonResp["sys"]["country"];
        }


        // Close SSL stream
        boost::beast::error_code ec;
        stream.shutdown(ec);
        if (ec == boost::asio::error::eof)
        {
            ec = {};
        }

        if (ec)
        {
            throw boost::beast::system_error{ec};
        }

    } catch (const std::exception& e)
    {
        //std::cerr << "Error: " << e.what() << std::endl;
    }
    return info;
}

Coordinate APIHandler::getCoordinatesFromIP(const std::string &userIP)
{
    Coordinate coord = Coordinate();

    try 
    {
        // Get IP from web address
        boost::asio::io_context ioContext; 
        boost::asio::ip::tcp::resolver resolver(ioContext); 
        auto const results = resolver.resolve("ip-api.com", "80");

        // Create socket
        boost::asio::ip::tcp::socket socket(ioContext);

        // Connect socket to resolved web address
        boost::asio::connect(socket, results.begin(), results.end());

        // Formulate the HTTP request
        std::string target = "/json/" + userIP + "?fields=status,message,lat,lon";
        boost::beast::http::request<boost::beast::http::string_body> req{boost::beast::http::verb::get, target, 11};
        req.set(boost::beast::http::field::host, "ip-api.com");
        req.set(boost::beast::http::field::user_agent, BOOST_BEAST_VERSION_STRING);

        // Send the HTTP request
        boost::beast::http::write(socket, req);

        // Buffer to store resp
        boost::beast::flat_buffer buffer;

        // Container to hold HTTP resp
        boost::beast::http::response<boost::beast::http::string_body> resp;

        // Receive the response
        boost::beast::http::read(socket, buffer, resp);

        std::cout << resp << std::endl;


        // Parse response using nlohmannjson
        nlohmann::json jsonResp = nlohmann::json::parse(resp.body());

        // Extract useful fields
        if (jsonResp.contains("lat") && !jsonResp["lat"].empty())
        {
            coord.latitude = jsonResp["lat"];
            std::cout << "LATITUDE FROM IP: " << coord.latitude << std::endl;

        }

        if (jsonResp.contains("lon") && !jsonResp["lon"].empty())
        {
            coord.longitude = jsonResp["lon"];
            std::cout << "LONGITUDE FROM IP: " << coord.longitude << std::endl;

        }



    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    return coord;
}

intercardinalQueryResult APIHandler::checkIntercardinalCoords(const Coordinate& coord, double step)
{
    // Diagonal directions need a special step to be the same distance as normal cardinal directions away from the central coordinate
    double diagonalStep = step / std::sqrt(2);

    Coordinate N = Coordinate(coord.latitude + step, coord.longitude);
    Coordinate NE = Coordinate(coord.latitude + diagonalStep, coord.longitude + diagonalStep);

    Coordinate E = Coordinate(coord.latitude, coord.longitude + step);
    Coordinate SE = Coordinate(coord.latitude - diagonalStep, coord.longitude + diagonalStep);

    Coordinate S = Coordinate(coord.latitude - step, coord.longitude);
    Coordinate SW = Coordinate(coord.latitude - diagonalStep, coord.longitude - diagonalStep);

    Coordinate W = Coordinate(coord.latitude, coord.longitude - step);
    Coordinate NW = Coordinate(coord.latitude + diagonalStep, coord.longitude - diagonalStep);

    return checkIntercardinalCoords(N, NE, E, SE, S, SW, W, NW);
}


intercardinalQueryResult APIHandler::checkIntercardinalCoords(const Coordinate& N, const Coordinate& NE, const Coordinate& E, const Coordinate& SE, const Coordinate& S, const Coordinate& SW, const Coordinate& W, const Coordinate& NW)
{
    intercardinalQueryResult result = intercardinalQueryResult();
    LocationInfo info = LocationInfo();

    // Place function inputs into an array so that the rest of this function may be performed in a loop, avoiding unnecessary code
    std::array<Coordinate, 8> coords = {N, NE, E, SE, S, SW, W, NW};

    for (const auto& coord : coords)
    {
        info = checkCoordinatesForRain(coord);
        result.locations.push_back(info);

        if(info.isRaining)
        {
            result.isRainFound = true;
            std::cout << "Found rain at " << info.coordinates.latitude << "* N, " << info.coordinates.longitude << "* E" << std::endl; 
            // TODO Possibly break here and skip checking other points
        }
    }
    return result;
}

intercardinalQueryResult APIHandler::checkRadius(const Coordinate& center, const double radius)
{
    // Get 60 API calls/min for free, checkRadius should use 60 calls or less. Each intercardinal check uses 8 calls.
    double radiusStep = radius / 7;
    double currentDistance = radius / 7;
    intercardinalQueryResult result = intercardinalQueryResult();

    for (int i = 0; i < 7; ++i)
    {
        std::cout << "Checking subradius " << i << std::endl;
        result = checkIntercardinalCoords(center, currentDistance);
        if (result.isRainFound)
        {
            return result;
        } 
        else 
        {
            
            currentDistance += radiusStep;
            std::cout << currentDistance <<std::endl;
        }
    }
    std::cout << "checkRadius() no rain found" <<std::endl;
    // If no rain found: return furthest step
    return result;
}

resultInfo APIHandler::findRain(const Coordinate& center, const double radius)
{
    resultInfo result = resultInfo();
    std::cout << "Enter findRain()" << std::endl;
    // First check center coordinate for rain
    LocationInfo centerInfo = checkCoordinatesForRain(center);

    std::cout << "Checking area around " << centerInfo.cityName << ", " << centerInfo.countryCode << ". Exact center coordinates: " << center.latitude << " degrees North, " << center.longitude << " degrees West" << std::endl;
    
    if (centerInfo.isRaining)
    {
        // Return center coordinate
        result.direction = "None";
        result.info = centerInfo;
        result.milesFromCenter = 0.0;
        std::cout << "Found rain at your coordinates! Look outside!" << std::endl;
        return result;
    }

    std::cout << "Not found at center" << std::endl;

    // Check multiple intercardinal coordinates within radius
    intercardinalQueryResult intercardinalResult = intercardinalQueryResult();
    intercardinalResult = checkRadius(center, radius);
    if (intercardinalResult.isRainFound)
    {
        // Loop through and find the first Locationinfo struct containing rain.
        for (const auto& info : intercardinalResult.locations)
        {
            std::cout << "Checking a locationInfo" << std::endl;
            if (info.isRaining)
            {
                result.direction = CoordinateCalculator::determineDirection(center, info.coordinates);
                result.info = info;
                result.milesFromCenter = CoordinateCalculator::calculateDistance(center, info.coordinates);
                std::cout << "Found rain " << result.milesFromCenter << " miles away from your coordinates, in the " << result.direction << " direction." << std::endl;
                return result;
            }
        }
    }

    std::cout << "Not found within radius" << std::endl;

    // If no rain is found
    result.direction = "No rain found";
    result.info = LocationInfo();
    result.milesFromCenter = -1;
    return result;

}

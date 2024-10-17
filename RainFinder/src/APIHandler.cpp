#pragma once
#include "APIHandler.h"

Coordinate APIHandler::getCoordinatesFromIP(const std::string &userIP)
{
    Coordinate example;
    example.latitude = 1;
    example.longitude = 1;
    (void) userIP;
    return example;
}

LocationInfo APIHandler::checkCoordinatesForRain(const Coordinate &coords)
{
    LocationInfo info;
    try 
    {
        // Set up SSL context because openWeatherApi uses HTTPS
        boost::asio::io_context ioContext;
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
        std::string target = "/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + m_apiKey + "&units=imperial";
        
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

        // Print response
        std::cout << resp << std::endl;

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
            std::cout << std::endl << "Weather type is " << info.weatherType << ", specifically " << info.weatherDescription << std::endl;
        }

        if (jsonResp.contains("main") && !jsonResp["main"].empty())
        {
            info.temperature = jsonResp["main"]["temp"];
            std::cout << "Temp is: " << info.temperature << std::endl; 
        }

        if (jsonResp.contains("coord") && !jsonResp["coord"].empty())
        {
            info.coordinates = Coordinate(jsonResp["coord"]["lon"], jsonResp["coord"]["lat"]);
            std::cout << "Coordinates are: Lon = " << info.coordinates.longitude << ", Lat = " << info.coordinates.latitude << std::endl;
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

            std::cout << "The city of : " << info.cityName << std::endl;
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
        std::cerr << "Error: " << e.what() << std::endl;
    }
    return info;
}
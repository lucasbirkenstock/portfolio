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
        std::string target = "/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + m_apiKey;
        
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



        // TODO: Parse response and fill out info var



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

    }
    return info;
}
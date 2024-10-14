#include "APIHandler.h"

Coordinate APIHandler::getCoordinatesFromIP(const std::string &userIP)
{
    Coordinate example;
    example.latitude = 1;
    example.longitude = 1;
    (void) userIP;
    return example;
}
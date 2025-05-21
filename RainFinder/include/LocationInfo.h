#pragma once
#include "Coordinate.h"
#include <string>

struct LocationInfo
{
    bool isRaining = false;
    std::string weatherType = "Unknown";
    std::string weatherDescription = "Unknown";
    Coordinate coordinates = Coordinate();
    std::string cityName = "Unknown";
    std::string countryCode = "Unknown";
    double temperature = 0.00;
};
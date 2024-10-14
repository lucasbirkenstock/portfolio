#include "Coordinate.h"
#include <string>

struct LocationInfo
{
    bool isRaining;
    Coordinate coordinates;
    std::string cityName;
    std::string cloudLevel;
    std::string rainLevel;
    double temperature;
};
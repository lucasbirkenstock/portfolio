#pragma once
#include "Coordinate.h"
#include "LocationInfo.h"
#include <vector>
struct intercardinalQueryResult 
{
    std::vector<LocationInfo> locations;
    bool isRainFound = false;
};
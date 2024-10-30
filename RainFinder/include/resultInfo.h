#pragma once
#include "LocationInfo.h"
#include <string>
struct resultInfo
{
    std::string direction = "Undefined";
    LocationInfo info = LocationInfo();
    double milesFromCenter = -1;
};

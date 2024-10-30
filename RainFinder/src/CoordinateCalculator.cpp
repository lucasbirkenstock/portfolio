#pragma once
#include "CoordinateCalculator.h"

double CoordinateCalculator::calculateDistance(const Coordinate& center, const Coordinate& other)
{   
    // Use haversine formula to calculate distance between the two coordinates
    const double R = 3959.0; // Radius of earth in miles

    // Convert to radians
    double lat1 = center.latitude * M_PI / 180.0; 
    double lon1 = center.longitude * M_PI / 180.0;
    double lat2 = other.latitude * M_PI / 180.0;
    double lon2 = other.longitude * M_PI / 180.0;

    // Deltas
    double dlat = lat2 - lat1;
    double dlon = lon2 - lon1;

    double a = std::sin(dlat / 2) * std::sin(dlat / 2) +
                   std::cos(lat1) * std::cos(lat2) *
                   std::sin(dlon / 2) * std::sin(dlon / 2);

    double c = 2 * std::asin(std::sqrt(a));
    return R * c;
}

std::string CoordinateCalculator::determineDirection(const Coordinate& center, const Coordinate& other) 
{
    // Convert latitudes to radians
    double lat1 = center.latitude * M_PI / 180.0;
    double lat2 = other.latitude * M_PI/ 180;

    // Longitude delta in radians
    double dlon = (other.longitude - center.longitude) * M_PI / 180.0;

    // Get initial bearing
    double x = sin(dlon) * cos(lat2);
    double y = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dlon);
    double initial_bearing = atan2(x, y);

    // Convert bearing from radians to degrees
    double bearing = initial_bearing * 180.0 / M_PI;

    // Normalize bearing to a compass bearing (0 to 360 degrees)
    bearing = fmod((bearing + 360), 360);

    // Determine direction based on the bearing
    if (bearing >= 337.5 || bearing < 22.5) {
        return "N";   // North
    } else if (bearing >= 22.5 && bearing < 67.5) {
        return "NE";  // Northeast
    } else if (bearing >= 67.5 && bearing < 112.5) {
        return "E";   // East
    } else if (bearing >= 112.5 && bearing < 157.5) {
        return "SE";  // Southeast
    } else if (bearing >= 157.5 && bearing < 202.5) {
        return "S";   // South
    } else if (bearing >= 202.5 && bearing < 247.5) {
        return "SW";  // Southwest
    } else if (bearing >= 247.5 && bearing < 292.5) {
        return "W";   // West
    } else {
        return "NW";  // Northwest
    }
}
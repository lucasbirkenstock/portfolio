#pragma once

struct Coordinate 
{
    double longitude;
    double latitude;

    // Default constructor
    Coordinate()
        : longitude(0.0),
          latitude(0.0)
          {
          }
    
    // Parameterized constructor
    Coordinate (double lon, double lat)
        : longitude(lon),
          latitude(lat)
        {
        }
};
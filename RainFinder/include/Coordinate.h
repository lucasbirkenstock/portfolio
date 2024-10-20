#pragma once

struct Coordinate 
{
    
    double latitude; // How north/south. North is positive.
    double longitude; // How east/west. East is positive. 
    
    // Default constructor
    Coordinate()
        : latitude(0.0),
          longitude(0.0)
          {
          }
    
    // Parameterized constructor
    Coordinate (double lat, double lon)
        : latitude(lat),
          longitude(lon)
        {
        }
};
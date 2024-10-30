#pragma once
#include "Coordinate.h"
#include <string>
#include <cmath>

class CoordinateCalculator 
{
    public:
    /*!
    @brief Calculates the distance in miles between two GPS coordinates
    @param[in] center The center coordinate from the user.
    @param[in] other The coordinate where rain was found.
    @return The distance in miles between the coordinates.
    */
    static double calculateDistance(const Coordinate& center, const Coordinate& other);

    /*!
    @brief Determines the direction of the coordinate containing rain in relation to the center coordinate
    @param[in] center The center coordinate from the user.
    @param[in] other The coordinate where rain was found.
    @return The direction in relation to the center point (N, W, S, etc.).
    */
    static std::string determineDirection(const Coordinate& center, const Coordinate& other);
};
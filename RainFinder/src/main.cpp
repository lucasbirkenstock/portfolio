#pragma once
#include <iostream>
#include "APIHandler.h"
#include "Coordinate.h"
#include "CoordinateCalculator.h"


int main() {
std::cout << "Project start" << std::endl;

APIHandler handler = APIHandler();

//Coordinate csusm = Coordinate(-117.1587, 33.1298);
Coordinate portoAlegre = Coordinate(-30.0368, -51.2090);
Coordinate saoPaulo = Coordinate(-23.5558, -46.6396);
Coordinate nearbyRainCoord = Coordinate(40.5169, -101.6432);
// handler.checkCoordinatesForRain(portoAlegre);

//handler.checkCoordinatesForRain(handler.getCoordinatesFromIP("127.0.0.1"));
//Coordinate wingmt = Coordinate(35.27362, -111.783492);
//handler.checkCoordinatesForRain(portoAlegre);
//handler.checkIntercardinalCoords(portoAlegre, 0.07);
//handler.checkRadius(nearbyRainCoord, 0.36);
//std::cout << "Distance between two points is: " << CoordinateCalculator::calculateDistance(portoAlegre, saoPaulo) << " miles" << std::endl;
handler.findRain(nearbyRainCoord, 0.36);
return 0;
}

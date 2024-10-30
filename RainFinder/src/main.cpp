#pragma once
#include <iostream>
#include "APIHandler.h"
#include "Coordinate.h"


int main() {
std::cout << "Project start" << std::endl;

APIHandler handler = APIHandler();

//Coordinate csusm = Coordinate(-117.1587, 33.1298);
Coordinate portoAlegre = Coordinate(-30.0368, -51.2090);
Coordinate nearbyRainCoord = Coordinate(39.1589, -108.7290);
// handler.checkCoordinatesForRain(portoAlegre);

//handler.checkCoordinatesForRain(handler.getCoordinatesFromIP("127.0.0.1"));
//Coordinate wingmt = Coordinate(35.27362, -111.783492);
//handler.checkCoordinatesForRain(portoAlegre);
//handler.checkIntercardinalCoords(portoAlegre, 0.07);
handler.checkRadius(nearbyRainCoord, 0.36);
return 0;
}

#pragma once
#include <iostream>
#include "APIHandler.h"
#include "Coordinate.h"


int main() {
std::cout << "Project start" << std::endl;

APIHandler handler = APIHandler();

Coordinate csusm = Coordinate(-117.1587, 33.1298);
Coordinate portoAlegre = Coordinate(-51.2090, -30.0368);

handler.checkCoordinatesForRain(portoAlegre);
return 0;
}

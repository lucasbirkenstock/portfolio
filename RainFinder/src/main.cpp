#pragma once
#include <iostream>
#include "APIHandler.h"
#include "Coordinate.h"


int main() {
std::cout << "Project start" << std::endl;

APIHandler handler = APIHandler();
Coordinate coord;
coord.longitude = 1;
coord.latitude = 1;

handler.checkCoordinatesForRain(coord);
return 0;
}

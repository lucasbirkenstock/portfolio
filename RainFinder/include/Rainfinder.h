#pragma once
#include "HTTPController.h"
#include "APIHandler.h"
#include "Coordinate.h"

class Rainfinder 
{
    private: 
    HTTPController m_httpController;
    APIHandler m_apiHandler;

    public: 
    // Constructor 
    Rainfinder(const HTTPController& httpController, const APIHandler& apiHandler)
        : m_httpController(httpController)
        , m_apiHandler(apiHandler)
    {
    }

    void findRain()
    {
    }

    bool checkRain(const Coordinate& coordinate)
    {
    }

    bool checkRain(const Coordinate N, const Coordinate NE, const Coordinate E, const Coordinate SE, const Coordinate S, const Coordinate SW, const Coordinate W, const Coordinate NW)
    {
    }

    void queryIntercardinal(const Coordinate startCoordinate, const double degreeOffset)
    {
    }




};
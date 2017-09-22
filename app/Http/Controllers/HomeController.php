<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('search');
    }

    public function search(Request $request)
    {
        $apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
        $location = str_replace(' ', '+', $request->input('search'));

        $weather = \GuzzleHttp\json_decode(file_get_contents($apiUrl.'?q='.$location.',es&appid='.env('OPEN_WEATHER_MAP_KEY').'&units=metric'), TRUE);
        return view('result', compact('weather'));
//        return dd($weather);
    }
}

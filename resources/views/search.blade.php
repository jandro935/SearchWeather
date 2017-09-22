@extends('layout')

@section('search')
    <div class="container">
        <div class="starter-template" style="margin-top: 150px;">
            <h1>Search Weather</h1>
            <form action="" id="weather-search-form">
                {{ csrf_field() }}
                <div class="form-group">
                    <input type="text" name="weather" id="weather" class="form-control">
                    <button type="submit" class="btn btn-default">Submit</button>
                </div>
            </form>

            <div class="row result">
                <p>El tiempo en <span class="location"></span></p>
                <br>
                <p>La temperatura es de <span class="temp">º</span></p>
                <img src="" class="icon">
            </div>
        </div>
    </div>
@endsection

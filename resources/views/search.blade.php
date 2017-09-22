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

            {{-- Google --}}
            <div id="locationField">
                <input id="autocomplete" placeholder="Enter your address" onFocus="geolocate()" type="text">
            </div>

            <table id="address">
                <tr>
                    <td class="label">Street address</td>
                    <td class="slimField"><input class="field" id="street_number" disabled="true"></td>
                    <td class="wideField" colspan="2"><input class="field" id="route" disabled="true"></td>
                </tr>
                <tr>
                    <td class="label">City</td>
                    <!-- Note: Selection of address components in this example is typical.
                         You may need to adjust it for the locations relevant to your app. See
                         https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
                    -->
                    <td class="wideField" colspan="3"><input class="field" id="locality" disabled="true"></td>
                </tr>
                <tr>
                    <td class="label">State</td>
                    <td class="slimField"><input class="field" id="administrative_area_level_1" disabled="true"></td>
                    <td class="label">Zip code</td>
                    <td class="wideField"><input class="field" id="postal_code" disabled="true"></td>
                </tr>
                <tr>
                    <td class="label">Country</td>
                    <td class="wideField" colspan="3"><input class="field" id="country" disabled="true"></td>
                </tr>
            </table>


            <div class="row result">
                <p>El tiempo en <span class="location"></span></p>
                <br>
                <p>La temperatura es de <span class="temp">º</span></p>
                <img src="" class="icon">
            </div>
        </div>
    </div>
@endsection

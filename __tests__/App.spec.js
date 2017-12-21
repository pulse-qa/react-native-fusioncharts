import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

jest.unmock('ScrollView');
jest.mock('../assets/fusioncharts.html', () => {
  const path = require('path');
  const fs = require('fs');

  // Library path respect to project directory
  const fcLibraryPath = path.resolve('./assets/fusioncharts.html');
  return { html: fs.readFileSync(fcLibraryPath, 'utf8') }
});

describe('App', () => {
  it('should render as expected', () => {
    const tree = renderer.create(
      <App />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change chart data on pressing the button', () => {
    const instance = renderer.create(
      <App />
    ).getInstance();

    instance.onPress();
    expect(instance.state.dataFormat).toEqual('xml');
    expect(instance.state.dataSource).toEqual(`<chart caption="Top 10 Most Popular Sports in the World"
        subcaption="Based on number of viewers" yaxisname="Number of Viewers" plotgradientcolor=""
        bgcolor="FFFFFF" showplotborder="0" divlinecolor="CCCCCC" showvalues="1" showcanvasborder="0"
        canvasbordercolor="CCCCCC" canvasborderthickness="1" showyaxisvalues="0" showlegend="1"
        showshadow="0" labelsepchar=": " basefontcolor="000000" labeldisplay="AUTO"
        numberscalevalue="1000,1000,1000" numberscaleunit="K,M,B"
        palettecolors="#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c"
        showborder="0"  rotateValues="0" placevaluesInside="0" valueFontColor="#909090" theme="fint">
        <set label="Football" value="3500000000" tooltext="Popular in: {br}Europe{br}Africa{br}Asia{br}Americas" />
        <set label="Cricket" value="4400000000" tooltext="Popular in: {br}India{br}UK{br}Pakistan{br}Australia" />
        <set label="Field Hockey" value="2200000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Australia" />
        <set label="Tennis" value="1000000000" color="e44a00" tooltext="Popular in: {br}Europe{br}Americas{br}Asia" />
        <set label="Volleyball" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Americas{br}Australia" />
        <set label="Table Tennis" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Americas" />
        <set label="Baseball" value="500000000" tooltext="Popular in: {br}US{br}Japan{br}Cuba{br}Dominican Republic" />
        <set label="Golf" value="400000000" tooltext="Popular in: {br}US{br}Canada{br}Europe" />
        <set label="Basketball" value="400000000" tooltext="Popular in: {br}US{br}Canada" />
        <set label="American football" value="390000000" tooltext="Popular in:{br}US" />
    </chart>`);
  });

  it('should respond on `dataPlotClick` chart event', () => {
    const instance = renderer.create(
      <App />
    ).getInstance();
    
    const mockedEventObj = {};
    const mockedDataObj = { displayValue: Math.floor(Math.random() * 1000) };
    instance.events['dataPlotClick'].apply(undefined, [mockedEventObj, mockedDataObj]);
    expect(instance.state.displayValue).toBe(mockedDataObj.displayValue);
  });
});

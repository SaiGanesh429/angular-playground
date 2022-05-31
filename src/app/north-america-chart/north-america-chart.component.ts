import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WorldMapJson from 'src/assets/higchart-map-collections/world'
import * as Highcharts from 'highcharts/highmaps';
@Component({
  selector: 'app-north-america-chart',
  templateUrl: './north-america-chart.component.html',
  styleUrls: ['./north-america-chart.component.scss']
})
export class NorthAmericaChartComponent implements OnInit {
  @ViewChild('globalChart') globalChart: any;
  views: Array<any> = ['worldView'];
  viewState = ['worldView', 'ContinentView', 'countryView', 'stateView', 'cityView'];
  viewIndex = 0;
  view = 'worldView';
  isViewEnable = false;
  geoJsons = [
    {
      name: 'world_view', view: 'worldView', heatMapData: [
        { code: 'na', value: 400 },
      ]
    },
    {
      name: 'north_america', view: 'continentView', heatMapData: [
        { code: 'mx', value: 400 },
        { code: 'ca', value: 920 },
        { code: 'us', value: 250 },
        { code: 'gl', value: 100 }
      ]
    },
    {
      name: 'canada', view: 'CountryView', heatMapData: [
        { code: 'ca-ab', value: 400 },
        { code: 'ca-mb', value: 920 },
        { code: 'ca-nu', value: 650 },
        { code: 'ca-yt', value: 200 },
        { code: 'ca-bc', value: 100 },
        { code: 'ca-on', value: 500 },
        { code: 'ca-qc', value: 50 },
        { code: 'ca-nt', value: 850 },
        { code: 'ca-sk', value: 500 },
        { code: 'ca-nb', value: 540 },
      ],
      bubbleData: [
        // { code: 'ca-ab', z: 400, color: 'black' },
        // { code: 'ca-mb', z: 920, color: 'black' },
        // { code: 'ca-nu', z: 650, color: 'black' },
      ]
    },
    {
      name: 'alberta', view: 'stateView',
      heatMapData: [
        { code: 'ca-ab-4813', value: 100 },
        { code: 'ca-ab-4812', value: 200 },
        { code: 'ca-ab-4818', value: 800 },
      ],
      bubbleData: [
        { code: 'ca-ab-4813', z: 100, color: 'black' },
        { code: 'ca-ab-4812', z: 200, color: 'black' },
        { code: 'ca-ab-4818', z: 800, color: 'black' },
      ]
    },
    {
      name: 'division no. 18', view: 'cityView',
      heatMapData: [
        { code: 'ca-ab-4818', value: 800 },
      ],
      bubbleData: [
        { code: 'ca-ab-4818', z: 800, color: 'black' },
      ]
    },
    {
      name: 'division no. 13', view: 'cityView',
      heatMapData: [{ code: 'ca-ab-4813', value: 800 }],
      bubbleData: []
    },
    {
      name: 'division no. 12', view: 'cityView',
      heatMapData: [{ code: 'ca-ab-4812', value: 800 }],
      bubbleData: []
    }
  ]

  mapStates = [{
    0: 'Continent',
    1: 'Country',
    2: 'State',
    3: 'City'
  }]
  currentMapState: String = 'Continent';
  Highcharts: typeof Highcharts = Highcharts;

  northAmerica = [
    // { code: 'mx', z: 400, color: 'black' },
    // { code: 'ca', z: 920, color: 'black' },
    // { code: 'us', z: 250, color: 'black' },
  ];

  data = [
    { code: 'na', value: 400 },
  ];

  chartConstructor = 'mapChart';
  mapData: any;

  chartInstance: Highcharts.Chart | any;
  chartOptions!: Highcharts.Options;
  //  public var fetchRes:any;
  constructor(private http: HttpClient) {

  }

  getChartInstance(e: Highcharts.Chart) {
    this.chartInstance = e;
    this.chartInstance.reflow();
  }
  ngOnInit() {
    this.chartOptions = {
      chart: {
        borderWidth: 1,
        animation: false,
        map: WorldMapJson
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#FFFFFF'],
          [0.0001, '#7CB9E8'],
          [1, '#00308F'],
        ],
      },
      title: {
        text: '',
      },
      tooltip: {
        enabled: true,
        headerFormat: '',
        // format : '{point.name}'
        formatter: function () {
          return `${this.point.name}`;
        },
      },
      subtitle: {
        text: '',
      },
      legend: {
        enabled: true,
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },
      plotOptions: {
        series: {
          stickyTracking: false,
        },
      },
      series: [
        {
          type: 'map',
          data: this.data,
          joinBy: ['hc-key', 'code'],
          color: 'red',
          events: {
            click: (event: any) => {
              this.getNewMapData(event.point.name.toLowerCase(), 'map');
            },
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        },
        {
          type: 'mapbubble',
          name: 'Population 2016',
          data: this.northAmerica,
          minSize: 10,
          maxSize: 30,
          color: 'green',
          borderWidth: 2,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `${this.point.options['z']}`;
            },
          },
        },
      ],
    };
  }

  getObjectFromJsonList(jsonName: string | String) {
    return this.geoJsons.find(geojson => geojson.name.replace(" ", "_").toLowerCase() === jsonName.replace(" ", "_").toLowerCase())
  }

  getNewMapData(jsonName: string, type: string) {
    this.isViewEnable = true;
    let jsonObject = this.getObjectFromJsonList(jsonName);
    if (jsonObject !== undefined) {
      if (type === 'map') {
        this.views.push(jsonName);
      } else {
        this.views = this.views.slice(0, this.views.indexOf(jsonName) + 1);
      }
      this.view = jsonObject.view;

      this.getDataFromAPI(jsonName, jsonObject)
    } else {
      alert(`No Data found for the ${jsonName}`)
    }
  }

  getDataFromAPI(jsonName: string, jsonObject: any) {
    if (this.view !== 'cityView') {
      this.http.get(encodeURI(`../../assets/mock-data/${jsonName.replace(/\s/g, "_").toLowerCase()}.json`))
        .subscribe(response => {
          this.mapData = response;
          this.deleteAndAddSeries(jsonObject);
        });
    } else {
      this.deleteAndAddSeries(jsonObject);
    }
  }

  selectedStage(event: string) {
    this.getNewMapData(event, 'breadcrumb')
  }


  deleteAndAddSeries(jsonData: any) {
    while (this.chartInstance.series.length) {
      this.chartInstance.series[0].remove(false);
    };

    let dataset1 = [{
      type: 'map',
      data: this.view == 'stateView' ? [] : jsonData?.heatMapData,
      joinBy: ['hc-key', 'code'],
      allAreas: this.view == 'cityView' ? false : true,
      dataLabels: {
        enabled: this.view == 'stateView' ? false : true,
        format: '{point.name}'
      },
      events: this.view == 'cityView' ? {
        click: (event: any) => { }
      } : {
        click: (event: any) => {
          this.getNewMapData(
            event.point.name.toLowerCase(), 'map'
          );
        },
      }
    },
    {
      // allAreas: this.view == 'cityView' ? false : true,
      type: 'mapbubble',
      name: 'Population 2016',
      joinBy: ['hc-key', 'code'],
      data: jsonData?.bubbleData,
      minSize: 10,
      maxSize: 30,
      color: 'green',
      borderWidth: 2,
      dataLabels: {
        enabled: true,
        formatter: function (this: any) {
          return `${this.point.options['z']}`;
        },
      },
      events: {
        click: (event: any) => {
          this.getNewMapData(
            event.point.name.toLowerCase(), 'map'
          );
        },
      }
    }]
    let newseries
    if (this.view == 'cityView') {
      newseries = [dataset1[0]];
    } else {
      newseries = [...dataset1];

    }


    console.log(this.view)
    // if (this.view == 'cityView' || this.view == 'stateView') {
    //   newseries.push(dataset1[1])
    // } else {
    //   newseries.push(...dataset1)
    // }
    // let newseries = [
    //   {
    //     type: 'map',
    //     data: jsonData?.heatMapData,
    //     joinBy: ['hc-key', 'code'],
    //     allAreas: this.view == 'cityView' ? false : true,
    //     dataLabels: {
    //       enabled: this.view == 'cityView' ? false : true,
    //       format: '{point.name}'
    //     },
    //     events: this.view == 'cityView' ? {
    //       click: (event: any) => { }
    //     } : {
    //       click: (event: any) => {
    //         this.getNewMapData(
    //           event.point.name.toLowerCase(), 'map'
    //         );
    //       },
    //     }
    //   },
    //   {
    //     allAreas: this.view == 'cityView' ? false : true,
    //     type: 'mapbubble',
    //     name: 'Population 2016',
    //     joinBy: ['hc-key', 'code'],
    //     data: jsonData?.bubbleData,
    //     minSize: 10,
    //     maxSize: 30,
    //     color: 'green',
    //     borderWidth: 2,
    //     dataLabels: {
    //       enabled: true,
    //       formatter: function (this: any) {
    //         return `${this.point.options['z']}`;
    //       },
    //     },
    //   },
    // ];
    console.log(newseries, "test");

    this.chartInstance.update({
      chart: { map: this.mapData },
    });

    newseries.map((seriesInstance) => {
      if (seriesInstance) {
        this.chartInstance.addSeries(seriesInstance);
      }
    });
  }
}



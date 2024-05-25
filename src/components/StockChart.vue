<template>
  <!--
  Template for the StockChart component.

  Displays a dropdown for selecting the timeframe and renders the line chart
  with NVIDIA stock prices for the selected timeframe.
  -->
  <div class="chart-container">
    <h2>NVIDIA Stock Price</h2>
    <div class="filter-container">
      <label for="timeframe">Select Timeframe:</label>
      <select id="timeframe" v-model="selectedTimeframe" @change="fetchData">
        <option value="1d">1 Day</option>
        <option value="1w">1 Week</option>
        <option value="1m">1 Month</option>
        <option value="3m">3 Months</option>
        <option value="6m">6 Months</option>
        <option value="1y">1 Year</option>
        <option value="3y">3 Years</option>
        <option value="5y">5 Years</option>
      </select>
    </div>
    <line-chart :chart-data="datacollection" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs' // Import Line chart from vue-chartjs
import axios from 'axios' // Import axios for HTTP requests

export default {
  name: 'StockChart', // Name of the component
  components: {
    LineChart: {
      extends: Line,
      props: ['chartData', 'options'],
      mounted () {
        this.renderChart(this.chartData, this.options) // Render the chart with initial data and options
      },
      watch: {
        chartData: {
          handler() {
            this.renderChart(this.chartData, this.options) // Re-render the chart when data changes
          },
          deep: true
        }
      }
    }
  },
  data() {
    return {
      datacollection: null, // Data for the chart
      selectedTimeframe: '1y', // Default timeframe selection to 1 year
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'll'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Price'
            }
          }]
        },
        elements: {
          line: {
            tension: 0 // Disables bezier curves
          },
          point: {
            radius: 0, // Hides the points
            hitRadius: 10, // Increases the area around each point that can be hovered over
            hoverRadius: 5 // Sets the radius of the point when hovered
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return `Price: $${tooltipItem.yLabel.toFixed(2)}`; // Format to 2 decimal places
            }
          }
        }
      }
    }
  },
  mounted() {
    this.fetchData() // Fetch data when the component is mounted
  },
  methods: {
    /**
     * Fetches stock data from the server and updates the chart data.
     * Filters the data based on the selected timeframe.
     */
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/nvidia-stock') // Fetch stock data from the server
        console.log('API Response:', response.data) // Debugging log
        const data = response.data
        const now = new Date()
        let startDate

        switch (this.selectedTimeframe) {
          case '1d':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
            break
          case '1w':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
            break
          case '1m':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
            break
          case '3m':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
            break
          case '6m':
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
            break
          case '1y':
            startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
            break
          case '3y':
            startDate = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate())
            break
          case '5y':
            startDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate())
            break
          default:
            startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        }

        let filteredData
        if (this.selectedTimeframe === '1d') {
          filteredData = [data[data.length - 1]] // Use only the last data point for 1 day
        } else {
          filteredData = data.filter(entry => new Date(entry.date) >= startDate)
        }
        
        const dates = filteredData.map(entry => new Date(entry.date)) // Ensure dates are Date objects
        const prices = filteredData.map(entry => parseFloat(entry.close)) // Ensure prices are numbers
        console.log('Filtered Dates:', dates) // Debugging log
        console.log('Filtered Prices:', prices) // Debugging log
        this.datacollection = {
          labels: dates,
          datasets: [
            {
              label: 'NVIDIA Stock Price',
              backgroundColor: 'rgba(247, 121, 121, 0.5)',
              borderColor: '#f87979',
              data: prices,
              fill: false // Do not fill under the line
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
  }
}
</script>

<style scoped>
/* Styles for the StockChart component */

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-container {
  margin-bottom: 20px;
}

div {
  position: relative;
  width: 80%;
  height: 400px;
}
</style>

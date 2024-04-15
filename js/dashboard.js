const ENERGY = document.getElementById("energy__scale");
const ENERGY_MAX = 100;
const ENERGY_CURRENT = 45;

const RANGE = document.getElementById("range__scale");
const RANGE_MAX = 300;
const RANGE_CURRENT = 157;

const BREAK_FLUID = document.getElementById("breakFluid__scale");
const BREAK_FLUID_CURRENT = 9;
const BREAK_FLUID_MAX = 100;

const TIRE_WEAR = document.getElementById("tireWear__scale");
const TIRE_WEAR_CURRENT = 25;
const TIRE_WEAR_MAX = 100;

const MILES_STATISTICS = document.getElementById("milesStatistics__graphic");
const MILES_STATISTICS_PERIODS = document.querySelectorAll(
  "[name='milesStatistics']"
);

const CAR_STATISTICS = document.getElementById("carStatistics__graphic");
const CAR_STATISTICS_PERIODS = document.querySelectorAll(
  "[name='carStatistics']"
);

const optionsConfig = {
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      position: "chartArea",
      labels: {
        textAlign: "center",
        boxWidth: 0,
        color: "#242731",
        font: {
          size: 24,
        },
      },
    },
  },
  circumference: 240,
  rotation: -120,
  borderRadius: 0,
  cutout: 42,
};

const energy = new Chart(ENERGY, {
  type: "doughnut",
  data: {
    labels: [`${ENERGY_CURRENT}%   `],
    datasets: [
      {
        data: [ENERGY_CURRENT, ENERGY_MAX - ENERGY_CURRENT],
        borderWidth: 0,
        backgroundColor: ["#FFFFFF", "#B37EFC"],
      },
    ],
  },
  options: structuredClone(optionsConfig),
});

energy.options.plugins.legend.labels.color = "#ffffff";
energy.update();

new Chart(RANGE, {
  type: "doughnut",
  data: {
    labels: [`${RANGE_CURRENT}k%   `],
    datasets: [
      {
        data: [RANGE_CURRENT, RANGE_MAX - RANGE_CURRENT],
        borderWidth: 0,
        backgroundColor: ["#FF7E86", "#F4F5F9"],
      },
    ],
  },
  options: optionsConfig,
});

new Chart(BREAK_FLUID, {
  type: "doughnut",
  data: {
    labels: [`${BREAK_FLUID_CURRENT}%   `],
    datasets: [
      {
        data: [BREAK_FLUID_CURRENT, BREAK_FLUID_MAX - BREAK_FLUID_CURRENT],
        borderWidth: 0,
        backgroundColor: ["#A162F7", "#F4F5F9"],
      },
    ],
  },
  options: optionsConfig,
});

new Chart(TIRE_WEAR, {
  type: "doughnut",
  data: {
    labels: [`${TIRE_WEAR_CURRENT}%   `],
    datasets: [
      {
        data: [TIRE_WEAR_CURRENT, TIRE_WEAR_MAX - TIRE_WEAR_CURRENT],
        borderWidth: 0,
        backgroundColor: ["#F6CC0D", "#F4F5F9"],
      },
    ],
  },
  options: optionsConfig,
});

// ================= GRAPHICS =================

const milesStatisticsData = {
  dailyDataLabels: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"],
  weeklyDataLabels: ["MON", "TUE", "WED ", "THU ", "FRI ", "SAT", "SUN"],
  monthlyDataLabels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ],
  data: [140, 120, 157, 105, 135, 95, 145],
};

const milesStatistics = new Chart(MILES_STATISTICS, {
  type: "bar",
  data: {
    labels: milesStatisticsData.dailyDataLabels,
    datasets: [
      {
        label: "",
        data: milesStatisticsData.data,
        categoryPercentage: 1,
        barPercentage: 1,
        backgroundColor: "#F4F5F9",
        barThickness: 28,
        hoverBackgroundColor: "#2884FF",
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw + "k";
          },
          labelColor: function () {
            return {
              backgroundColor: "#2884FF",
              borderRadius: 5,
            };
          },
        },
      },
    },
    scales: {
      y: {
        max: 200,
        display: false,
      },
      x: {
        grid: {
          tickLength: 0,
          color: "#F2F2F2",
        },
        ticks: {
          autoSkip: true,
          color: "#808191",
        },
      },
    },
  },
});

MILES_STATISTICS_PERIODS.forEach((radioBtn) => {
  radioBtn.addEventListener("change", (e) => {
    const target = e.target.id;
    switch (target) {
      case "milesStatistics__day":
        milesStatistics.data.labels = milesStatisticsData.dailyDataLabels;
        milesStatistics.data.datasets[0].data = milesStatisticsData.data;
        milesStatistics.options.scales.y.max = 200;
        milesStatistics.update();
        break;
      case "milesStatistics__week":
        milesStatistics.data.labels = milesStatisticsData.weeklyDataLabels;
        milesStatistics.data.datasets[0].data = milesStatisticsData.data.map(
          (n) => n * 7 - Math.floor(Math.random() * 300)
        );
        milesStatistics.options.scales.y.max = 1400;
        milesStatistics.update();
        break;
      case "milesStatistics__mounth":
        milesStatistics.data.labels = milesStatisticsData.monthlyDataLabels;
        milesStatistics.data.datasets[0].data = milesStatisticsData.data.map(
          (n) => n * 30 - Math.floor(Math.random() * 1500)
        );
        milesStatistics.options.scales.y.max = 4800;
        milesStatistics.update();
        break;
      default:
        break;
    }
  });
});

const carStatisticsData = {
  dailyDataLabels: ["7 AM", "9 AM", "11 AM", "4 PM", "3 PM", "7 PM", "9 PM"],
  weeklyDataLabels: ["MON", "TUE", "WED ", "THU ", "FRI ", "SAT", "SUN"],
  monthlyDataLabels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ],
  data: [100, 130, 150, 120, 80, 90, 110],
};

const context = CAR_STATISTICS.getContext("2d");
const gradient = context.createLinearGradient(
  0,
  0,
  0,
  window.screen.width / 10
);
gradient.addColorStop(0, "rgba(255, 118, 76, 0.2)");
gradient.addColorStop(1, "rgba(255, 126, 7, 0.001)");

const carStatistics = new Chart(CAR_STATISTICS, {
  type: "line",
  data: {
    labels: carStatisticsData.dailyDataLabels,
    datasets: [
      {
        label: "",
        data: carStatisticsData.data,
        categoryPercentage: 1,
        barPercentage: 1,
        backgroundColor: "#F4F5F9",
        barThickness: 28,
        hoverBackgroundColor: "#2884FF",
        pointStyle: false,
        fill: true,
        borderWidth: 2,
        borderColor: "rgb(255, 118, 76)",
        backgroundColor: gradient,
        tension: 0.2,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw + "k";
          },
          labelColor: function () {
            return {
              backgroundColor: "#2884FF",
              borderRadius: 5,
            };
          },
        },
      },
    },
    scales: {
      y: {
        min: 50,
        max: 160,
        display: false,
      },
      x: {
        grid: {
          tickLength: 0,
          color: "#F9F9F9",
        },
        ticks: {
          autoSkip: true,
          color: "#808191",
        },
      },
    },
  },
});

CAR_STATISTICS_PERIODS.forEach((radioBtn) => {
  radioBtn.addEventListener("change", (e) => {
    const target = e.target.id;
    switch (target) {
      case "carStatistics__day":
        carStatistics.data.labels = carStatisticsData.dailyDataLabels;
        carStatistics.data.datasets[0].data = carStatisticsData.data;
        carStatistics.options.scales.y.max = 160;
        carStatistics.update();
        break;
      case "carStatistics__week":
        carStatistics.data.labels = carStatisticsData.weeklyDataLabels;
        carStatistics.data.datasets[0].data = carStatisticsData.data.map(
          (n) => n * 7 - Math.floor(Math.random() * 300)
        );
        carStatistics.options.scales.y.max = 1400;
        carStatistics.update();
        break;
      case "carStatistics__mounth":
        carStatistics.data.labels = carStatisticsData.monthlyDataLabels;
        carStatistics.data.datasets[0].data = carStatisticsData.data.map(
          (n) => n * 30 - Math.floor(Math.random() * 1500)
        );
        carStatistics.options.scales.y.max = 4800;
        carStatistics.update();
        break;
      default:
        break;
    }
  });
});

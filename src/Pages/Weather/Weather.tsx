import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");
    const [error, setError] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true);

    const location = useLocation();
    console.log(location.pathname);

    const apiKey = `69de6e28403ed4c9840112fc52e94e2b`;

    const fetchWeather = async (e) => {
        e.preventDefault();
        if (!city) return; // Do nothing if the city is empty

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            setWeatherData(data);
            setError(null); // Clear previous errors if any
        } catch (err) {
            setError(err.message);
            setWeatherData(null); // Clear previous weather data
        }
    };
    // Convert Celsius to Fahrenheit
    const convertToFahrenheit = (tempCelsius) => Math.floor(tempCelsius * 1.8 + 32);

    // Filter last 12 data points (each point is a 3-hour interval, so 12 points cover 36 hours)
    const filteredWeatherData = weatherData ? weatherData.list.slice(0, 12) : [];

    const chartConfig = weatherData
        ? {
            type: "line",
            height: 240,
            series: [
                {
                    name: isCelsius ? "Min Temp (°C)" : "Min Temp (°F)",
                    data: filteredWeatherData.map((entry) =>
                        isCelsius
                            ? Math.floor(entry.main.temp_min)
                            : convertToFahrenheit(entry.main.temp_min)
                    ),
                },
                {
                    name: isCelsius ? "Max Temp (°C)" : "Max Temp (°F)",
                    data: filteredWeatherData.map((entry) =>
                        isCelsius
                            ? Math.floor(entry.main.temp_max)
                            : convertToFahrenheit(entry.main.temp_max)
                    ),
                },
            ],
            options: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                title: {
                    show: false,
                },
                dataLabels: {
                    enabled: false,
                },
                colors: ["#3498db", "#e74c3c"],
                stroke: {
                    lineCap: "round",
                    curve: "smooth",
                },
                markers: {
                    size: 0,
                },
                xaxis: {
                    categories: filteredWeatherData.map((entry) =>
                        new Date(entry.dt_txt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    ),
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                    labels: {
                        style: {
                            colors: "#616161",
                            fontSize: "12px",
                            fontFamily: "inherit",
                            fontWeight: 400,
                        },
                    },
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: "#616161",
                            fontSize: "12px",
                            fontFamily: "inherit",
                            fontWeight: 400,
                        },
                    },
                },
                grid: {
                    show: true,
                    borderColor: "#dddddd",
                    strokeDashArray: 5,
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    padding: {
                        top: 5,
                        right: 20,
                    },
                },
                fill: {
                    opacity: 0.8,
                },
                tooltip: {
                    theme: "dark",
                },
            },
        }
        : null;


    return (
        <>
            <div className="relative border border-transparent min-h-screen bg-[url('https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black opacity-40 rounded-xl z-20"></div>
                <div className="relative z-30">
                    <form
                        onSubmit={fetchWeather}
                        className="mt-10 md:mx-auto max-w-xl mx-3 py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="Search anything"
                            className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                            name="topic" />
                        <button className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3" >
                            Search
                        </button>
                    </form>

                    {weatherData && (
                        <div className="max-w-screen-sm md:mx-auto my-10 mx-4">
                            <div className="border-white md:grid grid-cols-2 gap-2 ">
                                <div className="border-white rounded-xl">
                                    <div className="text-white bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-3 md:p-8  shadow-2xl">
                                        <h2 className="text-xl font-semibold flex items-center"><span className="text-lg pr-2 text-red-500"><FaLocationDot /></span>{weatherData.city.name}</h2>
                                        <h2>{weatherData.list[0].dt_txt}</h2>
                                        <div className="mt-20 w-full capitalize justify-between">
                                            <div className="w-fit">
                                                <p className="text-4xl font-semibold">{Math.floor(weatherData.list[0].main.temp)}°C</p>
                                                <p className="text-xs flex-none">feels like {Math.floor(weatherData.list[0].main.feels_like)}°C</p>

                                            </div>
                                            <div className="w-full">
                                                <p className="text-3xl font-semibold text-right">{weatherData.list[0].weather[0].main}</p>
                                                {/* <p className="text-xs text-right">Over the last 3 hours - {weatherData.list[0].rain["3h"]}mm</p> */}
                                                {/* description box */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-white my-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-3 md:p-8 shadow-2xl text-white">
                                    <h2 className="capitalize text-lg pb-5">sea & wind conditions report</h2>
                                    <div className="flex flex-col">
                                        <div className="overflow-x-auto">
                                            <div className="inline-block min-w-full">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full">
                                                        <tbody>
                                                            <tr className="">
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">Wind Speed</td>
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">{weatherData.list[0].wind.speed} m/s</td>
                                                            </tr>
                                                            <tr className="">
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">Wind Direction</td>
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">{weatherData.list[0].wind.deg}°</td>
                                                            </tr>
                                                            <tr className="">
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">Wind Gust</td>
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">{weatherData.list[0].wind.gust} m/s</td>
                                                            </tr>
                                                            <tr className="">
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">Cloud Coverage</td>
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">{weatherData.list[0].clouds.all} %</td>
                                                            </tr>
                                                            <tr className="">
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">Sea Level Pressure</td>
                                                                <td className="text-sm font-light py-1 border-b border-gray-400 whitespace-nowrap">{weatherData.list[0].main.sea_level} hPa</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 border-white bg-white backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl ">
                                <Card className="bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 shadow-2xl mt-5">
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        color="transparent"
                                        className="flex justify-between items-center"
                                    >
                                        <Typography variant="h6" color="blue-gray">
                                            Last 12 hours weather update
                                        </Typography>
                                        <button
                                            onClick={() => setIsCelsius(!isCelsius)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                        >
                                            {isCelsius ? "Convert to Fahrenheit" : "Convert to Celsius"}
                                        </button>
                                    </CardHeader>
                                    <CardBody className="px-2 pb-0">
                                        <Chart {...chartConfig} />
                                    </CardBody>
                                </Card>
                            </div>

                            {error && <p className="text-red-500 mt-4">Error: {error}</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Weather;

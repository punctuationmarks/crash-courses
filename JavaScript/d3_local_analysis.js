const fs = require("fs"); // file system  
const d3 = require("d3"); // data driven documents
const _ = require("lodash"); // lodash // used for cloning the dataset, a necessity when wrangling data, imo


/*
House keeping notes:
Leaving in logs for the ease of debugging and verifying the data processing was accurate, if you want to use them/see

D3 chosen since it can scale up if this ever needed any visualization on the client side
and because I've been studying D3 this week for visualization and didn't know one could wrangle data with it (sorry)
But blown away by it, very cool stuff, I was just wrangling everything in Python or R and was going to pipe it into D3

*/

// just renamed the .dat file to a .tsv for importing
const pathToDataset = "./datafile.tsv"

// reading/loading the dataset
// using this as a giant try/catch, saw it seemed like best practices for Node and wranging data, would love more guidance
fs.readFile(pathToDataset, "utf8", function (error, data) {
    if (error) {
        console.log("Data wasn't loaded because: ", error)
    } else {

        // parsing the data from the tsv
        const parsedData = d3.tsvParse(data);

        // cloning and sorting the data by date
        const dataset = _.clone(parsedData).sort((a, b) => d3.ascending(a.Date, b));
        // console.log(dataset.slice(0, 5)) // verifying the data was cloned and sorted        


        // datalayer (I'm assuming this is for the columns/variables/attributes, but not entirely sure what "datalayer" means)
        let [dataValues] = d3.values(dataset)
        let datalayer = Object.keys(dataValues)
        // console.log(datalayer);

        // ensuring all of the strings are ints and floats
        dataset.forEach(d => d['Open'] = +d['Open']);
        dataset.forEach(d => d['High'] = +d['High']);
        dataset.forEach(d => d['Low'] = +d['Low']);
        dataset.forEach(d => d['Close'] = +d['Close']);
        dataset.forEach(d => d['Volume'] = +d['Volume']);
        // adding columns/variables to the dataset/data
        dataset.forEach(d => d['HighLowDifference'] = d['High'] - d['Low']);
        /* Full disclosure, no clue if this is the correct formula. I did't know if it should a moving average over the life of the stock, 
        or the best time to buy low and sell high, (2012-06-25 at 130.85 and 2013-05-22 at 196.07, respectively)
        so I went with this cluster of a formula */
        dataset.forEach(d => d['MaxPotentialPerShare'] = (
            (d['High'] * d['Volume']) - (d['Low'] * d['Volume'])
        ) / d['Volume']);



        // wrangling time 
        /* issue with this way of parsing the string to a date, it returns the number of miliseconds since 1970-1-1
        tried converting it back (and forwards) with no avail, I need more research into dealing with datetimes in JS
        so a work around for now is making a new column/variable for a copy of the Date called Date_ which turns into miliseconds
        */
        dataset.forEach(d => d['Date_'] = d['Date']);
        dataset.forEach(d => d['Date_'] = Date.parse(d['Date_']));


        // making individual time columns for future analysis
        const parseDay = d3.timeFormat("%d")
        const parseMonth = d3.timeFormat("%B");
        const parseYear = d3.timeFormat("%Y");

        dataset.forEach(d => d['Year'] = parseYear(d['Date_']));
        // just prefer numbers over strings, unless they have zeros that make it easier to read
        dataset.forEach(d => d['Year'] = +d['Year']);
        dataset.forEach(d => d['Month'] = parseMonth(d['Date_']));
        dataset.forEach(d => d['Day'] = parseDay(d['Date_']));


        // because the columns/variables have changed
        [dataValues] = d3.values(dataset)
        datalayer = Object.keys(dataValues)
        // console.log(datalayer);



        // extra and probably uncessary, exploratory data 
        // const minDiffHighLow = d3.min(dataset, d => d.HighLowDifference);
        // const minDiffHighLow_oservation = dataset.filter(d => (d.HighLowDifference == minDiffHighLow));
        // // console.log("minDiffHighLow_oservation: ", minDiffHighLow_oservation);

        // not sure if this is needed, the term varirance == std^2 sometimes
        // const varianceHigh = d3.variance(dataset, d => d.High);
        // const varianceLow = d3.variance(dataset, d => d.Low);
        // console.log("varianceHigh: ", varianceHigh)
        // console.log("varianceLow: ", varianceLow)
        // const maxHigh = d3.max(dataset, d => d.High);
        // console.log("maxHigh: ", maxHigh)
        // const minLow = d3.min(dataset, d => d.Low);
        // console.log("minLow: ", minLow)
        // const highestHigh_oserveration = dataset.filter(d => d.High == maxHigh);
        // console.log("highestHigh_oserveration: ", highestHigh_oserveration)
        // const lowestLow_oserveration = dataset.filter(d => d.Low == minLow);
        // console.log("lowestLow_oserveration: ", lowestLow_oserveration)



        // calulcating the max of the  High/Low difference (is this over-commenting? Uncle Bob is yelling at me)
        const maxDiffHighLow = d3.max(dataset, d => d.HighLowDifference);
        // getting the actual obvservation
        const maxDiffHighLow_oservation = dataset.filter(d => (d.HighLowDifference == maxDiffHighLow));
        // console.log("maxDiffHighLow_oservation: ", maxDiffHighLow_oservation)



        // returning the average of a volume during any specified month and year combo
        const desired_month = "July";
        const desired_year = 2012
        const desired_dates = dataset.filter(d => (d.Month == desired_month && d.Year == desired_year));
        // console.log("desired_dates: ", desired_dates)

        // to make this more future proof, this variable name should be changed
        const july_2012_average_volume = Number((d3.mean(desired_dates, d => d.Volume).toFixed(2))); // rounding to 2 decimal points
        // console.log("Average Volume for July 2012: ", july_2012_average_volume)



        const totalMaxPotentialPerShare = d3.max(dataset, d => d.MaxPotentialPerShare);
        // console.log("totalMaxPotentialPerShare: ", totalMaxPotentialPerShare)
        const totalMaxPotentialPerShare_observeration = dataset.filter(d => d.MaxPotentialPerShare == totalMaxPotentialPerShare);
        // console.log("totalMaxPotentialPerShare_observeration: ", totalMaxPotentialPerShare_observeration)



        // combing all of the files into an array
        const all_requested_stock_data = ["Day with max difference between low and high price: ",
            maxDiffHighLow_oservation,
            "The average daily volume of July 2012: ",
            july_2012_average_volume,
            "Day with max potential gains between low & high over volume : ",
            totalMaxPotentialPerShare_observeration,
        ]



        // writing the file 
        // sorry, this doesn't look prettier
        fs.writeFile("all_requested_stock_data.txt", JSON.stringify(all_requested_stock_data), function (err) {
            console.log("all_requested_stock_data.txt wrote")
        });
    }
});





// // testing the file can be read
// fs.readFile("./all_requested_stock_data.txt", "utf8", function (error, data) {
//     if (error) {
//         console.log("Data wasn't loaded because: ", error)

//     } else {
//         console.log("Data read...")
//         console.log(data)
//     }
// });
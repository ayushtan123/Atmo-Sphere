const wrapper = document.querySelector(".wrapper");
inputPart = wrapper.querySelector(".input-part")
infoTxt = inputPart.querySelector(".info-txt");
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
wIcon = document.querySelector(".weather-part img");
arrowBack = document.querySelector("header i");

let api;

const apiKey = '8b0646ab2be54921df953d43ce819701'; //api key

inputField.addEventListener("keyup", e => {
    //if user presses enter key and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        //if browser supports geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        alert("Your Browser does not support geolocation api.");
    }
});

function onSuccess(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

function onError(error) {
    // console.log(error);
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error")
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();

}

function fetchData() {
    infoTxt.innerHTML = "Getting weather details...";
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function setB(img) {
    const bodyElement = document.querySelector("body");
    bodyElement.style.backgroundImage = `url('${img}')`;
    bodyElement.style.backgroundSize = "cover";
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.innerHTML = `${inputField.value} isn't a valid city name`;
        infoTxt.classList.replace("pending", "error");
    }
    else {
        console.log(info);
        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        document.querySelector("header i").classList.add("bx-left-arrow-alt");

        //all details
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;

        //images
        if (id == 800) {
            wIcon.src = "icons/clear.svg";
            setB('bimg/clear.png');
        }
        else if (id > 800) {
            wIcon.src = "icons/cloud.svg";
            setB('bimg/cloudy.png');
        }
        else if (id >= 700 && id < 800) {
            wIcon.src = "icons/haze.svg";
            setB('bimg/mist.png');
        }
        else if (id >= 300 && id <= 550) {
            wIcon.src = "icons/rain.svg";
            setB('bimg/rain.png');
        }
        else if (id >= 600 && id < 650) {
            wIcon.src = "icons/snow.svg";
            setB('bimg/snow.png');
        }
        else if (id >= 200 && id <= 242) {
            wIcon.src = "icons/storm.svg";
            setB('bimg/storm.png');
        }
        else {
            alert("Error.");
        }

        //pass these elements to particular html
        wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp);
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".weather").innerHTML = description[0].toUpperCase() + description.slice(1).toLowerCase();;
        wrapper.querySelector(".humidity .numb").innerHTML = `${humidity}%`;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
    inputField.innerHTML = "";
    document.querySelector("header i").classList.remove("bx-left-arrow-alt");
    setB('bimg/main.jpg');
})

const hoverDiv = document.querySelector(".footer h3");

hoverDiv.addEventListener("mouseover", function() {
  hoverDiv.innerHTML = "Atmo Sphere";
});

hoverDiv.addEventListener("mouseout", function() {
  hoverDiv.innerHTML = "Made with ❤️ by Ayush Tandon";
});

document.querySelector(".footer button").addEventListener("click", () => {
    let wrapper = document.querySelector(".wrapper");
    let currentColor = window.getComputedStyle(wrapper).getPropertyValue("background-color");
  
    if (currentColor === "rgb(255, 255, 255)") {
      wrapper.style.backgroundColor = "#000";
      document.querySelector("body").style.color="white"
    } else {
      wrapper.style.backgroundColor = "#fff";
      document.querySelector("body").style.color="black"
    }
  });
  
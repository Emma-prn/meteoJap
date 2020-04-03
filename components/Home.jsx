import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Location, Permissions} from 'expo';

function Home({navigation}) {

    // Récupération de la date
    let date = new Date();
    const week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let day = week[date.getDay()];
    let nb = date.getUTCDate();
    let mois = month[date.getUTCMonth()];

    const [heures, setHeures] = useState('');
    const [minutes, setMinutes] = useState('');
    // Mise à jour de l'heure
    useEffect(() => {
        setInterval(function heure(){
            let h = new Date().getHours();
            h = (h < 10) ? `0${h}` : h;
            setHeures(h);
        }, 600);
        setInterval(function minutes(){
            let min = new Date().getUTCMinutes();
            min = (min < 10) ? `0${min}` : min;
            setMinutes(min);
        }, 100);
    });
    // Utilisation de l'API
    const key = 'cc2cf02a04b3fd515b1cc005bb05adf7';
    const ville = 'Neaufles-Saint-Martin';
    const [city, setCity] = useState('');
    const [meteo, setMeteo] = useState('');
    const [temp, setTemps] = useState('');
    const [pays, setPays] = useState('');
    const [img, setImg] = useState('');

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=${key}&lang=fr&units=metric`)
        .then(res => res.json())
        .then(data => {
            setCity(data.name);
            setMeteo(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
            setTemps(data.main.temp.toFixed(1));
            setPays(data.sys.country);
            setImg(data.weather[0].main);
        });
    });
    // Fonction pour changer les icônes météorologiques
    function iconMet(){
        const ill = img;
        let srcImg = null;
        switch (ill) {
            case "Clouds":
                srcImg = require("../assets/cloud.png");
                break;
            case "Drizzle":
            case "Rain":
                srcImg = require("../assets/rain.png");
                break;
            case "Clear":
                srcImg = require("../assets/sun.png");
                break;
            case "Thunderstorm":
                srcImg = require("../assets/thunder.png");
                break; 
            case "Snow":
                srcImg = require("../assets/snow.png");
                break;   
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
            case "Sand":
            case "Ash":
            case "Squall":
            case "Tornado":
                srcImg = require("../assets/mist.png");
                break;        
        }
        return  <Image source={srcImg} style={styles.ill}/>
    }

    return (
        <ImageBackground source={require('../assets/parch.png')} style={styles.image}>
            <View style={styles.loc}>
                <Text style={styles.ville}>{city}</Text>
                <Text style={styles.pays}>{pays}</Text>
            </View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.date}>{day.toString()} {nb.toString()} {mois.toString()}</Text>
                    <Text style={styles.date}>{heures}:{minutes}</Text>
                </View>
                {iconMet()}
                <Text style={styles.status}>{meteo}</Text>
                <Text style={styles.temp}>{temp}°C</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Prévisions')} style={styles.link}>
                <Text>Voir les prévisions</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}
// Style pour les éléments du composant
const styles = StyleSheet.create({
    link: {
        backgroundColor: '#ebd5b3',
        height: 50,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
    },
    card: {
      alignItems: 'center',
      margin: 30,
    },
    ville: {
        fontSize: 30,
        fontWeight: 'bold',
      },
    pays: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    loc: {
        position: 'absolute',
        left: 10,
        top: 0,
    },
    ill: {
        margin: 15,
        borderRadius: 200,
        height: 200,
        width: 150,
    },
    date: {
        fontSize: 30,
        textAlign: 'center',
    },  
    temp: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 25,
    },
});

export default Home;

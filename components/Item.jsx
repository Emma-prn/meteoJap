import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

function Item(props) {
  // Récupération des données passées par l'API
  const prev = props.item;
  const [meteo, setMeteo] = useState('');
  const [temp, setTemps] = useState('');
  const [img, setImg] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    setMeteo(prev.weather[0].description.charAt(0).toUpperCase() + prev.weather[0].description.slice(1));
    setTemps(prev.main.temp.toFixed(1));
    setDay(prev.dt_txt.split(" ")[0]);
    setTime(prev.dt_txt.split(" ")[1]);
    setImg(prev.weather[0].main);
  });
  // Mise en forme de la date
  let jour = new Date(day);
  const month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  let mois = month[jour.getUTCMonth()];
  let jr = jour.getUTCDate();
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
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{jr} {mois}</Text>
        <Text style={styles.title}>{time.substring(0, time.length - 3)}</Text>
      </View>
      {iconMet()}
      <View>
        <Text style={styles.status}>{meteo}</Text>
        <Text style={styles.deg}>{temp}°</Text>
      </View>
    </View>
  );
}
// Style pour les éléments du composant
const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#D0C8B0',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    ill: {
      height: 100,
      width: 95,
      resizeMode: 'contain',
      borderRadius: 200,
    },
    status: {
      fontSize: 20,
      width: 120,
      textAlign: 'right',
    },
    deg: {
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
    },
  });

export default Item;
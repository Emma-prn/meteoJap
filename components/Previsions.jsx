import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground } from 'react-native';
import Item from './Item';

function Previsions(props) {
  // Utilisation de l'API
  const key = 'cc2cf02a04b3fd515b1cc005bb05adf7';
  const ville = 'Neaufles-Saint-Martin';
  const [hour, setHour] = useState('');
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${key}&lang=fr&units=metric`)
      .then(res => res.json())
      .then(hour => {
         setHour(hour);
    });
  });
    return (
      <ImageBackground source={require('../assets/parch.png')} style={styles.image}>
        <View style={styles.container}>
          <FlatList
            data={hour.list}
            renderItem={({item}) => {
              return (
                <Item item={item}/>
              )}
            }
            keyExtractor={item => item.dt_txt}
          />
        </View>
      </ImageBackground>
    );
}
// Style pour les éléments du composant
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 0,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },
});

export default Previsions;

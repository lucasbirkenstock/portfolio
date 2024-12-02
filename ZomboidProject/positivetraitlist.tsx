import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

export interface Trait {
  id: string;
  TraitName: string;
  TraitDescription: string;
  StartingPoints: string;
  pointColor: string;
  image: any; 
  isSelected : boolean;
}

// Define the props for the PositiveTraitList component
interface PositiveTraitListProps {
  onSelectItem: (item: Trait) => void; 
}

const PositiveTraitList: React.FC<PositiveTraitListProps> = ({ onSelectItem }) => {
  const [selectedPositiveTraits, setselectedPositiveTraits] = useState<string[]>([]);

  const items: Trait[] = [
    { 
        id: 'adrenalinejunkie', 
        TraitName: "Adrenaline Junkie", 
        TraitDescription: "Moves faster when highly panicked.", 
        StartingPoints: "-8", 
        pointColor : "red",
        image: require('./imgs/traits/adrenalinejunkie.png'),
        isSelected: false 
    },
    { 
      id: 'athletic', 
      TraitName: "Athletic", 
      TraitDescription: "Can run faster and longer without tiring.\n+4 Fitness, +20% running/springing speed, -20% running/sprinting endurance loss.", 
      StartingPoints: "-10", 
      pointColor : "red",
      image: require('./imgs/traits/athletic.png'),
      isSelected: false 
    },
    { 
      id: 'brave', 
      TraitName: "Brave", 
      TraitDescription: "Less prone to becoming panicked.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/brave.png'),
      isSelected: false  
    },
    { 
      id: 'catseyes', 
      TraitName: "Cat's Eyes", 
      TraitDescription: "Better vision at night.", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/traits/cateyes.png'),
      isSelected: false  
    },
    { 
      id: 'dextrous', 
      TraitName: "Dextrous", 
      TraitDescription: "Transfers inventory items quickly.\n50% inventory transfer time", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/traits/dextrous.png'),
      isSelected: false  
    },
    { 
      id: 'eagleeyed', 
      TraitName: "Eagle Eyed", 
      TraitDescription: "Has a faster visibility fade and higher visibility arc.\nCharacter has a wider field of view.", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/eagleeyed.png'),
      isSelected: false 
    },
    { 
      id: 'fasthealer', 
      TraitName: "Fast Healer", 
      TraitDescription: "Recovers faster from injury and illness.", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/fasthealer.png'),
      isSelected: false 
    },
    { 
      id: 'fastlearner', 
      TraitName: "Fast Learner", 
      TraitDescription: "Increases XP gains.", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/fastlearner.png'),
      isSelected: false 
    },
    { 
      id: 'fastreader', 
      TraitName: "Fast Reader", 
      TraitDescription: "Takes less time to read books.", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/traits/fastreader.png'),
      isSelected: false 
    },
    { 
      id: 'fit', 
      TraitName: "Fit", 
      TraitDescription: "In good physical shape.\n+2 Fitness", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/fit.png'),
      isSelected: false 
    },
    { 
      id: 'graceful', 
      TraitName: "Graceful", 
      TraitDescription: "Makes less noise when moving.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/graceful.png'),
      isSelected: false 
    },
    { 
      id: 'inconspicuous', 
      TraitName: "Inconspicuous", 
      TraitDescription: "Less likely to be spotted by zombies.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/inconspicuous.png'),
      isSelected: false 
    },
    { 
      id: 'irongut', 
      TraitName: "Iron Gut", 
      TraitDescription: "Less chance to have food illness.", 
      StartingPoints: "-3", 
      pointColor : "red",
      image: require('./imgs/traits/irongut.png'),
      isSelected: false 
    },
    { 
      id: 'keenhearing', 
      TraitName: "Keen Hearing", 
      TraitDescription: "Larger perception radius.", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/keenhearing.png'),
      isSelected: false 
    },
    { 
      id: 'lighteater', 
      TraitName: "Light Eater", 
      TraitDescription: "Needs to eat less regularly.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/lighteater.png'),
      isSelected: false 
    },
    { 
      id: 'lowthirst', 
      TraitName: "Low Thirst", 
      TraitDescription: "Needs to drink water less regularly.", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/lowthirst.png'),
      isSelected: false 
    },
    { 
      id: 'lucky', 
      TraitName: "Lucky", 
      TraitDescription: "Sometimes things just go your way.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/lucky.png'),
      isSelected: false 
    },
    { 
      id: 'organized', 
      TraitName: "Organized", 
      TraitDescription: "Increased container inventory capacity.", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/organized.png'),
      isSelected: false 
    },
    { 
      id: 'outdoorsman', 
      TraitName: "Outdoorsman", 
      TraitDescription: "Not affected by harsh weather conditions.", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/traits/outdoorsman.png'),
      isSelected: false 
    },
    { 
      id: 'resilient', 
      TraitName: "Resilient", 
      TraitDescription: "Less prone to disease. Slower rate of zombification.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/resilient.png'),
      isSelected: false 
    },
    { 
      id: 'speeddemon', 
      TraitName: "Speed Demon", 
      TraitDescription: "The fast driver.", 
      StartingPoints: "-1", 
      pointColor : "red",
      image: require('./imgs/traits/speeddemon.png'),
      isSelected: false 
    },
    { 
      id: 'stout', 
      TraitName: "Stout", 
      TraitDescription: "Extra knockback from melee weapons and increased carry weight.\n+2 Strength", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/stout.png'),
      isSelected: false 
    },
    { 
      id: 'strong', 
      TraitName: "Strong", 
      TraitDescription: "Extra knockback from melee weapons and increased carry weight.\n+4 Strength, +40% knockback", 
      StartingPoints: "-10", 
      pointColor : "red",
      image: require('./imgs/traits/strong.png'),
      isSelected: false 
    },
    { 
      id: 'thickskinned', 
      TraitName: "Thick Skinned", 
      TraitDescription: "Less chance of scratches or bites breaking the skin.", 
      StartingPoints: "-8", 
      pointColor : "red",
      image: require('./imgs/traits/thickskinned.png'),
      isSelected: false 
    },
    { 
      id: 'wakeful', 
      TraitName: "Wakeful", 
      TraitDescription: "Needs less sleep.", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/traits/wakeful.png'),
      isSelected: false 
    },
    { 
      id: 'amateurmechanic', 
      TraitName: "Amateur Mechanic", 
      TraitDescription: "Has a detailed knowledge of common and heavy vehicle models and their repairs.\n+1 Mechanics", 
      StartingPoints: "-5", 
      pointColor : "red",
      image: require('./imgs/traits/amateurmechanic.png'),
      isSelected: false 
    },
    { 
      id: 'angler', 
      TraitName: "Angler", 
      TraitDescription: "Knows the basics of fishing.\n+1 Fishing, can fix a fishing rod", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/angler.png'),
      isSelected: false 
    },
    { 
      id: 'baseballPlayer', 
      TraitName: "Baseball Player", 
      TraitDescription: "Has practice with a baseball bat and knows how to hit with precision.\n+1 Long Blunt", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/baseballplayer.png'),
      isSelected: false 
    },
    { 
      id: 'brawler', 
      TraitName: "Brawler", 
      TraitDescription: "Used to getting into trouble.\n+1 Axe, +1 Long Blunt", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/brawler.png'),
      isSelected: false 
    },
    { 
      id: 'cook', 
      TraitName: "Cook", 
      TraitDescription: "Knows how to cook.\n+2 Cooking", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/cook.png'),
      isSelected: false 
    },
    { 
      id: 'firstaider', 
      TraitName: "First Aider", 
      TraitDescription: "Has a CPR and First Aid course certificate.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/firstaider.png'),
      isSelected: false 
    },
    { 
      id: 'formerscout', 
      TraitName: "Former Scout", 
      TraitDescription: "Knows how to pick wild berries and how to treat small injuries.\n+1 First Aid, +1 Foraging", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/formerscout.png'),
      isSelected: false 
    },
    { 
      id: 'gardener', 
      TraitName: "Gardener", 
      TraitDescription: "Has basic agriculture knowledge.\n+1 Farming, knows plant disease cures", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/gardener.png'),
      isSelected: false 
    },
    { 
      id: 'gymnast', 
      TraitName: "Gymnast", 
      TraitDescription: "Agile and discreet.\n+1 Lightfooted, +1 Nimble", 
      StartingPoints: "-5", 
      pointColor : "red",
      image: require('./imgs/traits/gymnast.png'),
      isSelected: false 
    },
    { 
      id: 'handy', 
      TraitName: "Handy", 
      TraitDescription: "Faster and stronger constructions.\n+1 Carpentry, +1 Maintenance\n+100HP to all constructions", 
      StartingPoints: "-8", 
      pointColor : "red",
      image: require('./imgs/traits/handy.png'),
      isSelected: false 
    },
    { 
      id: 'herbalist', 
      TraitName: "Herbalist", 
      TraitDescription: "Can find medicinal plants and craft medicines and poultices from them.", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/herbalist.png'),
      isSelected: false 
    },
    { 
      id: 'hiker', 
      TraitName: "Hiker", 
      TraitDescription: "Used to surviving the jungle.\n+1 Foraging, +1 Trapping", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/traits/hiker.png'),
      isSelected: false 
    },
    { 
      id: 'hunter', 
      TraitName: "Hunter", 
      TraitDescription: "Knows the basics of hunting.\n+1 Aiming, +1 Short Blade, +1 Sneaking, +1 Trapping", 
      StartingPoints: "-8", 
      pointColor : "red",
      image: require('./imgs/traits/hunter.png'),
      isSelected: false 
    },
    { 
      id: 'nutritionist', 
      TraitName: "Nutritionist", 
      TraitDescription: "Can see the nutritional values of food.", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/nutritionist.png'),
      isSelected: false 
    },
    { 
      id: 'Runner', 
      TraitName: "Runner", 
      TraitDescription: "Runner in the spare times.\n+1 Sprinting", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/runner.png'),
      isSelected: false 
    },
    { 
      id: 'sewer', 
      TraitName: "Sewer", 
      TraitDescription: "+1 Tailoring", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/traits/sewer.png'),
      isSelected: false 
    },
  ];

  const handleSelectItem = (item: Trait) => {
    setselectedPositiveTraits((prevselectedPositiveTraits) => {
      if (prevselectedPositiveTraits.includes(item.id)) {
        // If already selected, remove it
        return prevselectedPositiveTraits.filter((id) => id !== item.id);
      } else {
        // If not selected, add it
        return [...prevselectedPositiveTraits, item.id];
      }
    });
    onSelectItem(item); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Positive Traits</Text>
      <ScrollView style={styles.scrollContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              { backgroundColor: selectedPositiveTraits.includes(item.id) ? '#5f5963' : 'lightgray' },
            ]}
            onPress={() => handleSelectItem(item)}
          >
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.textContainer}>
              <Text style={{ color: selectedPositiveTraits.includes(item.id) ? 'white' : 'black', fontWeight: 'bold' }}>
                {item.TraitName}
              </Text>
              <Text style={{ color: selectedPositiveTraits.includes(item.id) ? 'white' : 'gray', marginTop: 5 }}>
                {item.TraitDescription}
              </Text>
            </View>
            <Text
              style={{
                color: item.pointColor,
                position: 'absolute',
                right: 10,
                top: 15,
              }}
            >
              {item.StartingPoints}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    position: 'relative',
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
});

export default PositiveTraitList;

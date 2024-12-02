import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

export interface Trait {
  id: string;
  TraitName: string;
  TraitDescription: string;
  StartingPoints: string;
  pointColor: string;
  image: any;
  isSelected: boolean;
}

// Define the props for the NegativeTraitList component
interface NegativeTraitListProps {
  onSelectItem: (item: Trait) => void; 
}

const NegativeTraitList: React.FC<NegativeTraitListProps> = ({ onSelectItem }) => {
  const [selectedNegativeTraits, setselectedNegativeTraits] = useState<string[]>([]);

  const items: Trait[] = [
    { 
        id: 'agoraphobic', 
        TraitName: "Agoraphobic", 
        TraitDescription: "Gets panicked when outdoors.", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/agoraphobic.png'),
        isSelected: false 
    },
    { 
        id: 'allthumbs', 
        TraitName: "All Thumbs", 
        TraitDescription: "Transfers inventory items slowly.\n400% transfer time", 
        StartingPoints: "+2", 
        pointColor : "green",
        image: require('./imgs/traits/allthumbs.png'),
        isSelected: false  
    },
    { 
        id: 'asthematic', 
        TraitName: "Asthematic", 
        TraitDescription: "Faster endurance loss.\n140% running/sprinting loss. 130% swing loss.", 
        StartingPoints: "+5", 
        pointColor : "green",
        image: require('./imgs/traits/asthematic.png'),
        isSelected: false  
    },
    { 
        id: 'claustrophobic', 
        TraitName: "Claustrophobic", 
        TraitDescription: "Gets panicked when indoors.", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/claustrophobic.png'),
        isSelected: false  
    },
    { 
        id: 'clumsy', 
        TraitName: "Clumsy", 
        TraitDescription: "Makes more noise when moving.", 
        StartingPoints: "+2", 
        pointColor : "green",
        image: require('./imgs/traits/clumsy.png'),
        isSelected: false  
    },
    { 
        id: 'conspicuous', 
        TraitName: "Conspicuous", 
        TraitDescription: "More likely to be spotted by zombies.", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/conspicuous.png'),
        isSelected: false  
    },
    { 
        id: 'cowardly', 
        TraitName: "Cowardly", 
        TraitDescription: "Especially prone to becoming panicked.", 
        StartingPoints: "+2", 
        pointColor : "green",
        image: require('./imgs/traits/cowardly.png'),
        isSelected: false  
    },
    { 
        id: 'deaf', 
        TraitName: "Deaf", 
        TraitDescription: "Smaller perception radius and hearing range. Can't hear sound.", 
        StartingPoints: "+12", 
        pointColor : "green",
        image: require('./imgs/traits/deaf.png'),
        isSelected: false  
    },
    { 
        id: 'disorganized', 
        TraitName: "Disorganized", 
        TraitDescription: "Decreased container inventory capacity.", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/disorganized.png'),
        isSelected: false  
    },
    { 
        id: 'feeble', 
        TraitName: "Feeble", 
        TraitDescription: "Less knockback from melee weapons. Decreased carrying weight", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/feeble.png'),
        isSelected: false  
    },
    { 
        id: 'hardofhearing', 
        TraitName: "Hard of Hearing", 
        TraitDescription: "Smaller perception radius. Smaller hearing range. ", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/hardofhearing.png'),
        isSelected: false  
    },
    { 
        id: 'heartyappetite', 
        TraitName: "Hearty Appetite", 
        TraitDescription: "Needs to eat more regularly. ", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/heartyappetite.png'),
        isSelected: false  
    },
    { 
        id: 'fearofblood', 
        TraitName: "Fear of Blood", 
        TraitDescription: "Panic when performing first aid on self, cannot perform first aid on others, gets stressed when bloody. ", 
        StartingPoints: "+5", 
        pointColor : "green",
        image: require('./imgs/traits/fearofblood.png'),
        isSelected: false  
    },
    { 
        id: 'highthirst', 
        TraitName: "High Thirst", 
        TraitDescription: "Needs more water to survive.\n200% thirst.", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/highthirst.png'),
        isSelected: false  
    },
    { 
        id: 'illiterate', 
        TraitName: "Illiterate", 
        TraitDescription: "Cannot read books.", 
        StartingPoints: "+8", 
        pointColor : "green",
        image: require('./imgs/traits/illiterate.png'),
        isSelected: false  
    },
    { 
        id: 'outofshape', 
        TraitName: "Out of Shape", 
        TraitDescription: "Low endurance, low endurance regeneration.", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/outofshape.png'),
        isSelected: false  
    },
    { 
        id: 'obese', 
        TraitName: "Obese", 
        TraitDescription: "Reduced running speed, very low endurance and prone to injury. ", 
        StartingPoints: "+10", 
        pointColor : "green",
        image: require('./imgs/traits/obese.png'),
        isSelected: false  
    },
    { 
        id: 'overweight', 
        TraitName: "Overweight", 
        TraitDescription: "Reduced running speed, low endurance and prone to injury. ", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/overweight.png'),
        isSelected: false  
    },
    { 
        id: 'pacifist', 
        TraitName: "Pacifist", 
        TraitDescription: "Less effective with weapons.  ", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/pacifist.png'),
        isSelected: false  
    },
    { 
        id: 'pronetoillness', 
        TraitName: "Prone to Illness", 
        TraitDescription: "More prone to disease. Faster rate of zombification.  ", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/pronetoillness.png'),
        isSelected: false  
    },
    { 
        id: 'restlesssleeper', 
        TraitName: "Restless Sleeper", 
        TraitDescription: "Slow loss of tiredness while sleeping.  ", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/restlesssleeper.png'),
        isSelected: false  
    },
    { 
        id: 'shortsighted', 
        TraitName: "Short Sighted", 
        TraitDescription: "Small view distance. Slower visibility fade.  ", 
        StartingPoints: "+2", 
        pointColor : "green",
        image: require('./imgs/traits/shortsighted.png'),
        isSelected: false  
    },
    { 
        id: 'sleepyhead', 
        TraitName: "Sleepyhead", 
        TraitDescription: "Needs more sleep. ", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/sleepyhead.png'),
        isSelected: false 
    },
    { 
        id: 'smoker', 
        TraitName: "Smoker", 
        TraitDescription: "Stress and unhappiness decrease after smoking tobacco. Unhappiness rises when tobacco is not smoked. ", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/smoker.png'),
        isSelected: false  
    },
    { 
        id: 'slowhealer', 
        TraitName: "Slow Healer", 
        TraitDescription: "Recovers slowly from injuries and illness. ", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/slowhealer.png'),
        isSelected: false  
    },
    { 
        id: 'slowlearner', 
        TraitName: "Slow Learner", 
        TraitDescription: "Decreased XP gains.  ", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/slowlearner.png'),
        isSelected: false  
    },
    { 
        id: 'slowreader', 
        TraitName: "Slow Reader", 
        TraitDescription: "Takes longer to read books.  ", 
        StartingPoints: "+2", 
        pointColor : "green",
        image: require('./imgs/traits/slowreader.png'),
        isSelected: false 
    },
    { 
        id: 'sundaydriver', 
        TraitName: "Sunday Driver", 
        TraitDescription: "The very slow driver. ", 
        StartingPoints: "+1", 
        pointColor : "green",
        image: require('./imgs/traits/sundaydriver.png'),
        isSelected: false  
    },
    { 
        id: 'thinskinned', 
        TraitName: "Thin Skinned", 
        TraitDescription: "Increased chance of scratches, lacerations, or bites breaking the skin.   ", 
        StartingPoints: "+8", 
        pointColor : "green",
        image: require('./imgs/traits/thinskinned.png'),
        isSelected: false 
    },
    { 
        id: 'underweight', 
        TraitName: "Underweight", 
        TraitDescription: "Low strength, low endurance and prone to injury.   ", 
        StartingPoints: "+6", 
        pointColor : "green",
        image: require('./imgs/traits/underweight.png'),
        isSelected: false 
    },
    { 
        id: 'unfit', 
        TraitName: "Unfit", 
        TraitDescription: "Very low endurance, very low endurance regeneration.\n-4 Fitness   ", 
        StartingPoints: "+10", 
        pointColor : "green",
        image: require('./imgs/traits/unfit.png'),
        isSelected: false  
    },
    { 
        id: 'unlucky', 
        TraitName: "Unlucky", 
        TraitDescription: "What could go wrong for you, often does.  ", 
        StartingPoints: "+4", 
        pointColor : "green",
        image: require('./imgs/traits/unlucky.png'),
        isSelected: false 
    },
    { 
        id: 'veryunderweight', 
        TraitName: "Very Underweight", 
        TraitDescription: "Very low strength, very low endurance and prone to injury.\n-2 Fitness  ", 
        StartingPoints: "+10", 
        pointColor : "green",
        image: require('./imgs/traits/veryunderweight.png'),
        isSelected: false  
    },
    { 
        id: 'weakstomach', 
        TraitName: "Weak Stomach", 
        TraitDescription: "Higher chance to have food illness. ", 
        StartingPoints: "+3", 
        pointColor : "green",
        image: require('./imgs/traits/weakstomach.png'),
        isSelected: false  
    },
    { 
        id: 'weak', 
        TraitName: "Weak", 
        TraitDescription: "Less knockback from melee weapons. Decreased carrying weight. ", 
        StartingPoints: "+10", 
        pointColor : "green",
        image: require('./imgs/traits/weak.png'),
        isSelected: false  
    },

    
  ];

  const handleSelectItem = (item: Trait) => {
    setselectedNegativeTraits((prevselectedNegativeTraits) => {
      if (prevselectedNegativeTraits.includes(item.id)) {
        // If already selected, remove it
        return prevselectedNegativeTraits.filter((id) => id !== item.id);
      } else {
        // If not selected, add it
        return [...prevselectedNegativeTraits, item.id];
      }
    });
    onSelectItem(item); // Pass selected item details to parent component
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Negative Traits</Text>
      <ScrollView style={styles.scrollContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              { backgroundColor: selectedNegativeTraits.includes(item.id) ? '#5f5963' : 'lightgray' },
            ]}
            onPress={() => handleSelectItem(item)}
          >
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.textContainer}>
              <Text style={{ color: selectedNegativeTraits.includes(item.id) ? 'white' : 'black', fontWeight: 'bold' }}>
                {item.TraitName}
              </Text>
              <Text style={{ color: selectedNegativeTraits.includes(item.id) ? 'white' : 'gray', marginTop: 5 }}>
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

export default NegativeTraitList;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Image, Text, FlatList, ImageBackground } from 'react-native';
import SelectableList from './selectableList';
import PositiveTraitList, {Trait} from './positivetraitlist';
import NegativeTraitList from './negativetraitlist';
import Sound from 'react-native-sound';

let backgroundSound : Sound | null = null;
let introductionSound: Sound | null = null;
let pageflip : Sound | null = null;

const App = () => {
 
  if (!backgroundSound) {
    backgroundSound = new Sound('theme.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      backgroundSound.setNumberOfLoops(-1); // Loop sound indefinitely
      backgroundSound.play();               
    });
  }
  

  const playSoundEffect = (fileName: string) => {
    // Create a new Sound instance for introduction.mp3 each time it's played
    introductionSound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the introduction sound', error);
        return;
      }
      introductionSound.play(() => {
        introductionSound.release(); // Release the sound once it's finished playing
      });
    });
  };

  

  interface Build 
  {
    id: string;
    occupation: string;
    traits: Trait[];
    points: number;
  }

  interface SelectableListProps{
    data: Build[];
    onSelectBuild: (build: Build) => void;
  }

  const [selectedBuild, setSelectedBuild] = useState<any>(null);

  const onSelectBuild = (build: any) => {
    setSelectedBuild(build);
    setPage('BuildDetails');
  };

  // State to track the current page 
  const [page, setPage] = useState('Home');


  useEffect(() => {
    const pageflip = new Sound('pageflip.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the pageflip sound', error);
        return;
      }
      pageflip.play(() => {
        pageflip.release(); 
      });
    });
    
    return () => {
      pageflip.release();
    };
  }, [page]);
    
  useEffect(() => {
    if (page === 'ReviewBuild') {
      playSoundEffect('introduction.mp3'); 
    } else {
      if (introductionSound) {
        introductionSound.stop(() => {
          introductionSound?.release(); 
        });
        introductionSound = null; 
      }
    }
  }, [page]); 

  // Track if an occupation is selected or not
  const [isOccupationSelected, setIsOccupationSelected] = useState(false);
  
  // State to store the selected item details
  const [selectedItem, setSelectedItem] = useState<any>(null); 
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // Track selected occupation ID
  
  const contradictoryTraits: { [key: string]: string[] } = {
    "obese": ["underweight", "emaciated", "veryunderweight" , "overweight"],
    "underweight": ["obese", "emaciated", "veryunderweight" , "overweight"],
    "emaciated" : ["obese", "underweight", "veryunderweight" , "overweight"],
    "veryunderweight" : ["obese", "underweight", "emaciated" , "overweight"],
    "overweight" : ["obese", "underweight", "veryunderweight" , "emaciated"],
    "lucky" : ["unlucky"],
    "unlucky" : ["lucky"],
    "irongut" : ["weakstomach"],
    "weakstomach" : ["irongut"],
    "lighteater" : ["heartyappetite"],
    "heartyappetite" : ["lighteater"],
    "organized" : ["disorganized"],
    "disorganized" : ["organized"],
    "speeddemon" : ["sundaydriver"],
    "sundaydriver" : ["speeddemon"],
    "thinskinned" : ["thickskinned"],
    "thickskinned" : ["thinskinned"],
    "lowthirst" : ["highthirst"],
    "highthirst" : ["lowthirst"],
    "deaf" : ["hardofhearing", "keenhearing"],
    "hardofhearing" : ["deaf", "keenhearing"],
    "keenhearing" : ["deaf", "hardofhearing"],
    "brave" : ["cowardly"],
    "cowardly" : ["brave"],
    "fastlearner" : ["slowlearner"],
    "slowlearner" : ["fastlearner"],
    "fastreader" : ["slowreader", "illiterate"],
    "slowreader" : ["fastreader", "illiterate"],
    "illiterate" : ["fastreader", "slowreader"],
    "fit" : ["unfit", "outofshape"],
    "unfit" : ["fit", "outofshape"],
    "outofshape" : ["fit", "unfit"],
    "allthumbs" : ["dextrous"],
    "dextrous" : ["allthumbs"],
    "graceful" : ["clumsy"],
    "clumsy" : ["graceful"],
    "weak" : ["strong", "stout", "feeble"],
    "strong" : ["weak", "stout", "feeble"],
    "stout" : ["weak", "strong", "feeble"],
    "feeble" : ["weak", "strong", "stout"],
    "claustrophobic" : ["agoraphobic"],
    "agoraphobic" : ["claustrophobic"]
  };

  // Track points
  const [characterPoints, setCharacterPoints] = useState(0);
  const [lastOccupationPoints, setLastOccupationPoints] = useState<number | undefined>(undefined);

  // Store traits
  const [selectedTraits, setSelectedTraits] = useState<any[]>([]);

  // For storing builds
  const [savedBuilds, setSavedBuilds] = useState<any[]>([]);


  const saveCurrentBuild = () => {
    // Create a build object with the current selection data
    const newBuild = {
      id: Date.now().toString(),
      occupation: selectedItem,
      traits: selectedTraits,
      points: characterPoints,
    };
    
    // Add the new build to the saved builds array
    setSavedBuilds(prevBuilds => {
      const updatedBuilds = [...prevBuilds, newBuild];
      return updatedBuilds;
    });
  
    // Reset states
    setSelectedItem(null);
    setSelectedItemId(null);
    setIsOccupationSelected(false);
    setSelectedTraits([]);
    setCharacterPoints(0);
    setLastOccupationPoints(undefined);
    
    // Navigate back to Home or any other initial screen
    setPage('Home');
  };
  
  // Occupation selection
  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  
    setCharacterPoints(prevPoints => {
      // Remove effect of the last selected occupation
      const updatedPoints = prevPoints - (lastOccupationPoints ?? 0) + parseInt(item.StartingPoints);
      setIsOccupationSelected(true); 
      // Update lastOccupationPoints for next selection
      setLastOccupationPoints(parseInt(item.StartingPoints));
      
      return updatedPoints;
    });
  };

  // Function to handle trait selection
  const handleSelectTrait = (trait: Trait) => {
  setSelectedTraits((prevSelectedTraits) => {
    const isAlreadySelected = prevSelectedTraits.some((selectedTrait) => selectedTrait.id === trait.id);

    if (isAlreadySelected) {
      // Remove trait points (deselection)
      setCharacterPoints((prevPoints) => prevPoints - parseInt(trait.StartingPoints));
      trait.isSelected = false;
      // Deselect the trait if it's already selected
      return prevSelectedTraits.filter((selectedTrait) => selectedTrait.id !== trait.id);
    } else {
      // Check for contradictions with already selected traits
      const hasContradiction = prevSelectedTraits.some(
        (selectedTrait) => 
          contradictoryTraits[trait.id]?.includes(selectedTrait.id) || 
          contradictoryTraits[selectedTrait.id]?.includes(trait.id)
      );

      if (hasContradiction) {
        return prevSelectedTraits; // No change if contradiction found
      } else {
        // Add trait points
        setCharacterPoints((prevPoints) => prevPoints + parseInt(trait.StartingPoints));
        trait.isSelected = true;
        // Add the new trait if no contradiction
        return [...prevSelectedTraits, trait];
      }
    }
  });
};

  return (
  
    <SafeAreaView style={styles.container}>
     
      {page === 'Home' ? (
        <ImageBackground 
          source={require('./imgs/background.png')} 
          style={styles.background}  
          resizeMode="cover"         
        >
            <View style={styles.bottomButtonContainer}>
              <View style={styles.leftButton}>
                <Button color="gray" title="Create Build" onPress={() => setPage('Occupation')} />
              </View>
              <View style={styles.rightButton}>
                <Button color="gray" disabled={savedBuilds.length === 0} title="View Builds" onPress={() => setPage('SavedBuilds')} />
              </View>
            </View>
        </ImageBackground>
      ) : page === 'Occupation' ? (
        <View style={styles.contentContainer}>
          <Text> Current Character Points: {characterPoints} </Text>
          {/* Pass the handleSelectItem function to SelectableList */}
          <SelectableList onSelectItem={handleSelectItem} />

          <View style={styles.bottomButtonContainer}>
            <Button color="gray" title="Go Back" onPress={() => setPage('Home')} />
            <Button color="gray" disabled={!isOccupationSelected} title="Select Traits" onPress={() => setPage('Traits')} />
          </View>
        </View>
      ) : page === 'Traits' ? (
        <View style={styles.contentContainer}>
          <Text style={styles.selectedItemTitle}>Trait Selection</Text>
          <Text style={styles.title}> Current Character Points: {characterPoints} </Text>

          <View style={styles.traitsContainer}> 
            <PositiveTraitList onSelectItem={handleSelectTrait}/>
          </View>

          <View style={styles.traitsContainer}> 
            <NegativeTraitList onSelectItem={handleSelectTrait}/>
          </View>
          
          <View style={styles.bottomButtonContainer}>
            <Button color="gray" title="Go Back" onPress={() => setPage('Occupation')} />
            <Button color="gray" title="Review Build" onPress={() => setPage('ReviewBuild')} />
          </View>
        </View>
      ) : page ==='ReviewBuild' ? (
        <View style={styles.contentContainer}>
          <Text style={styles.selectedItemTitle}> Current Character Points: {characterPoints} </Text>
          {selectedItem && (
            <View style={styles.selectedItemDetails}>
              <Text style={styles.selectedItemTitle}>Selected Occupation</Text>
              <Text style={styles.selectedItemName}>{selectedItem.OccupationName}</Text>
              <Image source={selectedItem.image}/>
              <Text style={styles.selectedItemTraits}>{selectedItem.OccupationTraits}</Text>
              {selectedTraits.map((trait) => (
                <View style={styles.reviewPageTraits} key={trait.id}> 
                  <Image source={trait.image} />
                  <Text> {trait.TraitName}</Text>
                </View>
            ))}
            </View>
          )}
          <View>
            
          </View>

          <View style={styles.bottomButtonContainer}>
            <Button color="gray" title="Go Back" onPress={() => setPage('Traits')} />
            <Button color="gray" disabled={characterPoints < 0} title="Save Build" onPress={() => saveCurrentBuild()} />
          </View>
        </View>
      ) : page==='SavedBuilds' ? (
        <View style={styles.contentContainer}>
          <Text style={styles.selectedItemTitle}>Saved Builds</Text>
          
          {/* FlatList to make the list scrollable */}
          <FlatList
            data={savedBuilds}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.buildCard} key={item.id}>
                <Image source={item.occupation.image} />
                <Text style={styles.buildTitle}>Occupation: {item.occupation?.OccupationName || 'Unknown'}</Text>
                <Text style={styles.buildPoints}>Leftover points: {item.points}</Text>
                <Text style={styles.buildTraits}>Traits: </Text>
                <View style={styles.buildTraitContainer}>
                  {item.traits.map((trait: Trait) => (
                    <View key={trait.id}> 
                      <Image source={trait.image} />
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
    
          <View style={styles.bottomButtonContainer}>
            <Button color="gray" title="Go Back" onPress={() => setPage('Home')} />
          </View>
        </View>
      ): (
        <View> 
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  background: {
    flex: 1,              
    justifyContent: 'center',     
    alignItems: 'center',         
  },
  bottomButtonContainer: {
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    flex: 1,
    alignItems: 'flex-start',
    left: 10,
  },
  rightButton: {
    flex: 1,
    right: 10,
    alignItems: 'flex-end',
  },
  selectedItemDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  selectedItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedItemName: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  selectedItemTraits: {
    marginTop: 5,
    fontSize: 14,
  },
  selectedItemPoints: {
    marginTop: 5,
    fontSize: 14,
    color: '#4caf50',
  },
  traitsContainer: {
    height: '45%'
  },
  buildCard: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  buildTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buildPoints: {
    fontSize: 16,
    marginVertical: 5,
  },
  buildTraits: {
    fontSize: 14,
    color: '#555',
  },
  buildTraitContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
    reviewPageTraits: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  }
});

export default App;

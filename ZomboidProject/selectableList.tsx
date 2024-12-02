import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface Item {
  id: string;
  OccupationName: string;
  OccupationTraits: string;
  StartingPoints: string;
  pointColor: string;
  image: any;
  isSelected: boolean;
}

// Define the props for the SelectableList component
interface SelectableListProps {
  onSelectItem: (item: Item) => void;
}

const SelectableList: React.FC<SelectableListProps> = ({ onSelectItem }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([
      { 
        id: 'unemployed', 
        OccupationName: "Unemployed", 
        OccupationTraits: "Get 8 character points", 
        StartingPoints: "8", 
        pointColor : "green",
        image: require('./imgs/occupations/unemployed.png'),
        isSelected : false 
    },
    { 
      id: 'fireofficer', 
      OccupationName: "Fire Officer", 
      OccupationTraits: "+1 Axe (skill)\n+1 Fitness\n+1 Sprinting\n+1 Strength", 
      StartingPoints: "0", 
      pointColor : "green",
      image: require('./imgs/occupations/fireofficer.png'),
      isSelected : false 
  },
  { 
      id: 'policeofficer', 
      OccupationName: "Police Officer", 
      OccupationTraits: "+3 Aiming\n+1 Nimble\n+2 Reloading", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/occupations/policeofficer.png'),
      isSelected : false  
  },
  { 
      id: 'parkranger', 
      OccupationName: "Park Ranger", 
      OccupationTraits: "+1 Axe (skill)\n+1 Carpentry\n+2 Foraging\n+2 Trapping", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/occupations/parkranger.png'),
      isSelected : false  
  },
  { 
      id: 'constructionworker', 
      OccupationName: "Construction Worker", 
      OccupationTraits: "+1 Carpentry\n+3 Short Blunt", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/occupations/constructionworker.png'),
      isSelected : false  
  },
  { 
      id: 'securityguard', 
      OccupationName: "Security Guard", 
      OccupationTraits: "+1 Lightfooted\n+2 Sprinting\nNight Owl", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/occupations/securityguard.png'),
      isSelected : false 
  },
  { 
      id: 'carpenter', 
      OccupationName: "Carpenter", 
      OccupationTraits: "+3 Carpentry\n+1 Short Blunt", 
      StartingPoints: "2", 
      pointColor : "green",
      image: require('./imgs/occupations/carpenter.png'),
      isSelected : false 
  },
  { 
      id: 'burglar', 
      OccupationName: "Burglar", 
      OccupationTraits: "+2 Lightfooted\n+2 Nimble\n+2 Sneaking\nBurglar", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/occupations/burglar.png'),
      isSelected : false  
  },
  { 
      id: 'chef', 
      OccupationName: "Chef", 
      OccupationTraits: "+3 Cooking\n+1 Maintenance\n+1 Short Blade\nCook", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/occupations/chef.png'),
      isSelected : false 
  },
  { 
      id: 'repairman', 
      OccupationName: "Repairman", 
      OccupationTraits: "+1 Carpentry\n+2 Maintenance\n+1 Short Blunt", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/occupations/repairman.png'),
      isSelected : false  
  },
  { 
      id: 'farmer', 
      OccupationName: "Farmer", 
      OccupationTraits: "+3 Farming", 
      StartingPoints: "2", 
      pointColor : "green",
      image: require('./imgs/occupations/farmer.png'),
      isSelected : false 
  },
  { 
      id: 'fisherman', 
      OccupationName: "Fisherman", 
      OccupationTraits: "+3 Fishing\n+1 Foraging", 
      StartingPoints: "-2", 
      pointColor : "red",
      image: require('./imgs/occupations/fisherman.png'),
      isSelected : false 
  },
  { 
      id: 'doctor', 
      OccupationName: "Doctor", 
      OccupationTraits: "+3 First Aid\n+1 Short Blade", 
      StartingPoints: "2", 
      pointColor : "green",
      image: require('./imgs/occupations/doctor.png'),
      isSelected : false 
  },
  { 
      id: 'veteran', 
      OccupationName: "Veteran", 
      OccupationTraits: "+2 Aiming\n+2 Reloading\nDesensitized", 
      StartingPoints: "-8", 
      pointColor : "red",
      image: require('./imgs/occupations/veteran.png'),
      isSelected : false 
  },
  { 
      id: 'nurse', 
      OccupationName: "Nurse", 
      OccupationTraits: "+2 First Aid\n+1 Lightfooted", 
      StartingPoints: "2", 
      pointColor : "green",
      image: require('./imgs/occupations/nurse.png'),
      isSelected : false 
  },
  { 
      id: 'lumberjack', 
      OccupationName: "Lumberjack", 
      OccupationTraits: "+2 Axe (skill)\n+1 Strength\nAxe Man", 
      StartingPoints: "0", 
      pointColor : "green",
      image: require('./imgs/occupations/lumberjack.png'),
      isSelected : false 
  },
  { 
      id: 'trainer', 
      OccupationName: "Fitness Instructor", 
      OccupationTraits: "+3 Fitness\n+2 Sprinting\nNutritionist", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/occupations/trainer.png'),
      isSelected : false 
  },
  { 
      id: 'burgerflipper', 
      OccupationName: "Burger Flipper", 
      OccupationTraits: "+2 Cooking\n+1 Maintenance\n+1 Short Blade\nCook", 
      StartingPoints: "2", 
      pointColor : "green",
      image: require('./imgs/occupations/burgerflipper.png'),
      isSelected : false 
  },
  { 
      id: 'electrician', 
      OccupationName: "Electrician", 
      OccupationTraits: "+3 Electrical\nCan operate generators", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/occupations/electrician.png'),
      isSelected : false 
  },
  { 
      id: 'engineer', 
      OccupationName: "Engineer", 
      OccupationTraits: "+1 Carpentry\n+1 Electrical", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/occupations/engineer.png'),
      isSelected : false 
  },
  { 
      id: 'metalworker', 
      OccupationName: "Metalworker", 
      OccupationTraits: "+3 Metalworking\nCan weld foraged metal to create items and barricades", 
      StartingPoints: "-6", 
      pointColor : "red",
      image: require('./imgs/occupations/metalworker.png'),
      isSelected : false 
  },
  { 
      id: 'mechanic', 
      OccupationName: "Mechanic", 
      OccupationTraits: "+3 Mechanics\n+1 Short Blunt\nAmateur Mechanic", 
      StartingPoints: "-4", 
      pointColor : "red",
      image: require('./imgs/occupations/mechanic.png'),
      isSelected : false  
  },
  ]);

  const handleSelectItem = (item: Item) => {
    // If the clicked item is already selected, we reset the selection (deselect it)
    if (selectedItemId === item.id) {
      setSelectedItemId(null);  
      setItems(prevItems => 
        prevItems.map(currentItem => 
          currentItem.id === item.id ? { ...currentItem, isSelected: false } : currentItem
        )
      );
      return;
    }

    // Set the new selected item and update the isSelected flag for the items
    setSelectedItemId(item.id);
    setItems(prevItems => 
      prevItems.map(currentItem => 
        currentItem.id === item.id
          ? { ...currentItem, isSelected: true }  
          : { ...currentItem, isSelected: false } 
      )
    );

    // Pass selected item details to parent component
    onSelectItem(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Occupations</Text>
      <ScrollView style={styles.scrollContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              { backgroundColor: selectedItemId === item.id ? '#5f5963' : 'lightgray' },
            ]}
            onPress={() => handleSelectItem(item)}
          >
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.textContainer}>
              <Text style={{ color: selectedItemId === item.id ? 'white' : 'black', fontWeight: 'bold' }}>
                {item.OccupationName}
              </Text>
              <Text style={{ color: selectedItemId === item.id ? 'white' : 'gray', marginTop: 5 }}>
                {item.OccupationTraits}
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
            <View> 
              {item.isSelected && (
                <Image
                  source={require('./imgs/bloodyCheckmark.png')} 
                  style={{ width: 20, height: 20, marginLeft: 10 }}
                />
              )}
            </View>
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
});

export default SelectableList;

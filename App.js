import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function App() {
  const [player1,setPlayer1]= useState('')
  const [player2,setPlayer2]= useState('')

  const [state, setState] = useState({
    gameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    currentPlayer: 1,
  });

  useEffect(() => {
    initialiGame();
  }, []);

  const initialiGame = () => {
    setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  };

  const getWinners = () => {
    const NUM_TILES = 3;
    var arr = state.gameState;
    var sum;
    //check rows
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check cols
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check diagonals
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][0] + arr[1][1] + arr[2][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check rows
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][2] + arr[1][1] + arr[2][0];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    return 0;
  };

  const OnPressTile = (row, col) => {
    var value = state.gameState[row][col];
    if (value !== 0) {
      return;
    }
    var currentPlayer = state.currentPlayer;
    var arr = state.gameState.slice();
    arr[row][col] = currentPlayer;
    setState({ gameState: arr });

    //switch current player
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    setState({ ...state, currentPlayer: nextPlayer });

    //get winner

    var winner = getWinners();
    
    if (winner == 1) {
      setPlayer1('')
      setPlayer2('')
      Alert.alert(`${player1} is the Winner`);
      initialiGame();
    } else if (winner == -1) {
      setPlayer1('')
      setPlayer2('')
      Alert.alert(`${player2} is the Winner`);
      initialiGame();
    }
  };
  console.log(state);

  const renderIcon = (row, col) => {
    var value = state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX}></Icon>;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO}></Icon>;
      default:
        return <View />;
    }
  };

  const NewGame = () => {
    initialiGame();
  };

  return (
    <>
    <View style={styles.container}>
      
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => OnPressTile(0, 0)}
          style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}
        >
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => OnPressTile(0, 1)}
          style={[styles.tile, { borderTopWidth: 0 }]}
        >
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => OnPressTile(0, 2)}
          style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
        >
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => OnPressTile(1, 0)}
          style={[styles.tile, { borderLeftWidth: 0 }]}
        >
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => OnPressTile(1, 1)} style={styles.tile}>
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => OnPressTile(1, 2)}
          style={[styles.tile, { borderRightWidth: 0 }]}
        >
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => OnPressTile(2, 0)}
          style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => OnPressTile(2, 1)}
          style={[styles.tile, { borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => OnPressTile(2, 2)}
          style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
        >
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 50}}/>
        <Button title="Start Again" onPress={() => NewGame()}></Button>
      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tile: {
    width: 100,
    height: 100,
    borderWidth: 10,
  },
  tileX: {
    fontSize: 90,
    color: "red",
  },
  tileO: {
    fontSize: 80,
    color: "green",
  },

  text:{
      width:200,
      flex:0,
      justifyContent:'center',
      alignItems:'center',
     
  }
});

import HomeScreen from '../components/Screens/AppScreens/Home/Home'
import Article from '../components/Screens/AppScreens/Article/Article'
import { createStackNavigator } from 'react-navigation-stack'

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Article: Article
  },
  {
    navigationOptions: {
      headerStyle: {
        marginTop: Expo.Constants.statusBarHeight
      }
    }
  }
)
